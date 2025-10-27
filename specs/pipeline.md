# Site Pipeline: Detailed Data Flows

This document outlines the detailed structure of data flows between various processes in our system, focusing on lead ingestion, enrichment, and queue management.

## 1. `receiveLead` Function (Initial Contact Ingestion)

The `receiveLead` function is responsible for ingesting new leads/contacts into our system. It captures initial raw contact information and stores it in Firestore.

**Key Fields Stored in `contacts` Collection:**
*   `raw_contact`: The complete raw contact data (required). This is fed directly to the personalization agent.
*   `phone`: Normalized phone number (e.g., +1XXXXXXXXXX).
*   `name`: Contact's name.
*   `email`: Contact's email address.
*   `contactId`: A unique indexed ID (UUID) for the contact, used for easy searching and referencing across the system.
*   `hash`: A unique 4-alphanumeric hash for quick, short identification.
*   `status`: Initial status of the contact, set to `"pending"`. This status will be updated as the contact progresses through the pipeline.
*   `last_sent`: Status of the last communication sent.
*   `source_url`: URL from which the lead originated.
*   `image_hash`: Hash of an associated image.
*   `business_name`: Name of the business associated with the lead.
*   `category`: Category of the business/service.
*   `services_rendered`: List of services rendered.
*   `timestamp`: Server timestamp of when the lead was received.

**Data Flow:**
1.  A local process script calls the `receiveLead` function with lead/contact data, including the `raw_contact` blob.
2.  The function normalizes the phone number.
3.  A unique `contactId` (UUID) and a unique 4-alphanumeric `hash` are generated.
4.  The lead data, including `raw_contact`, `contactId`, `hash`, and `status: "pending"`, is saved to the `contacts` collection in Firestore, using `contactId` as the document ID.
5.  This action triggers the personalization agent for enrichment, which uses the `raw_contact` data.

## 2. Personalization Agent (Contact Enrichment)

The personalization agent enriches the initial raw contact data by fetching additional information (e.g., weather data, news data, Google My Business data).

**Data Flow:**
1.  Upon creation of a new contact in the `contacts` collection (triggered by `receiveLead`), the personalization agent is invoked.
2.  It performs various data enrichment steps.
3.  Once the enrichment process is completed:
    *   The `status` field of the corresponding contact document in the `contacts` collection is updated to `"enriched"`.
    *   The `status` field of any corresponding entries in the `emailQueue` and `smsQueue` (identified by `leadId` which is the `contactId`) are also updated to `"enriched"`.

## 3. Email Queue / SMS Queue

After enrichment, the contact is routed to either the email queue or the SMS queue based on campaign requirements.

### `addLeadToSMSQueue` Function

This is an external callable function to add a lead to the SMS queue.

```typescript
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Callable function to add a lead to the SMS queue.
 *
 * Expected input:
 * {
 *   leadId: string,        // The Firestore lead ID (from saveLeadToServer)
 *   phone: string,         // Normalized phone number (+1XXXXXXXXXX)
 *   campaignId: number     // ID of the campaign (99 = SMS campaign)
 * }
 */
export const addLeadToSMSQueue = functions.https.onCall(
  async (request) => {
    try {
      const { leadId, phone, campaignId } = request.data as { leadId: string; phone: string; campaignId: number };

      if (!leadId || !phone || !campaignId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "leadId, phone, and campaignId are required"
        );
      }

      // Normalize phone format
      const normalizedPhone = phone.replace(/\D/g, "");
      if (normalizedPhone.length !== 11 && normalizedPhone.length !== 10) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Phone number must be 10 or 11 digits"
        );
      }

      const queueEntry = {
        leadId,
        phone: normalizedPhone.startsWith("1")
          ? `+${normalizedPhone}`
          : `+1${normalizedPhone}`,
        campaignId,
        status: "pending", // Initial status, will be updated by downstream processors
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection("smsQueue").add(queueEntry);

      return {
        success: true,
        id: docRef.id,
        ...queueEntry,
      };
    } catch (error: any) {
      console.error("Error adding lead to SMS queue:", error);
      throw new functions.https.HttpsError(
        "internal",
        error.message || "Unknown error"
      );
    }
  }
);
```

**Queue Entry Fields (SMS and Email Queues):**
*   `leadId`: The `contactId` from the `contacts` collection, linking the queue entry to the main contact record.
*   `phone`: Normalized phone number (for SMS queue).
*   `email`: Email address (for Email queue).
*   `campaignId`: ID of the associated campaign.
*   `status`: Initial status is `"pending"`. This is updated to `"enriched"` once the personalization agent completes its work for the corresponding `leadId`.
*   `createdAt`: Server timestamp of when the entry was added to the queue.

**Data Flow:**
1.  After a lead is received and saved, it can be added to either the `smsQueue` or `emailQueue` (or both, depending on campaign logic).
2.  Entries in these queues initially have a `status` of `"pending"`.
3.  Once the personalization agent successfully enriches the contact data, it updates the `status` of the corresponding queue entries to `"enriched"`.
4.  Downstream processors will then pick up entries with `"enriched"` status for further action (e.g., sending emails or SMS messages).

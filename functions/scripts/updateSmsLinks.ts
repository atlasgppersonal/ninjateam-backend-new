import * as admin from "firebase-admin";
import { db } from '~utils/firebase';
import { SmsQueueDocument, RawContact } from '~types/contact';

// Initialize Firebase Admin if not already initialized (for standalone script execution)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "fourth-outpost-470409-u3", // Explicitly set your project ID
  });
}

async function updateSmsLinks() {
  console.log("Starting SMS link update script...");

  try {
    // 1. Query smsQueue for documents containing '[Link]'
    const smsQueueSnapshot = await db.collection("smsQueue")
      .where("smstext", "array-contains", "[Link]") // This query won't work directly for string contains
      .get();

    // Fallback for string contains as Firestore doesn't support direct string contains query
    const allSmsDocs = await db.collection("smsQueue").get();

    const docsToUpdate = allSmsDocs.docs.filter((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
      const data = doc.data() as SmsQueueDocument;
      return data.smstext && data.smstext.includes("[Link]");
    });


    if (docsToUpdate.length === 0) {
      console.log("No SMS queue documents found with '[Link]' placeholder.");
      return;
    }

    console.log(`Found ${docsToUpdate.length} SMS queue documents to update.`);

    for (const smsDoc of docsToUpdate) {
      const smsQueueData = smsDoc.data() as SmsQueueDocument;
      const smsDocRef = smsDoc.ref;

      try {
        const leadId = smsQueueData.leadId;
        
        if (!leadId) {
          console.warn(`SMS queue document ${smsDoc.id} is missing leadId. Skipping.`);
          await smsDocRef.update({ status: 'failed', errorMessage: 'Missing leadId for link update' });
          continue;
        }

        // Fetch contact to get the hash
        const contactSnapshot = await db.collection("contacts").doc(leadId).get();
        if (!contactSnapshot.exists) {
          console.warn(`Contact with ID ${leadId} not found for SMS queue document ${smsDoc.id}. Skipping.`);
          await smsDocRef.update({ status: 'failed', errorMessage: `Contact ${leadId} not found for link update` });
          continue;
        }
        const contactData = contactSnapshot.data() as RawContact;
        const contactHash = contactData.hash;

        if (!contactHash) {
          console.warn(`Contact ${leadId} is missing hash. Skipping SMS queue document ${smsDoc.id}.`);
          await smsDocRef.update({ status: 'failed', errorMessage: `Contact ${leadId} missing hash for link update` });
          continue;
        }

        const personalizedLink = `https://ninjateam.ai/lp/craigslist?h=${contactHash}`;
        const updatedSmsText = smsQueueData.smstext?.replace(/\[Link\]/g, personalizedLink);

        if (updatedSmsText) {
          await smsDocRef.update({
            smstext: updatedSmsText,
            // Optionally update status to processed if it was failed and now has a valid link
            status: smsQueueData.status === 'failed' ? 'processed' : smsQueueData.status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
          console.log(`Successfully updated SMS queue document ${smsDoc.id} with personalized link.`);
        } else {
          console.warn(`SMS text is empty for document ${smsDoc.id}. Skipping link update.`);
        }

      } catch (innerError: any) {
        console.error(`Error processing SMS queue document ${smsDoc.id}: ${innerError.message}`, innerError);
        await smsDocRef.update({ status: 'failed', errorMessage: `Link update error: ${innerError.message}` });
      }
    }
    console.log("SMS link update script completed.");
  } catch (outerError: any) {
    console.error(`Top-level error during SMS link update: ${outerError.message}`, outerError);
  }
}

updateSmsLinks().catch(console.error);

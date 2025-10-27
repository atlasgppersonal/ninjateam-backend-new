# Firestore Schema

This document outlines the inferred Firestore schema based on the application's code and live data samples, now consolidated to use the `contacts` collection for lead data.

## Collections

### `contacts`

This collection now stores all contact and lead information. Documents are identified by a unique identifier, typically the normalized phone number.

**Document Structure (ContactPipeline Interface):**

```typescript
export interface ContactPipeline {
  raw_data: RawContact;
  email: string | null; // Promoted to top-level
  phone: string | null; // Promoted to top-level
  enriched_data: {
    website_status: any;
    zip_code: string | null;
    address: string | null;
    gmb_data?: any;
    website_analysis: any;
    has_videos?: boolean; // Inferred from live data
    has_testimonials?: boolean; // Inferred from live data
  };
  status: string; // e.g., "init", "enriched", "completed", "failed_enrichment"
  contact_id: string; // Corresponds to RawContact.post_id
  error_message?: string | null; // Inferred from live data
  last_updated?: Timestamp; // Inferred from live data
}

export interface RawContact {
  post_id: string;
  business_name: string | null;
  category: string | null;
  services_rendered: string[] | null;
  name: string | null;
  email: string | null; // Re-added
  phone: string | null; // Re-added
  website_url: string | null;
  last_sent?: string | null; // Added from leads
  image_hash?: string | null; // Added from leads
  source_url?: string | null; // Added from leads
  timestamp?: admin.firestore.FieldValue; // Added from leads, Use FieldValue for server timestamp
  City?: string | null;
  State?: string | null;
  zip_code?: string | null;
}
```

**Fields (Top-Level in `contacts` documents):**

*   **`phone` (string):** Normalized phone number, used as the document ID.
*   **`email` (string | null):** Contact's email address.
*   **`name` (string | null):** Contact person's name.
*   **`last_sent` (string | null):** Date of last communication (e.g., "2025-08-08").
*   **`source_url` (string | null):** URL from which the lead data originated.
*   **`image_hash` (string | null):** Hash of an associated image.
*   **`business_name` (string | null):** Name of the business.
*   **`category` (string | null):** Business category.
*   **`services_rendered` (Array of strings | null):** List of services.
*   **`timestamp` (Timestamp):** When the contact/lead data was created/last updated.
*   **`raw_data` (Map):** Contains the initial, raw contact details (including fields like `post_id`, `City`, `State`, `zip_code`, `website_url` that are not promoted to top-level).
*   **`enriched_data` (Map):** Contains data enriched through various processes.
    *   `website_status` (any): Status of website analysis (e.g., "reachable").
    *   `zip_code` (string | null): Enriched zip code.
    *   `address` (string | null): Enriched address.
    *   `weather_data` (any): Weather information for the business location (e.g., `{ "temp": 70 }`).
    *   `news_data` (any): News related to the business location/category (e.g., `{ "headline": "Test News" }`).
    *   `gmb_data` (any | undefined): Google My Business data.
    *   `website_analysis` (any): Results of website analysis (e.g., `{ "score": 85, "data_points": {} }`).
    *   `has_videos` (boolean | undefined): Inferred from live data.
    *   `has_testimonials` (boolean | undefined): Inferred from live data.
*   **`status` (string):** Current status of the pipeline (e.g., "init", "enriched", "completed", "failed_enrichment").
*   **`contact_id` (string):** A unique identifier for the contact, derived from `raw_data.post_id`.
*   **`error_message` (string | null | undefined):** Any error message if the enrichment process fails.
*   **`last_updated` (Timestamp | undefined):** Timestamp of the last update.

### `weather_data`

This collection caches weather information. Documents are identified by the city name.

**Document Structure:**

Each document's ID is the lowercase city name (e.g., `orlando`). The content of these documents is currently `any`, representing cached weather data.

```typescript
// Example document ID: weather_data/orlando
// Document content: any (JSON object containing weather details, e.g., { "temp": 70 })
```

### `systemConfig`

This collection stores system-wide configuration settings.

**Document Structure:**

*   **Document ID:** `live`
*   **Fields:**
    *   `microsoftRefreshToken` (string): Refresh token for Microsoft Graph API.
    *   `emailClientId` (string): Client ID for email service.
    *   `emailTenantId` (string): Tenant ID for email service.
    *   `websiteScoringPrompt` (string): Prompt used for website scoring (inferred from live data).
    *   `consumerSettings` (Map): Settings related to email consumption.
        *   `timing_settings` (Map):
            *   `interval_between_emails_seconds` (Map):
                *   `max` (number): Maximum delay in seconds.
                *   `min` (number): Minimum delay in seconds.
            *   `working_hours` (Map):
                *   `enabled` (boolean): Whether working hours are enabled.
                *   `start_time_military` (string): Start time in military format (e.g., "09:00").
                *   `end_time_military` (string): End time in military format (e.g., "17:00").
                *   `work_days` (Array of strings): Days of the week considered working days (e.g., ["Monday", "Tuesday"]).
            *   `pause_settings` (Map): (inferred from live data)
                *   `major_pause` (Map):
                    *   `pause_duration_minutes` (Map):
                        *   `min` (number)
                        *   `max` (number)
                    *   `emails_before_pause` (Map):
                        *   `min` (number)
                        *   `max` (number)
        *   `email_attachments` (Map): Configuration for email attachments (e.g., `{ "contentId": "filePath" }`).

### `templates`

This collection stores email templates used for dispatching.

**Document Structure:**

*   **Document ID:** `templateId` (string)
*   **Fields:**
    *   `baseSubject` (string): The base subject line of the email template.
    *   `baseBodyHtml` (string): The base HTML body of the email template.

### `emailQueue` (Inferred)

This collection is inferred to hold requests for email dispatch, triggered by new document creations.

**Document Structure:**

*   **Document ID:** `queueDocId` (string)
*   **Fields:**
    *   `contactId` (string): Reference to the contact document in the `contacts` collection.
    *   `templateId` (string): Reference to the template document in the `templates` collection.
    *   `timezone` (string): The timezone relevant to the email dispatch (e.g., lead's timezone).
    *   `status` (string): Current status of the email queue entry (e.g., "error_no_contact", "error_no_template", "sent", "error_api_failure", "error_unexpected").
    *   `sentAt` (timestamp): Timestamp when the email was sent or the status was last updated.

### `governance`

This collection appears to manage rate limits or similar governance settings.

**Document Structure:**

*   **Document ID:** `rate_limit`
*   **Fields:**
    *   `lastResetTime` (Timestamp): The last time the rate limit was reset.
    *   `count` (number): Current count for the rate limit.
    *   `updatedAt` (Timestamp): Timestamp of the last update.

### `slots`

This collection seems to track available slots or counts.

**Document Structure:**

*   **Document ID:** `remaining`
*   **Fields:**
    *   `count` (number): The number of remaining slots.

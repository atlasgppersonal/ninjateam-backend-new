import * as admin from "firebase-admin";
import { db } from '../src/utils/firebase';
import { SmsQueueDocument, RawContact } from '../src/types/contact';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin if not already initialized (for standalone script execution)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "fourth-outpost-470409-u3", // Explicitly set your project ID
  });
}

async function generateSmsCsv() {
  console.log("Starting SMS CSV generation script...");

  const csvRows: string[] = ["phone_number,sms_text"]; // CSV header

  try {
    const smsQueueSnapshot = await db.collection("smsQueue").get();

    console.log(`Found ${smsQueueSnapshot.docs.length} SMS queue documents in total.`);

    for (const smsDoc of smsQueueSnapshot.docs) {
      const smsQueueData = smsDoc.data() as SmsQueueDocument;

      // Skip if status is 'failed' or sms_text is empty
      if (smsQueueData.status === 'failed' || !smsQueueData.smstext || smsQueueData.smstext.trim() === '') {
        continue;
      }

      const leadId = smsQueueData.leadId;
      if (!leadId) {
        console.warn(`SMS queue document ${smsDoc.id} is missing leadId. Skipping.`);
        continue;
      }

      // Fetch contact to get the phone number
      const contactSnapshot = await db.collection("contacts").doc(leadId).get();
      if (!contactSnapshot.exists) {
        console.warn(`Contact with ID ${leadId} not found for SMS queue document ${smsDoc.id}. Skipping.`);
        continue;
      }
      const contactData = contactSnapshot.data() as RawContact;
      const phoneNumber = contactData.phone; // Using 'phone' property from RawContact

      if (!phoneNumber) {
        console.warn(`Contact ${leadId} is missing phone number. Skipping SMS queue document ${smsDoc.id}.`);
        continue;
      }

      // Escape commas and quotes in sms_text for CSV
      const escapedSmsText = `"${smsQueueData.smstext.replace(/"/g, '""')}"`;
      csvRows.push(`${phoneNumber},${escapedSmsText}`);
    }

    const csvContent = csvRows.join('\n');
    const outputPath = path.join(__dirname, 'sms_campaign_data.csv');

    fs.writeFileSync(outputPath, csvContent);
    console.log(`Successfully generated SMS campaign CSV at: ${outputPath}`);

  } catch (error: any) {
    console.error(`Error generating SMS CSV: ${error.message}`, error);
  }
}

generateSmsCsv().catch(console.error);

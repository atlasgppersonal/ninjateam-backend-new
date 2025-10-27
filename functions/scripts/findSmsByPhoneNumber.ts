import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Mock the functions.logger for local testing
functions.logger.info = console.log;
functions.logger.warn = console.warn;
functions.logger.error = console.error;

async function findSmsByPhoneNumber(phoneNumber: string) {
  console.log(`Searching for SMS queue documents with phone number: ${phoneNumber}`);
  try {
    const smsQueueSnapshot = await admin.firestore().collection("smsQueue")
      .where("phone", "==", phoneNumber)
      .get();

    if (smsQueueSnapshot.empty) {
      console.log(`No SMS queue documents found for phone number: ${phoneNumber}`);
    } else {
      console.log(`Found ${smsQueueSnapshot.docs.length} SMS queue document(s) for phone number: ${phoneNumber}`);
      smsQueueSnapshot.docs.forEach(doc => {
        console.log(`Document ID: ${doc.id}, Data: ${JSON.stringify(doc.data(), null, 2)}`);
      });
    }
  } catch (error) {
    console.error(`Error searching for SMS queue documents: ${error}`);
  }
  process.exit();
}

// Call the function with the desired phone number
findSmsByPhoneNumber('+17202761254');

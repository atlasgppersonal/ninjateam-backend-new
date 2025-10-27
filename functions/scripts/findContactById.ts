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

async function findContactById(contactId: string) {
  console.log(`Searching for contact with ID: ${contactId}`);
  try {
    const contactSnapshot = await admin.firestore().collection("contacts").doc(contactId).get();

    if (!contactSnapshot.exists) {
      console.log(`No contact found with ID: ${contactId}`);
    } else {
      console.log(`Found contact with ID: ${contactId}`);
      console.log(`Data: ${JSON.stringify(contactSnapshot.data(), null, 2)}`);
    }
  } catch (error) {
    console.error(`Error searching for contact: ${error}`);
  }
  process.exit();
}

// Call the function with the desired contact ID
findContactById('0530ce01-15ef-47e0-abcc-9de4891f3b49');

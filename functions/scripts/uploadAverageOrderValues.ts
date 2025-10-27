import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
// Ensure your Firebase project credentials are set up as environment variables
// or through a service account key file.
// For local development, you might use:
// process.env.GOOGLE_APPLICATION_CREDENTIALS = '/path/to/your/serviceAccountKey.json';
initializeApp();
const db = getFirestore();

const averageOrderValuesData = {
  "Restaurants / Food Service": 120,
  "Professional Services": 2500,
  "Home Services": 650,
  "Retail SMBs": 85,
  "Healthcare": 1200,
  "Real Estate Agents": 7500,
  "Construction / Contracting": 15000
};

// Assuming this data applies to Denver, CO for now.
// You can extend this script to handle multiple cities if needed.
const cityStateDocId = "denver-co"; // Example for Denver, CO

async function uploadAverageOrderValues() {
  const cityDataRef = db.collection('dataUsaKeyPoints').doc(cityStateDocId);

  try {
    await cityDataRef.set({
      averageOrderValues: averageOrderValuesData
    }, { merge: true }); // Use merge: true to add/update without overwriting existing fields

    console.log(`Successfully uploaded average order values for ${cityStateDocId}`);
  } catch (error) {
    console.error(`Error uploading average order values for ${cityStateDocId}:`, error);
  }
}

uploadAverageOrderValues()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

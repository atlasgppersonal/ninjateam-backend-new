import * as admin from "firebase-admin";

// The service account key is not needed when deploying to Firebase Functions,
// as Firebase automatically provides credentials.
// const serviceAccount = require('../../fourth-outpost-470409-u3-bd333da0094a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount), // Remove credential for deployment
    projectId: "fourth-outpost-470409-u3", // Explicitly set your project ID
  });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

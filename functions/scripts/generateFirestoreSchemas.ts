import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin SDK (ensure your service account key is available)
// You might need to adjust this path based on where your service account key is located
// For local development, you can set the GOOGLE_APPLICATION_CREDENTIALS environment variable
// or provide the path directly here.
// Example: const serviceAccount = require('../../fourth-outpost-470409-u3-a70945cd7a5b.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// If running within a Firebase Functions environment, it initializes automatically
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function getCollectionSchema(collectionPath: string): Promise<any> {
  console.log(`Fetching schema for collection: ${collectionPath}`);
  const snapshot = await db.collection(collectionPath).limit(1).get();

  if (snapshot.empty) {
    console.warn(`No documents found in collection: ${collectionPath}. Cannot infer schema.`);
    return {};
  }

  const doc = snapshot.docs[0].data();
  return inferSchema(doc);
}

function inferSchema(data: any): any {
  const schema: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      schema[key] = getType(value);
    }
  }
  return schema;
}

function getType(value: any): string | object {
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    if (value.length > 0) {
      // Infer type based on the first element, or use 'any[]' if elements are mixed
      const firstElementType = getType(value[0]);
      const allSameType = value.every(item => typeof item === typeof value[0]);
      return allSameType ? `${firstElementType}[]` : 'any[]';
    }
    return 'any[]';
  }
  if (typeof value === 'object') {
    // Check if it's a Firestore Timestamp
    if (value instanceof admin.firestore.Timestamp) {
      return 'admin.firestore.Timestamp';
    }
    return inferSchema(value);
  }
  return typeof value;
}

async function generateSchemas() {
  const schemas: any = {};

  // Collections relevant to getPageMetadata
  const collectionsToSample = [
    'contacts',
    'dataUsaKeyPoints', // This collection contains weather, news, and dataUsaKeyPointsData
    'marketingStrategy',
    // Add other collections if necessary
  ];

  for (const collectionName of collectionsToSample) {
    schemas[collectionName] = await getCollectionSchema(collectionName);
  }

  const outputPath = path.join(__dirname, 'firestoreSchemas.json');
  fs.writeFileSync(outputPath, JSON.stringify(schemas, null, 2));
  console.log(`Generated Firestore schemas saved to: ${outputPath}`);
}

generateSchemas().catch(console.error);

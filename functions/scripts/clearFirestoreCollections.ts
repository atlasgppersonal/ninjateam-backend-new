import * as admin from 'firebase-admin';
import { db } from '../src/utils/firebase'; // Assuming firebase.ts exports 'db'

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

async function deleteCollection(collectionPath: string, batchSize: number = 100) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve, reject);
  });
}

async function deleteQueryBatch(query: admin.firestore.Query, resolve: (value?: unknown) => void, reject: (reason?: any) => void) {
  const snapshot = await query.get();

  if (snapshot.size === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve, reject);
  });
}

async function clearCollections() {
  console.log('Clearing "contacts" collection...');
  await deleteCollection('contacts');
  console.log('Successfully cleared "contacts" collection.');

  console.log('Clearing "smsQueue" collection...');
  await deleteCollection('smsQueue');
  console.log('Successfully cleared "smsQueue" collection.');

  console.log('All specified collections cleared.');
}

clearCollections().catch(console.error);

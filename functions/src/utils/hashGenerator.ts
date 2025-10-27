import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * Generates a unique 4-alphanumeric hash.
 * Checks for collisions in the 'contacts' collection.
 * @returns {Promise<string>} A unique 4-alphanumeric hash.
 */
export async function generateUniqueHash(): Promise<string> {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const hashLength = 4;
  let uniqueHash = "";
  let isUnique = false;

  while (!isUnique) {
    uniqueHash = "";
    for (let i = 0; i < hashLength; i++) {
      uniqueHash += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Check for collision in Firestore
    const snapshot = await db.collection("contacts").where("hash", "==", uniqueHash).limit(1).get();
    if (snapshot.empty) {
      isUnique = true;
    }
  }
  return uniqueHash;
}

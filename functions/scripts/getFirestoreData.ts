import * as admin from "firebase-admin";
import { ArbitrageDataDocument } from '../src/types/firestore'; // Import necessary types
import * as fs from 'fs'; // Import Node.js file system module

const serviceAccount = {
  projectId: "fourth-outpost-470409-u3",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDwwz+HJPnGxUM7\ndi91VfrWM+9JMzzufJYU0p8VzFNoMzQQDRutLrr613cnX1J/W0LVWCNEY5VYFpOH\ny+Ak1Z/NIkcbm+LhHMlFENgOYr3yobspFKJG3R4B1efH1Q9l/drnTgysS1W6FvQM\ncVExgvjpOsUl76XA9kkP7zoxdZ9I6hqt1KhpitVqp4o1m8DQqbxIUN3HWkILDGe0\ne01dqyz8ugbHwip9eWeIsPcYpYZItWvWXGOwzl3NhAqSXsOum38PFrwuYHYlKRxE\nD19v5HnAG6b0E7Rq9I+ufE8NPGFPOdc/a6cmG/umr/2Zqjf7uR9DJQZBbnfR9lKq\nXOGICyP1AgMBAAECggEAFLq63YfxeYvCc3wu2eDCmBl19iIokjVn4U3BJL9S7xsk\nKxL12b4MRfdclac/aHe9vrYNU0tqWwtBPeVFMeayu5bCneiYwDPE9eKyt4peOxBx\nwje568qzVV/Kyl8t1Do8fsMu6XwTBX1fGzMmf9InBu29y7u2fxwKw7R1Q4zntKnz\nR5cGTINecC7tXCZOqnRaMlYB9cowd7AVi0vUbKQz/it1wUNwOZk4sohLZf8GHZ9q\nCALvCKQRGebmu+Ar9pyNSYNummCX6KfF+x7+vCvYK05faBXWQxsYJXu4ydItZxyl\nXJq1DnWSgOU2qr/jiBhawU2wHxr9yWUU9toMnGd4gQKBgQD/xGpJm+hct5VcAh4Y\n3wotkLvba9/Fe2EYzN0K0m8OJrWdB3sPag+tDlCkJ2lHN4ZJBs8yNC4ty0qPi+hA\ng+/CGYxM4xV7kemFkXmRfLRbaDXfXN5XOk7ULJahmuI1rFt3slDQ7HBZJlalWyWD\n5lkdy0rs7KxQ4tctMk1ncUR3swKBgQDw+1ZiB8B2XFMjiTjuUkXRriLZK/xhYDgE\nGtpHuYr4+04I3xMD+0WSQym7yogoeXZpIL9xzv7WksyRKP4kQA+8MzWe0Z7WWDke\nETXH4M1xA2WJHMcaPmC+3mUHsMQQ1ylM++wP4Zi3vi8kOSPAyZWXxlmM5PMrkwth\nLVZ1MuahtwKBgDE0WD5RACLWLqXEwoWGYy7g6UMNPb+APO3Ie73ZPgQ67jWHeuU8\nQkfIuTrbWiWZSPxDkxjVcQzeTznOcJ/4wedVguhHx5o+N+66TejvVMNBCRwvgZbG\nYOPwsAnnAh3RSsd8Ro/q7LI57fFh15XIetyAf6mU3pGxEjRfuQRthf6BAoGBALEq\nt0l/FXpvShhYLGjaR8ZuVeSAOB6HFOe/rjcJLCj86VQQXPSSaYWspyQPNKc9FVcY\n4mcTnbu3VXprPtz71BWzOHq49iPz3JpEYNvAZInvy1hQtfiPX6Uz7+cFiEAxT4Xv\nuI+8dgCwbAwfji+QhNB+3Rt+v2CLzNP29xdXAsRlAoGBAOwE8Xn9aArofCk79Hr7\nSzn9fKJyNwblb225oDmjA8C/3lktGg+G1k/LAyAwkeCaGAzQjdFcjtMhkUhHrF3y\n1U0rggPB57PoHyCJuibpHXx1Uw8YwIj7HIvUXDP39i8bGvAKLHlOVFMfGv0wIepm\niyoTU1QJ9PEhzOZyggUksz7M\n-----END PRIVATE KEY-----\n",
  clientEmail: "vertex-ai@fourth-outpost-470409-u3.iam.gserviceaccount.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "fourth-outpost-470409-u3", // Explicitly set your project ID
  });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });


async function getArbitrageCollectionData(collectionPath: string) {
  console.log(`Attempting to fetch all documents from collection path: ${collectionPath}`);
  try {
    const querySnapshot = await db.collection(collectionPath).get();
    if (!querySnapshot.empty) {
      const documents: ArbitrageDataDocument[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as ArbitrageDataDocument);
      });
      fs.writeFileSync('arbitrage_data_output.json', JSON.stringify(documents, null, 2));
      console.log(`Successfully retrieved ${documents.length} documents from ${collectionPath} and saved to arbitrage_data_output.json`);
      return documents;
    } else {
      console.warn(`Collection at path ${collectionPath} is empty or does not exist.`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching collection data:', error);
    return [];
  }
}

// Example usage:
const serpCollectionPath = 'dataUsaKeyPoints/portland-or/serp/arbitrage-lite/movers'; // Example SERP collection path
getArbitrageCollectionData(serpCollectionPath);

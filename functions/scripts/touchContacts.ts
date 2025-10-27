import { db } from '../src/utils/firebase';
import * as admin from 'firebase-admin';

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function touchContact(contactId: string) {
    try {
        const contactRef = db.collection('contacts').doc(contactId);
        await contactRef.update({
            lastTouched: admin.firestore.FieldValue.serverTimestamp(),
            // You can add other non-breaking updates here if needed
        });
        console.log(`Successfully touched contact: ${contactId}`);
    } catch (error) {
        console.error(`Error touching contact ${contactId}:`, error);
    }
}

async function main() {
    console.log('Fetching all contacts...');
    const contactsSnapshot = await db.collection('contacts').get();

    if (contactsSnapshot.empty) {
        console.log('No contacts found in the database.');
        return;
    }

    console.log(`Found ${contactsSnapshot.size} contacts. Starting to touch them with a 5-second delay.`);

    for (const doc of contactsSnapshot.docs) {
        const contactId = doc.id;
        await touchContact(contactId);
        console.log(`Waiting 5 seconds before touching the next contact...`);
        await delay(5000); // Wait for 5 seconds
    }

    console.log('Script finished: All contacts have been touched.');
}

main().catch(console.error);

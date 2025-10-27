import * as admin from 'firebase-admin';
import * as personalizationAgent from '../src/agents/personalizationAgent'; // Import the entire module
import { RawContact } from '../src/types/contact';

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'fourth-outpost-470409-u3', // Replace with your project ID
  });
}

async function testGetEmailContent() {
  console.log('Starting test for _getEmailContentLogic...');

  const mockContact = {
    hash: 'test_hash_123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    raw_contact: {
      city: 'Orlando',
      state: 'FL',
      lat: 28.5383,
      lon: -81.3792,
    },
    name_confidence: 80,
    business_name: 'Test Business Inc.',
    category: 'Software Development',
    services_rendered: ['Web Development', 'Mobile App Development'],
    website_url: 'https://testbusiness.com',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    post_id: 'mock_post_id',
  } as RawContact; // Explicitly cast to RawContact

  const mockEmailTemplate = `
{GREETING}

{INTRO}

{CONCERNS}

{SOLUTIONS}

{CONCLUSION}

{PS}
`;

  const mockLlmPrompt = `
  Focus on the contact's business category and services.
  Mention the benefits of AI in software development.
  Keep the tone professional yet friendly.
  `;

  try {
    // Call the internal logic function directly
    const result = await personalizationAgent._getEmailContentLogic(mockContact, mockEmailTemplate, mockLlmPrompt);

    console.log('\n--- Generated Email Content ---');
    console.log(result);
    console.log('-------------------------------\n');

  } catch (error: any) {
    console.error('Error during testGetEmailContent:', error.message);
    if (error.details) {
      console.error('Error details:', error.details);
    }
  }
}

testGetEmailContent();

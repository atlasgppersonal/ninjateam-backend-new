import * as admin from 'firebase-admin';
// import { handleNewContactTrigger } from '../src/agents/personalizationAgent'; // No longer exported
import * as functions from "firebase-functions"; // Import functions namespace

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

async function runTest() {
  const payload = {
    "data": {
      "pageId": "seo_agent_dashboard",
      "contactHash": "B5KQ",
      "contentArray": [
        {"id":"introHtml","string":"\n              <p class=\"text-white text-2xl font-bold mb-4 leading-snug\">Hi {{contact.raw_contact.firstName}}, I’m Max, your dedicated SEO Strategist in {{contact.raw_contact.city}}. My mission is to elevate your online presence, ensuring your business stands out in local search results and attracts more qualified customers.</p>\n              <p class=\"text-gray-200 text-xl leading-relaxed\">With a keen eye for market trends and a deep understanding of search algorithms, I focus on strategies that deliver measurable growth and sustainable visibility.</p>\n            "},
        {"id":"headlineHtml","string":"<span class=\"text-white text-5xl font-extrabold leading-tight block\">You could attract <span class=\"text-yellow-400\">3x more clients</span> by improving your local SEO and review presence.</span>"},
        {"id":"insightsHtml","string":"\n              <ul class=\"list-disc list-inside space-y-4 text-gray-300 text-xl leading-relaxed\">\n                <li><strong class=\"text-white text-2xl\">Local Competitor Activity:</strong> Our analysis shows that top competitors in {{contact.raw_contact.city}} are consistently posting weekly updates and engaging with their audience, indicating a strong local SEO strategy.</li>\n                <li><strong class=\"text-white text-2xl\">Review Impact:</strong> Businesses with over 100 positive reviews consistently rank higher in local search results, demonstrating the critical role of reputation management.</li>\n                <li><strong class=\"text-white text-2xl\">Keyword Opportunities:</strong> We've identified several high-volume, low-competition keywords specific to your industry in {{contact.raw_contact.city}} that could significantly boost your organic traffic.</li>\n                <li><strong class=\"text-white text-2xl\">Mobile Optimization:</strong> A significant portion of local searches are performed on mobile devices. Ensuring your site is mobile-friendly is crucial for ranking and user experience.</li>\n                <li><strong class=\"text-white text-2xl\">Top Competitor:</strong> {{gmb_data.competitors_city[0].business_name}} with {{gmb_data.competitors_city[0].number_of_reviews}} reviews.</li>\n              </ul>\n            "},
        {"id":"conclusionHtml","string":"<span class=\"text-white text-3xl font-extrabold leading-relaxed block\">By catching up, you could gain <span class=\"text-green-400\">~10 new clients/month</span> &rarr; <span class=\"text-green-400\">$120,000 per year.</span></span>"},
        {"id":"howWeHelpHtml","string":"\n              <h4 class=\"text-3xl font-extrabold text-lime-200 mb-6 text-center\">\n                But no sweat, I can handle this for you while you handle what you do best, running the biz.\n              </h4>\n              <ul class=\"list-disc list-inside space-y-4 text-lime-100 text-xl leading-relaxed\">\n                <li><strong class=\"text-lime-200 text-2xl\">Targeted Keyword Optimization:</strong> We identify high-value keywords and optimize your content to rank higher, driving more organic traffic directly to your business.</li>\n                <li><strong class=\"text-lime-200 text-2xl\">Content Collaboration with Sarah:</strong> I work directly with Sarah, our Content Writer, to ensure blog posts and website content are not only engaging but also strategically optimized for search engines, featuring key terms that attract your ideal customers.</li>\n                <li><strong class=\"text-lime-200 text-2xl\">Enhanced Local Visibility:</strong> By optimizing your Google My Business profile and local citations, we ensure your business is easily found by customers in your immediate area, leading to more foot traffic and local inquiries.</li>\n                <li><strong class=\"text-lime-200 text-2xl\">Reputation Management:</strong> We help you actively manage and grow your online reviews, building trust and improving your search rankings, which directly translates to more customer conversions.</li>\n                <li><strong class=\"text-lime-200 text-2xl\">Technical SEO Excellence:</strong> From site speed to mobile-friendliness, we fine-tune the technical aspects of your website to meet search engine standards, ensuring a seamless user experience and improved crawlability.</li>\n              </ul>\n            "}
      ],
      "raw_contact": {
        "firstName": "John",
        "city": "Orlando",
        "state": "FL",
        "phone": "1234567890",
        "email": "john.doe@example.com",
        "website_url": "example.com",
        "zip_code": "32801",
        "business_name": "John's Plumbing",
        "category": "Plumber"
      }
    }
  };

  // Mock Firestore DocumentSnapshot
  const mockSnapshot = {
    id: 'testContact123', // A dummy contact ID
    data: () => ({
      ...payload.data,
      post_id: 'testContact123', // Ensure post_id is set in the data
    }),
    exists: true,
    ref: admin.firestore().doc('contacts/testContact123'), // Mock a DocumentReference
    createTime: admin.firestore.Timestamp.now(),
    updateTime: admin.firestore.Timestamp.now(),
    readTime: admin.firestore.Timestamp.now(), // Added missing property
    get: (fieldPath: string) => { /* mock implementation */ }, // Added missing property
    isEqual: (other: admin.firestore.DocumentSnapshot) => false, // Added missing property
  } as admin.firestore.QueryDocumentSnapshot;

  // Mock Change object for the Firestore event
  const mockChange = {
    after: mockSnapshot,
  } as functions.Change<admin.firestore.QueryDocumentSnapshot>;

  // Mock FirestoreEvent
  const mockEvent = {
    data: mockChange,
    params: {
      contactId: 'testContact123',
    },
  } as functions.firestore.FirestoreEvent<functions.Change<functions.firestore.QueryDocumentSnapshot>, { contactId: string }>;

  try {
    console.log('Running test for personalization agent functions...');
    // await handleNewContactTrigger(mockEvent); // Commented out as handleNewContactTrigger is no longer exported
    console.log('Test completed successfully. Check Firestore for updates.');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest();

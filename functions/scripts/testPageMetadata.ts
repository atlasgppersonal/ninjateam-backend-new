import * as admin from 'firebase-admin';
import { getPageMetadata } from '../src/getPageMetadata';
import * as functions from "firebase-functions/v2";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Manually mock functions.logger
const mockLogger = {
  info: (...args: any[]) => console.log('INFO:', ...args),
  warn: (...args: any[]) => console.warn('WARN:', ...args),
  error: (...args: any[]) => console.error('ERROR:', ...args),
};

// Manually mock admin.firestore() and its methods
const mockDb = {
  collection: (collectionName: string) => ({
    doc: (docId: string) => ({
      get: async () => {
        if (collectionName === 'dataUsaKeyPoints' && docId === 'orlando-fl') {
          return {
            exists: true,
            data: () => ({
              '2023 population': '309,154',
              'median household income': '$60,000',
            }),
          };
        }
        if (collectionName === 'marketingStrategy' && docId === 'main-strategy') {
          return {
            exists: true,
            data: () => ({
              strategydata: {
                'executive summary': 'This is a mock executive summary for marketing strategy.',
              },
            }),
          };
        }
        // Mock for enriched_data/gmb_data subcollection fetch
        if (collectionName === 'contacts' && docId === 'testContact123') {
          return {
            exists: true,
            data: () => ({
              gmb_data: {
                business: [{ business_name: 'John\'s Plumbing', number_of_reviews: 50, stars: 4.5 }],
                competitors_city: [
                  { business_name: 'Competitor A Plumbing', number_of_reviews: 120, stars: 4.8 },
                  { business_name: 'Competitor B Drains', number_of_reviews: 80, stars: 4.2 },
                ],
              },
            }),
          };
        }
        return { exists: false };
      },
    }),
    where: (field: string, op: string, value: any) => ({
      limit: (num: number) => ({
        get: async () => {
          if (collectionName === 'contacts' && field === 'hash' && op === '==' && value === 'B5KQ') {
            return {
              empty: false,
              docs: [{
                data: () => ({
                  post_id: 'testContact123',
                  business_name: 'John\'s Plumbing',
                  category: 'Plumber',
                  services_rendered: ['Plumbing', 'Drain Cleaning'],
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                  phone: '1234567890',
                  website_url: 'example.com',
                  zip_code: '32801',
                  raw_contact: {
                    firstName: 'John',
                    city: 'Orlando',
                    state: 'FL',
                    lat: 28.538336,
                    lon: -81.379234,
                  },
                  enriched_data: {
                    website_status: 'reachable',
                    zip_code: '32801',
                    address: '123 Main St, Orlando, FL',
                    gmb_data: {
                      business: [{ business_name: 'John\'s Plumbing', number_of_reviews: 50, stars: 4.5 }],
                      competitors_city: [
                        { business_name: 'Competitor A Plumbing', number_of_reviews: 120, stars: 4.8 },
                        { business_name: 'Competitor B Drains', number_of_reviews: 80, stars: 4.2 },
                      ],
                    },
                    website_analysis: { score: 85 },
                  },
                  status: 'enriched',
                  contact_id: 'testContact123',
                  hash: 'B5KQ',
                }),
                id: 'testContact123',
              }],
            };
          }
          return { empty: true, docs: [] };
        },
      }),
    }),
  }),
};

// Override admin.firestore() to return our mock
Object.defineProperty(admin, 'firestore', {
  value: () => mockDb,
  writable: true,
});

// Manually mock the VertexAI generativeModel
const mockGenerativeModel = {
  generateContent: async (request: any) => {
    const prompt = request.contents[0].parts[0].text;
    const contentArrayMatch = prompt.match(/"contentArray":(\[.*?\])/s);
    if (contentArrayMatch && contentArrayMatch[1]) {
      const contentArray = JSON.parse(contentArrayMatch[1]);
      const resolvedContent = contentArray.map((item: any) => ({
        id: item.id,
        resolvedString: `Resolved: ${item.string.replace(/\{\{.*?\}\}/g, '...')}` // Simplified replacement
      }));
      return {
        response: {
          candidates: [{
            content: {
              parts: [{
                text: `\`\`\`json\n${JSON.stringify(resolvedContent)}\n\`\`\``
              }]
            }
          }]
        }
      };
    }
    return { response: { candidates: [{ content: { parts: [{ text: 'Mock LLM response' }] } }] } };
  },
};

// Manually mock initializeVertexAI and generativeModel in getPageMetadata's context
// This requires modifying getPageMetadata.ts to accept these as parameters or use dependency injection
// For now, we'll directly assign to the module's exported generativeModel if it's mutable
// and ensure initializeVertexAI is called.
// This is a workaround and ideally, getPageMetadata should be refactored for better testability.
// @ts-ignore
getPageMetadata.__setGenerativeModel = (model: any) => {
  // This would be a setter in the actual module if designed for testing
  // For now, we assume direct assignment is possible or the module is structured to allow this.
};

async function runTest() {
  // Temporarily override functions.logger for this test run
  const originalLogger = functions.logger;
  Object.defineProperty(functions, 'logger', { value: mockLogger, configurable: true });

  // Manually set the generativeModel for getPageMetadata
  // This assumes getPageMetadata has a way to receive the generativeModel,
  // or that it's exported and mutable for testing purposes.
  // If not, getPageMetadata.ts would need to be modified to allow dependency injection.
  // @ts-ignore
  getPageMetadata.generativeModel = mockGenerativeModel;


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
      "chartsRequest":[{"chartId":"seoReviewComparison","type":"seo_comparison"},{"chartId":"topCompetitorsList","type":"competitor_list"}]
    }
  };

  try {
    console.log('Running test for getPageMetadata...');
    const result = await getPageMetadata(payload.data as any, {} as any); // Pass empty context for now
    console.log('Test completed successfully. Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // Restore original functions.logger
    Object.defineProperty(functions, 'logger', { value: originalLogger, configurable: true });
  }
}

runTest();

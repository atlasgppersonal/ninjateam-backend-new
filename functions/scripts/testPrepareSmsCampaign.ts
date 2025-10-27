import { prepareSmsCampaign } from '../src/agents/personalizationAgent';

const numberOfLeads = 100;
const llmPrompt = `
Your primary goal is to create a compelling, personalized SMS that drives a click-through by creating curiosity and presenting a high-value, no-risk offer.

The structure of the "smsText" must be in two parts:

1.  **A Personalized Opening:** Start with a brief, friendly, and conversational icebreaker. Use the available contact data (city, weather, news) to make this feel unique and human. For example: "Hi John, hope you're having a great Tuesday in Chicago. Don't forget an umbrella, looks like rain is coming!" or "Hi Sarah, hope you're staying cool in that Miami heat."

2.  **The Core Offer:** Immediately following the personalized opening, you must seamlessly integrate the following core message. You should use the text from the example below as your guide, ensuring all key points are included.

**CORE MESSAGE COMPONENTS & EXAMPLE:**

The core message MUST convey the following information clearly and concisely. The ideal structure is as follows:

"Speaking of getting things done, my AI Revenue Team (built on 25 years of experience) is live. I have a special offer for my first 15 founders: get a professional website and a month of my AI team for a single $149 setup fee. If you're not thrilled, cancel and the site is yours to keep. To show you its power, I've already run a quick analysis for you. See your custom report on the page here: [Link]"

**FINAL INSTRUCTIONS:**
- The final "smsText" should be a single, flowing paragraph combining the personalized opening and the core offer.
- Maintain a confident, founder-to-founder tone.
- The link placeholder "[Link]" should be the very last thing in the message.
- Ensure the message highlights the exclusivity (15 founders) and the risk-free nature of the "keep the website" guarantee.
`;

async function runTest() {
  console.log("Calling prepareSmsCampaign with 100 leads and the specified LLM prompt...");
  await prepareSmsCampaign(numberOfLeads, llmPrompt);
  console.log("prepareSmsCampaign call completed.");
}

runTest().catch(console.error);

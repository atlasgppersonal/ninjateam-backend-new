

// Mock data for demonstration purposes
const mockContactData: { [key: string]: any } = {
    "hash123": {
        firstName: "John",
        city: "Denver",
        business_name: "Denver Optometry",
        review_count: 150
    },
    "hash456": {
        firstName: "Jane",
        city: "Austin",
        business_name: "Austin Realty",
        review_count: 200
    }
};

const cityCompetitors: { [city: string]: string[] } = {
    "Denver": ["Competitor A Denver", "Competitor B Denver", "Competitor C Denver", "Competitor D Denver", "Competitor E Denver", "Competitor F Denver"],
    "Austin": ["Competitor X Austin", "Competitor Y Austin", "Competitor Z Austin"]
};

// 1. SEO Agent – Max
export const getSEOIntro = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    if (!contact) {
        return { sectionHtml: "Contact not found." };
    }
    let resolvedHtml = templateString.replace("{{firstName}}", contact.firstName || "there");
    resolvedHtml = resolvedHtml.replace("{{city}}", contact.city || "your city");
    return { sectionHtml: resolvedHtml };
};

export const getSEOHeadline = (contactHash: string, templateString: string): object => {
    // Placeholder: Fetch competitor data, calculate multiplier
    const multiplier = "3x"; // Mock value
    let resolvedHtml = templateString.replace("{{multiplier}}", multiplier);
    return { sectionHtml: resolvedHtml };
};

export const getSEOInsights = (contactHash: string, templateString: string): object => {
    // Placeholder: Generate bullet insights from dataset
    const contact = mockContactData[contactHash];
    const city = contact?.city || "your city";
    const reviewThreshold = 50; // Mock value
    const insights = `
        <ul>
            <li>Competitors in ${city} are posting weekly updates.</li>
            <li>Businesses with >${reviewThreshold} reviews rank higher.</li>
        </ul>
    `;
    return { sectionHtml: insights };
};

export const getSEOChart = (contactHash: string): object => {
    // Placeholder: Calculate competitor max, city avg, contact reviews
    const contact = mockContactData[contactHash];
    const topComp = 200; // Mock value
    const cityAvg = 120; // Mock value
    return {
        chartType: "bar",
        series: [
            { label: contact?.business_name || "Your Business", value: contact?.review_count || 0 },
            { label: "Top Competitor", value: topComp },
            { label: `${contact?.city || "City"} Avg`, value: cityAvg }
        ]
    };
};

export const getSEOConclusion = (contactHash: string, templateString: string): object => {
    // Placeholder: Calculate ROI impact
    const monthlyNewClients = 10; // Mock value
    const annualRevenueImpact = 100000; // Mock value
    let resolvedHtml = templateString.replace("{{monthlyNewClients}}", monthlyNewClients.toString());
    resolvedHtml = resolvedHtml.replace("{{annualRevenueImpact}}", annualRevenueImpact.toString());
    return { sectionHtml: resolvedHtml };
};

// 2. Blog Writer Agent – Sophia
export const getBlogPost = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const businessName = contact?.business_name || "your business";
    const blogTitle = "5 Ways Clear Vision Improves Daily Life"; // Mock value
    let resolvedHtml = templateString.replace("{{businessName}}", businessName);
    resolvedHtml = resolvedHtml.replace("{{blogTitle}}", blogTitle);
    return { sectionHtml: resolvedHtml };
};

// 3. Chat Agent – Daniel
export const getChatGreeting = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const firstName = contact?.firstName || "there";
    const businessName = contact?.business_name || "your business";
    let resolvedHtml = templateString.replace("{{firstName}}", firstName);
    resolvedHtml = resolvedHtml.replace("{{businessName}}", businessName);
    return { sectionHtml: resolvedHtml };
};

// 4. Phone Agent – Maya
export const getPhoneGreeting = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const businessName = contact?.business_name || "your business";
    let resolvedHtml = templateString.replace("{{businessName}}", businessName);
    return { sectionHtml: resolvedHtml };
};

// 5. Personalization Agent – Aiden
export const getPersonalizedSection = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const firstName = contact?.firstName || "there";
    const city = contact?.city || "your city";
    let resolvedHtml = templateString.replace("{{firstName}}", firstName);
    resolvedHtml = resolvedHtml.replace("{{city}}", city);
    return { sectionHtml: resolvedHtml };
};

// 6. Competitor Analysis Agent – Elena
export const getCompetitorSnapshot = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const reviewCount = contact?.review_count || 0;
    const topCompetitorReviews = 250; // Mock value
    const cityAverageReviews = 180; // Mock value
    let resolvedHtml = templateString.replace("{{reviewCount}}", reviewCount.toString());
    resolvedHtml = resolvedHtml.replace("{{topCompetitorReviews}}", topCompetitorReviews.toString());
    resolvedHtml = resolvedHtml.replace("{{cityAverageReviews}}", cityAverageReviews.toString());
    return { sectionHtml: resolvedHtml };
};

// 7. Emailing Agent – Carlos
export const getEmailDraft = (contactHash: string, templateString: string): object => {
    const contact = mockContactData[contactHash];
    const firstName = contact?.firstName || "there";
    const businessName = contact?.business_name || "your business";
    let resolvedHtml = templateString.replace("{{firstName}}", firstName);
    resolvedHtml = resolvedHtml.replace("{{businessName}}", businessName);
    return { sectionHtml: resolvedHtml };
};

// 8. GEO Agent – Priya
export const getGeoQA = (contactHash: string, templateString: string): object => {
    const questionPrompt = "What are the best local parks?"; // Mock value
    const answerText = "City Park and Washington Park are highly rated."; // Mock value
    let resolvedHtml = templateString.replace("{{questionPrompt}}", questionPrompt);
    resolvedHtml = resolvedHtml.replace("{{answerText}}", answerText);
    return { sectionHtml: resolvedHtml };
};

// 9. CRM Agent – David
export const getCRMContactView = (contactHash: string): object => {
    const contact = mockContactData[contactHash];
    const contactName = contact?.firstName || "Unknown Contact";
    const activityType = "Call"; // Mock value
    const activityTime = "2:00 PM"; // Mock value
    return {
        contact: { name: contactName },
        activities: [{ type: activityType, time: activityTime }]
    };
};

// In Training Agents
export const getSocialDraft = (contactHash: string): object => {
    return { draftPost: "Did you know 80% of Denver shoppers pick local? 🌟 #ShopLocal" };
};

export const getPartnerSuggestions = (contactHash: string): object => {
    return { partners: ["Local Optometrists", "Eyewear Shops"] };
};

export const getLeadList = (contactHash: string): object => {
    return { leads: [{ name: "John Realty", industry: "Realtor" }] };
};

export const getAnalytics = (contactHash: string): object => {
    return { insights: ["Review growth trending +12% MoM", "Competitor posting 2x more blogs"] };
};

// New function: getTopCompetitors
export const getTopCompetitors = (contactHash: string): string[] => {
    const contact = mockContactData[contactHash];
    if (!contact || !contact.city) {
        return [];
    }
    const competitors = cityCompetitors[contact.city] || [];
    return competitors.slice(0, 4); // Return up to 4 competitors
};

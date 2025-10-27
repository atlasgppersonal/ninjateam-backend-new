# Personalization Agent Specification

## 1. Purpose
The Personalization Agent is responsible for transforming enriched prospect data into highly tailored content across three primary channels: **Email, SMS, and Website**.  
It pulls from multiple data sources (scraped, enriched, competitor analysis, GBP, inferred metadata) and generates content that is human-like, warm, and avoids gimmicks.

---

## 2. Input Data

### Contact Object (Base Input)
```json
{
  "post_id": "missing_post_id_1",
  "business_name": "PRO WELDING FABRICATORS, LLC",
  "category": "Welding Services",
  "services_rendered": [
    "Onsite Mobile Welding",
    "Staircase fabrication and repair",
    "Gate fabrication and repair",
    "Railing fabrication and repair",
    "Fence fabrication and repair",
    "Patio work",
    "Rust Corrosion Repair"
  ],
  "name": "Gio Pugliese",
  "email": null,
  "phone": "689-777-1709",
  "website_url": "pwfflorida.com",
  "city": "Orlando, Florida"
}
```

### Enrichment Sources
- **Website Scraping (owned by Personalization Agent):**  
  Extract text, services, product descriptions. Apply scoring thresholds.
- **Google Business Agent (GBP):**  
  Provides posts, reviews, Q&A, categories, operating hours.
- **SEO Agent:**  
  Provides keyword rankings, opportunities, gaps.
- **Competitor Analysis Agent:**  
  Provides competitor matrix (strengths/weaknesses, offers, SEO performance).
- **Contextual Metadata:**  
  Seasonal events, holidays, local news, sports wins, weather, greetings.

---

## 3. Outputs

### Email Content (4 Sections + optional greeting + PS)
- **Greeting** → e.g., “Hi John, hope your Monday’s going well.”
- **Intro Section** → Highly personalized hook (use name, business, website, city).
- **Concerns Section** → Competitor and category challenges.
- **Solutions Section** → Specific AI/agent services tied to concerns.
- **Conclusion Section** → Future vision, FOMO, reinforcement.
- **PS Section** → Optional local/news/weather snippets.

> Each section has **4 variations** for A/B testing.

### Website Content
- **Hero Section** → Competitor positioning.  
- **Sub-Hero Section** → Customizable.  
- **Intro (Text + Audio)** → Personalized business pitch.  

### SMS Content
- Short, warm, conversational.  
- Can reuse “PS-style” snippets (weather, news, holidays).  
- Variations required.

---

## 4. Functional Flow

1. **Input Normalization**
   - Contact Object validated. Missing values flagged.
   - Enrichment triggered (website scrape, GBP, SEO, competitor).

2. **Data Scoring**
   - Each piece of data scored for reliability and relevance (0–1).  
   - Threshold ensures only **high-confidence data** enters personalization.

3. **Template Insertion**
   - Email, SMS, Website templates have **placeholders**:  
     `{GREETING}`, `{INTRO}`, `{CONCERNS}`, `{SOLUTIONS}`, `{CONCLUSION}`, `{PS}`
   - Personalization Agent fills placeholders with scored content.

4. **Final Pass (LLM Sanity Check)**
   - Ensures email flow is natural and not disjointed.  
   - Adjusts tone to “warm, conversational, one-to-one.”

---

## 5. Example Email Assembly

### Template
```md
{GREETING}

{INTRO}

{CONCERNS}

{SOLUTIONS}

{CONCLUSION}

{PS}
```

### Generated Example
```
Hi Gio, hope your Friday’s been going well.

I was looking at PRO WELDING FABRICATORS and noticed your website highlights staircase and gate fabrication—impressive work.  

But here’s a concern: one of your competitors, “Orlando Custom Metals,” is ranking for ‘mobile welding Orlando’ while you’re not, meaning they’re pulling traffic you could easily capture.  

That’s exactly what our AI team is designed to fix. For instance, I noticed you don’t yet have a Google Business Profile—setting that up and posting regularly alone could drive dozens of extra calls per month. Combined with blog posts targeting missed keywords like “rust repair Orlando,” you’ll stand out fast.  

We’re building AI teams for small businesses that keep working for you—today it’s welding, tomorrow it’s every service you expand into. The earlier you join, the faster you’ll build your digital moat.  

PS—Looks like it’s going to hit 95 this weekend. Stay cool out there!
```

---

## 6. Dependency Notes
- **Processor Agent** feeds initial contact object.  
- **Personalization Agent** enriches + scores data.  
- **GBP, SEO, Competitor Agents** provide structured signals.  
- **Email Generator Agent** consumes personalization outputs with templates.

## 7. Example input
{
  "templateId": "email_v1",
  "contactHash": "hash123",
  "channel": "email",
  "sections": [
    { "id": "greeting", "string": "{GREETING}" },
    { "id": "intro", "string": "{INTRO}" },
    { "id": "concerns", "string": "{CONCERNS}" },
    { "id": "solutions", "string": "{SOLUTIONS}" },
    { "id": "conclusion", "string": "{CONCLUSION}" },
    { "id": "ps", "string": "{PS}" }
  ]
}

## 7. Example output
{
  "templateId": "email_v1",
  "resolvedSections": [
    {
      "id": "greeting",
      "resolvedString": "Hey Gio, hope your Friday is going well!"
    },
    {
      "id": "intro",
      "resolvedString": "I came across PRO WELDING FABRICATORS, and I was impressed by your focus on mobile welding and custom staircases. It’s clear you’ve built a strong reputation in Orlando."
    },
    {
      "id": "concerns",
      "resolvedString": "One challenge I often hear from welding shops is losing local leads to bigger contractors who dominate Google results. If left unchecked, this can cost hundreds of missed jobs a year."
    },
    {
      "id": "solutions",
      "resolvedString": "That’s where our AI-powered SMB suite helps: we’ll set up and optimize your Google Business Profile, publish consistent local posts, and identify overlooked keywords like 'rust repair Orlando' where your competitors aren’t ranking. This combination builds visibility and credibility fast."
    },
    {
      "id": "conclusion",
      "resolvedString": "Think of it like giving your business a virtual team member who never sleeps — one that keeps growing stronger the longer you use it."
    },
    {
      "id": "ps",
      "resolvedString": "P.S. I hear it might storm tonight — keep that mobile rig under cover!"
    }
  ]
}



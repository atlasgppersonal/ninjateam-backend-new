# Agent Framework Specification (SEO & Blog Writer as Templates)

## 1. Function Design

**Function Name:** `getPageMetadata`

**Signature:**
```typescript
getPageMetadata(pageId: string, contactHash: string, contentArray: Array<{id: string, string: string}>)
```

**Inputs:**
- `pageId` → Unique ID for the agent/page (e.g. `"seo-agent"`, `"blog-writer-agent"`).  
- `contactHash` → Key used to retrieve enriched contact object.  
- `contentArray` → Array of `{ id, string }` pairs, where `string` may contain variables like `{{firstName}}`.

**Process:**
1. Lookup contact object using `contactHash`.
2. Pull cached data as needed:
   - `weatherObject`
   - `newsObject`
   - `contactObject` (business info, competitors).
3. Extract variables from all strings.
4. Map variables to objects (case-insensitive).
5. Pass all objects + strings into LLM with resolver prompt:
   - Replace variables with object values.
   - Apply fallbacks if null.
   - Clean up grammar/punctuation.
6. If a chart is needed for this page, include structured chart JSON.

**Outputs:**
```json
{
  "pageId": "seo-agent",
  "content": [
    { "id": "intro1", "resolvedString": "Hi John, I’m Max..." },
    { "id": "insight3", "resolvedString": "Right now, APQ Glass..." },
    { "id": "roi5", "resolvedString": "Optimizing SEO could increase leads..." }
  ],
  "charts": [
    { ...chartObject }  // see section 5
  ]
}
```

---

## 2. Resolver Prompt Framework

**Universal Prompt:**
```
You are a data resolver and content cleaner.

Inputs:
- Objects: contactObject, weatherObject, newsObject
- Array of strings with variables {{likeThis}}

Tasks:
1. Replace variables with object values (case-insensitive).
2. If null, generate category-appropriate fallback.
3. Review sentence and fix grammar/punctuation issues.
4. If string requires "ideas" (e.g. blog posts), generate structured, short suggestions.
5. Return JSON only in format:
   [{ "id": <id>, "resolvedString": <final string> }, ...]
```

---

## 3. Pseudocode Examples

### **SEO Agent (Max)**
```typescript
// Input example
getPageMetadata("seo-agent", "contact123", [
  { id: "intro1", string: "Hi {{firstName}}, I’m Max, your SEO agent for {{businessName}} in {{city}}." },
  { id: "impact2", string: "Most businesses in {{city}} are missing SEO opportunities." },
  { id: "insight3", string: "Competitors rank higher for {{topKeyword}}." },
  { id: "solve4", string: "Here’s how I help: ..." },
  { id: "roi5", string: "By optimizing SEO, {{businessName}} could increase leads by 30%." }
])
```

**Output example:**
```json
{
  "content": [
    { "id": "intro1", "resolvedString": "Hi John, I’m Max, your SEO agent for APQ Glass in Denver." },
    { "id": "impact2", "resolvedString": "Most businesses in Denver are missing SEO opportunities." },
    { "id": "insight3", "resolvedString": "Competitors rank higher for 'window repair Denver'." },
    { "id": "solve4", "resolvedString": "Here’s how I help: optimize on-page SEO, backlinks, local SEO listings." },
    { "id": "roi5", "resolvedString": "By optimizing SEO, APQ Glass could increase leads by 30%." }
  ],
  "charts": [
    {
      "id": "chart1",
      "type": "bar",
      "title": "Keyword Rankings",
      "labels": ["APQ Glass", "Mile High Windows", "ClearView Glass"],
      "datasets": [
        {
          "label": "Top Keyword Positions",
          "data": [25, 10, 15],
          "colors": ["#1E90FF", "#32CD32", "#FF6347"]
        }
      ],
      "metadata": { "note": "Competitors rank much higher for top search terms." }
    }
  ]
}
```

---

### **Blog Writer Agent (Sophia)**
```typescript
// Input example
getPageMetadata("blog-writer-agent", "contact123", [
  { id: "intro1", string: "Hi {{firstName}}, I’m Sophia, I help {{businessName}} grow through blogs in {{city}}." },
  { id: "impact2", string: "Fresh blog posts boost {{businessName}}’s discoverability." },
  { id: "insight3", string: "{{businessName}} has fewer blogs compared to competitors." },
  { id: "solve4", string: "Here are 5 posts I’d write today for {{businessName}}." },
  { id: "roi5", string: "Publishing blogs could increase {{businessName}} leads by 25%." }
])
```

**Output example:**
```json
{
  "content": [
    { "id": "intro1", "resolvedString": "Hi John, I’m Sophia, I help APQ Glass grow through blogs in Denver." },
    { "id": "impact2", "resolvedString": "Fresh blog posts boost APQ Glass’s discoverability." },
    { "id": "insight3", "resolvedString": "APQ Glass has only 2 blogs, while competitors publish an average of 12." },
    { "id": "solve4", "resolvedString": "Here are 5 posts I’d write today: 1) 'Best Windows for Denver Homes' 2) ... 5) 'Top Energy-Saving Glass Options'." },
    { "id": "roi5", "resolvedString": "Publishing blogs could increase APQ Glass leads by 25%." }
  ],
  "charts": [
    {
      "id": "chart2",
      "type": "pie",
      "title": "Market Share of Blog Posts",
      "labels": ["APQ Glass", "Mile High Windows", "ClearView Glass"],
      "datasets": [
        {
          "data": [8, 58, 34],
          "colors": ["#FFD700", "#6495ED", "#FF4500"]
        }
      ],
      "metadata": { "note": "APQ Glass represents only 8% of blogs in Denver." }
    }
  ]
}
```

---

## 4. Front-End Layout Framework

Each agent uses **5 rows**:

1. **Row 1 (Intro):** Greeting + persona + context.  
2. **Row 2 (Impact Statement):** Why this function matters.  
3. **Row 3 (Insights + Visualization):**
   - Left Column = Narrative insights.  
   - Right Column = Chart visualization (with optional child section for metadata).  
4. **Row 4 (How We Solve):** Actionable steps, lists, examples.  
5. **Row 5 (ROI/Results):** Business impact, revenue/lead growth.  

---

## 5. Master Visualization Plan

| Agent  | Chart Type     | Use Case |
|--------|----------------|----------|
| Max (SEO)     | **Bar Chart**     | Keyword rankings / traffic share. |
| Sophia (Blog) | **Pie Chart**     | Content volume share. |
| Daniel (Chat) | **Line Graph**    | Missed chats / response time trends. |
| Maya (Phone)  | **Funnel Chart**  | Calls → Answered → Qualified → Closed. |
| Victor (Ads)  | **Stacked Bar**   | Ad spend distribution. |
| Ella (Email)  | **Donut Chart**   | Open vs. click vs. bounce. |
| Leo (Leads)   | **Stacked Area**  | Pipeline growth over time. |
| Nina (Network)| **Bubble Chart**  | Referral sources by influence. |
| Oscar (Ops)   | **Heatmap**       | Productivity by time/day. |

✅ Each chart type has a **standard JSON schema** (bar, pie, line, funnel, etc.) including:
- `id`
- `type`
- `title`
- `labels`
- `datasets` (values + colors)
- `metadata` (note, benchmarks, supplemental info)

---

# End of Specification

# Blog Writer Agent – Sophia Spec (v1.0)

## Purpose
Defines how the Blog Writer Agent card is structured, how variables map to enriched/Firestore data, and how each row resolves. Includes ASCII mockups, function contracts using contactHash, server-side scaffolds, and Before/After Render examples.

---

## Card Layout Overview
The Blog Writer Agent card follows the same 4-row structure as SEO Agent. Each row has its own data-binding rules and fallbacks.

---

### **Row 1 – Intro (Avatar + Greeting)**
**ASCII Wireframe:**
```
+------------------------------------------------------------+
| [Avatar Sophia] | Hi John, I’m Sophia, your Blog Writer    |
|                 | helping {{businessName}} stand out in    |
|                 | {{city}}.                                |
+------------------------------------------------------------+
```

**Before Render (template):**
```html
<p>Hi {{firstName}}, I’m Sophia, your Blog Writer helping {{businessName}} stand out in {{city}}.</p>
```

**After Render (hydrated):**
```html
<p>Hi John, I’m Sophia, your Blog Writer helping Bright Dental stand out in Denver.</p>
```

---

### **Row 2 – Headline Impact Statement**
**ASCII Wireframe:**
```
+------------------------------------------------------------+
| Regular blog posts drive up to {{seoImpactPercent}}% more  |
| local traffic and help your business appear in GEO results.|
+------------------------------------------------------------+
```

**Before Render:**
```html
<p>Regular blog posts drive up to {{seoImpactPercent}}% more local traffic and help your business appear in GEO results.</p>
```

**After Render:**
```html
<p>Regular blog posts drive up to 18% more local traffic and help your business appear in GEO results.</p>
```

---

### **Row 3 – Insights + Data (Two-Cell Split)**
**ASCII Wireframe:**
```
+------------------------------------------------------------+
| • You currently have {{blogCount}} published blogs.        |   [ Bar Chart: Blog Count ]
| • Competitors in {{city}} average {{competitorBlogAvg}}.   |   ┌─────────────────────┐
| • Posting {{recommendedBlogsPerMonth}} more per month      |   | You: 2              |
|   could close the gap.                                     |   | Avg Competitor: 12  |
|                                                            |   | Top Competitor: 20  |
+------------------------------------------------------------+
```

**Before Render (template):**
```html
<ul>
  <li>You currently have {{blogCount}} published blogs.</li>
  <li>Competitors in {{city}} average {{competitorBlogAvg}}.</li>
  <li>Posting {{recommendedBlogsPerMonth}} more per month could close the gap.</li>
</ul>
```

**After Render (hydrated):**
```html
<ul>
  <li>You currently have 2 published blogs.</li>
  <li>Competitors in Denver average 12.</li>
  <li>Posting 4 more per month could close the gap.</li>
</ul>
```

**Data Response (from dataRequest: {type:"chart", id:"blog_performance"}):**
```json
{
  "chartType": "bar",
  "title": "Blog Posting Frequency – You vs Competitors",
  "series": [
    {"label": "Your Business", "value": 2},
    {"label": "Competitor Avg", "value": 12},
    {"label": "Top Competitor", "value": 20}
  ],
  "metadata": {
    "note": "Competitors posting weekly see ~67% higher visibility in local search (Moz)."
  }
}
```

---

### **Row 4 – Conclusion / ROI Projection**
**ASCII Wireframe:**
```
+------------------------------------------------------------+
| Publishing {{recommendedBlogsPerMonth}} more blogs could   |
| raise visibility by {{seoImpactPercent}}% → driving ~{{estMonthlyVisitors}}|
| new visitors monthly.                                      |
+------------------------------------------------------------+
```

**Before Render (template):**
```html
<p>Publishing {{recommendedBlogsPerMonth}} more blogs could raise visibility by {{seoImpactPercent}}% → driving ~{{estMonthlyVisitors}} new visitors monthly.</p>
```

**After Render (hydrated):**
```html
<p>Publishing 4 more blogs could raise visibility by 18% → driving ~150 new visitors monthly.</p>
```

---

## Server-Side Function Scaffold
```python
def getPageMetadata(contactHash: str, templateStrings: list[str], dataRequest: dict = None) -> dict:
    """
    Blog Writer Agent (Sophia) – resolves personalization and data requests.
    """

    # 1. Fetch contact + enrichment
    contact = db.get_contact(contactHash)
    category = contact.category
    city = contact.city

    # 2. Blog data (from enriched dataset if available, else fallback 0)
    blog_count = enrichment.get_blog_count(contactHash) or 0
    competitor_blog_counts = enrichment.get_competitor_blog_counts(city, category) or []
    competitor_avg = avg(competitor_blog_counts) if competitor_blog_counts else 0
    top_competitor = max(competitor_blog_counts, default=0)

    # 3. Inferred recommendations (from static benchmark)
    recommended_per_month = 4 if blog_count < competitor_avg else 2
    seo_impact_percent = 18  # from research
    est_monthly_visitors = estimate_visitors(contact, seo_impact_percent)

    # 4. Hydrate templates
    resolvedStrings = [
        hydrate_template(t, {
            "firstName": contact.first_name,
            "businessName": contact.business_name,
            "city": city,
            "blogCount": blog_count,
            "competitorBlogAvg": competitor_avg,
            "recommendedBlogsPerMonth": recommended_per_month,
            "seoImpactPercent": seo_impact_percent,
            "estMonthlyVisitors": est_monthly_visitors
        }) for t in templateStrings
    ]

    # 5. Handle dataRequest
    dataResponse = None
    if dataRequest:
        if dataRequest["id"] == "blog_performance":
            dataResponse = {
                "chartType": "bar",
                "title": "Blog Posting Frequency – You vs Competitors",
                "series": [
                    {"label": contact.business_name, "value": blog_count},
                    {"label": "Competitor Avg", "value": competitor_avg},
                    {"label": "Top Competitor", "value": top_competitor}
                ]
            }
        elif dataRequest["id"] == "blog_titles":
            dataResponse = {
                "collectionType": "blogIdeas",
                "items": suggest_blog_titles(city, category)
            }

    return {"resolvedStrings": resolvedStrings, "dataResponse": dataResponse}
```

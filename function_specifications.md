# Function Specifications for getPageMetadata

This document outlines the specifications for various data points and chart types used within the `getPageMetadata` function.

## Chart Data Specifications

### `localCompetitorsList` (List)

This chart type provides a list of local competitors with their review data.

```json
{
  "requestId": "localCompetitorsList",
  "data": [
    { "business_name": "Competitor 1", "number_of_reviews": 120, "stars": 4.5 },
    { "business_name": "Competitor 2", "number_of_reviews": 85, "stars": 3.8 },
    { "business_name": "Competitor 3", "number_of_reviews": 200, "stars": 4.9 }
  ]
}
```

### `arbitrageScatterChart` (Scatter Chart)

This chart type visualizes arbitrage opportunities as a scatter plot.

```json
{
  "requestId": "arbitrageScatterChart",
  "title": "Arbitrage Opportunity",
  "xAxisLabel": "Cost",
  "yAxisLabel": "Value",
  "xAxisMin": 0,
  "xAxisMax": 100,
  "yAxisMin": 0,
  "yAxisMax": 100,
  "secondXAxisGridLine": 50,
  "secondYAxisGridLine": 50,
  "data": [
    { "x": 10, "y": 20, "id": "point1" },
    { "x": 30, "y": 70, "id": "point2" },
    { "x": 60, "y": 40, "id": "point3" }
  ]
}
```

## Frontend Tokens to Resolve

The `getPageMetadata` function should process these tokens within the `contentArray` strings and replace them with their resolved values before returning the `content` to the frontend.

### Tokens related to `contact` information:

- `{{contact.raw_contact.name}}`
- `{{contact.business_name}}`
- `{{contact.raw_contact.city}}`
- `{{contact.raw_contact.category}}`

### Tokens related to `lead_serp` (SEO analysis) data:

- `{{lead_serp.estimated_revenue_range[0]}}`
- `{{lead_serp.estimated_revenue_range[1]}}`
- `{{lead_serp.total_keywords_in_pool}}`
- `{{lead_serp.visit_projection_range[0]}}`
- `{{lead_serp.visit_projection_range[1]}}`
- `{{lead_serp.agr_top_4_roi[0]}}`
- `{{lead_serp.agr_top_4_roi[1]}}`
- `{{lead_serp.high_value_keywords_summary_html}}`
- `{{lead_serp.potential_roi_summary_html}}`
- `{{lead_serp.strategic_opportunity_prioritization_html}}`

## Example Arbitrage Data from Firestore

```json
[
  {
    "examplePhrases": [],
    "parent": null,
    "aliases": [],
    "displayName": "",
    "description": "",
    "createdBy": "llm_fallback",
    "location": "portland-or",
    "id": "movers",
    "suggestedKeywords": [
      "moving services",
      "movers near me",
      "moving cost",
      "24 hour movers",
      "residential moving",
      "commercial moving",
      "best movers",
      "local movers",
      "long distance moving",
      "moving company",
      "affordable movers",
      "moving quote",
      "emergency movers",
      "same day moving",
      "packing services",
      "loading services",
      "unloading services",
      "junk removal",
      "cleaning services",
      "apartment movers",
      "office movers",
      "piano movers",
      "safe movers",
      "hot tub movers",
      "moving estimate",
      "professional movers",
      "licensed movers",
      "cheap movers",
      "top rated movers",
      "moving labor",
      "moving assistance",
      "last minute movers",
      "weekend movers",
      "moving rates",
      "moving prices",
      "moving specialists",
      "mover services",
      "moving services near me",
      "moving company cost",
      "affordable moving services",
      "best moving services",
      "top rated moving services",
      "licensed moving services",
      "professional moving services",
      "expert moving services",
      "commercial cleaning services",
      "residential cleaning services",
      "junk removal services",
      "packing and unpacking"
    ],
    "serviceRadiusCities": [
      "Portland",
      "Vancouver",
      "Gresham",
      "Hillsboro",
      "Beaverton",
      "Happy Valley",
      "Lake Oswego",
      "Oregon City",
      "Milwaukie",
      "Tigard",
      "Troutdale",
      "Fairview",
      "Wood Village",
      "Clackamas",
      "Wilsonville",
      "Sherwood",
      "Canby",
      "Forest Grove",
      "Cornelius",
      "Banks",
      "North Plains",
      "Gaston",
      "St. Helens",
      "Scappoose",
      "Columbia City",
      "Rainier",
      "Vernonia",
      "Estacada",
      "Sandy",
      "Welches",
      "Government Camp",
      "Brightwood",
      "Rhododendron",
      "Zigzag",
      "Mount Hood Village",
      "Parkdale",
      "Hood River",
      "The Dalles",
      "White Salmon",
      "Bingen",
      "Stevenson",
      "Carson",
      "North Bonneville",
      "Skamania",
      "Underwood",
      "Lyle",
      "Goldendale",
      "Klickitat",
      "Wishram",
      "Dufur",
      "Maupin"
    ],
    "confidence": 0.98,
    "avgJobAmount": 1200,
    "lastUpdated": "2025-10-25T12:29:00.057836+00:00",
    "suggestedAt": "2025-10-25T12:29:00.057836+00:00",
    "cityClusters": {
      "Newberg": [],
      "Estacada": [],
      "Washougal": [],
      "Mt Tabor": [],
      "McMinnville": [],
      "Ridgefield": [],
      "Southwest Hills": [],
      "South Portland": [],
      "Raleigh Hills": [],
      "Oak Grove": [],
      "Forest Heights": [],
      "Woodlawn": [],
      "Neskowin": [],
      "North Plains": [],
      "Rockcreek": [],
      "Garden Home-Whitford": [],
      "Manzanita": [],
      "Gaston": [],
      "Arch Cape": [],
      "Sunnyside": [],
      "Bay City": [],
      "Hosford-Abernethy": [],
      "Banks": [],
      "Maywood Park": [],
      "Eastmoreland": [],
      "Carlton": [],
      "Wheeler": [],
      "Hayhurst": [],
      "Troutdale": [],
      "Hillsdale": [],
      "Nehalem": [],
      "Progress": [],
      "Gearhart": [],
      "Powellhurst-Fischer": [],
      "Cornelius": [],
      "Forest Grove": [],
      "Multnomah": [],
      "Lloyd District": [],
      "Pacific City": [],
      "St Johns": [],
      "Raleigh Park": [],
      "Alberta": [],
      "Charbonneau": [],
      "Rivergrove": [],
      "Bull Mountain": [],
      "Seaside": [],
      "Cedar Hills": [],
      "Rockaway Beach": [],
      "Fairview": [],
      "West Linn": [],
      "Pleasant Home": [],
      "Cannon Beach": [],
      "Clackamas": [],
      "Milwaukie": [],
      "Scappoose": [],
      "Concordia": [],
      "Sellwood-Moreland": [],
      "Welches": [],
      "Dundee": [],
      "Downtown": [],
      "Barlow": [],
      "King City": [],
      "Cedar Mill": [],
      "Svensen": [],
      "Brightwood": [],
      "Richmond": [],
      "Alameda": [],
      "Damascus": [],
      "Yamhill": [],
      "Dayton": [],
      "Donald": [],
      "West Haven-Sylvan": [],
      "Garibaldi": [],
      "Wood Village": [],
      "Astoria": [],
      "Burnside": [],
      "Goose Hollow": [],
      "Eastport": [],
      "Ardenwald-Johnson Creek": [],
      "Brentwood-Darlington": [],
      "Linnton": [],
      "Council Crest": [],
      "Tualatin": [],
      "Oceanside": [],
      "Irvington": [],
      "Boring": [],
      "Tillamook": [],
      "South Waterfront": [],
      "Sherwood": [],
      "Happy Valley": [],
      "Battle Ground": [],
      "Government Camp": [],
      "Sauvie Island": [],
      "Laurelhurst": [],
      "Camas": [],
      "Hubbard": [],
      "Oak Hills": [],
      "Barbur": [],
      "Northwest District": [],
      "Mount Vista": [],
      "Rose City Park": [],
      "Stafford": [
        {
          "primary": "moving companies in stafford va",
          "related": [
            "moving company stafford va",
            "stafford va movers",
            "stafford va moving companies",
            "movers in stafford va",
            "moving companies stafford va",
            "movers stafford va",
            "moving companies stafford",
            "moving company stafford",
            "stafford moving company",
            "moving companies in stafford"
          ],
          "aggregate_search_volume": 1190,
          "average_cpc": 18.06,
          "average_competition": 0.75,
          "cluster_size": 11,
          "city": "Stafford"
        },
        {
          "primary": "stafford movers",
          "related": [],
          "aggregate_search_volume": 70,
          "average_cpc": 7.51,
          "average_competition": 0.57,
          "cluster_size": 1,
          "city": "Stafford"
        }
      ],
      "Cascade Park": [],
      "Roseway": [],
      "Portland Heights": [],
      "Aurora": [
        {
          "primary": "moving companies aurora",
          "related": [
            "moving companies aurora co",
            "aurora moving company",
            "moving companies in aurora colorado",
            "moving services aurora co",
            "moving company in aurora",
            "moving companies aurora colorado",
            "aurora co moving company",
            "moving company aurora",
            "moving companies in aurora",
            "aurora moving companies",
            "aurora co moving companies",
            "moving companies in aurora co",
            "moving company in aurora co",
            "moving company aurora co"
          ],
          "aggregate_search_volume": 19500,
          "average_cpc": 27.61,
          "average_competition": 0.54,
          "cluster_size": 15,
          "city": "Aurora"
        },
        {
          "primary": "movers aurora",
          "related": [
            "movers aurora co",
            "movers in aurora colorado",
            "aurora co movers",
            "aurora colorado movers",
            "movers in aurora co",
            "movers in aurora",
            "aurora movers"
          ],
          "aggregate_search_volume": 10400,
          "average_cpc": 27.43,
          "average_competition": 0.54,
          "cluster_size": 8,
          "city": "Aurora"
        }
      ],
      "Downtown Portland": [],
      "Reed": [],
      "King": [
        {
          "primary": "king movers",
          "related": [
            "king movers company",
            "king of movers",
            "king movers dallas",
            "king movers and storage"
          ],
          "aggregate_search_volume": 2570,
          "average_cpc": 18.05,
          "average_competition": 0.39,
          "cluster_size": 5,
          "city": "King"
        },
        {
          "primary": "king moving",
          "related": [
            "king moving co",
            "king moving company",
            "moving king",
            "king moving company dallas",
            "king moving company reviews",
            "the moving king",
            "king moving services",
            "king moving co reviews"
          ],
          "aggregate_search_volume": 2230,
          "average_cpc": 15.66,
          "average_competition": 0.23,
          "cluster_size": 9,
          "city": "King"
        },
        {
          "primary": "kings moving",
          "related": [
            "kings moving company",
            "kings moving services",
            "moving kings",
            "the moving kings",
            "moving kings review",
            "moving kings austin",
            "moving kings reviews",
            "the moving kings austin",
            "moving kings joshua cohen",
            "joshua cohen moving kings",
            "moving kings by joshua cohen",
            "moving kings pa"
          ],
          "aggregate_search_volume": 2050,
          "average_cpc": 13.19,
          "average_competition": 0.26,
          "cluster_size": 14,
          "city": "King"
        },
        {
          "primary": "king mover",
          "related": [],
          "aggregate_search_volume": 1300,
          "average_cpc": 14.96,
          "average_competition": 0.19,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "king's moving",
          "related": [],
          "aggregate_search_volume": 880,
          "average_cpc": 3.22,
          "average_competition": 0.06,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "kings movers",
          "related": [],
          "aggregate_search_volume": 590,
          "average_cpc": 11.02,
          "average_competition": 0.44,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "movingkings",
          "related": [],
          "aggregate_search_volume": 260,
          "average_cpc": 12.48,
          "average_competition": 0.23,
          "cluster_size": 1,
          "city": "King"
        }
      ],
      "Kern": [],
      "Crestwood": [],
      "Eliot": [],
      "Gladstone": [],
      "Montavilla": [],
      "Hayward Field": [],
      "Kenton": [],
      "Hockinson": [],
      "Salmon Creek": [],
      "Mill Park": [],
      "Felida": [],
      "Pearl District": [],
      "Heisley": [],
      "Neighborhood": [
        {
          "primary": "neighborhood moving",
          "related": [
            "neighborhood moving company",
            "neighborhood moving and storage"
          ],
          "aggregate_search_volume": 430,
          "average_cpc": 11.39,
          "average_competition": 0.33,
          "cluster_size": 3,
          "city": "Neighborhood"
        },
        {
          "primary": "neighborhood movers",
          "related": [],
          "aggregate_search_volume": 110,
          "average_cpc": 27.64,
          "average_competition": 0.49,
          "cluster_size": 1,
          "city": "Neighborhood"
        },
        {
          "primary": "best neighborhoods in centennial co",
          "related": [],
          "aggregate_search_volume": 20,
          "average_cpc": 1.44,
          "average_competition": 0.08,
          "cluster_size": 1,
          "city": "Neighborhood"
        }
      ],
      "Foster-Powell": [],
      "Hollywood": [
        {
          "primary": "moving companies north hollywood",
          "related": [
            "moving company north hollywood",
            "moving companies in north hollywood",
            "movers in north hollywood",
            "movers in north hollywood ca",
            "movers north hollywood",
            "moving companies in north hollywood ca",
            "north hollywood movers",
            "movers north hollywood ca",
            "north hollywood moving company",
            "moving company north hollywood ca",
            "moving company hollywood",
            "hollywood moving companies",
            "hollywood moving company",
            "moving companies hollywood ca",
            "moving companies in hollywood fl",
            "moving companies in hollywood florida",
            "moving company west hollywood",
            "west hollywood moving company",
            "moving companies in hollywood",
            "moving companies west hollywood",
            "west hollywood moving companies"
          ],
          "aggregate_search_volume": 18920,
          "average_cpc": 22.44,
          "average_competition": 0.32,
          "cluster_size": 22,
          "city": "Hollywood"
        },
        {
          "primary": "movers hollywood",
          "related": [
            "hollywood movers",
            "movers in hollywood",
            "movers hollywood ca",
            "movers west hollywood",
            "west hollywood movers",
            "movers in west hollywood"
          ],
          "aggregate_search_volume": 2700,
          "average_cpc": 22.31,
          "average_competition": 0.43,
          "cluster_size": 7,
          "city": "Hollywood"
        }
      ],
      "Russell": [],
      "Holladay Park": [],
      "West Slope": [],
      "Marquam Hill": [],
      "University Park": [],
      "Cathedral Park": [],
      "Sifton": [],
      "Piedmont": [],
      "Aloha": [
        {
          "primary": "aloha moving",
          "related": [
            "aloha moving company",
            "aloha moving san diego",
            "aloha isle moving"
          ],
          "aggregate_search_volume": 450,
          "average_cpc": 8.27,
          "average_competition": 0.26,
          "cluster_size": 4,
          "city": "Aloha"
        },
        {
          "primary": "aloha movers",
          "related": [
            "aloha movers san diego",
            "aloha movers hawaii",
            "aloha island movers kauai",
            "aloha island movers"
          ],
          "aggregate_search_volume": 310,
          "average_cpc": 14.07,
          "average_competition": 0.34,
          "cluster_size": 5,
          "city": "Aloha"
        }
      ],
      "Cully": [],
      "East Columbia": [],
      "Minnehaha": [],
      "Brooklyn": [
        {
          "primary": "moving brooklyn",
          "related": [
            "moving company brooklyn",
            "moving companies brooklyn ny",
            "moving companies brooklyn new york",
            "moving services in brooklyn",
            "brooklyn new york moving companies",
            "moving company brooklyn ny",
            "moving companies in brooklyn new york",
            "moving company brooklyn new york",
            "brooklyn moving service",
            "brooklyn moving company",
            "moving service brooklyn",
            "moving companies brooklyn",
            "brooklyn moving services",
            "moving brooklyn ny",
            "moving in brooklyn ny",
            "moving company in brooklyn new york",
            "brooklyn ny moving company",
            "moving company in brooklyn",
            "moving services brooklyn ny",
            "moving service brooklyn ny",
            "moving company in brooklyn ny",
            "moving in brooklyn",
            "best moving company brooklyn",
            "best moving companies brooklyn",
            "best brooklyn moving company",
            "brooklyn moving",
            "best moving companies in brooklyn",
            "best moving company in brooklyn",
            "local moving companies brooklyn",
            "local moving company brooklyn"
          ],
          "aggregate_search_volume": 370350,
          "average_cpc": 35.75,
          "average_competition": 0.17,
          "cluster_size": 31,
          "city": "Brooklyn"
        },
        {
          "primary": "mover brooklyn ny",
          "related": [
            "movers in brooklyn ny",
            "movers brooklyn ny",
            "brooklyn ny movers",
            "local movers brooklyn ny",
            "best movers in brooklyn ny"
          ],
          "aggregate_search_volume": 73630,
          "average_cpc": 31.24,
          "average_competition": 0.15,
          "cluster_size": 6,
          "city": "Brooklyn"
        },
        {
          "primary": "movers brooklyn new york",
          "related": [
            "movers brooklyn",
            "brooklyn movers",
            "movers in brooklyn nyc",
            "local movers brooklyn",
            "best movers brooklyn",
            "best movers in brooklyn"
          ],
          "aggregate_search_volume": 69790,
          "average_cpc": 34.89,
          "average_competition": 0.17,
          "cluster_size": 7,
          "city": "Brooklyn"
        }
      ],
      "Mulino": [],
      "Hazel Dell North": [],
      "Bridgeton": [],
      "Sloan's Lake": [],
      "Mount Tabor": [],
      "Five Corners": [],
      "Sylvan-Terwilliger": [],
      "Powellhurst-Gilbert": [],
      "Madison South": [],
      "Canby": [],
      "Homestead": [
        {
          "primary": "movers homestead florida",
          "related": [
            "moving companies homestead florida",
            "movers homestead fl",
            "movers in homestead florida",
            "movers in homestead fl",
            "moving companies in homestead florida",
            "movers homestead"
          ],
          "aggregate_search_volume": 950,
          "average_cpc": 28.09,
          "average_competition": 0.91,
          "cluster_size": 7,
          "city": "Homestead"
        },
        {
          "primary": "moving company homestead fl",
          "related": [
            "moving company homestead",
            "moving companies homestead fl",
            "homestead moving company",
            "moving companies homestead"
          ],
          "aggregate_search_volume": 850,
          "average_cpc": 25.97,
          "average_competition": 0.9,
          "cluster_size": 5,
          "city": "Homestead"
        }
      ],
      "Parkrose": [],
      "Lents": [],
      "Vernon": [
        {
          "primary": "vernon bc weather",
          "related": [
            "vernon bc",
            "vernon bc canada",
            "where is vernon bc"
          ],
          "aggregate_search_volume": 15640,
          "average_cpc": 0.94,
          "average_competition": 0.01,
          "cluster_size": 4,
          "city": "Vernon"
        },
        {
          "primary": "vernon canada",
          "related": [
            "vernon british columbia canada",
            "vernon in canada",
            "where is vernon canada"
          ],
          "aggregate_search_volume": 4840,
          "average_cpc": 2.96,
          "average_competition": 0.01,
          "cluster_size": 4,
          "city": "Vernon"
        },
        {
          "primary": "british columbia vernon",
          "related": [
            "vernon british columbia",
            "city of vernon british columbia"
          ],
          "aggregate_search_volume": 4800,
          "average_cpc": 1.21,
          "average_competition": 0.03,
          "cluster_size": 3,
          "city": "Vernon"
        },
        {
          "primary": "vernon b c",
          "related": [],
          "aggregate_search_volume": 1900,
          "average_cpc": 2.83,
          "average_competition": 0.01,
          "cluster_size": 1,
          "city": "Vernon"
        },
        {
          "primary": "vernon canadá",
          "related": [],
          "aggregate_search_volume": 1600,
          "average_cpc": 1.28,
          "average_competition": 0.04,
          "cluster_size": 1,
          "city": "Vernon"
        },
        {
          "primary": "moving company mount vernon",
          "related": [
            "movers mount vernon ny",
            "moving companies in mount vernon ny",
            "moving companies mount vernon ny",
            "moving company mount vernon ny",
            "vernon moving and storage leesville la",
            "vernon moving",
            "movers mount vernon wa",
            "vernon moving and storage",
            "moving companies mount vernon wa",
            "mount vernon moving companies",
            "mount vernon movers",
            "moving vernon",
            "vernon moving & storage",
            "harlow moving mt vernon il"
          ],
          "aggregate_search_volume": 640,
          "average_cpc": 13.47,
          "average_competition": 0.38,
          "cluster_size": 15,
          "city": "Vernon"
        },
        {
          "primary": "movers vernon",
          "related": [
            "vernon county movers",
            "vernon movers"
          ],
          "aggregate_search_volume": 70,
          "average_cpc": 7.45,
          "average_competition": 0.25,
          "cluster_size": 3,
          "city": "Vernon"
        }
      ],
      "Centennial": [
        {
          "primary": "best neighborhoods in centennial co",
          "related": [
            "living in centennial co",
            "cost of living in centennial colorado",
            "living in centennial",
            "living in centennial colorado",
            "centennial denver co"
          ],
          "aggregate_search_volume": 580,
          "average_cpc": 0.24,
          "average_competition": 0.05,
          "cluster_size": 6,
          "city": "Centennial"
        },
        {
          "primary": "centennial movers",
          "related": [
            "movers centennial co"
          ],
          "aggregate_search_volume": 470,
          "average_cpc": 31.23,
          "average_competition": 0.35,
          "cluster_size": 2,
          "city": "Centennial"
        },
        {
          "primary": "centennial moving",
          "related": [
            "moving companies centennial co",
            "moving to centennial colorado",
            "centennial moving company"
          ],
          "aggregate_search_volume": 470,
          "average_cpc": 18.27,
          "average_competition": 0.34,
          "cluster_size": 4,
          "city": "Centennial"
        },
        {
          "primary": "is centennial colorado a good place to live",
          "related": [
            "centennial colorado cost of living"
          ],
          "aggregate_search_volume": 100,
          "average_cpc": 0,
          "average_competition": 0,
          "cluster_size": 2,
          "city": "Centennial"
        }
      ],
      "Hazel Dell North": [],
      "Cherry Park": [],
      "Buckman": [],
      "Northeast Portland": [],
      "Overlook": [],
      "Lacey": [
        {
          "primary": "movers lacey",
          "related": [
            "movers in lacey wa",
            "movers lacey wa",
            "movers lacey washington"
          ],
          "aggregate_search_volume": 560,
          "average_cpc": 17.72,
          "average_competition": 0.77,
          "cluster_size": 4,
          "city": "Lacey"
        },
        {
          "primary": "moving companies in lacey wa",
          "related": [
            "moving companies lacey wa"
          ],
          "aggregate_search_volume": 280,
          "average_cpc": 14.56,
          "average_competition": 0.75,
          "cluster_size": 2,
          "city": "Lacey"
        }
      ],
      "Klamath Falls": [],
      "Redmond": [],
      "Bend": [],
      "Boardman": [],
      "Cottage Grove": [],
      "Hermiston": [],
      "Silverton": [],
      "Corvallis": [],
      "Roseburg": [],
      "Salem": [],
      "Dallas": [],
      "Stayton": [],
      "Albany": [],
      "Ashland": [],
      "Irrigon": [],
      "La Grande": [],
      "Pendleton": [],
      "Keizer": [],
      "Umatilla": [],
      "Heppner": [],
      "Independence": [],
      "Central Point": [],
      "Medford": [],
      "Woodburn": [],
      "Grants Pass": [],
      "Springfield": [],
      "Eugene": [],
      "Ontario": [],
      "Pilot Rock": [],
      "St. Helens": [],
      "Lyle": [],
      "Columbia City": [],
      "Zigzag": [],
      "Underwood": [],
      "Dufur": [],
      "Maupin": [],
      "Wishram": [],
      "Vernonia": [],
      "Goldendale": [],
      "Klickitat": [],
      "Bingen": [],
      "Mount Hood Village": [],
      "Parkdale": [],
      "White Salmon": [],
      "North Bonneville": [],
      "Skamania": [],
      "Hood River": [],
      "Rhododendron": [],
      "The Dalles": [
        {
          "cluster_id": "The Dalles-0",
          "keywords": [
            "storage the dalles"
          ],
          "cluster_value_score": 923.1249656109151,
          "content_ideas": {
            "title": "Error: LLM call failed for storage the dalles",
            "content_angle": "N/A",
            "target_audience": "N/A",
            "key_questions": [
              "LLM call error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit.\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 30\nPlease retry in 46.056940304s. [violations {\n  quota_metric: \"generativelanguage.googleapis.com/generate_content_free_tier_requests\"\n  quota_id: \"GenerateRequestsPerMinutePerProjectPerModel-FreeTier\"\n  quota_dimensions {\n    key: \"model\"\n    value: \"gemini-2.0-flash-lite\"\n  }\n  quota_dimensions {\n    key: \"location\"\n    value: \"global\"\n  }\n  quota_value: 30\n}\n, links {\n  description: \"Learn more about Gemini API quotas\"\n  url: \"https://ai.google.dev/gemini-api/docs/rate-limits\"\n}\n, retry_delay {\n  seconds: 46\n}\n]"
            ]
          },
          "title": "Storage The Dalles Services: Your Local Experts"
        }
      ],
      "Carson": [
        {
          "cluster_id": "Carson-0",
          "keywords": [
            "storage carson"
          ],
          "cluster_value_score": 20970.87710526585,
          "content_ideas": {
            "title": "Error: LLM call failed for storage carson",
            "content_angle": "N/A",
            "target_audience": "N/A",
            "key_questions": [
              "LLM call error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit.\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 30\nPlease retry in 45.51303081s. [violations {\n  quota_metric: \"generativelanguage.googleapis.com/generate_content_free_tier_requests\"\n  quota_id: \"GenerateRequestsPerMinutePerProjectPerModel-FreeTier\"\n  quota_dimensions {\n    key: \"model\"\n    value: \"gemini-2.0-flash-lite\"\n  }\n  quota_dimensions {\n    key: \"location\"\n    value: \"global\"\n  }\n  quota_value: 30\n}\n, links {\n  description: \"Learn more about Gemini API quotas\"\n  url: \"https://ai.google.dev/gemini-api/docs/rate-limits\"\n}\n, retry_delay {\n  seconds: 45\n}\n]"
            ]
          },
          "title": "Storage Carson Services: Your Local Experts"
        }
      ],
      "Wilsonville": [
        {
          "cluster_id": "Wilsonville-0",
          "keywords": [
            "wilsonville movers"
          ],
          "cluster_value_score": 1648.0850938425285,
          "content_ideas": {
            "title": "Stress-Free Moving in Wilsonville: Your Guide to a Smooth Transition",
            "content_angle": "Providing a comprehensive guide for residents planning a move in Wilsonville, emphasizing ease of the moving process, and showcasing the benefits of hiring professional movers.",
            "target_audience": "Homeowners and renters in Wilsonville, Oregon, planning a local move and seeking a reliable and efficient moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Wilsonville?",
              "Why should I hire professional Wilsonville movers instead of doing it myself?",
              "What services do professional movers in Wilsonville typically offer?",
              "How much does it cost to hire movers in Wilsonville, and how can I get an accurate quote?",
              "How can I prepare for my move to ensure a smooth and efficient process?"
            ]
          },
          "title": "Wilsonville Movers: Top-Rated Moving Services & Free Quotes"
        }
      ],
      "Rainier": [
        {
          "cluster_id": "Rainier-0",
          "keywords": [
            "rainier moving company"
          ],
          "cluster_value_score": 906.7856949826288,
          "content_ideas": {
            "title": "Moving to Rainier, WA? Your Complete Guide to a Smooth Move with Strongman Movers",
            "content_angle": "A comprehensive guide providing valuable information and tips for individuals and families planning a move to Rainier, WA, emphasizing the benefits of hiring a professional moving company like Strongman Movers.",
            "target_audience": "Individuals and families residing in or planning to move to Rainier, WA, who are seeking a reliable and professional moving service.",
            "key_questions": [
              "What are the key considerations when planning a move to Rainier, WA?",
              "Why should I hire a professional moving company, and what are the benefits of choosing Strongman Movers?",
              "How much does it typically cost to move within or to Rainier, WA, and what factors influence the price?",
              "What services does Strongman Movers offer, and how can they help with my specific moving needs?",
              "What steps can I take to prepare for my move and ensure a smooth and stress-free experience?"
            ]
          },
          "title": "Rainier Moving Company: Your Seamless Seattle Relocation Experts"
        }
      ],
      "Vancouver": [
        {
          "cluster_id": "Vancouver-0",
          "keywords": [
            "vancouver moving companies",
            "moving vancouver"
          ],
          "cluster_value_score": 31546.153846153844,
          "content_ideas": {
            "title": "Moving in Vancouver? Your Ultimate Guide to Choosing the Right Mover (2024)",
            "content_angle": "A comprehensive guide providing practical advice and tips for Vancouver residents looking to hire a moving company, focusing on key considerations like cost, reliability, and service offerings.",
            "target_audience": "Vancouver residents planning a local move, particularly those seeking a stress-free and reliable moving experience, with a budget of approximately $1200.",
            "key_questions": [
              "How much does it cost to hire movers in Vancouver, and what factors influence the price?",
              "What should I look for when choosing a reputable moving company in Vancouver?",
              "What services do Vancouver moving companies typically offer (packing, storage, etc.)?",
              "How can I prepare for my move to ensure a smooth and efficient process?",
              "What are the best tips for avoiding moving scams and protecting my belongings?"
            ]
          },
          "title": "Vancouver Moving Companies: Top-Rated Movers & Services"
        },
        {
          "cluster_id": "Vancouver-1",
          "keywords": [
            "movers vancouver",
            "best movers vancouver",
            "local movers vancouver"
          ],
          "cluster_value_score": 21030.769262911064,
          "content_ideas": {
            "title": "Moving in Vancouver? Your Guide to the Best Movers & a Stress-Free Relocation",
            "content_angle": "A comprehensive guide comparing top Vancouver movers, offering tips for a smooth move, and highlighting value for money.",
            "target_audience": "Vancouver residents planning a local move or relocating to the city, seeking reliable and trustworthy moving services, and looking for cost-effective solutions.",
            "key_questions": [
              "What are the top-rated moving companies in Vancouver, and what services do they offer?",
              "How can I compare moving quotes and ensure I'm getting a fair price?",
              "What steps can I take to prepare for a move and minimize stress?",
              "What are the average costs associated with moving in Vancouver?",
              "How do I choose the right mover for my specific needs and budget, considering factors like distance, items, and packing needs?"
            ]
          },
          "title": "Vancouver Movers: Top-Rated Moving Companies & Services"
        }
      ],
      "Gresham": [
        {
          "cluster_id": "Gresham-0",
          "keywords": [
            "movers gresham"
          ],
          "cluster_value_score": 6474.3859378313355,
          "content_ideas": {
            "title": "Gresham Movers: Your Stress-Free Guide to a Smooth Relocation",
            "content_angle": "A comprehensive guide providing practical tips, cost considerations, and a step-by-step process for a successful move within Gresham.",
            "target_audience": "Homeowners and businesses in Gresham, Oregon, planning a local move and seeking a reliable and professional moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Gresham?",
              "How much does it typically cost to hire movers in Gresham?",
              "What factors should I consider when choosing a moving company in Gresham?",
              "How can I prepare for moving day to ensure a smooth process?",
              "What are the benefits of hiring professional movers versus DIY moving in Gresham?"
            ]
          },
          "title": "Gresham Movers: Top-Rated Moving Services & Free Quotes"
        },
        {
          "cluster_id": "Gresham-1",
          "keywords": [
            "gresham moving companies"
          ],
          "cluster_value_score": 6474.3859378313355,
          "content_ideas": {
            "title": "Moving in Gresham, OR? Your Guide to Stress-Free Relocation",
            "content_angle": "A comprehensive guide for residents of Gresham looking for moving services, highlighting the benefits of professional movers and providing tips for a smooth moving experience.",
            "target_audience": "Homeowners and renters in Gresham, OR, planning a local move who are seeking a reliable and efficient moving company.",
            "key_questions": [
              "What are the benefits of hiring professional moving companies in Gresham?",
              "How much does it cost to hire movers in Gresham, and what factors influence the price?",
              "How can I prepare for my move to ensure a smooth process?",
              "What should I look for when choosing a moving company in Gresham?",
              "How do I get a free, accurate moving quote?"
            ]
          },
          "title": "Gresham Moving Companies: Top-Rated Movers & Affordable Prices"
        }
      ],
      "Portland": [
        {
          "cluster_id": "Portland-0",
          "keywords": [
            "long distance movers portland",
            "local movers portland",
            "movers portland",
            "cheap movers portland",
            "commercial movers portland",
            "best movers portland",
            "furniture movers portland"
          ],
          "cluster_value_score": 22611.808113107865,
          "content_ideas": {
            "title": "Portland Long Distance Moving: Your Ultimate Guide to a Stress-Free Relocation",
            "content_angle": "Comprehensive guide for individuals and businesses planning a long-distance move to or from Portland, focusing on planning, cost-saving tips, and choosing the right movers, specifically highlighting the value and expertise provided by STRONGMANMOVER.com.",
            "target_audience": "Individuals and businesses in Portland, OR, and surrounding areas, planning a long-distance move. Specifically targeting those seeking reliable, professional moving services and are willing to invest in quality service.",
            "key_questions": [
              "How much does long-distance moving typically cost in Portland?",
              "What are the key steps involved in planning a long-distance move?",
              "How can I find reliable and affordable long-distance movers in Portland (and what should I look for)?",
              "What are the benefits of hiring professional movers vs. DIY options?",
              "How does STRONGMANMOVER.com simplify the long-distance moving process?"
            ]
          },
          "title": "Portland Long Distance Movers: Top-Rated Moving Companies"
        },
        {
          "cluster_id": "Portland-1",
          "keywords": [
            "moving portland",
            "portland moving companies"
          ],
          "cluster_value_score": 22455.319718485684,
          "content_ideas": {
            "title": "Moving to Portland: Your Ultimate Guide to a Smooth Transition",
            "content_angle": "Comprehensive guide for individuals and families planning a move to Portland, focusing on practical advice, cost considerations, and choosing the right moving company.",
            "target_audience": "Individuals and families planning a local or long-distance move to Portland, Oregon, seeking reliable information and moving resources.",
            "key_questions": [
              "What are the key steps involved in planning a move to Portland?",
              "How much does it cost to move within or to Portland?",
              "What factors should I consider when choosing Portland moving companies?",
              "What are the best neighborhoods to live in Portland?",
              "How can I prepare for my move to Portland to make the process easier?"
            ]
          },
          "title": "Moving to Portland: Your Ultimate Guide"
        }
      ],
      "Hillsboro": [
        {
          "cluster_id": "Hillsboro-0",
          "keywords": [
            "movers hillsboro"
          ],
          "cluster_value_score": 12270.000091418624,
          "content_ideas": {
            "title": "Hillsboro Moving Guide: Expert Tips for a Stress-Free Move with STRONGMAN MOVERS",
            "content_angle": "Provide a comprehensive guide for people planning a move in Hillsboro, Oregon, emphasizing the benefits of professional moving services, particularly from a company like STRONGMAN MOVERS, and offering practical advice to reduce stress.",
            "target_audience": "Individuals and families residing in or planning to move to Hillsboro, OR, who are seeking professional moving services.",
            "key_questions": [
              "What are the key steps to planning a move in Hillsboro?",
              "How can I choose the best moving company in Hillsboro?",
              "What services does STRONGMAN MOVERS offer to make my move easier?",
              "What are the average costs associated with moving in Hillsboro, and how can I budget effectively?",
              "How can I prepare my belongings for a move to Hillsboro?"
            ]
          },
          "title": "Hillsboro Movers: Expert Moving Services & Affordable Rates"
        },
        {
          "cluster_id": "Hillsboro-1",
          "keywords": [
            "hillsboro moving companies"
          ],
          "cluster_value_score": 10337.391197190167,
          "content_ideas": {
            "title": "Hillsboro Moving Companies: Choosing the Right Movers for Your Stress-Free Relocation",
            "content_angle": "A comprehensive guide to selecting the best moving company in Hillsboro, OR, focusing on factors like experience, pricing, services offered, and customer reviews to ensure a smooth and successful move, tailored for those with an average job value of $1200.",
            "target_audience": "Homeowners and renters in the Hillsboro, OR area planning a local or long-distance move, particularly those who value quality service and are willing to invest in a reliable moving company.",
            "key_questions": [
              "What are the key factors to consider when hiring Hillsboro moving companies?",
              "How do I get accurate moving quotes and avoid hidden fees?",
              "What services should I expect from a reputable moving company?",
              "How can I compare different Hillsboro moving companies and read customer reviews?",
              "What are the benefits of hiring professional movers versus DIY moving?"
            ]
          },
          "title": "Hillsboro Moving Companies: Top-Rated Movers & Affordable Prices"
        }
      ],
      "Beaverton": [
        {
          "cluster_id": "Beaverton-0",
          "keywords": [
            "movers beaverton"
          ],
          "cluster_value_score": 27128.570389078628,
          "content_ideas": {
            "title": "Stress-Free Moving in Beaverton: Your Ultimate Guide to Choosing the Right Movers",
            "content_angle": "A comprehensive guide providing Beaverton residents with everything they need to know to find reliable, professional movers and ensure a smooth relocation experience.",
            "target_audience": "Homeowners and renters in Beaverton, Oregon, planning a local move or relocation, and seeking a trusted moving company.",
            "key_questions": [
              "What should I look for when choosing movers in Beaverton?",
              "How much does it cost to hire movers in Beaverton, and what factors influence the price?",
              "What services do movers typically offer, and which ones do I need?",
              "How can I prepare for my move to make it easier for the movers?",
              "What are some common moving scams, and how can I avoid them?"
            ]
          },
          "title": "Beaverton Movers: Top-Rated Moving Services & Free Quotes"
        },
        {
          "cluster_id": "Beaverton-1",
          "keywords": [
            "beaverton moving companies"
          ],
          "cluster_value_score": 32945.45552730563,
          "content_ideas": {
            "title": "Choosing the Best Beaverton Moving Company: A Guide to Stress-Free Relocation",
            "content_angle": "A comprehensive guide providing practical advice and tips for residents of Beaverton, OR, on how to choose a reliable and affordable moving company. This includes what to look for, how to avoid scams, and how to prepare for moving day.",
            "target_audience": "Homeowners and renters in Beaverton, OR, planning a local or long-distance move, with a focus on those looking for quality and value, and potentially willing to spend around $1200 on their move.",
            "key_questions": [
              "What are the key factors to consider when choosing a moving company in Beaverton?",
              "How can I get accurate moving quotes and avoid hidden fees?",
              "What services do Beaverton moving companies typically offer, and which are essential for me?",
              "How can I prepare for moving day to ensure a smooth and efficient move?",
              "What questions should I ask a moving company before hiring them?"
            ]
          },
          "title": "Top Beaverton Moving Companies: Get a Free Quote Today!"
        }
      ],
      "Lake Oswego": [
        {
          "cluster_id": "Lake Oswego-0",
          "keywords": [
            "movers lake oswego"
          ],
          "cluster_value_score": 1958.9610632235176,
          "content_ideas": {
            "title": "Lake Oswego Moving Guide: Expert Tips for a Smooth Relocation",
            "content_angle": "Provide a comprehensive guide to moving in Lake Oswego, focusing on local expertise and value-added services offered by a reputable moving company.",
            "target_audience": "Homeowners and renters in Lake Oswego planning a local or long-distance move, looking for professional moving services.",
            "key_questions": [
              "How do I choose the right moving company in Lake Oswego?",
              "What services do professional movers offer to make my move easier?",
              "What are the typical costs associated with moving in Lake Oswego?",
              "How can I prepare for my move to ensure a smooth transition?",
              "What are the benefits of hiring local movers versus doing it myself?"
            ]
          },
          "title": "Lake Oswego Movers: Your Stress-Free Moving Solution"
        }
      ],
      "Sandy": [
        {
          "cluster_id": "Sandy-0",
          "keywords": [
            "movers sandy"
          ],
          "cluster_value_score": 786.0810608198564,
          "content_ideas": {
            "title": "Moving to Sandy, UT? Your Ultimate Guide to a Stress-Free Move (Strongman Mover's Secrets)",
            "content_angle": "A comprehensive guide providing practical tips, local insights, and expert advice for residents of Sandy, UT, planning a move. It positions Strongman Mover as the go-to local moving expert.",
            "target_audience": "Homeowners and renters in Sandy, UT, planning a local or long-distance move, and looking for reliable and professional moving services.",
            "key_questions": [
              "What are the key factors to consider when hiring movers in Sandy, UT?",
              "How can I prepare for a move to minimize stress and costs?",
              "What are the average moving costs in Sandy, and how can I get the best value?",
              "What are the benefits of choosing a local moving company like Strongman Mover?",
              "What services does Strongman Mover offer to make my move easier?"
            ]
          },
          "title": "Sandy Movers: Find the Best Moving Company in Sandy, Utah"
        }
      ],
      "Oregon City": [
        {
          "cluster_id": "Oregon City-0",
          "keywords": [
            "movers oregon city"
          ],
          "cluster_value_score": 2912.7396118710285,
          "content_ideas": {
            "title": "Oregon City Moving Guide: Your Stress-Free Move with STRONGMANMOVER",
            "content_angle": "A comprehensive guide providing practical tips and advice for a smooth move in Oregon City, specifically highlighting the services offered by STRONGMANMOVER and addressing common moving concerns.",
            "target_audience": "Homeowners and renters in Oregon City planning a local move or looking for professional moving services.",
            "key_questions": [
              "How do I choose the right moving company in Oregon City?",
              "What services do professional movers offer and which ones do I need?",
              "How can I prepare for a move to minimize stress and potential damage?",
              "How much does it cost to move in Oregon City, and what factors affect the price?",
              "Why choose STRONGMANMOVER for your Oregon City move?"
            ]
          },
          "title": "Oregon City Movers: Find Top-Rated Moving Companies"
        }
      ],
      "Stevenson": [
        {
          "cluster_id": "Stevenson-0",
          "keywords": [
            "stevenson moving"
          ],
          "cluster_value_score": 7815.85354491191,
          "content_ideas": {
            "title": "Moving to Stevenson? Your Ultimate Guide to a Stress-Free Relocation",
            "content_angle": "A comprehensive guide providing practical advice, local insights, and expert tips for a smooth move to Stevenson, tailored for families and individuals.",
            "target_audience": "Families, individuals, and professionals planning a move to the Stevenson area, seeking a reliable and stress-free moving experience.",
            "key_questions": [
              "What are the key considerations when planning a move to Stevenson?",
              "How can I find reliable and affordable movers in the Stevenson area?",
              "What services do professional movers typically offer, and how do I choose the right ones?",
              "What are some tips for packing, unpacking, and organizing your belongings for a move?",
              "What are the average costs associated with moving to Stevenson, and how can I budget effectively?"
            ]
          },
          "title": "Stevenson Moving: Your Stress-Free Relocation Solution"
        }
      ],
      "Tigard": [
        {
          "cluster_id": "Tigard-0",
          "keywords": [
            "movers tigard"
          ],
          "cluster_value_score": 6831.1579118807895,
          "content_ideas": {
            "title": "Tigard Moving Made Easy: Your Guide to a Stress-Free Move with [Your Company Name]",
            "content_angle": "Providing a comprehensive guide for residents of Tigard, Oregon, covering all aspects of a local move, emphasizing ease, and highlighting the benefits of professional movers.",
            "target_audience": "Homeowners and renters in Tigard, OR, planning a local move and seeking a reliable and efficient moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Tigard?",
              "How can professional movers in Tigard streamline the moving process and reduce stress?",
              "What services do Tigard moving companies offer, and how do I choose the right one for my needs?",
              "What are the typical costs associated with moving in Tigard, and how can I get an accurate estimate?",
              "How can I prepare my belongings for a move to ensure their safety and minimize potential damage?"
            ]
          },
          "title": "Tigard Movers: Get a Stress-Free Move Today"
        }
      ]
    },
    "arbitrageData": {
      "customer_domain_authority": {
        "domain": "https://www.STRONGMANMOVER.com",
        "keyword_count_top10": 0,
        "traffic": 0
      },
      "customer_domain": "https://www.STRONGMANMOVER.com",
      "selected_top_4_clusters": [
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "movers beaverton",
          "related": [
            "movers in beaverton"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "movers in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 3800,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 48108,
          "value_score": 48108,
          "long_term_arbitrage_score_cluster": 152626.9035532995,
          "llm_content_ideas": {
            "title": "Beaverton Movers: Your Guide to a Seamless Move in Beaverton, OR",
            "content_angle": "Local Guide",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Beaverton, OR",
            "key_questions": [
              "How do I find reliable movers in Beaverton?",
              "What moving services do Beaverton movers offer?",
              "How much do movers in Beaverton cost?",
              "What should I pack and prepare before the movers arrive?",
              "How can I avoid common moving scams?"
            ],
            "average_estimated_time_to_rank_weeks": 17.6
          }
        },
        {
          "primary": "moving company in beaverton",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "moving company in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 1900,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 24054,
          "value_score": 24054,
          "long_term_arbitrage_score_cluster": 76313.45177664974
        },
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "movers beaverton",
          "related": [
            "movers in beaverton"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "movers in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 3800,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 48108,
          "value_score": 48108,
          "long_term_arbitrage_score_cluster": 152626.9035532995,
          "llm_content_ideas": {
            "title": "Beaverton Movers: Your Guide to a Seamless Move in Beaverton, OR",
            "content_angle": "Local Guide",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Beaverton, OR",
            "key_questions": [
              "How do I find reliable movers in Beaverton?",
              "What moving services do Beaverton movers offer?",
              "How much do movers in Beaverton cost?",
              "What should I pack and prepare before the movers arrive?",
              "How can I avoid common moving scams?"
            ],
            "average_estimated_time_to_rank_weeks": 17.6
          }
        },
        {
          "primary": "moving company in beaverton",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "moving company in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 1900,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 24054,
          "value_score": 24054,
          "long_term_arbitrage_score_cluster": 76313.45177664974
        },
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "movers beaverton",
          "related": [
            "movers in beaverton"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "movers in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 3800,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 48108,
          "value_score": 48108,
          "long_term_arbitrage_score_cluster": 152626.9035532995,
          "llm_content_ideas": {
            "title": "Beaverton Movers: Your Guide to a Seamless Move in Beaverton, OR",
            "content_angle": "Local Guide",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Beaverton, OR",
            "key_questions": [
              "How do I find reliable movers in Beaverton?",
              "What moving services do Beaverton movers offer?",
              "How much do movers in Beaverton cost?",
              "What should I pack and prepare before the movers arrive?",
              "How can I avoid common moving scams?"
            ],
            "average_estimated_time_to_rank_weeks": 17.6
          }
        },
        {
          "primary": "moving company in beaverton",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "moving company in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 1900,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 24054,
          "value_score": 24054,
          "long_term_arbitrage_score_cluster": 76313.45177664974
        },
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "movers beaverton",
          "related": [
            "movers in beaverton"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "movers in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 3800,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 48108,
          "value_score": 48108,
          "long_term_arbitrage_score_cluster": 152626.9035532995,
          "llm_content_ideas": {
            "title": "Beaverton Movers: Your Guide to a Seamless Move in Beaverton, OR",
            "content_angle": "Local Guide",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Beaverton, OR",
            "key_questions": [
              "How do I find reliable movers in Beaverton?",
              "What moving services do Beaverton movers offer?",
              "How much do movers in Beaverton cost?",
              "What should I pack and prepare before the movers arrive?",
              "How can I avoid common moving scams?"
            ],
            "average_estimated_time_to_rank_weeks": 17.6
          }
        },
        {
          "primary": "moving company in beaverton",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "moving company in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 1900,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 24054,
          "value_score": 24054,
          "long_term_arbitrage_score_cluster": 76313.45177664974
        },
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "movers beaverton",
          "related": [
            "movers in beaverton"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "movers in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            }
          ],
          "aggregate_search_volume": 3800,
          "average_competition": 0.27,
          "average_velocity": 86,
          "average_cpc": 12.66,
          "average_t_mid_base": 17.6,
          "base_value_score": 48108,
          "value_score": 48108,
          "long_term_arbitrage_score_cluster": 152626.9035532995,
          "llm_content_ideas": {
            "title": "Beaverton Movers: Your Guide to a Seamless Move in Beaverton, OR",
            "content_angle": "Local Guide",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Beaverton, OR",
            "key_questions": [
              "How do I find reliable movers in Beaverton?",
              "What moving services do Beaverton movers offer?",
              "How much do movers in Beaverton cost?",
              "What should I pack and prepare before the movers arrive?",
              "How can I avoid common moving scams?"
            ],
            "average_estimated_time_to_rank_weeks": 17.6
          }
        },
        {
          "primary": "moving company in beaverton",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "moving company in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.<write_to_file>
<path>function_specifications.md</path>
<content>
# Function Specifications for getPageMetadata

This document outlines the specifications for various data points and chart types used within the `getPageMetadata` function.

## Chart Data Specifications

### `localCompetitorsList` (List)

This chart type provides a list of local competitors with their review data.

```json
{
  "requestId": "localCompetitorsList",
  "data": [
    { "business_name": "Competitor 1", "number_of_reviews": 120, "stars": 4.5 },
    { "business_name": "Competitor 2", "number_of_reviews": 85, "stars": 3.8 },
    { "business_name": "Competitor 3", "number_of_reviews": 200, "stars": 4.9 }
  ]
}
```

### `arbitrageScatterChart` (Scatter Chart)

This chart type visualizes arbitrage opportunities as a scatter plot.

```json
{
  "requestId": "arbitrageScatterChart",
  "title": "Arbitrage Opportunity",
  "xAxisLabel": "Cost",
  "yAxisLabel": "Value",
  "xAxisMin": 0,
  "xAxisMax": 100,
  "yAxisMin": 0,
  "yAxisMax": 100,
  "secondXAxisGridLine": 50,
  "secondYAxisGridLine": 50,
  "data": [
    { "x": 10, "y": 20, "id": "point1" },
    { "x": 30, "y": 70, "id": "point2" },
    { "x": 60, "y": 40, "id": "point3" }
  ]
}
```

## Frontend Tokens to Resolve

The `getPageMetadata` function should process these tokens within the `contentArray` strings and replace them with their resolved values before returning the `content` to the frontend.

### Tokens related to `contact` information:

- `{{contact.raw_contact.name}}`
- `{{contact.business_name}}`
- `{{contact.raw_contact.city}}`
- `{{contact.raw_contact.category}}`

### Tokens related to `lead_serp` (SEO analysis) data:

- `{{lead_serp.estimated_revenue_range[0]}}`
- `{{lead_serp.estimated_revenue_range[1]}}`
- `{{lead_serp.total_keywords_in_pool}}`
- `{{lead_serp.visit_projection_range[0]}}`
- `{{lead_serp.visit_projection_range[1]}}`
- `{{lead_serp.agr_top_4_roi[0]}}`
- `{{lead_serp.agr_top_4_roi[1]}}`
- `{{lead_serp.high_value_keywords_summary_html}}`
- `{{lead_serp.potential_roi_summary_html}}`
- `{{lead_serp.strategic_opportunity_prioritization_html}}`

## Example Arbitrage Data from Firestore

```json
[
  {
    "examplePhrases": [],
    "parent": null,
    "aliases": [],
    "displayName": "",
    "description": "",
    "createdBy": "llm_fallback",
    "location": "portland-or",
    "id": "movers",
    "suggestedKeywords": [
      "moving services",
      "movers near me",
      "moving cost",
      "24 hour movers",
      "residential moving",
      "commercial moving",
      "best movers",
      "local movers",
      "long distance moving",
      "moving company",
      "affordable movers",
      "moving quote",
      "emergency movers",
      "same day moving",
      "packing services",
      "loading services",
      "unloading services",
      "junk removal",
      "cleaning services",
      "apartment movers",
      "office movers",
      "piano movers",
      "safe movers",
      "hot tub movers",
      "moving estimate",
      "professional movers",
      "licensed movers",
      "cheap movers",
      "top rated movers",
      "moving labor",
      "moving assistance",
      "last minute movers",
      "weekend movers",
      "moving rates",
      "moving prices",
      "moving specialists",
      "mover services",
      "moving services near me",
      "moving company cost",
      "affordable moving services",
      "best moving services",
      "top rated moving services",
      "licensed moving services",
      "professional moving services",
      "expert moving services",
      "commercial cleaning services",
      "residential cleaning services",
      "junk removal services",
      "packing and unpacking"
    ],
    "serviceRadiusCities": [
      "Portland",
      "Vancouver",
      "Gresham",
      "Hillsboro",
      "Beaverton",
      "Happy Valley",
      "Lake Oswego",
      "Oregon City",
      "Milwaukie",
      "Tigard",
      "Troutdale",
      "Fairview",
      "Wood Village",
      "Clackamas",
      "Wilsonville",
      "Sherwood",
      "Canby",
      "Forest Grove",
      "Cornelius",
      "Banks",
      "North Plains",
      "Gaston",
      "St. Helens",
      "Scappoose",
      "Columbia City",
      "Rainier",
      "Vernonia",
      "Estacada",
      "Sandy",
      "Welches",
      "Government Camp",
      "Brightwood",
      "Rhododendron",
      "Zigzag",
      "Mount Hood Village",
      "Parkdale",
      "Hood River",
      "The Dalles",
      "White Salmon",
      "Bingen",
      "Stevenson",
      "Carson",
      "North Bonneville",
      "Skamania",
      "Underwood",
      "Lyle",
      "Goldendale",
      "Klickitat",
      "Wishram",
      "Dufur",
      "Maupin"
    ],
    "confidence": 0.98,
    "avgJobAmount": 1200,
    "lastUpdated": "2025-10-25T12:29:00.057836+00:00",
    "suggestedAt": "2025-10-25T12:29:00.057836+00:00",
    "cityClusters": {
      "Newberg": [],
      "Estacada": [],
      "Washougal": [],
      "Mt Tabor": [],
      "McMinnville": [],
      "Ridgefield": [],
      "Southwest Hills": [],
      "South Portland": [],
      "Raleigh Hills": [],
      "Oak Grove": [],
      "Forest Heights": [],
      "Woodlawn": [],
      "Neskowin": [],
      "North Plains": [],
      "Rockcreek": [],
      "Garden Home-Whitford": [],
      "Manzanita": [],
      "Gaston": [],
      "Arch Cape": [],
      "Sunnyside": [],
      "Bay City": [],
      "Hosford-Abernethy": [],
      "Banks": [],
      "Maywood Park": [],
      "Eastmoreland": [],
      "Carlton": [],
      "Wheeler": [],
      "Hayhurst": [],
      "Troutdale": [],
      "Hillsdale": [],
      "Nehalem": [],
      "Progress": [],
      "Gearhart": [],
      "Powellhurst-Fischer": [],
      "Cornelius": [],
      "Forest Grove": [],
      "Multnomah": [],
      "Lloyd District": [],
      "Pacific City": [],
      "St Johns": [],
      "Raleigh Park": [],
      "Alberta": [],
      "Charbonneau": [],
      "Rivergrove": [],
      "Bull Mountain": [],
      "Seaside": [],
      "Cedar Hills": [],
      "Rockaway Beach": [],
      "Fairview": [],
      "West Linn": [],
      "Pleasant Home": [],
      "Cannon Beach": [],
      "Clackamas": [],
      "Milwaukie": [],
      "Scappoose": [],
      "Concordia": [],
      "Sellwood-Moreland": [],
      "Welches": [],
      "Dundee": [],
      "Downtown": [],
      "Barlow": [],
      "King City": [],
      "Cedar Mill": [],
      "Svensen": [],
      "Brightwood": [],
      "Richmond": [],
      "Alameda": [],
      "Damascus": [],
      "Yamhill": [],
      "Dayton": [],
      "Donald": [],
      "West Haven-Sylvan": [],
      "Garibaldi": [],
      "Wood Village": [],
      "Astoria": [],
      "Burnside": [],
      "Goose Hollow": [],
      "Eastport": [],
      "Ardenwald-Johnson Creek": [],
      "Brentwood-Darlington": [],
      "Linnton": [],
      "Council Crest": [],
      "Tualatin": [],
      "Oceanside": [],
      "Irvington": [],
      "Boring": [],
      "Tillamook": [],
      "South Waterfront": [],
      "Sherwood": [],
      "Happy Valley": [],
      "Battle Ground": [],
      "Government Camp": [],
      "Sauvie Island": [],
      "Laurelhurst": [],
      "Camas": [],
      "Hubbard": [],
      "Oak Hills": [],
      "Barbur": [],
      "Northwest District": [],
      "Mount Vista": [],
      "Rose City Park": [],
      "Stafford": [
        {
          "primary": "moving companies in stafford va",
          "related": [
            "moving company stafford va",
            "stafford va movers",
            "stafford va moving companies",
            "movers in stafford va",
            "moving companies stafford va",
            "movers stafford va",
            "moving companies stafford",
            "moving company stafford",
            "stafford moving company",
            "moving companies in stafford"
          ],
          "aggregate_search_volume": 1190,
          "average_cpc": 18.06,
          "average_competition": 0.75,
          "cluster_size": 11,
          "city": "Stafford"
        },
        {
          "primary": "stafford movers",
          "related": [],
          "aggregate_search_volume": 70,
          "average_cpc": 7.51,
          "average_competition": 0.57,
          "cluster_size": 1,
          "city": "Stafford"
        }
      ],
      "Cascade Park": [],
      "Roseway": [],
      "Portland Heights": [],
      "Aurora": [
        {
          "primary": "moving companies aurora",
          "related": [
            "moving companies aurora co",
            "aurora moving company",
            "moving companies in aurora colorado",
            "moving services aurora co",
            "moving company in aurora",
            "moving companies aurora colorado",
            "aurora co moving company",
            "moving company aurora",
            "moving companies in aurora",
            "aurora moving companies",
            "aurora co moving companies",
            "moving companies in aurora co",
            "moving company in aurora co",
            "moving company aurora co"
          ],
          "aggregate_search_volume": 19500,
          "average_cpc": 27.61,
          "average_competition": 0.54,
          "cluster_size": 15,
          "city": "Aurora"
        },
        {
          "primary": "movers aurora",
          "related": [
            "movers aurora co",
            "movers in aurora colorado",
            "aurora co movers",
            "aurora colorado movers",
            "movers in aurora co",
            "movers in aurora",
            "aurora movers"
          ],
          "aggregate_search_volume": 10400,
          "average_cpc": 27.43,
          "average_competition": 0.54,
          "cluster_size": 8,
          "city": "Aurora"
        }
      ],
      "Downtown Portland": [],
      "Reed": [],
      "King": [
        {
          "primary": "king movers",
          "related": [
            "king movers company",
            "king of movers",
            "king movers dallas",
            "king movers and storage"
          ],
          "aggregate_search_volume": 2570,
          "average_cpc": 18.05,
          "average_competition": 0.39,
          "cluster_size": 5,
          "city": "King"
        },
        {
          "primary": "king moving",
          "related": [
            "king moving co",
            "king moving company",
            "moving king",
            "king moving company dallas",
            "king moving company reviews",
            "the moving king",
            "king moving services",
            "king moving co reviews"
          ],
          "aggregate_search_volume": 2230,
          "average_cpc": 15.66,
          "average_competition": 0.23,
          "cluster_size": 9,
          "city": "King"
        },
        {
          "primary": "kings moving",
          "related": [
            "kings moving company",
            "kings moving services",
            "moving kings",
            "the moving kings",
            "moving kings review",
            "moving kings austin",
            "moving kings reviews",
            "the moving kings austin",
            "moving kings joshua cohen",
            "joshua cohen moving kings",
            "moving kings by joshua cohen",
            "moving kings pa"
          ],
          "aggregate_search_volume": 2050,
          "average_cpc": 13.19,
          "average_competition": 0.26,
          "cluster_size": 14,
          "city": "King"
        },
        {
          "primary": "king mover",
          "related": [],
          "aggregate_search_volume": 1300,
          "average_cpc": 14.96,
          "average_competition": 0.19,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "king's moving",
          "related": [],
          "aggregate_search_volume": 880,
          "average_cpc": 3.22,
          "average_competition": 0.06,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "kings movers",
          "related": [],
          "aggregate_search_volume": 590,
          "average_cpc": 11.02,
          "average_competition": 0.44,
          "cluster_size": 1,
          "city": "King"
        },
        {
          "primary": "movingkings",
          "related": [],
          "aggregate_search_volume": 260,
          "average_cpc": 12.48,
          "average_competition": 0.23,
          "cluster_size": 1,
          "city": "King"
        }
      ],
      "Kern": [],
      "Crestwood": [],
      "Eliot": [],
      "Gladstone": [],
      "Montavilla": [],
      "Hayward Field": [],
      "Kenton": [],
      "Hockinson": [],
      "Salmon Creek": [],
      "Mill Park": [],
      "Felida": [],
      "Pearl District": [],
      "Heisley": [],
      "Neighborhood": [
        {
          "primary": "neighborhood moving",
          "related": [
            "neighborhood moving company",
            "neighborhood moving and storage"
          ],
          "aggregate_search_volume": 430,
          "average_cpc": 11.39,
          "average_competition": 0.33,
          "cluster_size": 3,
          "city": "Neighborhood"
        },
        {
          "primary": "neighborhood movers",
          "related": [],
          "aggregate_search_volume": 110,
          "average_cpc": 27.64,
          "average_competition": 0.49,
          "cluster_size": 1,
          "city": "Neighborhood"
        },
        {
          "primary": "best neighborhoods in centennial co",
          "related": [],
          "aggregate_search_volume": 20,
          "average_cpc": 1.44,
          "average_competition": 0.08,
          "cluster_size": 1,
          "city": "Neighborhood"
        }
      ],
      "Foster-Powell": [],
      "Hollywood": [
        {
          "primary": "moving companies north hollywood",
          "related": [
            "moving company north hollywood",
            "moving companies in north hollywood",
            "movers in north hollywood",
            "movers in north hollywood ca",
            "movers north hollywood",
            "moving companies in north hollywood ca",
            "north hollywood movers",
            "movers north hollywood ca",
            "north hollywood moving company",
            "moving company north hollywood ca",
            "moving company hollywood",
            "hollywood moving companies",
            "hollywood moving company",
            "moving companies hollywood ca",
            "moving companies in hollywood fl",
            "moving companies in hollywood florida",
            "moving company west hollywood",
            "west hollywood moving company",
            "moving companies in hollywood",
            "moving companies west hollywood",
            "west hollywood moving companies"
          ],
          "aggregate_search_volume": 18920,
          "average_cpc": 22.44,
          "average_competition": 0.32,
          "cluster_size": 22,
          "city": "Hollywood"
        },
        {
          "primary": "movers hollywood",
          "related": [
            "hollywood movers",
            "movers in hollywood",
            "movers hollywood ca",
            "movers west hollywood",
            "west hollywood movers",
            "movers in west hollywood"
          ],
          "aggregate_search_volume": 2700,
          "average_cpc": 22.31,
          "average_competition": 0.43,
          "cluster_size": 7,
          "city": "Hollywood"
        }
      ],
      "Russell": [],
      "Holladay Park": [],
      "West Slope": [],
      "Marquam Hill": [],
      "University Park": [],
      "Cathedral Park": [],
      "Sifton": [],
      "Piedmont": [],
      "Aloha": [
        {
          "primary": "aloha moving",
          "related": [
            "aloha moving company",
            "aloha moving san diego",
            "aloha isle moving"
          ],
          "aggregate_search_volume": 450,
          "average_cpc": 8.27,
          "average_competition": 0.26,
          "cluster_size": 4,
          "city": "Aloha"
        },
        {
          "primary": "aloha movers",
          "related": [
            "aloha movers san diego",
            "aloha movers hawaii",
            "aloha island movers kauai",
            "aloha island movers"
          ],
          "aggregate_search_volume": 310,
          "average_cpc": 14.07,
          "average_competition": 0.34,
          "cluster_size": 5,
          "city": "Aloha"
        }
      ],
      "Cully": [],
      "East Columbia": [],
      "Minnehaha": [],
      "Brooklyn": [
        {
          "primary": "moving brooklyn",
          "related": [
            "moving company brooklyn",
            "moving companies brooklyn ny",
            "moving companies brooklyn new york",
            "moving services in brooklyn",
            "brooklyn new york moving companies",
            "moving company brooklyn ny",
            "moving companies in brooklyn new york",
            "moving company brooklyn new york",
            "brooklyn moving service",
            "brooklyn moving company",
            "moving service brooklyn",
            "moving companies brooklyn",
            "brooklyn moving services",
            "moving brooklyn ny",
            "moving in brooklyn ny",
            "moving company in brooklyn new york",
            "brooklyn ny moving company",
            "moving company in brooklyn",
            "moving services brooklyn ny",
            "moving service brooklyn ny",
            "moving company in brooklyn ny",
            "moving in brooklyn",
            "best moving company brooklyn",
            "best moving companies brooklyn",
            "best brooklyn moving company",
            "brooklyn moving",
            "best moving companies in brooklyn",
            "best moving company in brooklyn",
            "local moving companies brooklyn",
            "local moving company brooklyn"
          ],
          "aggregate_search_volume": 370350,
          "average_cpc": 35.75,
          "average_competition": 0.17,
          "cluster_size": 31,
          "city": "Brooklyn"
        },
        {
          "primary": "mover brooklyn ny",
          "related": [
            "movers in brooklyn ny",
            "movers brooklyn ny",
            "brooklyn ny movers",
            "local movers brooklyn ny",
            "best movers in brooklyn ny"
          ],
          "aggregate_search_volume": 73630,
          "average_cpc": 31.24,
          "average_competition": 0.15,
          "cluster_size": 6,
          "city": "Brooklyn"
        },
        {
          "primary": "movers brooklyn new york",
          "related": [
            "movers brooklyn",
            "brooklyn movers",
            "movers in brooklyn nyc",
            "local movers brooklyn",
            "best movers brooklyn",
            "best movers in brooklyn"
          ],
          "aggregate_search_volume": 69790,
          "average_cpc": 34.89,
          "average_competition": 0.17,
          "cluster_size": 7,
          "city": "Brooklyn"
        }
      ],
      "Mulino": [],
      "Hazel Dell North": [],
      "Bridgeton": [],
      "Sloan's Lake": [],
      "Mount Tabor": [],
      "Five Corners": [],
      "Sylvan-Terwilliger": [],
      "Powellhurst-Gilbert": [],
      "Madison South": [],
      "Canby": [],
      "Homestead": [
        {
          "primary": "movers homestead florida",
          "related": [
            "moving companies homestead florida",
            "movers homestead fl",
            "movers in homestead florida",
            "movers in homestead fl",
            "moving companies in homestead florida",
            "movers homestead"
          ],
          "aggregate_search_volume": 950,
          "average_cpc": 28.09,
          "average_competition": 0.91,
          "cluster_size": 7,
          "city": "Homestead"
        },
        {
          "primary": "moving company homestead fl",
          "related": [
            "moving company homestead",
            "moving companies homestead fl",
            "homestead moving company",
            "moving companies homestead"
          ],
          "aggregate_search_volume": 850,
          "average_cpc": 25.97,
          "average_competition": 0.9,
          "cluster_size": 5,
          "city": "Homestead"
        }
      ],
      "Parkrose": [],
      "Lents": [],
      "Vernon": [
        {
          "primary": "vernon bc weather",
          "related": [
            "vernon bc",
            "vernon bc canada",
            "where is vernon bc"
          ],
          "aggregate_search_volume": 15640,
          "average_cpc": 0.94,
          "average_competition": 0.01,
          "cluster_size": 4,
          "city": "Vernon"
        },
        {
          "primary": "vernon canada",
          "related": [
            "vernon british columbia canada",
            "vernon in canada",
            "where is vernon canada"
          ],
          "aggregate_search_volume": 4840,
          "average_cpc": 2.96,
          "average_competition": 0.01,
          "cluster_size": 4,
          "city": "Vernon"
        },
        {
          "primary": "british columbia vernon",
          "related": [
            "vernon british columbia",
            "city of vernon british columbia"
          ],
          "aggregate_search_volume": 4800,
          "average_cpc": 1.21,
          "average_competition": 0.03,
          "cluster_size": 3,
          "city": "Vernon"
        },
        {
          "primary": "vernon b c",
          "related": [],
          "aggregate_search_volume": 1900,
          "average_cpc": 2.83,
          "average_competition": 0.01,
          "cluster_size": 1,
          "city": "Vernon"
        },
        {
          "primary": "vernon canadá",
          "related": [],
          "aggregate_search_volume": 1600,
          "average_cpc": 1.28,
          "average_competition": 0.04,
          "cluster_size": 1,
          "city": "Vernon"
        },
        {
          "primary": "moving company mount vernon",
          "related": [
            "movers mount vernon ny",
            "moving companies in mount vernon ny",
            "moving companies mount vernon ny",
            "moving company mount vernon ny",
            "vernon moving and storage leesville la",
            "vernon moving",
            "movers mount vernon wa",
            "vernon moving and storage",
            "moving companies mount vernon wa",
            "mount vernon moving companies",
            "mount vernon movers",
            "moving vernon",
            "vernon moving & storage",
            "harlow moving mt vernon il"
          ],
          "aggregate_search_volume": 640,
          "average_cpc": 13.47,
          "average_competition": 0.38,
          "cluster_size": 15,
          "city": "Vernon"
        },
        {
          "primary": "movers vernon",
          "related": [
            "vernon county movers",
            "vernon movers"
          ],
          "aggregate_search_volume": 70,
          "average_cpc": 7.45,
          "average_competition": 0.25,
          "cluster_size": 3,
          "city": "Vernon"
        }
      ],
      "Centennial": [
        {
          "primary": "best neighborhoods in centennial co",
          "related": [
            "living in centennial co",
            "cost of living in centennial colorado",
            "living in centennial",
            "living in centennial colorado",
            "centennial denver co"
          ],
          "aggregate_search_volume": 580,
          "average_cpc": 0.24,
          "average_competition": 0.05,
          "cluster_size": 6,
          "city": "Centennial"
        },
        {
          "primary": "centennial movers",
          "related": [
            "movers centennial co"
          ],
          "aggregate_search_volume": 470,
          "average_cpc": 31.23,
          "average_competition": 0.35,
          "cluster_size": 2,
          "city": "Centennial"
        },
        {
          "primary": "centennial moving",
          "related": [
            "moving companies centennial co",
            "moving to centennial colorado",
            "centennial moving company"
          ],
          "aggregate_search_volume": 470,
          "average_cpc": 18.27,
          "average_competition": 0.34,
          "cluster_size": 4,
          "city": "Centennial"
        },
        {
          "primary": "is centennial colorado a good place to live",
          "related": [
            "centennial colorado cost of living"
          ],
          "aggregate_search_volume": 100,
          "average_cpc": 0,
          "average_competition": 0,
          "cluster_size": 2,
          "city": "Centennial"
        }
      ],
      "Hazel Dell North": [],
      "Cherry Park": [],
      "Buckman": [],
      "Northeast Portland": [],
      "Overlook": [],
      "Lacey": [
        {
          "primary": "movers lacey",
          "related": [
            "movers in lacey wa",
            "movers lacey wa",
            "movers lacey washington"
          ],
          "aggregate_search_volume": 560,
          "average_cpc": 17.72,
          "average_competition": 0.77,
          "cluster_size": 4,
          "city": "Lacey"
        },
        {
          "primary": "moving companies in lacey wa",
          "related": [
            "moving companies lacey wa"
          ],
          "aggregate_search_volume": 280,
          "average_cpc": 14.56,
          "average_competition": 0.75,
          "cluster_size": 2,
          "city": "Lacey"
        }
      ],
      "Klamath Falls": [],
      "Redmond": [],
      "Bend": [],
      "Boardman": [],
      "Cottage Grove": [],
      "Hermiston": [],
      "Silverton": [],
      "Corvallis": [],
      "Roseburg": [],
      "Salem": [],
      "Dallas": [],
      "Stayton": [],
      "Albany": [],
      "Ashland": [],
      "Irrigon": [],
      "La Grande": [],
      "Pendleton": [],
      "Keizer": [],
      "Umatilla": [],
      "Heppner": [],
      "Independence": [],
      "Central Point": [],
      "Medford": [],
      "Woodburn": [],
      "Grants Pass": [],
      "Springfield": [],
      "Eugene": [],
      "Ontario": [],
      "Pilot Rock": [],
      "St. Helens": [],
      "Lyle": [],
      "Columbia City": [],
      "Zigzag": [],
      "Underwood": [],
      "Dufur": [],
      "Maupin": [],
      "Wishram": [],
      "Goldendale": [],
      "Klickitat": [],
      "Bingen": [],
      "Mount Hood Village": [],
      "Parkdale": [],
      "White Salmon": [],
      "North Bonneville": [],
      "Skamania": [],
      "Hood River": [],
      "Rhododendron": [],
      "The Dalles": [
        {
          "cluster_id": "The Dalles-0",
          "keywords": [
            "storage the dalles"
          ],
          "cluster_value_score": 923.1249656109151,
          "content_ideas": {
            "title": "Error: LLM call failed for storage the dalles",
            "content_angle": "N/A",
            "target_audience": "N/A",
            "key_questions": [
              "LLM call error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit.\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 30\nPlease retry in 46.056940304s. [violations {\n  quota_metric: \"generativelanguage.googleapis.com/generate_content_free_tier_requests\"\n  quota_id: \"GenerateRequestsPerMinutePerProjectPerModel-FreeTier\"\n  quota_dimensions {\n    key: \"model\"\n    value: \"gemini-2.0-flash-lite\"\n  }\n  quota_dimensions {\n    key: \"location\"\n    value: \"global\"\n  }\n  quota_value: 30\n}\n, links {\n  description: \"Learn more about Gemini API quotas\"\n  url: \"https://ai.google.dev/gemini-api/docs/rate-limits\"\n}\n, retry_delay {\n  seconds: 46\n}\n]"
            ]
          },
          "title": "Storage The Dalles Services: Your Local Experts"
        }
      ],
      "Carson": [
        {
          "cluster_id": "Carson-0",
          "keywords": [
            "storage carson"
          ],
          "cluster_value_score": 20970.87710526585,
          "content_ideas": {
            "title": "Error: LLM call failed for storage carson",
            "content_angle": "N/A",
            "target_audience": "N/A",
            "key_questions": [
              "LLM call error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit.\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 30\nPlease retry in 45.51303081s. [violations {\n  quota_metric: \"generativelanguage.googleapis.com/generate_content_free_tier_requests\"\n  quota_id: \"GenerateRequestsPerMinutePerProjectPerModel-FreeTier\"\n  quota_dimensions {\n    key: \"model\"\n    value: \"gemini-2.0-flash-lite\"\n  }\n  quota_dimensions {\n    key: \"location\"\n    value: \"global\"\n  }\n  quota_value: 30\n}\n, links {\n  description: \"Learn more about Gemini API quotas\"\n  url: \"https://ai.google.dev/gemini-api/docs/rate-limits\"\n}\n, retry_delay {\n  seconds: 45\n}\n]"
            ]
          },
          "title": "Storage Carson Services: Your Local Experts"
        }
      ],
      "Wilsonville": [
        {
          "cluster_id": "Wilsonville-0",
          "keywords": [
            "wilsonville movers"
          ],
          "cluster_value_score": 1648.0850938425285,
          "content_ideas": {
            "title": "Stress-Free Moving in Wilsonville: Your Guide to a Smooth Transition",
            "content_angle": "Providing a comprehensive guide for residents planning a move in Wilsonville, emphasizing ease of the moving process, and showcasing the benefits of hiring professional movers.",
            "target_audience": "Homeowners and renters in Wilsonville, Oregon, planning a local move and seeking a reliable and efficient moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Wilsonville?",
              "Why should I hire professional Wilsonville movers instead of doing it myself?",
              "What services do professional movers in Wilsonville typically offer?",
              "How much does it cost to hire movers in Wilsonville, and how can I get an accurate quote?",
              "How can I prepare for my move to ensure a smooth and efficient process?"
            ]
          },
          "title": "Wilsonville Movers: Top-Rated Moving Services & Free Quotes"
        }
      ],
      "Rainier": [
        {
          "cluster_id": "Rainier-0",
          "keywords": [
            "rainier moving company"
          ],
          "cluster_value_score": 906.7856949826288,
          "content_ideas": {
            "title": "Moving to Rainier, WA? Your Complete Guide to a Smooth Move with Strongman Movers",
            "content_angle": "A comprehensive guide providing valuable information and tips for individuals and families planning a move to Rainier, WA, emphasizing the benefits of hiring a professional moving company like Strongman Movers.",
            "target_audience": "Individuals and families residing in or planning to move to Rainier, WA, who are seeking a reliable and professional moving service.",
            "key_questions": [
              "What are the key considerations when planning a move to Rainier, WA?",
              "Why should I hire a professional moving company, and what are the benefits of choosing Strongman Movers?",
              "How much does it typically cost to move within or to Rainier, WA, and what factors influence the price?",
              "What services does Strongman Movers offer, and how can they help with my specific moving needs?",
              "What steps can I take to prepare for my move and ensure a smooth and stress-free experience?"
            ]
          },
          "title": "Rainier Moving Company: Your Seamless Seattle Relocation Experts"
        }
      ],
      "Vancouver": [
        {
          "cluster_id": "Vancouver-0",
          "keywords": [
            "vancouver moving companies",
            "moving vancouver"
          ],
          "cluster_value_score": 31546.153846153844,
          "content_ideas": {
            "title": "Moving in Vancouver? Your Ultimate Guide to Choosing the Right Mover (2024)",
            "content_angle": "A comprehensive guide providing practical advice and tips for Vancouver residents looking to hire a moving company, focusing on key considerations like cost, reliability, and service offerings.",
            "target_audience": "Vancouver residents planning a local move, particularly those seeking a stress-free and reliable moving experience, with a budget of approximately $1200.",
            "key_questions": [
              "How much does it cost to hire movers in Vancouver, and what factors influence the price?",
              "What should I look for when choosing a reputable moving company in Vancouver?",
              "What services do Vancouver moving companies typically offer (packing, storage, etc.)?",
              "How can I prepare for my move to ensure a smooth and efficient process?",
              "What are the best tips for avoiding moving scams and protecting my belongings?"
            ]
          },
          "title": "Vancouver Moving Companies: Top-Rated Movers & Services"
        },
        {
          "cluster_id": "Vancouver-1",
          "keywords": [
            "movers vancouver",
            "best movers vancouver",
            "local movers vancouver"
          ],
          "cluster_value_score": 21030.769262911064,
          "content_ideas": {
            "title": "Moving in Vancouver? Your Guide to the Best Movers & a Stress-Free Relocation",
            "content_angle": "A comprehensive guide comparing top Vancouver movers, offering tips for a smooth move, and highlighting value for money.",
            "target_audience": "Vancouver residents planning a local move or relocating to the city, seeking reliable and trustworthy moving services, and looking for cost-effective solutions.",
            "key_questions": [
              "What are the top-rated moving companies in Vancouver, and what services do they offer?",
              "How can I compare moving quotes and ensure I'm getting a fair price?",
              "What steps can I take to prepare for a move and minimize stress?",
              "What are the average costs associated with moving in Vancouver?",
              "How do I choose the right mover for my specific needs and budget, considering factors like distance, items, and packing needs?"
            ]
          },
          "title": "Vancouver Movers: Top-Rated Moving Companies & Services"
        }
      ],
      "Gresham": [
        {
          "cluster_id": "Gresham-0",
          "keywords": [
            "movers gresham"
          ],
          "cluster_value_score": 6474.3859378313355,
          "content_ideas": {
            "title": "Gresham Movers: Your Stress-Free Guide to a Smooth Relocation",
            "content_angle": "A comprehensive guide providing practical tips, cost considerations, and a step-by-step process for a successful move within Gresham.",
            "target_audience": "Homeowners and businesses in Gresham, Oregon, planning a local move and seeking a reliable and professional moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Gresham?",
              "How much does it typically cost to hire movers in Gresham?",
              "What factors should I consider when choosing a moving company in Gresham?",
              "How can I prepare for moving day to ensure a smooth process?",
              "What are the benefits of hiring professional movers versus DIY moving in Gresham?"
            ]
          },
          "title": "Gresham Movers: Top-Rated Moving Services & Free Quotes"
        },
        {
          "cluster_id": "Gresham-1",
          "keywords": [
            "gresham moving companies"
          ],
          "cluster_value_score": 6474.3859378313355,
          "content_ideas": {
            "title": "Moving in Gresham, OR? Your Guide to Stress-Free Relocation",
            "content_angle": "A comprehensive guide for residents of Gresham looking for moving services, highlighting the benefits of professional movers and providing tips for a smooth moving experience.",
            "target_audience": "Homeowners and renters in Gresham, OR, planning a local move who are seeking a reliable and efficient moving company.",
            "key_questions": [
              "What are the benefits of hiring professional moving companies in Gresham?",
              "How much does it cost to hire movers in Gresham, and what factors influence the price?",
              "How can I prepare for my move to ensure a smooth process?",
              "What should I look for when choosing a moving company in Gresham?",
              "How do I get a free, accurate moving quote?"
            ]
          },
          "title": "Gresham Moving Companies: Top-Rated Movers & Affordable Prices"
        }
      ],
      "Portland": [
        {
          "cluster_id": "Portland-0",
          "keywords": [
            "long distance movers portland",
            "local movers portland",
            "movers portland",
            "cheap movers portland",
            "commercial movers portland",
            "best movers portland",
            "furniture movers portland"
          ],
          "cluster_value_score": 22611.808113107865,
          "content_ideas": {
            "title": "Portland Long Distance Moving: Your Ultimate Guide to a Stress-Free Relocation",
            "content_angle": "Comprehensive guide for individuals and businesses planning a long-distance move to or from Portland, focusing on planning, cost-saving tips, and choosing the right movers, specifically highlighting the value and expertise provided by STRONGMANMOVER.com.",
            "target_audience": "Individuals and businesses in Portland, OR, and surrounding areas, planning a long-distance move. Specifically targeting those seeking reliable, professional moving services and are willing to invest in quality service.",
            "key_questions": [
              "How much does long-distance moving typically cost in Portland?",
              "What are the key steps involved in planning a long-distance move?",
              "How can I find reliable and affordable long-distance movers in Portland (and what should I look for)?",
              "What are the benefits of hiring professional movers vs. DIY options?",
              "How does STRONGMANMOVER.com simplify the long-distance moving process?"
            ]
          },
          "title": "Portland Long Distance Movers: Top-Rated Moving Companies"
        },
        {
          "cluster_id": "Portland-1",
          "keywords": [
            "moving portland",
            "portland moving companies"
          ],
          "cluster_value_score": 22455.319718485684,
          "content_ideas": {
            "title": "Moving to Portland: Your Ultimate Guide to a Smooth Transition",
            "content_angle": "Comprehensive guide for individuals and families planning a move to Portland, focusing on practical advice, cost considerations, and choosing the right moving company.",
            "target_audience": "Individuals and families planning a local or long-distance move to Portland, Oregon, seeking reliable information and moving resources.",
            "key_questions": [
              "What are the key steps involved in planning a move to Portland?",
              "How much does it cost to move within or to Portland?",
              "What factors should I consider when choosing Portland moving companies?",
              "What are the best neighborhoods to live in Portland?",
              "How can I prepare for my move to Portland to make the process easier?"
            ]
          },
          "title": "Moving to Portland: Your Ultimate Guide"
        }
      ],
      "Hillsboro": [
        {
          "cluster_id": "Hillsboro-0",
          "keywords": [
            "movers hillsboro"
          ],
          "cluster_value_score": 12270.000091418624,
          "content_ideas": {
            "title": "Hillsboro Moving Guide: Expert Tips for a Stress-Free Move with STRONGMAN MOVERS",
            "content_angle": "Provide a comprehensive guide for people planning a move in Hillsboro, Oregon, emphasizing the benefits of professional moving services, particularly from a company like STRONGMAN MOVERS, and offering practical advice to reduce stress.",
            "target_audience": "Individuals and families residing in or planning to move to Hillsboro, OR, who are seeking professional moving services.",
            "key_questions": [
              "What are the key steps to planning a move in Hillsboro?",
              "How can I choose the best moving company in Hillsboro?",
              "What services does STRONGMAN MOVERS offer to make my move easier?",
              "What are the average costs associated with moving in Hillsboro, and how can I budget effectively?",
              "How can I prepare my belongings for a move to Hillsboro?"
            ]
          },
          "title": "Hillsboro Movers: Expert Moving Services & Affordable Rates"
        },
        {
          "cluster_id": "Hillsboro-1",
          "keywords": [
            "hillsboro moving companies"
          ],
          "cluster_value_score": 10337.391197190167,
          "content_ideas": {
            "title": "Hillsboro Moving Companies: Choosing the Right Movers for Your Stress-Free Relocation",
            "content_angle": "A comprehensive guide to selecting the best moving company in Hillsboro, OR, focusing on factors like experience, pricing, services offered, and customer reviews to ensure a smooth and successful move, tailored for those with an average job value of $1200.",
            "target_audience": "Homeowners and renters in the Hillsboro, OR area planning a local or long-distance move, particularly those who value quality service and are willing to invest in a reliable moving company.",
            "key_questions": [
              "What are the key factors to consider when hiring Hillsboro moving companies?",
              "How do I get accurate moving quotes and avoid hidden fees?",
              "What services should I expect from a reputable moving company?",
              "How can I compare different Hillsboro moving companies and read customer reviews?",
              "What are the benefits of hiring professional movers versus DIY moving?"
            ]
          },
          "title": "Hillsboro Moving Companies: Top-Rated Movers & Services"
        }
      ],
      "Beaverton": [
        {
          "cluster_id": "Beaverton-0",
          "keywords": [
            "movers beaverton"
          ],
          "cluster_value_score": 27128.570389078628,
          "content_ideas": {
            "title": "Stress-Free Moving in Beaverton: Your Ultimate Guide to Choosing the Right Movers",
            "content_angle": "A comprehensive guide providing Beaverton residents with everything they need to know to find reliable, professional movers and ensure a smooth relocation experience.",
            "target_audience": "Homeowners and renters in Beaverton, Oregon, planning a local move or relocation, and seeking a trusted moving company.",
            "key_questions": [
              "What should I look for when choosing movers in Beaverton?",
              "How much does it cost to hire movers in Beaverton, and what factors influence the price?",
              "What services do movers typically offer, and which ones do I need?",
              "How can I prepare for my move to make it easier for the movers?",
              "What are some common moving scams, and how can I avoid them?"
            ]
          },
          "title": "Beaverton Movers: Top-Rated Moving Services & Free Quotes"
        },
        {
          "cluster_id": "Beaverton-1",
          "keywords": [
            "beaverton moving companies"
          ],
          "cluster_value_score": 32945.45552730563,
          "content_ideas": {
            "title": "Choosing the Best Beaverton Moving Company: A Guide to Stress-Free Relocation",
            "content_angle": "A comprehensive guide providing practical advice and tips for residents of Beaverton, OR, on how to choose a reliable and affordable moving company. This includes what to look for, how to avoid scams, and how to prepare for moving day.",
            "target_audience": "Homeowners and renters in Beaverton, OR, planning a local or long-distance move, with a focus on those looking for quality and value, and potentially willing to spend around $1200 on their move.",
            "key_questions": [
              "What are the key factors to consider when choosing a moving company in Beaverton?",
              "How do I get accurate moving quotes and avoid hidden fees?",
              "What services do Beaverton moving companies typically offer, and which are essential for me?",
              "How can I prepare for moving day to ensure a smooth and efficient move?",
              "What questions should I ask a moving company before hiring them?"
            ]
          },
          "title": "Top Beaverton Moving Companies: Get a Free Quote Today!"
        }
      ],
      "Lake Oswego": [
        {
          "cluster_id": "Lake Oswego-0",
          "keywords": [
            "movers lake oswego"
          ],
          "cluster_value_score": 1958.9610632235176,
          "content_ideas": {
            "title": "Lake Oswego Moving Guide: Expert Tips for a Smooth Relocation",
            "content_angle": "Provide a comprehensive guide to moving in Lake Oswego, focusing on local expertise and value-added services offered by a reputable moving company.",
            "target_audience": "Homeowners and renters in Lake Oswego planning a local or long-distance move, looking for professional moving services.",
            "key_questions": [
              "How do I choose the right moving company in Lake Oswego?",
              "What services do professional movers offer to make my move easier?",
              "What are the typical costs associated with moving in Lake Oswego?",
              "How can I prepare for my move to ensure a smooth transition?",
              "What are the benefits of hiring local movers versus doing it myself?"
            ]
          },
          "title": "Lake Oswego Movers: Your Stress-Free Moving Solution"
        }
      ],
      "Sandy": [
        {
          "cluster_id": "Sandy-0",
          "keywords": [
            "movers sandy"
          ],
          "cluster_value_score": 786.0810608198564,
          "content_ideas": {
            "title": "Moving to Sandy, UT? Your Ultimate Guide to a Stress-Free Move (Strongman Mover's Secrets)",
            "content_angle": "A comprehensive guide providing practical tips, local insights, and expert advice for residents of Sandy, UT, planning a move. It positions Strongman Mover as the go-to local moving expert.",
            "target_audience": "Homeowners and renters in Sandy, UT, planning a local or long-distance move, and looking for reliable and professional moving services.",
            "key_questions": [
              "What are the key factors to consider when hiring movers in Sandy, UT?",
              "How can I prepare for a move to minimize stress and costs?",
              "What are the average moving costs in Sandy, and how can I get the best value?",
              "What are the benefits of choosing a local moving company like Strongman Mover?",
              "What services does Strongman Mover offer to make my move easier?"
            ]
          },
          "title": "Sandy Movers: Find the Best Moving Company in Sandy, Utah"
        }
      ],
      "Oregon City": [
        {
          "cluster_id": "Oregon City-0",
          "keywords": [
            "movers oregon city"
          ],
          "cluster_value_score": 2912.7396118710285,
          "content_ideas": {
            "title": "Oregon City Moving Guide: Your Stress-Free Move with STRONGMANMOVER",
            "content_angle": "A comprehensive guide providing practical tips and advice for a smooth move in Oregon City, specifically highlighting the services offered by STRONGMANMOVER and addressing common moving concerns.",
            "target_audience": "Homeowners and renters in Oregon City planning a local move or looking for professional moving services.",
            "key_questions": [
              "How do I choose the right moving company in Oregon City?",
              "What services do professional movers offer and which ones do I need?",
              "How can I prepare for a move to minimize stress and potential damage?",
              "How much does it cost to move in Oregon City, and what factors affect the price?",
              "Why choose STRONGMANMOVER for your Oregon City move?"
            ]
          },
          "title": "Oregon City Movers: Find Top-Rated Moving Companies"
        }
      ],
      "Stevenson": [
        {
          "cluster_id": "Stevenson-0",
          "keywords": [
            "stevenson moving"
          ],
          "cluster_value_score": 7815.85354491191,
          "content_ideas": {
            "title": "Moving to Stevenson? Your Ultimate Guide to a Stress-Free Relocation",
            "content_angle": "A comprehensive guide providing practical advice, local insights, and expert tips for a smooth move to Stevenson, tailored for families and individuals.",
            "target_audience": "Families, individuals, and professionals planning a move to the Stevenson area, seeking a reliable and stress-free moving experience.",
            "key_questions": [
              "What are the key considerations when planning a move to Stevenson?",
              "How can I find reliable and affordable movers in the Stevenson area?",
              "What services do professional movers typically offer, and how do I choose the right ones?",
              "What are some tips for packing, unpacking, and organizing your belongings for a move?",
              "What are the average costs associated with moving to Stevenson, and how can I budget effectively?"
            ]
          },
          "title": "Stevenson Moving: Your Stress-Free Relocation Solution"
        }
      ],
      "Tigard": [
        {
          "cluster_id": "Tigard-0",
          "keywords": [
            "movers tigard"
          ],
          "cluster_value_score": 6831.1579118807895,
          "content_ideas": {
            "title": "Tigard Moving Made Easy: Your Guide to a Stress-Free Move with [Your Company Name]",
            "content_angle": "Providing a comprehensive guide for residents of Tigard, Oregon, covering all aspects of a local move, emphasizing ease, and highlighting the benefits of professional movers.",
            "target_audience": "Homeowners and renters in Tigard, OR, planning a local move and seeking a reliable and efficient moving service.",
            "key_questions": [
              "What are the key steps involved in planning a move in Tigard?",
              "How can professional movers in Tigard streamline the moving process and reduce stress?",
              "What services do Tigard moving companies offer, and how do I choose the right one for my needs?",
              "What are the typical costs associated with moving in Tigard, and how can I get an accurate estimate?",
              "How can I prepare my belongings for a move to ensure their safety and minimize potential damage?"
            ]
          },
          "title": "Tigard Movers: Get a Stress-Free Move Today"
        }
      ]
    },
    "arbitrageData": {
      "customer_domain_authority": {
        "domain": "https://www.STRONGMANMOVER.com",
        "keyword_count_top10": 0,
        "traffic": 0
      },
      "customer_domain": "https://www.STRONGMANMOVER.com",
      "selected_top_4_clusters": [
        {
          "primary": "movers portland",
          "related": [
            "long distance movers portland oregon",
            "portland commercial movers"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "movers portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "long distance movers portland oregon",
              "search_volume": 30,
              "cpc": 193.81,
              "competition": 0.23000000417232513,
              "base_value_score": 5814.3,
              "arbitrage_score": 20944.884411,
              "velocity": 85,
              "t_mid_base": 18.8,
              "t_mid_low": 15.5,
              "t_mid_high": 22.1,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 63,
                    "high": 75,
                    "base": 69
                  },
                  "t": {
                    "low": 29,
                    "high": 40.8,
                    "base": 34.9
                  }
                },
                "mid": {
                  "v": {
                    "low": 82,
                    "high": 88,
                    "base": 85
                  },
                  "t": {
                    "low": 15.5,
                    "high": 22.1,
                    "base": 18.8
                  }
                },
                "high": {
                  "v": {
                    "low": 89,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 10.6,
                    "high": 15.1,
                    "base": 12.9
                  }
                }
              },
              "normalized_arbitrage_score": 4.98
            },
            {
              "keyword": "portland commercial movers",
              "search_volume": 30,
              "cpc": 51.56,
              "competition": 0.2800000011920929,
              "base_value_score": 1546.8,
              "arbitrage_score": 4698.663409,
              "velocity": 84,
              "t_mid_base": 19.6,
              "t_mid_low": 16.2,
              "t_mid_high": 23,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 62,
                    "high": 74,
                    "base": 68
                  },
                  "t": {
                    "low": 30.3,
                    "high": 42.5,
                    "base": 36.4
                  }
                },
                "mid": {
                  "v": {
                    "low": 81,
                    "high": 88,
                    "base": 84
                  },
                  "t": {
                    "low": 16.2,
                    "high": 23,
                    "base": 19.6
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 93,
                    "base": 91
                  },
                  "t": {
                    "low": 11,
                    "high": 15.8,
                    "base": 13.4
                  }
                }
              },
              "normalized_arbitrage_score": 1.89
            }
          ],
          "aggregate_search_volume": 8160,
          "average_competition": 0.27,
          "average_velocity": 84.33,
          "average_cpc": 87.36,
          "average_t_mid_base": 19.63,
          "base_value_score": 712857.6,
          "value_score": 712857.6,
          "long_term_arbitrage_score_cluster": 2232843.4504792327,
          "llm_content_ideas": {
            "title": "Finding the Right Movers in Portland: A Guide to Stress-Free Moving",
            "content_angle": "How-to guide",
            "target_audience": "Homeowners and Businesses in Portland, OR",
            "key_questions": [
              "How do I choose the best mover in Portland for my needs?",
              "What are the different types of moving services offered in Portland?",
              "What should I look for in a reputable moving company?",
              "How much does it cost to hire movers in Portland, and how can I save money?",
              "What are some tips for a smooth long-distance move from or to Portland?"
            ],
            "average_estimated_time_to_rank_weeks": 19.63
          }
        },
        {
          "primary": "portland oregon moving companies",
          "related": [
            "moving company portland",
            "moving company portland oregon",
            "moving companies in portland",
            "portland moving company",
            "moving companies beaverton",
            "moving company beaverton oregon",
            "moving companies in beaverton",
            "how to move to portland oregon",
            "relocation portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "portland oregon moving companies",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "portland moving company",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving company beaverton oregon",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "moving companies in beaverton",
              "search_volume": 1900,
              "cpc": 12.66,
              "competition": 0.27000001072883606,
              "base_value_score": 24054,
              "arbitrage_score": 76313.449179,
              "velocity": 86,
              "t_mid_base": 17.6,
              "t_mid_low": 14.6,
              "t_mid_high": 20.7,
              "potential_roi": 76000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 66,
                    "high": 77,
                    "base": 71
                  },
                  "t": {
                    "low": 27.2,
                    "high": 38.3,
                    "base": 32.7
                  }
                },
                "mid": {
                  "v": {
                    "low": 83,
                    "high": 89,
                    "base": 86
                  },
                  "t": {
                    "low": 14.6,
                    "high": 20.7,
                    "base": 17.6
                  }
                },
                "high": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                }
              },
              "normalized_arbitrage_score": 15.49
            },
            {
              "keyword": "how to move to portland oregon",
              "search_volume": 40,
              "cpc": 6.32,
              "competition": 0.27000001072883606,
              "base_value_score": 252.8,
              "arbitrage_score": 819.714628,
              "velocity": 90,
              "t_mid_base": 14.2,
              "t_mid_low": 11.7,
              "t_mid_high": 16.8,
              "potential_roi": 1600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 73,
                    "high": 82,
                    "base": 78
                  },
                  "t": {
                    "low": 21.9,
                    "high": 31,
                    "base": 26.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.8,
                    "base": 14.2
                  }
                },
                "high": {
                  "v": {
                    "low": 92,
                    "high": 96,
                    "base": 94
                  },
                  "t": {
                    "low": 8,
                    "high": 11.5,
                    "base": 9.7
                  }
                }
              },
              "normalized_arbitrage_score": 1.16
            },
            {
              "keyword": "relocation portland oregon",
              "search_volume": 30,
              "cpc": 0,
              "competition": 0.2199999988079071,
              "base_value_score": 0,
              "arbitrage_score": 0,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.2,
              "t_mid_high": 9,
              "potential_roi": 1200,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.6,
                    "high": 16.6,
                    "base": 14.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.2,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.2,
                    "high": 6.1,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 1
            }
          ],
          "aggregate_search_volume": 46270,
          "average_competition": 0.28,
          "average_velocity": 86.4,
          "average_cpc": 12.79,
          "average_t_mid_base": 17.71,
          "base_value_score": 591793.2999999999,
          "value_score": 591793.3,
          "long_term_arbitrage_score_cluster": 1818552.3323704747,
          "llm_content_ideas": {
            "title": "Top 10 Portland, OR Moving Companies: Compare Services & Get the Best Value",
            "content_angle": "Comparison/Listicle",
            "target_audience": "Homeowners and Businesses planning to move to, from, or within Portland, OR",
            "key_questions": [
              "What are the top-rated moving companies in Portland?",
              "What services do these companies offer (local, long-distance, commercial)?",
              "How do prices and fees compare between different moving companies?",
              "What are the pros and cons of each moving company?",
              "How do I get a free moving quote and what details do I need to provide?"
            ],
            "average_estimated_time_to_rank_weeks": 17.71
          }
        },
        {
          "primary": "relocation to portland oregon",
          "related": [
            "relocating to portland oregon",
            "relocating to portland or",
            "relocate to portland oregon"
          ],
          "cluster_keywords_details": [
            {
              "keyword": "relocation to portland oregon",
              "search_volume": 14800,
              "cpc": 0.87,
              "competition": 0.1599999964237213,
              "base_value_score": 12876,
              "arbitrage_score": 69524.839356,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.3,
              "t_mid_high": 9,
              "potential_roi": 592000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.7,
                    "base": 14.2
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.3,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.3,
                    "high": 6.2,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 14.2
            },
            {
              "keyword": "relocating to portland oregon",
              "search_volume": 14800,
              "cpc": 0.87,
              "competition": 0.1599999964237213,
              "base_value_score": 12876,
              "arbitrage_score": 69524.839356,
              "velocity": 96,
              "t_mid_base": 7.6,
              "t_mid_low": 6.3,
              "t_mid_high": 9,
              "potential_roi": 592000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 87,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.7,
                    "high": 16.7,
                    "base": 14.2
                  }
                },
                "mid": {
                  "v": {
                    "low": 95,
                    "high": 98,
                    "base": 96
                  },
                  "t": {
                    "low": 6.3,
                    "high": 9,
                    "base": 7.6
                  }
                },
                "high": {
                  "v": {
                    "low": 98,
                    "high": 100,
                    "base": 99
                  },
                  "t": {
                    "low": 4.3,
                    "high": 6.2,
                    "base": 5.2
                  }
                }
              },
              "normalized_arbitrage_score": 14.2
            },
            {
              "keyword": "relocating to portland or",
              "search_volume": 14800,
              "cpc": 0.67,
              "competition": 0.14000000059604645,
              "base_value_score": 9916,
              "arbitrage_score": 60834.355606,
              "velocity": 98,
              "t_mid_base": 6.5,
              "t_mid_low": 5.3,
              "t_mid_high": 7.7,
              "potential_roi": 592000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 96,
                    "high": 99,
                    "base": 98
                  },
                  "t": {
                    "low": 5.3,
                    "high": 7.7,
                    "base": 6.5
                  }
                },
                "high": {
                  "v": {
                    "low": 99,
                    "high": 100,
                    "base": 100
                  },
                  "t": {
                    "low": 3.6,
                    "high": 5.3,
                    "base": 4.5
                  }
                }
              },
              "normalized_arbitrage_score": 12.55
            },
            {
              "keyword": "relocate to portland oregon",
              "search_volume": 14800,
              "cpc": 0.67,
              "competition": 0.14000000059604645,
              "base_value_score": 9916,
              "arbitrage_score": 60834.355606,
              "velocity": 98,
              "t_mid_base": 6.5,
              "t_mid_low": 5.3,
              "t_mid_high": 7.7,
              "potential_roi": 592000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 96,
                    "high": 99,
                    "base": 98
                  },
                  "t": {
                    "low": 5.3,
                    "high": 7.7,
                    "base": 6.5
                  }
                },
                "high": {
                  "v": {
                    "low": 99,
                    "high": 100,
                    "base": 100
                  },
                  "t": {
                    "low": 3.6,
                    "high": 5.3,
                    "base": 4.5
                  }
                }
              },
              "normalized_arbitrage_score": 12.55
            }
          ],
          "aggregate_search_volume": 59200,
          "average_competition": 0.15,
          "average_velocity": 97,
          "average_cpc": 0.77,
          "average_t_mid_base": 7.05,
          "base_value_score": 45584,
          "value_score": 45584,
          "long_term_arbitrage_score_cluster": 261826.5364732912,
          "llm_content_ideas": {
            "title": "Relocating to Portland, Oregon: Your Ultimate Guide to a Smooth Transition",
            "content_angle": "Comprehensive Guide",
            "target_audience": "Individuals and Families considering a move to Portland, OR",
            "key_questions": [
              "What are the pros and cons of living in Portland, Oregon?",
              "What neighborhoods are best suited for different lifestyles?",
              "How much does it cost to live in Portland compared to other cities?",
              "What are the local job markets and industries in Portland?",
              "How can I find housing and plan my move effectively?"
            ],
            "average_estimated_time_to_rank_weeks": 7.05
          }
        },
        {
          "primary": "mover portland",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "mover portland",
              "search_volume": 14800,
              "cpc": 0.67,
              "competition": 0.14000000059604645,
              "base_value_score": 9916,
              "arbitrage_score": 60834.355606,
              "velocity": 98,
              "t_mid_base": 6.5,
              "t_mid_low": 5.3,
              "t_mid_high": 7.7,
              "potential_roi": 592000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 90,
                    "high": 94,
                    "base": 92
                  },
                  "t": {
                    "low": 9.9,
                    "high": 14.2,
                    "base": 12.1
                  }
                },
                "mid": {
                  "v": {
                    "low": 96,
                    "high": 99,
                    "base": 98
                  },
                  "t": {
                    "low": 5.3,
                    "high": 7.7,
                    "base": 6.5
                  }
                },
                "high": {
                  "v": {
                    "low": 99,
                    "high": 100,
                    "base": 100
                  },
                  "t": {
                    "low": 3.6,
                    "high": 5.3,
                    "base": 4.5
                  }
                }
              },
              "normalized_arbitrage_score": 12.55
            }
          ],
          "aggregate_search_volume": 14800,
          "average_competition": 0.14,
          "average_velocity": 98,
          "average_cpc": 0.67,
          "average_t_mid_base": 6.5,
          "base_value_score": 9916,
          "value_score": 9916,
          "long_term_arbitrage_score_cluster": 60834.35582822085
        },
        {
          "primary": "local movers portland",
          "related": [],
          "cluster_keywords_details": [
            {
              "keyword": "local movers portland",
              "search_volume": 390,
              "cpc": 21.28,
              "competition": 0.14000000059604645,
              "base_value_score": 8299.2,
              "arbitrage_score": 49165.876604,
              "velocity": 95,
              "t_mid_base": 9.4,
              "t_mid_low": 7.7,
              "t_mid_high": 11.1,
              "potential_roi": 15600,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 84,
                    "high": 90,
                    "base": 86
                  },
                  "t": {
                    "low": 14.4,
                    "high": 20.5,
                    "base": 17.5
                  }
                },
                "mid": {
                  "v": {
                    "low": 93,
                    "high": 96,
                    "base": 95
                  },
                  "t": {
                    "low": 7.7,
                    "high": 11.1,
                    "base": 9.4
                  }
                },
                "high": {
                  "v": {
                    "low": 96,
                    "high": 99,
                    "base": 98
                  },
                  "t": {
                    "low": 5.3,
                    "high": 7.6,
                    "base": 6.4
                  }
                }
              },
              "normalized_arbitrage_score": 10.33
            }
          ],
          "aggregate_search_volume": 390,
          "average_competition": 0.14,
          "average_velocity": 95,
          "average_cpc": 21.28,
          "average_t_mid_base": 9.4,
          "base_value_score": 8299.2,
          "value_score": 8299.2,
          "long_term_arbitrage_score_cluster": 49165.87677725118
        }
      ],
      "all_banded_clusters": {
        "Band 1": [
          {
            "primary": "commercial moving companies",
            "related": [
              "moving company commercial",
              "commercial moving services",
              "commercial moving and storage"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "commercial moving companies",
                "search_volume": 9900,
                "cpc": 18.55,
                "competition": 0.09000000357627869,
                "base_value_score": 183645,
                "arbitrage_score": 1625176.939716,
                "velocity": 98,
                "t_mid_base": 6.5,
                "t_mid_low": 5.3,
                "t_mid_high": 7.7,
                "potential_roi": 396000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 90,
                      "high": 94,
                      "base": 92
                    },
                    "t": {
                      "low": 9.9,
                      "high": 14.2,
                      "base": 12
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 96,
                      "high": 99,
                      "base": 98
                    },
                    "t": {
                      "low": 5.3,
                      "high": 7.7,
                      "base": 6.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.6,
                      "high": 5.3,
                      "base": 4.4
                    }
                  }
                },
                "normalized_arbitrage_score": 100
              },
              {
                "keyword": "moving company commercial",
                "search_volume": 9900,
                "cpc": 18.55,
                "competition": 0.09000000357627869,
                "base_value_score": 183645,
                "arbitrage_score": 1625176.939716,
                "velocity": 98,
                "t_mid_base": 6.5,
                "t_mid_low": 5.3,
                "t_mid_high": 7.7,
                "potential_roi": 396000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 90,
                      "high": 94,
                      "base": 92
                    },
                    "t": {
                      "low": 9.9,
                      "high": 14.2,
                      "base": 12
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 96,
                      "high": 99,
                      "base": 98
                    },
                    "t": {
                      "low": 5.3,
                      "high": 7.7,
                      "base": 6.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.6,
                      "high": 5.3,
                      "base": 4.4
                    }
                  }
                },
                "normalized_arbitrage_score": 100
              },
              {
                "keyword": "commercial moving services",
                "search_volume": 590,
                "cpc": 22.4,
                "competition": 0.09000000357627869,
                "base_value_score": 13216,
                "arbitrage_score": 117580.067433,
                "velocity": 98,
                "t_mid_base": 6.2,
                "t_mid_low": 5,
                "t_mid_high": 7.3,
                "potential_roi": 23600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 90,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 9.4,
                      "high": 13.5,
                      "base": 11.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 97,
                      "high": 99,
                      "base": 98
                    },
                    "t": {
                      "low": 5,
                      "high": 7.3,
                      "base": 6.2
                    }
                  },
                  "high": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.4,
                      "high": 5,
                      "base": 4.2
                    }
                  }
                },
                "normalized_arbitrage_score": 8.16
              },
              {
                "keyword": "commercial moving and storage",
                "search_volume": 110,
                "cpc": 0,
                "competition": 0.07999999821186066,
                "base_value_score": 0,
                "arbitrage_score": 0,
                "velocity": 100,
                "t_mid_base": 2.9,
                "t_mid_low": 2.3,
                "t_mid_high": 3.4,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 98,
                      "high": 100,
                      "base": 99
                    },
                    "t": {
                      "low": 4.3,
                      "high": 6.3,
                      "base": 5.3
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 100,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 2.3,
                      "high": 3.4,
                      "base": 2.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 100,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 1.6,
                      "high": 2.3,
                      "base": 2
                    }
                  }
                },
                "normalized_arbitrage_score": 1
              }
            ],
            "aggregate_search_volume": 20500,
            "average_competition": 0.09,
            "average_velocity": 98.5,
            "average_cpc": 14.88,
            "average_t_mid_base": 5.52,
            "base_value_score": 305040,
            "value_score": 305040,
            "long_term_arbitrage_score_cluster": 2747118.155619597,
            "llm_content_ideas": {
              "title": "Commercial Moving Done Right: A Comprehensive Guide for Businesses",
              "content_angle": "How-to guide",
              "target_audience": "Business owners",
              "key_questions": [
                "How do I choose the right commercial moving company for my business?",
                "What are the key steps involved in planning a commercial move?",
                "How can I minimize downtime and disruption during a commercial move?",
                "What insurance and liability considerations are important when moving a business?",
                "How do commercial moving costs compare?"
              ],
              "average_estimated_time_to_rank_weeks": 5.52
            }
          },
          {
            "primary": "commercial movers",
            "related": [],
            "cluster_keywords_details": [
              {
                "keyword": "commercial movers",
                "search_volume": 9900,
                "cpc": 18.55,
                "competition": 0.09000000357627869,
                "base_value_score": 183645,
                "arbitrage_score": 1625176.939716,
                "velocity": 98,
                "t_mid_base": 6.5,
                "t_mid_low": 5.3,
                "t_mid_high": 7.7,
                "potential_roi": 396000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 90,
                      "high": 94,
                      "base": 92
                    },
                    "t": {
                      "low": 9.9,
                      "high": 14.2,
                      "base": 12
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 96,
                      "high": 99,
                      "base": 98
                    },
                    "t": {
                      "low": 5.3,
                      "high": 7.7,
                      "base": 6.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.6,
                      "high": 5.3,
                      "base": 4.4
                    }
                  }
                },
                "normalized_arbitrage_score": 100
              }
            ],
            "aggregate_search_volume": 9900,
            "average_competition": 0.09,
            "average_velocity": 98,
            "average_cpc": 18.55,
            "average_t_mid_base": 6.5,
            "base_value_score": 183645,
            "value_score": 183645,
            "long_term_arbitrage_score_cluster": 1625176.9911504427,
            "llm_content_ideas": {
              "title": "Top 10 Commercial Movers: Choosing the Best for Your Business Relocation",
              "content_angle": "Listicle",
              "target_audience": "Business owners",
              "key_questions": [
                "What criteria should I use to evaluate commercial movers?",
                "What are the typical services offered by commercial movers?",
                "How can I get accurate quotes and avoid hidden fees?",
                "What are some tips for packing and preparing for a commercial move?",
                "How can I ensure a smooth and efficient move?"
              ],
              "average_estimated_time_to_rank_weeks": 6.5
            }
          },
          {
            "primary": "commercial mover",
            "related": [
              "commercial mover service"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "commercial mover",
                "search_volume": 1900,
                "cpc": 21.82,
                "competition": 0.05999999865889549,
                "base_value_score": 41458,
                "arbitrage_score": 528801.029454,
                "velocity": 100,
                "t_mid_base": 4.2,
                "t_mid_low": 3.4,
                "t_mid_high": 5,
                "potential_roi": 76000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 95,
                      "high": 98,
                      "base": 96
                    },
                    "t": {
                      "low": 6.4,
                      "high": 9.3,
                      "base": 7.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.4,
                      "high": 5,
                      "base": 4.2
                    }
                  },
                  "high": {
                    "v": {
                      "low": 100,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 2.3,
                      "high": 3.4,
                      "base": 2.9
                    }
                  }
                },
                "normalized_arbitrage_score": 33.21
              },
              {
                "keyword": "commercial mover service",
                "search_volume": 590,
                "cpc": 15.5,
                "competition": 0.09000000357627869,
                "base_value_score": 9145,
                "arbitrage_score": 81797.850693,
                "velocity": 98,
                "t_mid_base": 5.9,
                "t_mid_low": 4.8,
                "t_mid_high": 6.9,
                "potential_roi": 23600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 91,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 8.9,
                      "high": 12.8,
                      "base": 10.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 97,
                      "high": 99,
                      "base": 98
                    },
                    "t": {
                      "low": 4.8,
                      "high": 6.9,
                      "base": 5.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 99,
                      "high": 100,
                      "base": 100
                    },
                    "t": {
                      "low": 3.3,
                      "high": 4.8,
                      "base": 4
                    }
                  }
                },
                "normalized_arbitrage_score": 5.98
              }
            ],
            "aggregate_search_volume": 2490,
            "average_competition": 0.08,
            "average_velocity": 99,
            "average_cpc": 18.66,
            "average_t_mid_base": 5.05,
            "base_value_score": 46463.4,
            "value_score": 46463.4,
            "long_term_arbitrage_score_cluster": 464169.83016983024,
            "llm_content_ideas": {
              "title": "Commercial Mover Service: Your Checklist for a Stress-Free Office Relocation",
              "content_angle": "Checklist/Resource Guide",
              "target_audience": "Business owners, Office Managers",
              "key_questions": [
                "What are the essential tasks to complete before the move?",
                "How do I prepare my employees for the relocation?",
                "What type of packing supplies will I need?",
                "How do I organize and label boxes for efficiency?",
                "How does a commercial mover assist with tech and equipment?"
              ],
              "average_estimated_time_to_rank_weeks": 5.05
            }
          }
        ],
        "Band 5": [
          {
            "primary": "beaverton movers",
            "related": [
              "movers beaverton or"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "beaverton movers",
                "search_volume": 1600,
                "cpc": 12.08,
                "competition": 0.20999999344348907,
                "base_value_score": 19328,
                "arbitrage_score": 78187.704339,
                "velocity": 90,
                "t_mid_base": 13.6,
                "t_mid_low": 11.2,
                "t_mid_high": 16,
                "potential_roi": 64000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 79
                    },
                    "t": {
                      "low": 20.9,
                      "high": 29.5,
                      "base": 25.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.2,
                      "high": 16,
                      "base": 13.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.6,
                      "high": 10.9,
                      "base": 9.3
                    }
                  }
                },
                "normalized_arbitrage_score": 15.84
              },
              {
                "keyword": "movers beaverton or",
                "search_volume": 1600,
                "cpc": 12.08,
                "competition": 0.20999999344348907,
                "base_value_score": 19328,
                "arbitrage_score": 78187.704339,
                "velocity": 90,
                "t_mid_base": 13.6,
                "t_mid_low": 11.2,
                "t_mid_high": 16,
                "potential_roi": 64000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 79
                    },
                    "t": {
                      "low": 20.9,
                      "high": 29.5,
                      "base": 25.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.2,
                      "high": 16,
                      "base": 13.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.6,
                      "high": 10.9,
                      "base": 9.3
                    }
                  }
                },
                "normalized_arbitrage_score": 15.84
              }
            ],
            "aggregate_search_volume": 3200,
            "average_competition": 0.21,
            "average_velocity": 90,
            "average_cpc": 12.08,
            "average_t_mid_base": 13.6,
            "base_value_score": 38656,
            "value_score": 38656
          },
          {
            "primary": "relocation portland",
            "related": [],
            "cluster_keywords_details": [
              {
                "keyword": "relocation portland",
                "search_volume": 30,
                "cpc": 25.18,
                "competition": 0.4000000059604645,
                "base_value_score": 755.4,
                "arbitrage_score": 1638.611692,
                "velocity": 78,
                "t_mid_base": 25.5,
                "t_mid_low": 21.1,
                "t_mid_high": 29.9,
                "potential_roi": 1200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 49,
                      "high": 64,
                      "base": 57
                    },
                    "t": {
                      "low": 39.5,
                      "high": 55.2,
                      "base": 47.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.1,
                      "high": 29.9,
                      "base": 25.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 84,
                      "high": 90,
                      "base": 87
                    },
                    "t": {
                      "low": 14.4,
                      "high": 20.5,
                      "base": 17.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.31
              }
            ],
            "aggregate_search_volume": 30,
            "average_competition": 0.4,
            "average_velocity": 78,
            "average_cpc": 25.18,
            "average_t_mid_base": 25.5,
            "base_value_score": 755.4,
            "value_score": 755.4
          },
          {
            "primary": "moving company beaverton",
            "related": [
              "beaverton oregon moving companies",
              "hillsboro moving company",
              "moving company hillsboro",
              "long distance moving company portland",
              "moving company gresham",
              "moving company oregon city",
              "oregon city moving company"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "moving company beaverton",
                "search_volume": 1600,
                "cpc": 12.08,
                "competition": 0.20999999344348907,
                "base_value_score": 19328,
                "arbitrage_score": 78187.704339,
                "velocity": 90,
                "t_mid_base": 13.6,
                "t_mid_low": 11.2,
                "t_mid_high": 16,
                "potential_roi": 64000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 79
                    },
                    "t": {
                      "low": 20.9,
                      "high": 29.5,
                      "base": 25.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.2,
                      "high": 16,
                      "base": 13.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.6,
                      "high": 10.9,
                      "base": 9.3
                    }
                  }
                },
                "normalized_arbitrage_score": 15.84
              },
              {
                "keyword": "beaverton oregon moving companies",
                "search_volume": 1600,
                "cpc": 12.08,
                "competition": 0.20999999344348907,
                "base_value_score": 19328,
                "arbitrage_score": 78187.704339,
                "velocity": 90,
                "t_mid_base": 13.6,
                "t_mid_low": 11.2,
                "t_mid_high": 16,
                "potential_roi": 64000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 79
                    },
                    "t": {
                      "low": 20.9,
                      "high": 29.5,
                      "base": 25.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.2,
                      "high": 16,
                      "base": 13.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.6,
                      "high": 10.9,
                      "base": 9.3
                    }
                  }
                },
                "normalized_arbitrage_score": 15.84
              },
              {
                "keyword": "hillsboro moving company",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "moving company hillsboro",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "long distance moving company portland",
                "search_volume": 50,
                "cpc": 64.52,
                "competition": 0.6000000238418579,
                "base_value_score": 3226,
                "arbitrage_score": 4623.101017,
                "velocity": 60,
                "t_mid_base": 43.9,
                "t_mid_low": 36.5,
                "t_mid_high": 51.2,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 9,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.3,
                      "high": 94.6,
                      "base": 81.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.5,
                      "high": 51.2,
                      "base": 43.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.9,
                      "high": 35.1,
                      "base": 30
                    }
                  }
                },
                "normalized_arbitrage_score": 1.88
              },
              {
                "keyword": "moving company gresham",
                "search_volume": 90,
                "cpc": 22.65,
                "competition": 0.5299999713897705,
                "base_value_score": 2038.5,
                "arbitrage_score": 3348.390433,
                "velocity": 70,
                "t_mid_base": 34.4,
                "t_mid_low": 28.6,
                "t_mid_high": 40.2,
                "potential_roi": 3600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 30,
                      "high": 51,
                      "base": 40
                    },
                    "t": {
                      "low": 53.4,
                      "high": 74.4,
                      "base": 63.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 64,
                      "high": 75,
                      "base": 70
                    },
                    "t": {
                      "low": 28.6,
                      "high": 40.2,
                      "base": 34.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 76,
                      "high": 84,
                      "base": 80
                    },
                    "t": {
                      "low": 19.5,
                      "high": 27.6,
                      "base": 23.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.64
              },
              {
                "keyword": "moving company oregon city",
                "search_volume": 110,
                "cpc": 19.33,
                "competition": 0.7200000286102295,
                "base_value_score": 2126.3,
                "arbitrage_score": 2586.739569,
                "velocity": 58,
                "t_mid_base": 46,
                "t_mid_low": 38.3,
                "t_mid_high": 53.7,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 5,
                      "high": 32,
                      "base": 18
                    },
                    "t": {
                      "low": 71.7,
                      "high": 99.2,
                      "base": 85.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 50,
                      "high": 66,
                      "base": 58
                    },
                    "t": {
                      "low": 38.3,
                      "high": 53.7,
                      "base": 46
                    }
                  },
                  "high": {
                    "v": {
                      "low": 67,
                      "high": 78,
                      "base": 72
                    },
                    "t": {
                      "low": 26.1,
                      "high": 36.8,
                      "base": 31.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.49
              },
              {
                "keyword": "oregon city moving company",
                "search_volume": 110,
                "cpc": 19.33,
                "competition": 0.7200000286102295,
                "base_value_score": 2126.3,
                "arbitrage_score": 2586.739569,
                "velocity": 58,
                "t_mid_base": 46,
                "t_mid_low": 38.3,
                "t_mid_high": 53.7,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 5,
                      "high": 32,
                      "base": 18
                    },
                    "t": {
                      "low": 71.7,
                      "high": 99.2,
                      "base": 85.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 50,
                      "high": 66,
                      "base": 58
                    },
                    "t": {
                      "low": 38.3,
                      "high": 53.7,
                      "base": 46
                    }
                  },
                  "high": {
                    "v": {
                      "low": 67,
                      "high": 78,
                      "base": 72
                    },
                    "t": {
                      "low": 26.1,
                      "high": 36.8,
                      "base": 31.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.49
              }
            ],
            "aggregate_search_volume": 4520,
            "average_competition": 0.54,
            "average_velocity": 68.62,
            "average_cpc": 22.65,
            "average_t_mid_base": 35.29,
            "base_value_score": 102378,
            "value_score": 102378
          },
          {
            "primary": "local movers portland oregon",
            "related": [
              "movers beaverton oregon",
              "affordable movers portland",
              "cheap movers portland",
              "cheap portland movers",
              "movers hillsboro oregon",
              "hillsboro oregon movers",
              "movers in hillsboro oregon",
              "movers tigard oregon",
              "movers gresham oregon",
              "long distance moving companies portland oregon",
              "long distance movers portland or",
              "movers oregon city",
              "movers in oregon city",
              "oregon city movers",
              "furniture moving portland oregon",
              "portland long distance movers",
              "moving service portland oregon",
              "movers lake oswego oregon",
              "hire movers portland",
              "long distance movers portland",
              "commercial movers portland",
              "commercial movers portland oregon",
              "commercial moving companies portland oregon"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "local movers portland oregon",
                "search_volume": 390,
                "cpc": 36.66,
                "competition": 0.10000000149011612,
                "base_value_score": 14297.4,
                "arbitrage_score": 114930.866791,
                "velocity": 97,
                "t_mid_base": 7.2,
                "t_mid_low": 5.9,
                "t_mid_high": 8.5,
                "potential_roi": 15600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 91
                    },
                    "t": {
                      "low": 11,
                      "high": 15.8,
                      "base": 13.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 96,
                      "high": 98,
                      "base": 97
                    },
                    "t": {
                      "low": 5.9,
                      "high": 8.5,
                      "base": 7.2
                    }
                  },
                  "high": {
                    "v": {
                      "low": 98,
                      "high": 100,
                      "base": 99
                    },
                    "t": {
                      "low": 4,
                      "high": 5.9,
                      "base": 4.9
                    }
                  }
                },
                "normalized_arbitrage_score": 22.82
              },
              {
                "keyword": "movers beaverton oregon",
                "search_volume": 1600,
                "cpc": 12.08,
                "competition": 0.20999999344348907,
                "base_value_score": 19328,
                "arbitrage_score": 78187.704339,
                "velocity": 90,
                "t_mid_base": 13.6,
                "t_mid_low": 11.2,
                "t_mid_high": 16,
                "potential_roi": 64000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 79
                    },
                    "t": {
                      "low": 20.9,
                      "high": 29.5,
                      "base": 25.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.2,
                      "high": 16,
                      "base": 13.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.6,
                      "high": 10.9,
                      "base": 9.3
                    }
                  }
                },
                "normalized_arbitrage_score": 15.84
              },
              {
                "keyword": "affordable movers portland",
                "search_volume": 480,
                "cpc": 21.32,
                "competition": 0.5899999737739563,
                "base_value_score": 10233.6,
                "arbitrage_score": 15053.839945,
                "velocity": 64,
                "t_mid_base": 39.9,
                "t_mid_low": 33.2,
                "t_mid_high": 46.6,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 18,
                      "high": 42,
                      "base": 30
                    },
                    "t": {
                      "low": 62,
                      "high": 86.1,
                      "base": 74.1
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 57,
                      "high": 71,
                      "base": 64
                    },
                    "t": {
                      "low": 33.2,
                      "high": 46.6,
                      "base": 39.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 72,
                      "high": 81,
                      "base": 77
                    },
                    "t": {
                      "low": 22.6,
                      "high": 32,
                      "base": 27.3
                    }
                  }
                },
                "normalized_arbitrage_score": 3.86
              },
              {
                "keyword": "cheap movers portland",
                "search_volume": 390,
                "cpc": 21.2,
                "competition": 0.5699999928474426,
                "base_value_score": 8268,
                "arbitrage_score": 12592.141471,
                "velocity": 66,
                "t_mid_base": 38.3,
                "t_mid_low": 31.8,
                "t_mid_high": 44.7,
                "potential_roi": 15600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 21,
                      "high": 44,
                      "base": 33
                    },
                    "t": {
                      "low": 59.5,
                      "high": 82.7,
                      "base": 71.1
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 59,
                      "high": 72,
                      "base": 66
                    },
                    "t": {
                      "low": 31.8,
                      "high": 44.7,
                      "base": 38.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 73,
                      "high": 82,
                      "base": 78
                    },
                    "t": {
                      "low": 21.7,
                      "high": 30.7,
                      "base": 26.2
                    }
                  }
                },
                "normalized_arbitrage_score": 3.39
              },
              {
                "keyword": "cheap portland movers",
                "search_volume": 390,
                "cpc": 21.2,
                "competition": 0.5699999928474426,
                "base_value_score": 8268,
                "arbitrage_score": 12592.141471,
                "velocity": 66,
                "t_mid_base": 38.3,
                "t_mid_low": 31.8,
                "t_mid_high": 44.7,
                "potential_roi": 15600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 21,
                      "high": 44,
                      "base": 33
                    },
                    "t": {
                      "low": 59.5,
                      "high": 82.7,
                      "base": 71.1
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 59,
                      "high": 72,
                      "base": 66
                    },
                    "t": {
                      "low": 31.8,
                      "high": 44.7,
                      "base": 38.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 73,
                      "high": 82,
                      "base": 78
                    },
                    "t": {
                      "low": 21.7,
                      "high": 30.7,
                      "base": 26.2
                    }
                  }
                },
                "normalized_arbitrage_score": 3.39
              },
              {
                "keyword": "movers hillsboro oregon",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "hillsboro oregon movers",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "movers in hillsboro oregon",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "movers tigard oregon",
                "search_volume": 320,
                "cpc": 20.28,
                "competition": 0.9399999976158142,
                "base_value_score": 6489.6,
                "arbitrage_score": 6037.960564,
                "velocity": 42,
                "t_mid_base": 62.4,
                "t_mid_low": 52.2,
                "t_mid_high": 72.6,
                "potential_roi": 12800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 6,
                      "base": 1
                    },
                    "t": {
                      "low": 97.5,
                      "high": 134.2,
                      "base": 115.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 31,
                      "high": 52,
                      "base": 42
                    },
                    "t": {
                      "low": 52.2,
                      "high": 72.6,
                      "base": 62.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.6,
                      "high": 49.8,
                      "base": 42.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.15
              },
              {
                "keyword": "movers gresham oregon",
                "search_volume": 140,
                "cpc": 26.36,
                "competition": 0.5600000023841858,
                "base_value_score": 3690.4,
                "arbitrage_score": 5719.776792,
                "velocity": 66,
                "t_mid_base": 37.6,
                "t_mid_low": 31.3,
                "t_mid_high": 43.9,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 23,
                      "high": 46,
                      "base": 34
                    },
                    "t": {
                      "low": 58.5,
                      "high": 81.2,
                      "base": 69.8
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 66
                    },
                    "t": {
                      "low": 31.3,
                      "high": 43.9,
                      "base": 37.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.3,
                      "high": 30.1,
                      "base": 25.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.09
              },
              {
                "keyword": "long distance moving companies portland oregon",
                "search_volume": 50,
                "cpc": 64.52,
                "competition": 0.6000000238418579,
                "base_value_score": 3226,
                "arbitrage_score": 4623.101017,
                "velocity": 60,
                "t_mid_base": 43.9,
                "t_mid_low": 36.5,
                "t_mid_high": 51.2,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 9,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.3,
                      "high": 94.6,
                      "base": 81.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.5,
                      "high": 51.2,
                      "base": 43.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.9,
                      "high": 35.1,
                      "base": 30
                    }
                  }
                },
                "normalized_arbitrage_score": 1.88
              },
              {
                "keyword": "long distance movers portland or",
                "search_volume": 30,
                "cpc": 76,
                "competition": 0.5099999904632568,
                "base_value_score": 2280,
                "arbitrage_score": 3833.221312,
                "velocity": 67,
                "t_mid_base": 37.4,
                "t_mid_low": 31.1,
                "t_mid_high": 43.7,
                "potential_roi": 1200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 23,
                      "high": 46,
                      "base": 34
                    },
                    "t": {
                      "low": 58.2,
                      "high": 80.9,
                      "base": 69.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 67
                    },
                    "t": {
                      "low": 31.1,
                      "high": 43.7,
                      "base": 37.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.2,
                      "high": 30,
                      "base": 25.6
                    }
                  }
                },
                "normalized_arbitrage_score": 1.73
              },
              {
                "keyword": "movers oregon city",
                "search_volume": 110,
                "cpc": 19.33,
                "competition": 0.7200000286102295,
                "base_value_score": 2126.3,
                "arbitrage_score": 2586.739569,
                "velocity": 58,
                "t_mid_base": 46,
                "t_mid_low": 38.3,
                "t_mid_high": 53.7,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 5,
                      "high": 32,
                      "base": 18
                    },
                    "t": {
                      "low": 71.7,
                      "high": 99.2,
                      "base": 85.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 50,
                      "high": 66,
                      "base": 58
                    },
                    "t": {
                      "low": 38.3,
                      "high": 53.7,
                      "base": 46
                    }
                  },
                  "high": {
                    "v": {
                      "low": 67,
                      "high": 78,
                      "base": 72
                    },
                    "t": {
                      "low": 26.1,
                      "high": 36.8,
                      "base": 31.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.49
              },
              {
                "keyword": "movers in oregon city",
                "search_volume": 110,
                "cpc": 19.33,
                "competition": 0.7200000286102295,
                "base_value_score": 2126.3,
                "arbitrage_score": 2586.739569,
                "velocity": 58,
                "t_mid_base": 46,
                "t_mid_low": 38.3,
                "t_mid_high": 53.7,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 5,
                      "high": 32,
                      "base": 18
                    },
                    "t": {
                      "low": 71.7,
                      "high": 99.2,
                      "base": 85.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 50,
                      "high": 66,
                      "base": 58
                    },
                    "t": {
                      "low": 38.3,
                      "high": 53.7,
                      "base": 46
                    }
                  },
                  "high": {
                    "v": {
                      "low": 67,
                      "high": 78,
                      "base": 72
                    },
                    "t": {
                      "low": 26.1,
                      "high": 36.8,
                      "base": 31.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.49
              },
              {
                "keyword": "oregon city movers",
                "search_volume": 110,
                "cpc": 19.33,
                "competition": 0.7200000286102295,
                "base_value_score": 2126.3,
                "arbitrage_score": 2586.739569,
                "velocity": 58,
                "t_mid_base": 46,
                "t_mid_low": 38.3,
                "t_mid_high": 53.7,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 5,
                      "high": 32,
                      "base": 18
                    },
                    "t": {
                      "low": 71.7,
                      "high": 99.2,
                      "base": 85.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 50,
                      "high": 66,
                      "base": 58
                    },
                    "t": {
                      "low": 38.3,
                      "high": 53.7,
                      "base": 46
                    }
                  },
                  "high": {
                    "v": {
                      "low": 67,
                      "high": 78,
                      "base": 72
                    },
                    "t": {
                      "low": 26.1,
                      "high": 36.8,
                      "base": 31.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.49
              },
              {
                "keyword": "furniture moving portland oregon",
                "search_volume": 50,
                "cpc": 19.89,
                "competition": 0.41999998688697815,
                "base_value_score": 994.5,
                "arbitrage_score": 2060.712862,
                "velocity": 78,
                "t_mid_base": 26.3,
                "t_mid_low": 21.8,
                "t_mid_high": 30.8,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 47,
                      "high": 63,
                      "base": 55
                    },
                    "t": {
                      "low": 40.8,
                      "high": 57,
                      "base": 48.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 73,
                      "high": 82,
                      "base": 78
                    },
                    "t": {
                      "low": 21.8,
                      "high": 30.8,
                      "base": 26.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 83,
                      "high": 89,
                      "base": 86
                    },
                    "t": {
                      "low": 14.9,
                      "high": 21.2,
                      "base": 18
                    }
                  }
                },
                "normalized_arbitrage_score": 1.39
              },
              {
                "keyword": "portland long distance movers",
                "search_volume": 50,
                "cpc": 27.68,
                "competition": 0.6499999761581421,
                "base_value_score": 1384,
                "arbitrage_score": 1857.219598,
                "velocity": 61,
                "t_mid_base": 42.6,
                "t_mid_low": 35.5,
                "t_mid_high": 49.7,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 12,
                      "high": 38,
                      "base": 25
                    },
                    "t": {
                      "low": 66.3,
                      "high": 92,
                      "base": 79.1
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.5,
                      "high": 49.7,
                      "base": 42.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 75
                    },
                    "t": {
                      "low": 24.2,
                      "high": 34.1,
                      "base": 29.2
                    }
                  }
                },
                "normalized_arbitrage_score": 1.35
              },
              {
                "keyword": "moving service portland oregon",
                "search_volume": 30,
                "cpc": 60.29,
                "competition": 0.8799999952316284,
                "base_value_score": 1808.7,
                "arbitrage_score": 1780.917692,
                "velocity": 41,
                "t_mid_base": 62.8,
                "t_mid_low": 52.5,
                "t_mid_high": 73.1,
                "potential_roi": 1200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 6,
                      "base": 1
                    },
                    "t": {
                      "low": 98.1,
                      "high": 135.1,
                      "base": 116.6
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 31,
                      "high": 52,
                      "base": 41
                    },
                    "t": {
                      "low": 52.5,
                      "high": 73.1,
                      "base": 62.8
                    }
                  },
                  "high": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.8,
                      "high": 50.2,
                      "base": 43
                    }
                  }
                },
                "normalized_arbitrage_score": 1.34
              },
              {
                "keyword": "movers lake oswego oregon",
                "search_volume": 90,
                "cpc": 16.76,
                "competition": 0.7599999904632568,
                "base_value_score": 1508.4,
                "arbitrage_score": 1744.62181,
                "velocity": 57,
                "t_mid_base": 47.3,
                "t_mid_low": 39.5,
                "t_mid_high": 55.2,
                "potential_roi": 3600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 2,
                      "high": 30,
                      "base": 16
                    },
                    "t": {
                      "low": 73.7,
                      "high": 102,
                      "base": 87.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 49,
                      "high": 64,
                      "base": 57
                    },
                    "t": {
                      "low": 39.5,
                      "high": 55.2,
                      "base": 47.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 66,
                      "high": 77,
                      "base": 72
                    },
                    "t": {
                      "low": 26.9,
                      "high": 37.9,
                      "base": 32.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.33
              },
              {
                "keyword": "hire movers portland",
                "search_volume": 20,
                "cpc": 18.82,
                "competition": 0.7099999785423279,
                "base_value_score": 376.4,
                "arbitrage_score": 466.997531,
                "velocity": 61,
                "t_mid_base": 43,
                "t_mid_low": 35.8,
                "t_mid_high": 50.1,
                "potential_roi": 800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 11,
                      "high": 37,
                      "base": 24
                    },
                    "t": {
                      "low": 66.9,
                      "high": 92.7,
                      "base": 79.8
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.8,
                      "high": 50.1,
                      "base": 43
                    }
                  },
                  "high": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 75
                    },
                    "t": {
                      "low": 24.4,
                      "high": 34.4,
                      "base": 29.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.09
              },
              {
                "keyword": "long distance movers portland",
                "search_volume": 30,
                "cpc": 8.24,
                "competition": 0.5,
                "base_value_score": 247.2,
                "arbitrage_score": 437.987243,
                "velocity": 77,
                "t_mid_base": 27.2,
                "t_mid_low": 22.5,
                "t_mid_high": 31.8,
                "potential_roi": 1200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 45,
                      "high": 62,
                      "base": 54
                    },
                    "t": {
                      "low": 42.1,
                      "high": 58.9,
                      "base": 50.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 72,
                      "high": 82,
                      "base": 77
                    },
                    "t": {
                      "low": 22.5,
                      "high": 31.8,
                      "base": 27.2
                    }
                  },
                  "high": {
                    "v": {
                      "low": 82,
                      "high": 89,
                      "base": 85
                    },
                    "t": {
                      "low": 15.4,
                      "high": 21.8,
                      "base": 18.6
                    }
                  }
                },
                "normalized_arbitrage_score": 1.08
              },
              {
                "keyword": "commercial movers portland",
                "search_volume": 40,
                "cpc": 0.55,
                "competition": 0.4099999964237213,
                "base_value_score": 22,
                "arbitrage_score": 48.694113,
                "velocity": 88,
                "t_mid_base": 15.9,
                "t_mid_low": 13.1,
                "t_mid_high": 18.7,
                "potential_roi": 1600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 74
                    },
                    "t": {
                      "low": 24.5,
                      "high": 34.5,
                      "base": 29.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 85,
                      "high": 91,
                      "base": 88
                    },
                    "t": {
                      "low": 13.1,
                      "high": 18.7,
                      "base": 15.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 91,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 8.9,
                      "high": 12.8,
                      "base": 10.9
                    }
                  }
                },
                "normalized_arbitrage_score": 1.01
              },
              {
                "keyword": "commercial movers portland oregon",
                "search_volume": 40,
                "cpc": 0.55,
                "competition": 0.4099999964237213,
                "base_value_score": 22,
                "arbitrage_score": 48.694113,
                "velocity": 88,
                "t_mid_base": 15.9,
                "t_mid_low": 13.1,
                "t_mid_high": 18.7,
                "potential_roi": 1600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 74
                    },
                    "t": {
                      "low": 24.5,
                      "high": 34.5,
                      "base": 29.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 85,
                      "high": 91,
                      "base": 88
                    },
                    "t": {
                      "low": 13.1,
                      "high": 18.7,
                      "base": 15.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 91,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 8.9,
                      "high": 12.8,
                      "base": 10.9
                    }
                  }
                },
                "normalized_arbitrage_score": 1.01
              },
              {
                "keyword": "commercial moving companies portland oregon",
                "search_volume": 40,
                "cpc": 0.55,
                "competition": 0.4099999964237213,
                "base_value_score": 22,
                "arbitrage_score": 48.694113,
                "velocity": 88,
                "t_mid_base": 15.9,
                "t_mid_low": 13.1,
                "t_mid_high": 18.7,
                "potential_roi": 1600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 74
                    },
                    "t": {
                      "low": 24.5,
                      "high": 34.5,
                      "base": 29.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 85,
                      "high": 91,
                      "base": 88
                    },
                    "t": {
                      "low": 13.1,
                      "high": 18.7,
                      "base": 15.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 91,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 8.9,
                      "high": 12.8,
                      "base": 10.9
                    }
                  }
                },
                "normalized_arbitrage_score": 1.01
              }
            ],
            "aggregate_search_volume": 5950,
            "average_competition": 0.58,
            "average_velocity": 67.25,
            "average_cpc": 23.21,
            "average_t_mid_base": 36.75,
            "base_value_score": 138099.5,
            "value_score": 138099.5
          },
          {
            "primary": "movers hillsboro",
            "related": [
              "movers hillsboro or",
              "movers in hillsboro",
              "hillsboro movers",
              "hillsboro or movers"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "movers hillsboro",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "movers hillsboro or",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "movers in hillsboro",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "hillsboro movers",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "hillsboro or movers",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              }
            ],
            "aggregate_search_volume": 2400,
            "average_competition": 0.63,
            "average_velocity": 63,
            "average_cpc": 16.36,
            "average_t_mid_base": 41.1,
            "base_value_score": 39264,
            "value_score": 39264
          },
          {
            "primary": "moving companies tigard",
            "related": [
              "moving companies hillsboro or",
              "moving companies hillsboro",
              "hillsboro moving companies",
              "moving companies hillsboro oregon",
              "moving companies in hillsboro oregon",
              "moving companies tigard oregon",
              "moving companies gresham or",
              "gresham moving companies",
              "long distance moving companies portland",
              "moving companies gresham",
              "moving companies gresham oregon",
              "moving companies oregon city",
              "lake oswego moving companies",
              "commercial moving companies portland"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "moving companies tigard",
                "search_volume": 390,
                "cpc": 17.73,
                "competition": 0.20999999344348907,
                "base_value_score": 6914.7,
                "arbitrage_score": 27926.898962,
                "velocity": 90,
                "t_mid_base": 13.8,
                "t_mid_low": 11.3,
                "t_mid_high": 16.2,
                "potential_roi": 15600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.2,
                      "high": 29.9,
                      "base": 25.6
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 88,
                      "high": 93,
                      "base": 90
                    },
                    "t": {
                      "low": 11.3,
                      "high": 16.2,
                      "base": 13.8
                    }
                  },
                  "high": {
                    "v": {
                      "low": 93,
                      "high": 96,
                      "base": 95
                    },
                    "t": {
                      "low": 7.7,
                      "high": 11.1,
                      "base": 9.4
                    }
                  }
                },
                "normalized_arbitrage_score": 6.3
              },
              {
                "keyword": "moving companies hillsboro or",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "moving companies hillsboro",
                "search_volume": 480,
                "cpc": 16.36,
                "competition": 0.6299999952316284,
                "base_value_score": 7852.8,
                "arbitrage_score": 10873.442332,
                "velocity": 63,
                "t_mid_base": 41.1,
                "t_mid_low": 34.2,
                "t_mid_high": 47.9,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 15,
                      "high": 40,
                      "base": 28
                    },
                    "t": {
                      "low": 63.9,
                      "high": 88.6,
                      "base": 76.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 56,
                      "high": 70,
                      "base": 63
                    },
                    "t": {
                      "low": 34.2,
                      "high": 47.9,
                      "base": 41.1
                    }
                  },
                  "high": {
                    "v": {
                      "low": 71,
                      "high": 81,
                      "base": 76
                    },
                    "t": {
                      "low": 23.3,
                      "high": 32.9,
                      "base": 28.1
                    }
                  }
                },
                "normalized_arbitrage_score": 3.06
              },
              {
                "keyword": "hillsboro moving companies",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "moving companies hillsboro oregon",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "moving companies in hillsboro oregon",
                "search_volume": 480,
                "cpc": 14.86,
                "competition": 0.6800000071525574,
                "base_value_score": 7132.8,
                "arbitrage_score": 9175.199298,
                "velocity": 60,
                "t_mid_base": 43.7,
                "t_mid_low": 36.4,
                "t_mid_high": 51,
                "potential_roi": 19200,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 10,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.1,
                      "high": 94.3,
                      "base": 81.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.4,
                      "high": 51,
                      "base": 43.7
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.8,
                      "high": 35,
                      "base": 29.9
                    }
                  }
                },
                "normalized_arbitrage_score": 2.74
              },
              {
                "keyword": "moving companies tigard oregon",
                "search_volume": 320,
                "cpc": 20.28,
                "competition": 0.9399999976158142,
                "base_value_score": 6489.6,
                "arbitrage_score": 6037.960564,
                "velocity": 42,
                "t_mid_base": 62.4,
                "t_mid_low": 52.2,
                "t_mid_high": 72.6,
                "potential_roi": 12800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 6,
                      "base": 1
                    },
                    "t": {
                      "low": 97.5,
                      "high": 134.2,
                      "base": 115.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 31,
                      "high": 52,
                      "base": 42
                    },
                    "t": {
                      "low": 52.2,
                      "high": 72.6,
                      "base": 62.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.6,
                      "high": 49.8,
                      "base": 42.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.15
              },
              {
                "keyword": "moving companies gresham or",
                "search_volume": 140,
                "cpc": 26.36,
                "competition": 0.5600000023841858,
                "base_value_score": 3690.4,
                "arbitrage_score": 5719.776792,
                "velocity": 66,
                "t_mid_base": 37.6,
                "t_mid_low": 31.3,
                "t_mid_high": 43.9,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 23,
                      "high": 46,
                      "base": 34
                    },
                    "t": {
                      "low": 58.5,
                      "high": 81.2,
                      "base": 69.8
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 66
                    },
                    "t": {
                      "low": 31.3,
                      "high": 43.9,
                      "base": 37.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.3,
                      "high": 30.1,
                      "base": 25.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.09
              },
              {
                "keyword": "gresham moving companies",
                "search_volume": 140,
                "cpc": 26.36,
                "competition": 0.5600000023841858,
                "base_value_score": 3690.4,
                "arbitrage_score": 5719.776792,
                "velocity": 66,
                "t_mid_base": 37.6,
                "t_mid_low": 31.3,
                "t_mid_high": 43.9,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 23,
                      "high": 46,
                      "base": 34
                    },
                    "t": {
                      "low": 58.5,
                      "high": 81.2,
                      "base": 69.8
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 66
                    },
                    "t": {
                      "low": 31.3,
                      "high": 43.9,
                      "base": 37.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.3,
                      "high": 30.1,
                      "base": 25.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.09
              },
              {
                "keyword": "long distance moving companies portland",
                "search_volume": 50,
                "cpc": 64.52,
                "competition": 0.6000000238418579,
                "base_value_score": 3226,
                "arbitrage_score": 4623.101017,
                "velocity": 60,
                "t_mid_base": 43.9,
                "t_mid_low": 36.5,
                "t_mid_high": 51.2,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 9,
                      "high": 36,
                      "base": 23
                    },
                    "t": {
                      "low": 68.3,
                      "high": 94.6,
                      "base": 81.4
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 53,
                      "high": 68,
                      "base": 60
                    },
                    "t": {
                      "low": 36.5,
                      "high": 51.2,
                      "base": 43.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 69,
                      "high": 79,
                      "base": 74
                    },
                    "t": {
                      "low": 24.9,
                      "high": 35.1,
                      "base": 30
                    }
                  }
                },
                "normalized_arbitrage_score": 1.88
              },
              {
                "keyword": "moving companies gresham",
                "search_volume": 90,
                "cpc": 22.65,
                "competition": 0.5299999713897705,
                "base_value_score": 2038.5,
                "arbitrage_score": 3348.390433,
                "velocity": 70,
                "t_mid_base": 34.4,
                "t_mid_low": 28.6,
                "t_mid_high": 40.2,
                "potential_roi": 3600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 30,
                      "high": 51,
                      "base": 40
                    },
                    "t": {
                      "low": 53.4,
                      "high": 74.4,
                      "base": 63.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 64,
                      "high": 75,
                      "base": 70
                    },
                    "t": {
                      "low": 28.6,
                      "high": 40.2,
                      "base": 34.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 76,
                      "high": 84,
                      "base": 80
                    },
                    "t": {
                      "low": 19.5,
                      "high": 27.6,
                      "base": 23.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.64
              },
              {
                "keyword": "moving companies gresham oregon",
                "search_volume": 140,
                "cpc": 17.29,
                "competition": 0.8600000143051147,
                "base_value_score": 2420.6,
                "arbitrage_score": 2472.522947,
                "velocity": 50,
                "t_mid_base": 54.5,
                "t_mid_low": 45.5,
                "t_mid_high": 63.5,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 19,
                      "base": 3
                    },
                    "t": {
                      "low": 85,
                      "high": 117.4,
                      "base": 101.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 40,
                      "high": 58,
                      "base": 50
                    },
                    "t": {
                      "low": 45.5,
                      "high": 63.5,
                      "base": 54.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 67
                    },
                    "t": {
                      "low": 31,
                      "high": 43.6,
                      "base": 37.3
                    }
                  }
                },
                "normalized_arbitrage_score": 1.47
              },
              {
                "keyword": "moving companies oregon city",
                "search_volume": 110,
                "cpc": 19.53,
                "competition": 0.8799999952316284,
                "base_value_score": 2148.3,
                "arbitrage_score": 2142.728915,
                "velocity": 48,
                "t_mid_base": 56.3,
                "t_mid_low": 47,
                "t_mid_high": 65.6,
                "potential_roi": 4400,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 16,
                      "base": 1
                    },
                    "t": {
                      "low": 87.9,
                      "high": 121.3,
                      "base": 104.6
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 38,
                      "high": 57,
                      "base": 48
                    },
                    "t": {
                      "low": 47,
                      "high": 65.6,
                      "base": 56.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 59,
                      "high": 72,
                      "base": 66
                    },
                    "t": {
                      "low": 32.1,
                      "high": 45,
                      "base": 38.5
                    }
                  }
                },
                "normalized_arbitrage_score": 1.41
              },
              {
                "keyword": "lake oswego moving companies",
                "search_volume": 90,
                "cpc": 16.76,
                "competition": 0.7599999904632568,
                "base_value_score": 1508.4,
                "arbitrage_score": 1744.62181,
                "velocity": 57,
                "t_mid_base": 47.3,
                "t_mid_low": 39.5,
                "t_mid_high": 55.2,
                "potential_roi": 3600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 2,
                      "high": 30,
                      "base": 16
                    },
                    "t": {
                      "low": 73.7,
                      "high": 102,
                      "base": 87.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 49,
                      "high": 64,
                      "base": 57
                    },
                    "t": {
                      "low": 39.5,
                      "high": 55.2,
                      "base": 47.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 66,
                      "high": 77,
                      "base": 72
                    },
                    "t": {
                      "low": 26.9,
                      "high": 37.9,
                      "base": 32.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.33
              },
              {
                "keyword": "commercial moving companies portland",
                "search_volume": 40,
                "cpc": 0.55,
                "competition": 0.4099999964237213,
                "base_value_score": 22,
                "arbitrage_score": 48.694113,
                "velocity": 88,
                "t_mid_base": 15.9,
                "t_mid_low": 13.1,
                "t_mid_high": 18.7,
                "potential_roi": 1600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 74
                    },
                    "t": {
                      "low": 24.5,
                      "high": 34.5,
                      "base": 29.5
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 85,
                      "high": 91,
                      "base": 88
                    },
                    "t": {
                      "low": 13.1,
                      "high": 18.7,
                      "base": 15.9
                    }
                  },
                  "high": {
                    "v": {
                      "low": 91,
                      "high": 95,
                      "base": 93
                    },
                    "t": {
                      "low": 8.9,
                      "high": 12.8,
                      "base": 10.9
                    }
                  }
                },
                "normalized_arbitrage_score": 1.01
              }
            ],
            "aggregate_search_volume": 3910,
            "average_competition": 0.64,
            "average_velocity": 62.87,
            "average_cpc": 20.62,
            "average_t_mid_base": 41.13,
            "base_value_score": 80624.2,
            "value_score": 80624.2
          },
          {
            "primary": "long distance moving portland",
            "related": [],
            "cluster_keywords_details": [
              {
                "keyword": "long distance moving portland",
                "search_volume": 50,
                "cpc": 27.68,
                "competition": 0.6499999761581421,
                "base_value_score": 1384,
                "arbitrage_score": 1857.219598,
                "velocity": 61,
                "t_mid_base": 42.6,
                "t_mid_low": 35.5,
                "t_mid_high": 49.7,
                "potential_roi": 2000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 12,
                      "high": 38,
                      "base": 25
                    },
                    "t": {
                      "low": 66.3,
                      "high": 92,
                      "base": 79.1
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.5,
                      "high": 49.7,
                      "base": 42.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 70,
                      "high": 80,
                      "base": 75
                    },
                    "t": {
                      "low": 24.2,
                      "high": 34.1,
                      "base": 29.2
                    }
                  }
                },
                "normalized_arbitrage_score": 1.35
              }
            ],
            "aggregate_search_volume": 50,
            "average_competition": 0.65,
            "average_velocity": 61,
            "average_cpc": 27.68,
            "average_t_mid_base": 42.6,
            "base_value_score": 1384,
            "value_score": 1384
          },
          {
            "primary": "movers gresham",
            "related": [
              "gresham movers"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "movers gresham",
                "search_volume": 140,
                "cpc": 26.36,
                "competition": 0.5600000023841858,
                "base_value_score": 3690.4,
                "arbitrage_score": 5719.776792,
                "velocity": 66,
                "t_mid_base": 37.6,
                "t_mid_low": 31.3,
                "t_mid_high": 43.9,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 23,
                      "high": 46,
                      "base": 34
                    },
                    "t": {
                      "low": 58.5,
                      "high": 81.2,
                      "base": 69.8
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 66
                    },
                    "t": {
                      "low": 31.3,
                      "high": 43.9,
                      "base": 37.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 74,
                      "high": 83,
                      "base": 78
                    },
                    "t": {
                      "low": 21.3,
                      "high": 30.1,
                      "base": 25.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.09
              },
              {
                "keyword": "gresham movers",
                "search_volume": 140,
                "cpc": 17.29,
                "competition": 0.8600000143051147,
                "base_value_score": 2420.6,
                "arbitrage_score": 2472.522947,
                "velocity": 50,
                "t_mid_base": 54.5,
                "t_mid_low": 45.5,
                "t_mid_high": 63.5,
                "potential_roi": 5600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 19,
                      "base": 3
                    },
                    "t": {
                      "low": 85,
                      "high": 117.4,
                      "base": 101.2
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 40,
                      "high": 58,
                      "base": 50
                    },
                    "t": {
                      "low": 45.5,
                      "high": 63.5,
                      "base": 54.5
                    }
                  },
                  "high": {
                    "v": {
                      "low": 60,
                      "high": 73,
                      "base": 67
                    },
                    "t": {
                      "low": 31,
                      "high": 43.6,
                      "base": 37.3
                    }
                  }
                },
                "normalized_arbitrage_score": 1.47
              }
            ],
            "aggregate_search_volume": 280,
            "average_competition": 0.71,
            "average_velocity": 58,
            "average_cpc": 21.82,
            "average_t_mid_base": 46.05,
            "base_value_score": 6109.6,
            "value_score": 6109.6
          },
          {
            "primary": "movers lake oswego",
            "related": [
              "movers in lake oswego",
              "lake oswego movers"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "movers lake oswego",
                "search_volume": 90,
                "cpc": 16.76,
                "competition": 0.7599999904632568,
                "base_value_score": 1508.4,
                "arbitrage_score": 1744.62181,
                "velocity": 57,
                "t_mid_base": 47.3,
                "t_mid_low": 39.5,
                "t_mid_high": 55.2,
                "potential_roi": 3600,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 2,
                      "high": 30,
                      "base": 16
                    },
                    "t": {
                      "low": 73.7,
                      "high": 102,
                      "base": 87.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 49,
                      "high": 64,
                      "base": 57
                    },
                    "t": {
                      "low": 39.5,
                      "high": 55.2,
                      "base": 47.3
                    }
                  },
                  "high": {
                    "v": {
                      "low": 66,
                      "high": 77,
                      "base": 72
                    },
                    "t": {
                      "low": 26.9,
                      "high": 37.9,
                      "base": 32.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.33
              },
              {
                "keyword": "movers in lake oswego",
                "search_volume": 70,
                "cpc": 17.09,
                "competition": 0.9300000071525574,
                "base_value_score": 1196.3,
                "arbitrage_score": 1133.718719,
                "velocity": 46,
                "t_mid_base": 57.6,
                "t_mid_low": 48.2,
                "t_mid_high": 67.1,
                "potential_roi": 2800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 14,
                      "base": 1
                    },
                    "t": {
                      "low": 90,
                      "high": 124.1,
                      "base": 107
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 37,
                      "high": 56,
                      "base": 46
                    },
                    "t": {
                      "low": 48.2,
                      "high": 67.1,
                      "base": 57.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 58,
                      "high": 71,
                      "base": 65
                    },
                    "t": {
                      "low": 32.8,
                      "high": 46.1,
                      "base": 39.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.22
              },
              {
                "keyword": "lake oswego movers",
                "search_volume": 70,
                "cpc": 17.09,
                "competition": 0.9300000071525574,
                "base_value_score": 1196.3,
                "arbitrage_score": 1133.718719,
                "velocity": 46,
                "t_mid_base": 57.6,
                "t_mid_low": 48.2,
                "t_mid_high": 67.1,
                "potential_roi": 2800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 14,
                      "base": 1
                    },
                    "t": {
                      "low": 90,
                      "high": 124.1,
                      "base": 107
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 37,
                      "high": 56,
                      "base": 46
                    },
                    "t": {
                      "low": 48.2,
                      "high": 67.1,
                      "base": 57.6
                    }
                  },
                  "high": {
                    "v": {
                      "low": 58,
                      "high": 71,
                      "base": 65
                    },
                    "t": {
                      "low": 32.8,
                      "high": 46.1,
                      "base": 39.4
                    }
                  }
                },
                "normalized_arbitrage_score": 1.22
              }
            ],
            "aggregate_search_volume": 230,
            "average_competition": 0.87,
            "average_velocity": 49.67,
            "average_cpc": 16.98,
            "average_t_mid_base": 54.17,
            "base_value_score": 3905.4,
            "value_score": 3905.4
          },
          {
            "primary": "movers tigard",
            "related": [
              "tigard movers"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "movers tigard",
                "search_volume": 320,
                "cpc": 20.28,
                "competition": 0.9399999976158142,
                "base_value_score": 6489.6,
                "arbitrage_score": 6037.960564,
                "velocity": 42,
                "t_mid_base": 62.4,
                "t_mid_low": 52.2,
                "t_mid_high": 72.6,
                "potential_roi": 12800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 6,
                      "base": 1
                    },
                    "t": {
                      "low": 97.5,
                      "high": 134.2,
                      "base": 115.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 31,
                      "high": 52,
                      "base": 42
                    },
                    "t": {
                      "low": 52.2,
                      "high": 72.6,
                      "base": 62.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.6,
                      "high": 49.8,
                      "base": 42.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.15
              },
              {
                "keyword": "tigard movers",
                "search_volume": 320,
                "cpc": 20.28,
                "competition": 0.9399999976158142,
                "base_value_score": 6489.6,
                "arbitrage_score": 6037.960564,
                "velocity": 42,
                "t_mid_base": 62.4,
                "t_mid_low": 52.2,
                "t_mid_high": 72.6,
                "potential_roi": 12800,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 1,
                      "high": 6,
                      "base": 1
                    },
                    "t": {
                      "low": 97.5,
                      "high": 134.2,
                      "base": 115.9
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 31,
                      "high": 52,
                      "base": 42
                    },
                    "t": {
                      "low": 52.2,
                      "high": 72.6,
                      "base": 62.4
                    }
                  },
                  "high": {
                    "v": {
                      "low": 54,
                      "high": 68,
                      "base": 61
                    },
                    "t": {
                      "low": 35.6,
                      "high": 49.8,
                      "base": 42.7
                    }
                  }
                },
                "normalized_arbitrage_score": 2.15
              }
            ],
            "aggregate_search_volume": 640,
            "average_competition": 0.94,
            "average_velocity": 42,
            "average_cpc": 20.28,
            "average_t_mid_base": 62.4,
            "base_value_score": 12979.2,
            "value_score": 12979.2
          }
        ],
        "Band 3": [
          {
            "primary": "portland oregon moving companies",
            "related": [
              "moving company portland",
              "moving company portland oregon",
              "moving companies in portland",
              "portland moving company",
              "moving companies beaverton",
              "moving company beaverton oregon",
              "moving companies in beaverton",
              "how to move to portland oregon",
              "relocation portland oregon"
            ],
            "cluster_keywords_details": [
              {
                "keyword": "portland oregon moving companies",
                "search_volume": 8100,
                "cpc": 16.72,
                "competition": 0.28999999165534973,
                "base_value_score": 135432,
                "arbitrage_score": 397161.300042,
                "velocity": 84,
                "t_mid_base": 20.5,
                "t_mid_low": 16.9,
                "t_mid_high": 24,
                "potential_roi": 324000,
                "customer_domain_authority": {
                  "domain": "https://www.STRONGMANMOVER.com",
                  "keyword_count_top10": 0,
                  "traffic": 0
                },
                "ranking_estimates_by_authority": {
                  "low": {
                    "v": {
                      "low": 60,
                      "high": 72,
                      "base": 66
                    },
                    "t": {
                      "low": 31.6,
                      "high": 44.4,
                      "base": 38
                    }
                  },
                  "mid": {
                    "v": {
                      "low": 80,
                      "high": 87,
                      "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving company portland oregon",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90
                  },
                  "t": {
                    "low": 11.5,
                    "high": 16.5,
                    "base": 14
                  }
                }
              },
              "normalized_arbitrage_score": 76.39
            },
            {
              "keyword": "moving companies in portland",
              "search_volume": 8100,
              "cpc": 16.72,
              "competition": 0.28999999165534973,
              "base_value_score": 135432,
              "arbitrage_score": 397161.300042,
              "velocity": 84,
              "t_mid_base": 20.5,
              "t_mid_low": 16.9,
              "t_mid_high": 24,
              "potential_roi": 324000,
              "customer_domain_authority": {
                "domain": "https://www.STRONGMANMOVER.com",
                "keyword_count_top10": 0,
                "traffic": 0
              },
              "ranking_estimates_by_authority": {
                "low": {
                  "v": {
                    "low": 60,
                    "high": 72,
                    "base": 66
                  },
                  "t": {
                    "low": 31.6,
                    "high": 44.4,
                    "base": 38
                  }
                },
                "mid": {
                  "v": {
                    "low": 80,
                    "high": 87,
                    "base": 84
                  },
                  "t": {
                    "low": 16.9,
                    "high": 24,
                    "base": 20.5
                  }
                },
                "high": {
                  "v": {
                    "low": 88,
                    "high": 92,
                    "base": 90

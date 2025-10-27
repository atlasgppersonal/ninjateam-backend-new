# Chart Data Specifications for getPageMetadata function

This document outlines the specifications for various chart types used within the `getPageMetadata` function.

## `localCompetitorsList` (List)

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

## `arbitrageScatterChart` (Scatter Chart)

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

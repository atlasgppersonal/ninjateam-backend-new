import * as admin from "firebase-admin";
import { db } from './utils/firebase';
import { ArbitrageDataDocument, ScoredKeyword, BandedCluster } from './types/firestore'; // Import necessary interfaces
import * as functions from "firebase-functions/v2"; // Import functions for logging

// Define the interfaces for the expected output structure
interface ArbitrageScatterChartDataPoint {
  x: number; // Time to Rank (Weeks)
  y: number; // Potential Revenue ($)
  keyword: string;
  search_volume: number;
  velocity: number;
  competition: number;
  arbitrage_score: number;
  category: string;
  color: string; // Added color property
  size: number; // Added size property
}

interface ArbitrageScatterChartProps {
  requestId: string;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  xAxisMin: number;
  xAxisMax: number;
  yAxisMin: number;
  yAxisMax: number;
  secondXAxisGridLine: number;
  secondYAxisGridLine: number;
  data: ArbitrageScatterChartDataPoint[];
}

// Define the structure of the input arbitrage data for this processor
interface ProcessedArbitrageInput {
  category: string;
  arbitrageData: ArbitrageDataDocument;
}

export async function processArbitrageDataForChart(input: ProcessedArbitrageInput): Promise<ArbitrageScatterChartProps> {
  const category = input.category;
  const arbitrageData = input.arbitrageData;
  const allDataPoints: ArbitrageScatterChartDataPoint[] = [];

  let maxTime = 0;
  let maxRevenue = 0;
  let minRevenueTop4ShortTerm = Infinity;

  // Ensure scored_keywords is an array before processing
  if (!arbitrageData.scored_keywords || !Array.isArray(arbitrageData.scored_keywords)) {
    functions.logger.warn("processArbitrageDataForChart: scored_keywords is missing or not an array.");
    return {
      requestId: "arbitrageScatterChart",
      title: "Keyword Arbitrage Opportunities",
      xAxisLabel: "Time to Rank",
      yAxisLabel: "Potential Revenue",
      xAxisMin: 0,
      xAxisMax: 1,
      yAxisMin: 0,
      yAxisMax: 1,
      secondXAxisGridLine: 0,
      secondYAxisGridLine: 0,
      data: [],
    };
  }

  // Process all scored keywords to create initial data points and find max values
  for (const sk of arbitrageData.scored_keywords) {
    // Ensure necessary properties exist and are numbers
    const x = sk.ranking_estimates_by_authority?.mid?.t?.base ?? 0;
    const y = sk.potential_roi ?? 0;

    maxTime = Math.max(maxTime, x);
    maxRevenue = Math.max(maxRevenue, y);

    allDataPoints.push({
      x: x,
      y: y,
      keyword: sk.keyword,
      search_volume: sk.search_volume,
      velocity: sk.velocity ?? 0, // Provide fallback for optional velocity
      competition: sk.competition,
      arbitrage_score: sk.arbitrage_score,
      category: category,
      color: "grey", // Default color
      size: 5,       // Default size
    });
  }

  // Identify Top 4 Short-Term Clusters (Orange)
  const top4ShortTermKeywords = new Set<string>();
  if (arbitrageData.selected_top_4_clusters && Array.isArray(arbitrageData.selected_top_4_clusters)) {
    for (const cluster of arbitrageData.selected_top_4_clusters) {
      if (cluster.cluster_keywords_details && Array.isArray(cluster.cluster_keywords_details)) {
        for (const sk of cluster.cluster_keywords_details) {
          top4ShortTermKeywords.add(sk.keyword);
          minRevenueTop4ShortTerm = Math.min(minRevenueTop4ShortTerm, sk.potential_roi ?? Infinity);
        }
      }
    }
  }

  // Identify Top 4 Long-Term High-Value Clusters (Yellow)
  // Filter out keywords already in top4ShortTerm, sort by arbitrage_score, and take top 4
  const sortedByArbitrageScore = [...arbitrageData.scored_keywords]
    .filter(sk => !top4ShortTermKeywords.has(sk.keyword))
    .sort((a, b) => (b.arbitrage_score ?? 0) - (a.arbitrage_score ?? 0)); // Add fallback for arbitrage_score

  const top4LongTermKeywords = new Set<string>();
  for (let i = 0; i < Math.min(4, sortedByArbitrageScore.length); i++) {
    top4LongTermKeywords.add(sortedByArbitrageScore[i].keyword);
  }

  // Apply colors and sizes
  for (const dp of allDataPoints) {
    if (top4ShortTermKeywords.has(dp.keyword)) {
      dp.color = "orange";
      dp.size = 10; // Larger size for short-term
    } else if (top4LongTermKeywords.has(dp.keyword)) {
      dp.color = "yellow";
      dp.size = 7; // Slightly larger for long-term
    }
  }

  // Calculate dynamic axis ranges and grid lines
  const xAxisMax = maxTime + 5; // Add a buffer of 5 weeks
  const yAxisMax = maxRevenue * 1.2; // Add 20% buffer for revenue
  const secondXAxisGridLine = maxTime + 1; // Max time + 1 week
  const secondYAxisGridLine = minRevenueTop4ShortTerm - (maxRevenue * 0.05); // 5% buffer below min revenue of orange clusters

  // Ensure grid lines are not negative
  const finalSecondYAxisGridLine = Math.max(0, secondYAxisGridLine);

  return {
    requestId: "arbitrageScatterChart",
    title: "Keyword Arbitrage Opportunities",
    xAxisLabel: "Time to Rank",
    yAxisLabel: "Potential Revenue",
    xAxisMin: 0,
    xAxisMax: xAxisMax,
    yAxisMin: 0,
    yAxisMax: yAxisMax,
    secondXAxisGridLine: secondXAxisGridLine,
    secondYAxisGridLine: finalSecondYAxisGridLine,
    data: allDataPoints,
  };
}

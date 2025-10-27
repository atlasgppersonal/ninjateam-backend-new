import { ArbitrageDataDocument } from './types/firestore';
interface ArbitrageScatterChartDataPoint {
    x: number;
    y: number;
    keyword: string;
    search_volume: number;
    velocity: number;
    competition: number;
    arbitrage_score: number;
    category: string;
    color: string;
    size: number;
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
interface ProcessedArbitrageInput {
    category: string;
    arbitrageData: ArbitrageDataDocument;
}
export declare function processArbitrageDataForChart(input: ProcessedArbitrageInput): Promise<ArbitrageScatterChartProps>;
export {};

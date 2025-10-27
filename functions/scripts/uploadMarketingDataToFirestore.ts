import * as fs from 'fs';
import * as path from 'path';
import { db } from '../src/utils/firebase'; // Assuming firebase.ts exports 'db'
import { parseDataUsaMarkdown } from '../src/utils/dataUsaParser';
import { parseMarketingStrategyMarkdown } from '../src/utils/marketingStrategyParser';

const MARKETING_DATA_DIR = path.join(__dirname, '../../marketing-data');

async function uploadKeyDataPoints() {
    const files = fs.readdirSync(MARKETING_DATA_DIR);
    const dataUsaFiles = files.filter(file => file.endsWith('-KeyDataPoints(fromDataUSA).md'));

    for (const file of dataUsaFiles) {
        const filePath = path.join(MARKETING_DATA_DIR, file);
        const markdown = fs.readFileSync(filePath, 'utf-8');
        const parsedData = parseDataUsaMarkdown(markdown);

        const fileNameWithoutExtension = path.basename(file, '.md');
        const cityStateMatch = fileNameWithoutExtension.match(/(.*?),(\w{2})-KeyDataPoints/);

        if (cityStateMatch) {
            const city = cityStateMatch[1].replace(/ /g, '').toLowerCase(); // Remove spaces and convert to lowercase
            const state = cityStateMatch[2].toLowerCase();
            const docId = `${city}-${state}`;

            console.log(`Uploading data for ${city}, ${state} with ID: ${docId}`);

            try {
                await db.collection('dataUsaKeyPoints').doc(docId).set({
                    city: cityStateMatch[1], // Keep original case for display
                    state: cityStateMatch[2], // Keep original case for display
                    data: parsedData,
                    lastUpdated: new Date(),
                });
                console.log(`Successfully uploaded ${docId}`);
            } catch (error) {
                console.error(`Error uploading ${docId}:`, error);
            }
        } else {
            console.warn(`Could not parse city/state from filename: ${file}`);
        }
    }
}

async function uploadMarketingStrategy() {
    const filePath = path.join(MARKETING_DATA_DIR, 'Comprehensive Marketing Research Analysis for AI Platform SMB Strategy.md');
    if (!fs.existsSync(filePath)) {
        console.error(`Marketing strategy file not found: ${filePath}`);
        return;
    }

    const markdown = fs.readFileSync(filePath, 'utf-8');
    const parsedData = parseMarketingStrategyMarkdown(markdown);

    const docId = 'main-strategy'; // Fixed ID for the single strategy document

    console.log(`Uploading comprehensive marketing strategy with ID: ${docId}`);

    try {
        await db.collection('marketingStrategy').doc(docId).set({
            strategyData: parsedData,
            lastUpdated: new Date(),
        });
        console.log(`Successfully uploaded ${docId}`);
    } catch (error) {
        console.error(`Error uploading ${docId}:`, error);
    }
}

async function main() {
    console.log('Starting data upload to Firestore...');
    await uploadKeyDataPoints();
    await uploadMarketingStrategy();
    console.log('Data upload complete.');
}

main().catch(console.error);

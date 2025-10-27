# SEO Agent Integration Guide

This document provides a technical implementation guide for integrating Serpstat API with Playwright-based SERP screenshot analysis into a Node.js + Firebase backend.

---

## 📂 Project Structure

```bash
seo-agent/
├── src/
│   ├── serpstat/
│   │   └── serpstatClient.js       # Wrapper for Serpstat API calls
│   ├── playwright/
│   │   └── serpScreenshot.js       # Capture SERP screenshots + crowding analysis
│   ├── cron/
│   │   └── dailyResearch.js        # Orchestrates daily jobs per market/category
│   ├── utils/
│   │   └── firestore.js            # Firestore read/write helpers
│   └── index.js                    # Entry point for jobs
├── package.json
└── README.md
```

---

## 🔑 Environment Setup

Create `.env` file:

```env
SERPSTAT_API_KEY=your_serpstat_api_key_here
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n"
```

Install dependencies:

```bash
npm install playwright axios firebase-admin dotenv
```

---

## ⚙️ Serpstat Client Wrapper

`src/serpstat/serpstatClient.js`

```js
import axios from "axios";

const BASE_URL = "https://api.serpstat.com/v4";

export class SerpstatClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async request(endpoint, params = {}) {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await axios.get(url, {
      params: { ...params, token: this.apiKey },
    });
    return response.data;
  }

  async keywordInfo(keyword, searchEngine = "g_us") {
    return this.request("keyword_info", { keyword, se: searchEngine });
  }

  async domainInfo(domain, searchEngine = "g_us") {
    return this.request("domain_info", { domain, se: searchEngine });
  }

  async serpResults(keyword, searchEngine = "g_us") {
    return this.request("serp", { keyword, se: searchEngine });
  }
}
```

---

## 🖼️ Playwright SERP Screenshot Analysis

`src/playwright/serpScreenshot.js`

```js
import { chromium } from "playwright";

export async function captureSerpScreenshot(keyword, location = "", headless = true) {
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 2000 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    locale: "en-US",
  });
  const page = await context.newPage();

  const query = encodeURIComponent(keyword + " " + location);
  const url = `https://www.google.com/search?q=${query}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  const screenshotPath = `./screenshots/${keyword.replace(/\s+/g, "_")}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const analysis = await page.evaluate(() => {
    const getRects = (selector) =>
      [...document.querySelectorAll(selector)].map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top, height: r.height };
      });

    return {
      ads: getRects("[data-text-ad]") || [],
      shopping: getRects("[aria-label='Shopping results']") || [],
      mapPack: getRects("#local-pack") || [],
      organic: getRects("#search .g"),
      pageHeight: document.body.scrollHeight,
    };
  });

  await browser.close();

  const adHeight = analysis.ads.reduce((s, r) => s + r.height, 0);
  const mapHeight = analysis.mapPack.reduce((s, r) => s + r.height, 0);
  const shoppingHeight = analysis.shopping.reduce((s, r) => s + r.height, 0);
  const organicHeight = analysis.organic.reduce((s, r) => s + r.height, 0);

  const totalContentHeight = adHeight + mapHeight + shoppingHeight + organicHeight;
  const crowdingPct = totalContentHeight > 0
    ? ((adHeight + mapHeight + shoppingHeight) / totalContentHeight) * 100
    : 0;

  return {
    screenshotPath,
    crowding: {
      ads: adHeight,
      maps: mapHeight,
      shopping: shoppingHeight,
      organic: organicHeight,
      crowdingPct: Math.round(crowdingPct),
    },
  };
}
```

---

## 🔄 Daily Research Job

`src/cron/dailyResearch.js`

```js
import { SerpstatClient } from "../serpstat/serpstatClient.js";
import { captureSerpScreenshot } from "../playwright/serpScreenshot.js";
import { saveResearch } from "../utils/firestore.js";
import dotenv from "dotenv";

dotenv.config();

const serpstat = new SerpstatClient(process.env.SERPSTAT_API_KEY);

export async function runDailyResearch(keyword, location, market, category) {
  // Step 1: Keyword + SERP data from Serpstat
  const keywordInfo = await serpstat.keywordInfo(keyword);
  const serpResults = await serpstat.serpResults(keyword);

  // Step 2: SERP screenshot & crowding
  const screenshotData = await captureSerpScreenshot(keyword, location);

  // Step 3: Save to Firestore
  const researchData = {
    keyword,
    market,
    category,
    keywordInfo,
    serpResults,
    screenshotData,
    lastUpdated: new Date().toISOString(),
  };

  await saveResearch(market, category, keyword, researchData);
  return researchData;
}
```

---

## 🔥 Firestore Helper

`src/utils/firestore.js`

```js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function saveResearch(market, category, keyword, data) {
  const docRef = db
    .collection("markets")
    .doc(market)
    .collection("categories")
    .doc(category)
    .collection("keywords")
    .doc(keyword);

  await docRef.set(data, { merge: true });
}
```

---

## ✅ Example Run

`src/index.js`

```js
import { runDailyResearch } from "./cron/dailyResearch.js";

async function main() {
  const result = await runDailyResearch("plumber", "Orlando FL", "orlando", "plumber");
  console.log("Research saved:", result);
}

main().catch(console.error);
```

---

## 📝 Firestore Schema

```
markets/
  orlando/
    categories/
      plumber/
        keywords/
          plumber_orlando_fl/
            keywordInfo: {...}
            serpResults: {...}
            screenshotData: {...}
            lastUpdated: "..."
```

---

## 🚀 Next Steps

- Add **client-level rank tracking** → `clients/{clientId}/rankTracking`
- Add **backlink monitoring** → `clients/{clientId}/backlinks`
- Add **site audits** → `clients/{clientId}/siteAudit`
- Create **Next.js middleware console** to visualize data & tasks.

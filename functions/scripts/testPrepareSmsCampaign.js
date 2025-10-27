"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var personalizationAgent_1 = require("../src/agents/personalizationAgent");
var numberOfLeads = 100;
var llmPrompt = "\nYour primary goal is to create a compelling, personalized SMS that drives a click-through by creating curiosity and presenting a high-value, no-risk offer.\n\nThe structure of the \"smsText\" must be in two parts:\n\n1.  **A Personalized Opening:** Start with a brief, friendly, and conversational icebreaker. Use the available contact data (city, weather, news) to make this feel unique and human. For example: \"Hi John, hope you're having a great Tuesday in Chicago. Don't forget an umbrella, looks like rain is coming!\" or \"Hi Sarah, hope you're staying cool in that Miami heat.\"\n\n2.  **The Core Offer:** Immediately following the personalized opening, you must seamlessly integrate the following core message. You should use the text from the example below as your guide, ensuring all key points are included.\n\n**CORE MESSAGE COMPONENTS & EXAMPLE:**\n\nThe core message MUST convey the following information clearly and concisely. The ideal structure is as follows:\n\n\"Speaking of getting things done, my AI Revenue Team (built on 25 years of experience) is live. I have a special offer for my first 15 founders: get a professional website and a month of my AI team for a single $149 setup fee. If you're not thrilled, cancel and the site is yours to keep. To show you its power, I've already run a quick analysis for you. See your custom report on the page here: [Link]\"\n\n**FINAL INSTRUCTIONS:**\n- The final \"smsText\" should be a single, flowing paragraph combining the personalized opening and the core offer.\n- Maintain a confident, founder-to-founder tone.\n- The link placeholder \"[Link]\" should be the very last thing in the message.\n- Ensure the message highlights the exclusivity (15 founders) and the risk-free nature of the \"keep the website\" guarantee.\n";
function runTest() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Calling prepareSmsCampaign with 100 leads and the specified LLM prompt...");
                    return [4 /*yield*/, (0, personalizationAgent_1.prepareSmsCampaign)(numberOfLeads, llmPrompt)];
                case 1:
                    _a.sent();
                    console.log("prepareSmsCampaign call completed.");
                    return [2 /*return*/];
            }
        });
    });
}
runTest().catch(console.error);

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
exports.dailyWeatherUpdate = void 0;
exports.fetchWeatherDataFromApi = fetchWeatherDataFromApi;
var functions = require("firebase-functions/v2");
var firebase_1 = require("./utils/firebase"); // Import the centralized db instance
// Function to fetch weather data from Tomorrow.io API
// Function to fetch weather data from Tomorrow.io API
// This version uses latitude and longitude for location.
function fetchWeatherDataFromApi(lat, lon) {
    return __awaiter(this, void 0, void 0, function () {
        var TOMORROW_IO_API_KEY, url, response, weatherData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TOMORROW_IO_API_KEY = '8UVlAT42W4EKU0haDd0kg6imyADekTAu';
                    url = "https://api.tomorrow.io/v4/weather/forecast?location=".concat(lat, ",").concat(lon, "&timesteps=1h&apikey=").concat(TOMORROW_IO_API_KEY);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    console.log("[INFO] Making API call to fetch weather for ".concat(lat, ",").concat(lon, "..."));
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'accept': 'application/json',
                                'accept-encoding': 'deflate, gzip, br'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch weather for ".concat(lat, ",").concat(lon, ": ").concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    weatherData = _a.sent();
                    console.log("[INFO] Successfully fetched weather data for ".concat(lat, ",").concat(lon, "."));
                    return [2 /*return*/, weatherData];
                case 4:
                    error_1 = _a.sent();
                    console.error("[ERROR] Error fetching weather data for ".concat(lat, ",").concat(lon, ":"), error_1.message);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// List of cities with their coordinates to fetch weather data for
var CITIES_TO_MONITOR = [
    { name: "OrlandoFL", lat: 28.5383, lon: -81.3792 },
    { name: "TampaFL", lat: 27.9506, lon: -82.4572 },
    { name: "NashvilleTN", lat: 36.1627, lon: -86.7816 },
    { name: "AustinTX", lat: 30.2672, lon: -97.7431 },
    { name: "DenverCO", lat: 39.7392, lon: -104.9903 }
];
/**
 * Scheduled function to fetch and store weather data daily for predefined cities.
 * Runs every day at 00:00 (midnight) UTC.
 */
exports.dailyWeatherUpdate = functions.scheduler.onSchedule("every 24 hours", function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, CITIES_TO_MONITOR_1, city, weatherData, docPath, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                functions.logger.info("dailyWeatherUpdate: Starting daily weather update process.");
                _i = 0, CITIES_TO_MONITOR_1 = CITIES_TO_MONITOR;
                _a.label = 1;
            case 1:
                if (!(_i < CITIES_TO_MONITOR_1.length)) return [3 /*break*/, 11];
                city = CITIES_TO_MONITOR_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 8]);
                return [4 /*yield*/, fetchWeatherDataFromApi(city.lat, city.lon)];
            case 3:
                weatherData = _a.sent();
                if (!weatherData) return [3 /*break*/, 5];
                docPath = "weather_data/".concat(city.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''));
                return [4 /*yield*/, firebase_1.db.doc(docPath).set(weatherData, { merge: true })];
            case 4:
                _a.sent();
                functions.logger.info("dailyWeatherUpdate: Successfully updated weather data for ".concat(city.name, "."));
                return [3 /*break*/, 6];
            case 5:
                functions.logger.warn("dailyWeatherUpdate: No weather data received for ".concat(city.name, "."));
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                functions.logger.error("dailyWeatherUpdate: Error processing weather for ".concat(city.name, ": ").concat(error_2.message));
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
            case 9:
                _a.sent(); // 1-second delay to respect rate limits
                _a.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 1];
            case 11:
                functions.logger.info("dailyWeatherUpdate: Daily weather update process completed.");
                return [2 /*return*/];
        }
    });
}); });

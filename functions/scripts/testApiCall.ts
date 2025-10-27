// This script is for testing the Tomorrow.io API calls directly,
// independent of Firebase Functions.

// Function to fetch weather data from Tomorrow.io API
// This version uses latitude and longitude for location.
async function fetchWeatherDataFromApi(lat: number, lon: number): Promise<any | null> {
    const TOMORROW_IO_API_KEY = '8UVlAT42W4EKU0haDd0kg6imyADekTAu'; // This key is from fetch_and_store_weather.ts
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1h&apikey=${TOMORROW_IO_API_KEY}`;

    try {
        console.log(`[INFO] Making API call to fetch weather for ${lat},${lon}...`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'deflate, gzip, br'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch weather for ${lat},${lon}: ${response.statusText}`);
        }

        const weatherData = await response.json();
        console.log(`[INFO] Successfully fetched weather data for ${lat},${lon}.`);
        return weatherData;
    } catch (error: any) {
        console.error(`[ERROR] Error fetching weather data for ${lat},${lon}:`, error.message);
        return null;
    }
}

// List of cities with their coordinates to fetch weather data for
const CITIES_TO_MONITOR = [
    { name: "Orlando,FL", lat: 28.5383, lon: -81.3792 },
    { name: "Tampa,FL", lat: 27.9506, lon: -82.4572 },
    { name: "Nashville,TN", lat: 36.1627, lon: -86.7816 },
    { name: "Austin,TX", lat: 30.2672, lon: -97.7431 },
    { name: "Denver,CO", lat: 39.7392, lon: -104.9903 }
];

async function runApiTest() {
    console.log("Starting direct API call test with Lat/Lon...");

    for (const city of CITIES_TO_MONITOR) {
        try {
            const weatherData = await fetchWeatherDataFromApi(city.lat, city.lon);
            if (weatherData) {
                console.log(`[SUCCESS] Received data for ${city.name}:`, JSON.stringify(weatherData, null, 2).substring(0, 200) + '...'); // Log a snippet
            } else {
                console.log(`[WARNING] No data received for ${city.name}.`);
            }
        } catch (error: any) {
            console.error(`[ERROR] Test failed for ${city.name}: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
    }

    console.log("Direct API call test completed.");
}

runApiTest().catch(console.error);

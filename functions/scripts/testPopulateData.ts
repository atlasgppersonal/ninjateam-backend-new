import { populateWeatherDataAndNews } from '../src/agents/personalizationAgent';
import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2";
import { ScheduledEvent } from "firebase-functions/v2/scheduler";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Mock the functions.logger for local testing
functions.logger.info = console.log;
functions.logger.warn = console.warn;
functions.logger.error = console.error;

async function runTest() {
  console.log('Starting manual test of populateWeatherDataAndNews (focused on weather data)...');
  try {
    // The onSchedule function expects a ScheduleEvent. For a manual trigger,
    // we can provide a minimal mock object.
    // The onSchedule function expects a ScheduledEvent. For a manual trigger,
    // we can provide a minimal mock object.
    const mockScheduleEvent: ScheduledEvent = {
      scheduleTime: new Date().toISOString(),
    };
    await populateWeatherDataAndNews.run(mockScheduleEvent);
    console.log('Manual test completed successfully.');
  } catch (error) {
    console.error('Manual test failed:', error);
  }
  process.exit(); // Exit the process after the test
}

runTest();

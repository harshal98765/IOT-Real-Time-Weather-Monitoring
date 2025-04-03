const axios = require("axios");

// Firebase configuration
const FIREBASE_DATABASE_URL = "https://weather-monitoring-d7567-default-rtdb.asia-southeast1.firebasedatabase.app/";
const API_KEY = "AIzaSyB2fA-S69x6A9d11UKgifhaaprxYsdl3cU";

/**
 * Fetches real sensor data from Firebase
 * @returns {Promise<Object>} The sensor data
 */
export async function fetchSensorData() {
  try {
    // Make actual request to Firebase
    const response = await axios.get(
      `${FIREBASE_DATABASE_URL}/sensor_data.json?auth=${API_KEY}`
    );
    
    // Process the data to match expected format
    const data = response.data;
    
    // Return the formatted data matching your output format
    return {
      temperature: data.temperature,
      humidity: data.humidity,
      airQuality: data.air_quality,
      rainDetected: data.rain_detected === 1,
      lightPresent: data.light_present === 1,
      // Include additional data fields from Firebase
      gasDetected: data.gas_detected === 1,
      rainValue: data.rain_value,
      ldrValue: data.ldr_value,
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    // Return null or throw an error based on your error handling preference
    throw new Error(`Failed to fetch sensor data: ${error.message}`);
  }
}

// If you want to run this as a standalone script (like in the second example)
if (require.main === module) {
  // Function to demonstrate data retrieval
  const demonstrateDataRetrieval = async () => {
    try {
      const sensorData = await fetchSensorData();
      console.log("Final Data Output:", sensorData);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Run fetchSensorData() every 2 seconds
  setInterval(demonstrateDataRetrieval, 2000);
}
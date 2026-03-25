const fs = require('fs').promises;
const path = require('path');

// Path to the input and output files
const inputFilePath = path.join('C:', 'Lidar_Integration_Testing_M26', 'Random.txt');
const outputLogFilePath = path.join('C:', 'Lidar_Integration_Testing_M26', 'coordinates_log.txt');

// Regular expression to capture the X and Y coordinates
const coordinatesRegex = /logClicked at X:\s*(\d+),\s*Y:\s*(\d+)/g;

async function extractCoordinates() {
  try {
    // Read the raw data from Random.txt
    const data = await fs.readFile(inputFilePath, 'utf8');

    // Match coordinates using the regex pattern
    const matches = [...data.matchAll(coordinatesRegex)];

    // Prepare log content
    let logContent = '';
    matches.forEach(match => {
      // match[1] will give you the X value, and match[2] will give you the Y value
      logContent += `X: ${match[1]}, Y: ${match[2]}\n`;
    });

    // Write the coordinates to the output log file
    if (logContent) {
      await fs.writeFile(outputLogFilePath, logContent);
      console.log(`Coordinates have been logged to ${outputLogFilePath}`);
    } else {
      console.log('No coordinates found in the file.');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the function
extractCoordinates();

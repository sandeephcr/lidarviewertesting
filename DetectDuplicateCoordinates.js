// const fs = require('fs');

// // Correct path to your code file
// const filePath = 'C:\\Lidar_Integration_Testing_M26\\cypress\\e2e\\Poles\\Pole-Import-Validate.cy.js';
// // Path to output file where you want to write the results
// const outputFilePath = 'C:\\Lidar_Integration_Testing_M26\\cypress\\e2e\\Poles\\duplicateCoordinatesOutput.txt';

// // Check if the file exists before trying to read
// if (!fs.existsSync(filePath)) {
//   console.error('File does not exist:', filePath);
//   return;
// }

// // Read the content of the file
// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error("Error reading the file:", err);
//     return;
//   }

//   console.log('File content successfully read!');

//   // Split the file into lines for easier line number tracking
//   const lines = data.split('\n');

//   // Regular expression to match coordinates inside SelectAndPlacePole()
//   const pattern = /SelectAndPlacePole\s*\((\d+),\s*(\d+)\)/g;

//   // Regular expression to capture the test name inside the 'it()' block
//   const testPattern = /it\(['"](.*?)['"]/;

//   // Store all coordinates with their associated test name
//   const coordinates = [];
//   let match;
//   let currentTestName = 'Unknown Test'; // Default value if no test name is found

//   // Iterate through the lines to find all the matches
//   lines.forEach((line, lineIndex) => {
//     // Check if this line contains a test name (the 'it()' block)
//     const testMatch = line.match(testPattern);
//     if (testMatch) {
//       currentTestName = testMatch[1]; // Capture the test name from the 'it()' block
//     }

//     // Search for the SelectAndPlacePole function calls
//     while ((match = pattern.exec(line)) !== null) {
//       const x = match[1];
//       const y = match[2];
//       coordinates.push({ coord: `${x},${y}`, testId: currentTestName });
//     }
//   });

//   // Find duplicates by counting occurrences of each coordinate
//   const coordinateCount = {};
//   coordinates.forEach(({ coord }) => {
//     coordinateCount[coord] = (coordinateCount[coord] || 0) + 1;
//   });

//   // Check for duplicates
//   const duplicates = Object.entries(coordinateCount).filter(([coord, count]) => count > 1);

//   // Prepare output data
//   let outputData = 'Duplicate Coordinates Report (Test Cases with Duplicates)\n\n';
  
//   if (duplicates.length > 0) {
//     outputData += 'Duplicate coordinates found:\n\n';
    
//     duplicates.forEach(([coord, count]) => {
//       outputData += `Coordinates: ${coord} appear ${count} times in the following test cases:\n`;
//       const duplicateTestCases = coordinates
//         .filter(item => item.coord === coord)
//         .map(item => item.testId)
//         .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicate test case IDs
      
//       // Sort test case names for better readability
//       duplicateTestCases.sort().forEach(testCase => {
//         outputData += `- ${testCase}\n`;
//       });
      
//       outputData += '\n'; // Add a blank line for better readability between different coordinates
//     });
//   } else {
//     outputData += 'No duplicate coordinates found.\n';
//   }

//   // Write the results to the output file
//   fs.writeFileSync(outputFilePath, outputData, 'utf8');
//   console.log(`Duplicate coordinates report has been written to ${outputFilePath}`);
// });





// For the below file
// C:\Lidar_Integration_Testing_M26\cypress\e2e\Poles\Pole-Import-Validate.cy.js


const fs = require('fs');
const XLSX = require('xlsx');

// Function to read data from the Excel sheet
function readDataFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);  // Read the workbook
  const sheet = workbook.Sheets['Sheet1'];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const headers = data[0];
  console.log('Headers:', headers);

  // Find the index of the relevant columns
  const constantsColumnIndex = headers.indexOf("Constants");
  const selectorColumnIndex = headers.indexOf("Selector");
  const testCaseIDColumnIndex = headers.indexOf("TestCaseID");
  const coordinatesColumnIndex = headers.indexOf("Coordinates");

  if (constantsColumnIndex === -1 || selectorColumnIndex === -1 || testCaseIDColumnIndex === -1 || coordinatesColumnIndex === -1) {
    throw new Error("Required columns (Constants, Selector, TestCaseID, Coordinates) not found");
  }

  // Group rows by selector
  const groupedData = data.slice(1).reduce((acc, row) => {
    // Skip rows that have missing or empty data in required columns
    if (!row[constantsColumnIndex] || !row[selectorColumnIndex] || !row[testCaseIDColumnIndex] || !row[coordinatesColumnIndex]) {
      return acc;  // Skip empty or invalid rows
    }

    const selector = row[selectorColumnIndex];
    if (!acc[selector]) acc[selector] = [];
    acc[selector].push({
      constants: row[constantsColumnIndex],
      testCaseID: row[testCaseIDColumnIndex],
      coordinates: row[coordinatesColumnIndex]
    });
    return acc;
  }, {});

  console.log('Grouped Data:', groupedData); // Log the grouped data to verify

  return groupedData;
}

// Function to generate test cases
function generateTestCases(groupedData) {
  let testCases = [];

  // Loop through each selector group and generate test cases
  Object.keys(groupedData).forEach(selector => {
    const selectorData = groupedData[selector];

    // Ensure we have 12 test cases for each selector group (if required)
    if (selectorData.length !== 12) {
      console.log(`Warning: Selector '${selector}' does not have exactly 12 test cases. Found ${selectorData.length}.`);
    }

    selectorData.forEach((data, index) => {
      const { constants, testCaseID, coordinates } = data;
      let coordArray = [];

      if (coordinates && coordinates.includes(',')) {
        coordArray = coordinates.replace(/[^\d,]/g, '').split(',').map(coord => coord.trim());
      } else {
        console.log(`Warning: Missing or invalid coordinates for TestCaseID: ${testCaseID} at row ${index + 2}`);
        coordArray = ['0', '0']; // Default coordinates in case of invalid/missing data
      }

      const [x, y] = coordArray;

      // Generate the test case for each set of data
      const testCaseScript = `
it('${testCaseID}', () => {
    login(Constants.produserEmail, Constants.ProduserPwd);
    cy.get('.folderName').contains('Shared Space').dblclick();
    cy.get('.folderName').contains('Demo').dblclick();
    cy.get('[data-testid="run-card-container"]').children().contains('DemoRun7').click();
    cy.wait(2000);

    // Use dynamic coordinates here
    const x = ${x}; // Dynamic x coordinate
    const y = ${y}; // Dynamic y coordinate

    SelectAndPlacePole(x, y);
    ConfirmPoleDetailsPanel();

    typeInField(PoleLocators.${selector}, Constants.${constants});
    SavePoleData();
    cy.wait(2000);

    // Refresh project page and import poles from server
    cy.reload();
    cy.wait(2000);
    ImportPoleData();
    cy.wait(2000);

    TriggerPole(x, y);  // Use dynamic coordinates here
    ConfirmPoleDetailsPanel();
    PoleLocators.${selector}.should('be.visible').and('have.value', Constants.${constants});
});
      `;

      testCases.push(testCaseScript);
    });
  });

  return testCases;
}

// Function to write the generated test cases to a new JavaScript file
function writeTestCasesToFile(testCases, outputFilePath) {
  const outputContent = `describe('Generated Test Cases', () => {
${testCases.join('\n')}
});
  `;

  fs.writeFileSync(outputFilePath, outputContent, 'utf-8');
  console.log(`Test cases generated and saved to ${outputFilePath}`);
}

// Main function to execute the process
function main() {
  const excelFilePath = 'D:/LiDARViewer_TestSuite _Test1.xlsx'; // Path to your Excel file
  const outputFilePath = 'output.js'; // Output file for the generated test cases

  const groupedData = readDataFromExcel(excelFilePath); // Read and group data by selector
  const testCases = generateTestCases(groupedData); // Generate the test cases using constants, selectors, and coordinates
  writeTestCasesToFile(testCases, outputFilePath); // Write the generated test cases to a JavaScript file

  // Print the total number of generated test cases
  console.log(`Total test cases generated: ${testCases.length}`);
}

// Run the main function
main();

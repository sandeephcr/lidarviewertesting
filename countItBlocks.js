const fs = require('fs');
const path = require('path');

const testDirectory = path.join(__dirname, 'cypress', 'e2e');

// Function to count 'it' blocks in a given file
const countItBlocksInFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file ${filePath}: ${err}`);
        return;
      }

      const uncommentedData = data
        .replace(/\/\/.*$/gm, '')          // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments

      const itBlocks = uncommentedData.match(/\bit\(/g);
      const count = itBlocks ? itBlocks.length : 0;
      resolve({ file: filePath, count });
    });
  });
};

// Function to recursively get all .cy.js files
const getAllCyJsFiles = (dirPath) => {
  let results = [];
  const list = fs.readdirSync(dirPath);

  list.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllCyJsFiles(filePath)); // Recurse into subdirectory
    } else if (filePath.endsWith('.cy.js')) {
      results.push(filePath); // Add matching file
    }
  });

  return results;
};

// Main function to count 'it' blocks in all .cy.js files
const countItBlocksInDirectory = async () => {
  try {
    const cyFiles = getAllCyJsFiles(testDirectory);
    const countPromises = cyFiles.map(countItBlocksInFile);
    const results = await Promise.all(countPromises);

    results.forEach(result => {
      console.log(`File: ${result.file}, 'it' blocks: ${result.count}`);
    });
  } catch (err) {
    console.error('Error processing files:', err);
  }
};

countItBlocksInDirectory();

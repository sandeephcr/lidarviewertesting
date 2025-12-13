const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3irm7b",
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl: "https://testing.lidartechsolutions.com",
    video: false,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    watchForFileChanges: false,

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      on("after:run", (results) => {
        console.log(`Total tests executed: ${results.totalTests}`);
        console.log(`Tests failed: ${results.failures}`);
      });

      return config;
    },

    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "**/01_Pole-Save.cy.js",
      "**/02_Pole_Import_Validate.cy.js",
    ],
  },

  reporter: "mochawesome",
});

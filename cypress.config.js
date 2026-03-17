const { defineConfig } = require("cypress");
const { configureXrayPlugin } = require("cypress-xray-plugin");

module.exports = defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 30000,
  e2e: {
    baseUrl: 'https://testing.lidartechsolutions.com',
    video: false,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    watchForFileChanges: false,

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true
    },

    retries: {
      runMode: 2,
      openMode: 0
    },

    async setupNodeEvents(on, config) {

      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            "--unsafely-treat-insecure-origin-as-secure=https://testing.lidartechsolutions.com",
            "--allow-running-insecure-content",
            "--disable-features=BlockInsecurePrivateNetworkRequests"
          );
        }
        return launchOptions;
      });

      on('after:run', (results) => {
        console.log(`Total tests executed: ${results.totalTests}`);
        console.log(`Tests failed: ${results.failures}`);
      });

      await configureXrayPlugin(on, config, {
        jira: {
          projectKey: config.env.JIRA_PROJECT_KEY,
          url: config.env.JIRA_URL,
          testExecutionIssueKey: config.env.JIRA_TEST_EXECUTION_KEY,
          testExecutionIssue: {
            fields: {
              summary: "Lidarviewer2026.03.04",
            },
          },
        },
        xray: {
          uploadResults: true,
          status: {
            passed: "PASSED",
            failed: "FAILED",
            skipped: "SKIPPED",
            pending: "TODO",
          },
        },
        plugin: {
          debug: true,
        },
        cloud: {
          clientId: config.env.XRAY_CLIENT_ID,
          clientSecret: config.env.XRAY_CLIENT_SECRET,
        },
      });

      return config;
    },

    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      '**/01_Pole-Save.cy.js',
      '**/02_Pole_Import_Validate.cy.js',
    ]
  },
});
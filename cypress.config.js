const { defineConfig } = require("cypress");
const { configureXrayPlugin } = require("cypress-xray-plugin");

module.exports = defineConfig({
  projectId: '3irm7b',
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
          projectKey: "LVH",
          url: "https://hcrobot.atlassian.net",
          testExecutionIssueKey : "LVH-7844",
          testExecutionIssue: {
            fields: {
              summary: "SanityTestXrayExp2026.03.04",
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
    clientId: "pB47CC65540634E4081BBF6690C708F5B3EA323D084904A64A256B78F9EDA60CE",
    clientSecret: "4d50b25b8071f30d1ba21158285d7ec9cc759fba3f0217593c709c28b2213616",
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
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })import 'cypress-plugin-snapshots/commands';
// import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add("simulateOffline", () => {
    cy.then(() => {
        return Cypress.automation("remote:debugger:protocol", {
            command: "Network.enable"
        }).then(() => {
            return Cypress.automation("remote:debugger:protocol", {
                command: "Network.emulateNetworkConditions",
                params: {
                    offline: true,
                    latency: 0,
                    downloadThroughput: 0,
                    uploadThroughput: 0
                }
            });
        });
    });
});

Cypress.Commands.add("simulateOnline", () => {
    cy.then(() => {
        return Cypress.automation("remote:debugger:protocol", {
            command: "Network.enable"
        }).then(() => {
            return Cypress.automation("remote:debugger:protocol", {
                command: "Network.emulateNetworkConditions",
                params: {
                    offline: false,
                    latency: 0,
                    downloadThroughput: -1,
                    uploadThroughput: -1
                }
            });
        });
    });
});

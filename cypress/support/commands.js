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

// cypress/support/commands.js


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


Cypress.Commands.add('unblockUser', (email) => {
    // First login via UI
    cy.visit('/login');
  
    cy.get('input[placeholder="Email Id"]').clear().type("admin@hcrobo.com");
    cy.get('input[type="password"]').clear().type("Cnsw-123");
    cy.get('button[data-testid="login-button"]').click();
  
    // Ensure login completed
    cy.url().should('include', '/home');
  
    // Now safely read token
    cy.window().then((win) => {
  
      const loginData = win.localStorage.getItem('login');
      const parsed = JSON.parse(loginData);
      const token = parsed.accessToken;
  
      // Call unblock API
      cy.request({
        method: 'PATCH',
        url: `/admin/register_user/unblock-user/${email}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
  
    });
  
  });
  
  Cypress.Commands.add('logout', () => {

    cy.intercept('DELETE', '**/api/logout').as('logoutRequest');
  
    // Open profile menu
    cy.contains('.ToolTip-container', 'Profile menu').click();
    //find('img.icon-btn')
  
    // Click Logout from dropdown
    cy.contains('Logout').should('be.visible').click();

    // Confirm in modal
    cy.contains('Are you sure').should('be.visible');

    cy.get('[data-testid="confirm-button"]').should('be.visible').click();
  
    // Wait for backend logout
    cy.wait('@logoutRequest').its('response.statusCode').should('eq', 200);
  
    cy.url().should('include', '/login');
  
  });
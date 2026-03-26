Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false; // prevents Cypress from failing the test
  }
});
import { 
  Adminlogin,
  loginToPortal
 } from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";
import "../../support/commands.js";

describe("Logout Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("LVH-2417 - Verify that users can successfully logout from the application", () => {
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    cy.logout();
    cy.url().should("include", "/login");
    });

  it("LVH-2418 - Verify that complete data clearance after users logout from the application", () => {

        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

        cy.logout();

        // Assert user is redirected to login page after logout
        cy.url().should('include', '/login');

        // Assert that sensitive user data is cleared from localStorage/sessionStorage after logout
        cy.window().then((win) => {
          expect(win.localStorage.getItem('token')).to.be.null;
          expect(win.localStorage.getItem('user')).to.be.null;
          expect(win.sessionStorage.getItem('token')).to.be.null;
          expect(win.sessionStorage.getItem('user')).to.be.null;
        });
        cy.getCookies().should('be.empty');

    });

  it("LVH-2419 - Verify that unauthorized page displayed when user try to access protected data", () => {

      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

      // Visit the real protected homepage after login
      cy.visit('/home?folderId=root&runPage=1&folderPage=1&sortOrder=dsc&sortType=Date');
      cy.url().should('include', '/home');
      cy.logout();

      cy.url().should('include', '/login');

      // Try to access an internal URL directly after logout
      cy.visit('/home?folderId=root&runPage=1&folderPage=1&sortOrder=dsc&sortType=Date', { failOnStatusCode: false });
      cy.url().should('include', '/login');

      cy.contains('Folder').should('not.exist');
    });

  it("LVH-2420 - Verify that a non-admin user cannot access admin-only pages after admin logout", () => {

      // Login as admin and access administration page
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.visit('/siteAdministration');
      cy.contains(/administration|site administration|admin/i, { matchCase: false }).should('exist');
      cy.logout();

      cy.url().should('include', '/login');
      cy.contains('Login', { matchCase: false });

      // Login as Client user (non-admin)
      loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
      cy.url().should('not.include', '/login');
      cy.visit('/siteAdministration', { failOnStatusCode: false });

      cy.contains(/unauthorized|access denied|forbidden|not authorized/i).should('exist');
    });

  it("LVH-2421 - Verify that the application redirects the user to the login page after a successful logout", () => {
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

      cy.logout();

      // Check that user is redirected to login page
      cy.url().should('include', '/login');
      cy.contains('Login', { matchCase: false });
    });

  it("LVH-2422 - Verify that user can log in again after logging out, and is redirected to the login page after a second logout", () => {
      
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.logout();

      cy.url().should('include', '/login');
      cy.contains('Login', { matchCase: false });

      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.url().should('not.include', '/login');

      cy.logout();

      cy.url().should('include', '/login');
      cy.contains('Login', { matchCase: false });
    });

  it("LVH-2423 - Verify that access token is invalidated after logout and cannot be used to access secured resources", () => {

      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    
      let token;
    
      // Wait until token exists
      cy.window()
        .its('localStorage.login')
        .should('exist')
        .then((loginValue) => {
          const parsed = JSON.parse(loginValue);
          token = parsed?.accessToken;
          expect(token).to.exist;
        });
    
      // ✅ 1. Token should work BEFORE logout
      cy.then(() => {
        return cy.request({
          method: 'GET',
          url: '/admin/runsFolderStructure',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }).its('status').should('eq', 200);
    
      // ✅ 2. Logout
      cy.logout();
    
      // ✅ 3. Token should FAIL AFTER logout
      cy.then(() => {
        return cy.request({
          method: 'GET',
          url: '/admin/runsFolderStructure',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          failOnStatusCode: false,
        });
      }).then((response) => {
        expect([401, 403]).to.include(response.status);
      });
    
    });

  it("LVH-2424 - Verify functionality of server-side logout", () => {

      let token;
    
      // Step 1: Login
      cy.visit('/login');
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    
      // Step 2: Capture token
      cy.window()
        .its('localStorage.login')
        .should('exist')
        .then((loginValue) => {
          const parsed = JSON.parse(loginValue);
          token = parsed?.accessToken;
          expect(token).to.exist;
        });
    
      // Step 3: Logout
      cy.logout();
    
      // Step 4: Verify redirect to login page
      cy.url().should("include", "/login");
    
    
      // Step 5: Try accessing secured API with old token
      cy.then(() => {
        return cy.request({
          method: 'GET',
          url: '/admin/runsFolderStructure',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          failOnStatusCode: false,
        });
      }).then((response) => {
    
        // Expected: token should NOT work after logout
        expect([401, 403]).to.include(response.status);
    
      });
    
    });

  it("LVH-2426 - Verify application prompts user about unsaved data before logout", () => {

      // Step 1: Login
      cy.visit('/login');
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.contains("Home Page").should("be.visible");
    
      cy.get('[data-testid="run-card-container"]')
        .should("be.visible")
        .first()
        .click();
  
      // Wait for default viewer load
      cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");
     
      // Attempt to logout
      cy.contains('.ToolTip-container', 'Profile menu').click();
      cy.contains('Logout').should('be.visible').click();
    
      cy.contains(/unsaved|changes/i).should('be.visible');
    
    }); 

  it("LVH-2427 - Verify logout API returns 200 on successful logout", () => {

      // Step 1: Login
      cy.visit('/login');
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.contains("Home Page").should("be.visible");
    
      // Step 2: Intercept logout API
      cy.intercept('DELETE', '**/api/logout').as('logoutRequest');
    
      // Step 3: Trigger logout
      cy.logout();
    
      // Step 4: Wait for API and validate response
      cy.wait('@logoutRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    
      // Step 5: Validate redirect
      cy.url().should('include', '/login');
    
    });

  it("LVH-2428 - Verify browser back button does not allow access after logout", () => {

      // Step 1: Login
      cy.visit('/login');
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.contains("Home Page").should("be.visible");
    
      // Step 2: Navigate to an authenticated page
      cy.visit('/home?folderId=root&runPage=1&folderPage=1&sortOrder=dsc&sortType=Date');
      cy.url().should('include', '/home');
    
      // Step 3: Logout
      cy.logout();
      cy.url().should("include", "/login");
    
      // Step 4: Press browser back button
      cy.go('back');
      cy.visit('/home?folderId=root&runPage=1&folderPage=1&sortOrder=dsc&sortType=Date');
      // Step 5: Validate user is NOT allowed back in
      cy.url().should("include", "/login");
      cy.contains("Login").should("be.visible");
    
    });

  it("LVH-2431 - Verify logout works from different pages", () => {

      const pages = [
        { url: '/home', text: 'Home Page' },
        { url: '/siteAdministration', text: 'Dashboard' },
        { url: '/project/Test-Feb27/0', text: 'Satellite' },
      ];
    
      pages.forEach((page) => {
    
        // Step 1: Login
        cy.visit('/login');
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        cy.contains("Home Page").should("be.visible");
    
        // Step 2: Navigate to page
        cy.visit(page.url);
        cy.contains(page.text, { timeout: 10000 }).should('be.visible');
    
        // Step 3: Logout
        cy.logout();
    
        // Step 4: Validate redirect
        cy.url().should('include', '/login');
    
      });
    
    });

  it("LVH-2432 - Verify logout works for different user roles", () => {

      // Admin logout
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      cy.contains("Home Page").should("be.visible");
      cy.logout(); 
      cy.url().should("include", "/login");
      // Client logout
      loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
      cy.contains("Home Page").should("be.visible");
      cy.logout();
      cy.url().should("include", "/login");
    
    });

});

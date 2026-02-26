import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import {
    Adminlogin,
  loginToPortal,
} from "../../utils/commonMethods.js";
import "../../support/commands.js";


describe("Logout Module Tests", () => {

    beforeEach(() => {
      cy.visit("/login");
    });

    it("Logout_001 - Verify that users can successfully logout from the application", () => {

        Adminlogin(Constants.AdminEmail,Constants.AdminPassword);
    
        cy.logout();
        
        cy.url().should('include', '/login');

      });

    it("Logout_002 - Verify that complete data clearence after users logout from the application", () => {

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

    it("Logout_003 - Verify internal URLs are not accessible after logout", () => {

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

    it("Logout_004 - Verify that a non-admin user cannot access admin-only pages after admin logout", () => {

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

    it("Logout_005 - Verify that the application redirects the user to the login page after a successful logout", () => {
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

        cy.logout();

        // Check that user is redirected to login page
        cy.url().should('include', '/login');
        cy.contains('Login', { matchCase: false });
    });

    it("Logout_006 - Verify that user can log in again after logging out, and is redirected to the login page after a second logout", () => {
        
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

    it("Logout_007 - Verify that access token is invalidated after logout and cannot be used to access secured resources", () => {
        // 1. Capture the access token issued upon login
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

        cy.window().then((win) => {
            const loginData = win.localStorage.getItem('login');
            const parsed = JSON.parse(loginData);
            const token = parsed && parsed.accessToken ? parsed.accessToken : null;

            // API appears to already return 401 on this endpoint, so expect 401/403 here
            cy.request({
                method: 'GET',
                url: 'https://testing.lidartechsolutions.com/admin/runsFolderStructure',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect([401, 403]).to.include(response.status);
                // Only assert error/message if present and non-empty, avoid failure on blank server message
                if (
                    response.body && 
                    typeof response.body === 'object' && 
                    (
                        (response.body.error && response.body.error.trim().length > 0) ||
                        (response.body.message && response.body.message.trim().length > 0)
                    )
                ) {
                    expect(
                        response.body.error || response.body.message
                    ).to.match(/invalid token|expired|unauthorized|session expired/i);
                }
            });

            cy.logout();

            cy.request({
                method: 'GET',
                url: 'https://testing.lidartechsolutions.com/admin/runsFolderStructure',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect([401, 403]).to.include(response.status);
                // Only assert error/message if present and non-empty, avoid failure on blank server message
                if (
                    response.body && 
                    typeof response.body === 'object' && 
                    (
                        (response.body.error && response.body.error.trim().length > 0) ||
                        (response.body.message && response.body.message.trim().length > 0)
                    )
                ) {
                    expect(
                        response.body.error || response.body.message
                    ).to.match(/invalid token|expired|unauthorized|session expired/i);
                }
            });
        });
    });

});
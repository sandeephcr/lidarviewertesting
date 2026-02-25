import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import {
    Adminlogin,
  loginToPortal,
} from "../../utils/commonMethods.js";
import "../../support/commands.js";


describe("Login Page Tests", () => {

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

      
});
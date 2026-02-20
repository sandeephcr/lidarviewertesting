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
});
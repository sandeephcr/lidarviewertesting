import { 
    Adminlogin,
    loginToPortal,
 } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import ViewerElements from "../../locators/ViewerElements.js";
import "../../support/commands.js";

describe('Single Session Module', () => {
    
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
    });

    it('Single_Session_001 - Verify user A can login successfully', () => {
    
        loginToPortal(Constants.testDesignEngineerEmail, Constants.password)
        LidarViewer.getHomeText.should("have.text", "Home Page");

    });

    it('Single_Session_002 - Verify User B can login after User A logs out', () => {

        // Step 1: Login as User A
        loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
    
        LidarViewer.getHomeText
            .should('be.visible')
            .and('have.text', 'Home Page');
    
        cy.logout();
    
        // Verify redirected to login page
        cy.url().should('include', 'login');
    
        // Step 3: Simulate User B login with same credentials
        loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
    
        // Step 4: Verify login successful
        LidarViewer.getHomeText
            .should('be.visible')
            .and('have.text', 'Home Page');
    });

    it('Single_Session_003 - Verify User B login terminates previous session and logs into new session', () => {

        // Step 1: User A logs in
        loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
    
        LidarViewer.getHomeText.should("have.text", "Home Page");
    
        // Step 2: Simulate second device (User B)
        cy.clearCookies();
        cy.clearLocalStorage();
    
        cy.visit(Cypress.config('baseUrl'));
    
        // Step 3: Login again with same credentials
        // loginToPortal will automatically handle the "Active session detected" popup
        loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
    
        // Step 4: Verify User B successfully logs in
        LidarViewer.getHomeText.should("have.text", "Home Page");
    });

});
import {
    Adminlogin,
   loginToPortal
  } from "../../utils/commonMethods.js";
  import LidarViewer from "../../locators/LidarViewer.js";
  import Constants from "../../utils/Constants.js";
  import "../../support/commands.js";
  
describe("API Key Generation Tests", () => {
beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
});

    it('LVH-7807 APIKey_001_Verify API Key section is visible only for Admin users', () => {

        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
    
        LidarViewer.getViewProfileOption.click();
    
        LidarViewer.getEditProfileHeader
        .should('be.visible');
    
        LidarViewer.getApiKeySection
        .should('be.visible');
        
        LidarViewer.getEditProfileCloseBtn
        .should('be.visible')
        .click();

          // Click Logout from dropdown
        cy.contains('Logout').should('be.visible').click();

        // Confirm in modal
        cy.contains('Are you sure').should('be.visible');

        cy.get('[data-testid="confirm-button"]').should('be.visible').click();

        loginToPortal(Constants.testDesignEngineerEmail,Constants.password);
        LidarViewer.getProfileIcon.click();
    
        LidarViewer.getViewProfileOption.click();
    
        LidarViewer.getEditProfileHeader
        .should('be.visible');
    
        LidarViewer.getApiKeySection
        .should('not.exist')
    
    });

    it('LVH-7794 APIKey_002_Verify API Key is generated for valid request', () => {

        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      
        // Open profile
        LidarViewer.getProfileIcon.click();
        LidarViewer.getViewProfileOption.click();
      
        LidarViewer.getEditProfileHeader.should('be.visible');
      
        // Open API Key section
        LidarViewer.getApiKeySection.click();
      
        // Store old token
        LidarViewer.getApiKeyValue.invoke('text').then((oldToken) => {
      
          // Click regenerate
          LidarViewer.getApiKeyRegenerateBtn.click();
      
          // Verify modal appears
          LidarViewer.getRegenerateApiModal
            .should('be.visible');
      
          // Set duration (optional)
          LidarViewer.getTokenDurationField
            .clear()
            .type('5');
      
          // Confirm regenerate
          LidarViewer.getRegenerateConfirmBtn
            .click();
      
          // Verify new token generated
          LidarViewer.getApiKeyValue
            .should('be.visible')
            .invoke('text')
            .should('not.eq', oldToken);
      
        });
      
        // Verify expiry text appears
        cy.contains('Token expires on')
          .should('be.visible');
      
        // Verify success notification
        LidarViewer.infoMessageContainer
          .should('be.visible');
      
    });
    
});
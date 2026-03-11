import { 
    Adminlogin,
    loginToPortal

 } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import ViewerElements from "../../locators/ViewerElements.js";
import "../../support/commands.js";


describe('User Permissions', () => {
    const testUser = "cqyuiorzvv@wnbaldwy.com";
    const folderName = "Shared Space";
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
    });

    it('User_Permissions_001 - Verify revoking read permissions for multiple runs', () => {

        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        // Wait for modal
        LidarViewer.getUserPermissionsModal.should('be.visible');

        // Step 3: Revoke read & write permissions for folder
        LidarViewer.writeCheckbox(folderName).find('img').click({ force: true }); ;
        LidarViewer.readCheckbox(folderName).find('img').click({ force: true });
        
        // Step 4: Click update
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 6: Login as test user and verify folder is not visible
        loginToPortal(testUser, Constants.password);
        cy.contains(folderName).should('not.exist');

        cy.logout();

        // Step 8: Login back as Admin
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
         // Step 1: Search for the user
         LidarViewer.getUserSearchInput.clear().type(testUser);
         LidarViewer.getUserRows.contains('td', testUser).should('exist');

         // Step 2: Open User Permissions modal
         LidarViewer.getUserRows.contains('td', testUser)
         .parent('tr')
         .then((row) => {
             const $row = cy.wrap(row);
             LidarViewer.getPermissionsButton($row).click();
         });


        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(folderName, 'Write');

        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
    });

    it('User_Permissions_002 - Verify assigning read permissions for multiple runs', () => {

        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        // Wait for modal
        LidarViewer.getUserPermissionsModal.should('be.visible');

        // Step 3: Revoke read & write permissions for folder
        LidarViewer.writeCheckbox(folderName).find('img').click({ force: true }); ;
        LidarViewer.readCheckbox(folderName).find('img').click({ force: true });
        
        // Step 4: Click update
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 6: Login as test user and verify folder is not visible
        loginToPortal(testUser, Constants.password);
        cy.contains(folderName).should('not.exist');

        cy.logout();

        // Step 8: Login back as Admin
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
         // Step 1: Search for the user
         LidarViewer.getUserSearchInput.clear().type(testUser);
         LidarViewer.getUserRows.contains('td', testUser).should('exist');

         // Step 2: Open User Permissions modal
         LidarViewer.getUserRows.contains('td', testUser)
         .parent('tr')
         .then((row) => {
             const $row = cy.wrap(row);
             LidarViewer.getPermissionsButton($row).click();
         });


        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(folderName, 'Write');

        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
    });
    
    it('User_Permissions_003 - Verify the functionality of revoking all permissions ', () => {

        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        // Wait for modal
        LidarViewer.getUserPermissionsModal.should('be.visible');

        // Step 3: Revoke read & write permissions for folder
        LidarViewer.writeCheckbox(folderName).find('img').click({ force: true }); ;
        LidarViewer.readCheckbox(folderName).find('img').click({ force: true });
        
        // Step 4: Click update
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 6: Login as test user and verify folder is not visible
        loginToPortal(testUser, Constants.password);
        cy.contains(folderName).should('not.exist');

        cy.logout();

        // Step 8: Login back as Admin
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
         // Step 1: Search for the user
         LidarViewer.getUserSearchInput.clear().type(testUser);
         LidarViewer.getUserRows.contains('td', testUser).should('exist');

         // Step 2: Open User Permissions modal
         LidarViewer.getUserRows.contains('td', testUser)
         .parent('tr')
         .then((row) => {
             const $row = cy.wrap(row);
             LidarViewer.getPermissionsButton($row).click();
         });


        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(folderName, 'Write');

        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
    });
   

});

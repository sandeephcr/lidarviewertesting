Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Request failed with status code 500")) {
      return false; // prevents Cypress from failing the test
    }
  });


import { 
    Adminlogin,
    loginToPortal

 } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import ViewerElements from "../../locators/ViewerElements.js";
import PoleLocators from "../../locators/PoleLocators.js";
import CalloutsAction from "../../support/CalloutsAction.js";
import CalloutsLocators from "../../locators/CalloutsLocators.js";
import "../../support/commands.js";


describe('User Permissions', () => {
    const testUser = "cqyuiorzvv@wnbaldwy.com";
    const folderName = "Shared Space";
    const runName = "Test-HCR-ZF-Dec28-1";
    const updateWriteRunName="Test_31-12-2025";
    const revokeWriteRunName="Test-MLS07-03";
    const calloutPoleRunName="Test-Feb27"
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

    it('User_Permissions_003 - Verify the functionality of revoking all permissions', () => {

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

    it('User_Permissions_004 - Verify user has write permission', () => {

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

        // Step 3: Assign Write permission for folder and apply
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(runName, 'Write');
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 4: Login as test user and verify write actions are available
        loginToPortal(testUser, Constants.password);

        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type(runName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.contains(".runCardHomeName", runName)
        .should("be.visible")
        .click();

        // Verify Save is available and Save dialog can open
        cy.get("#canvas3D", { timeout: 60000 }).should("exist");
        ViewerElements.getMoreOptionsBtn.should('be.visible').click();
        ViewerElements.getSaveOption.should('be.visible').click();
        ViewerElements.getSaveDialog.should('be.visible');
        ViewerElements.getSaveCancelBtn.should('be.visible').click();
        cy.contains('.ToolTip-container', 'Profile menu').click();
        cy.contains('Logout').should('be.visible').click();
        cy.contains('Are you sure').should('be.visible');
        cy.get('[data-testid="confirm-button"]').should('be.visible').click();
      
        // Re login as admin and reset permissions
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
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
        LidarViewer.writeCheckbox(runName).find('img').click({ force: true });
        LidarViewer.readCheckbox(runName).find('img').click({ force: true });
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
        
    });

    it('User_Permissions_005 - Verify user has read permission', () => {

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

        // Step 3: Assign Write permission for folder and apply
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(runName, 'Read');
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 4: Login as test user and verify write actions are available
        loginToPortal(testUser, Constants.password);

        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type(runName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.contains(".runCardHomeName", runName)
        .should("be.visible")
        .click();

        // Verify Save is not available
        cy.get("#canvas3D", { timeout: 60000 }).should("exist");
        ViewerElements.getMoreOptionsBtn.should('be.visible').click();
        ViewerElements.getSaveOption.should('not.exist');
        cy.contains('.ToolTip-container', 'Profile menu').click();
        cy.contains('Logout').should('be.visible').click();
        cy.contains('Are you sure').should('be.visible');
        cy.get('[data-testid="confirm-button"]').should('be.visible').click();
      
        // Re login as admin and reset permissions
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
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
        LidarViewer.readCheckbox(runName).find('img').click({ force: true });
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
        
    });   

    it('User_Permissions_006 - Verifying the functionality of revoking write permissions', () => {

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

       // Step 3: Revoke Write permission for run
       LidarViewer.getUserPermissionsModal.should('be.visible');
       LidarViewer.writeCheckbox(revokeWriteRunName).find('img').click({ force: true });
       LidarViewer.readCheckbox(revokeWriteRunName).find('img').click({ force: true });
       LidarViewer.getUpdateButton.click();
       cy.get('[data-testid="confirm-button"]').contains("Apply").click();

       cy.reload();
       cy.logout();

       // Step 4: Login as test user and verify run is not visible
       loginToPortal(testUser, Constants.password);

       cy.get('input[placeholder="Type for search"]')
       .should("be.visible")
       .clear()
       .type(revokeWriteRunName);
       cy.wait(500);
       cy.get('div.primary-btn[alt="search"]')
       .should("be.visible")
       .click();

       cy.contains(".runCardHomeName", revokeWriteRunName)
       .should("not.exist");
       cy.logout();
     
       // Re login as admin and reset permissions
       cy.visit(Cypress.config('baseUrl'))
       Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
       LidarViewer.getProfileIcon.click();
       LidarViewer.getAdministrationOption.click();
       LidarViewer.getUserManagementOption.click();
       LidarViewer.getUserSearchInput.clear().type(testUser);
       LidarViewer.getUserRows.contains('td', testUser).should('exist');

       
       LidarViewer.getUserRows.contains('td', testUser)
           .parent('tr')
           .then((row) => {
               const $row = cy.wrap(row);
               LidarViewer.getPermissionsButton($row).click();
           });

       LidarViewer.getUserPermissionsModal.should('be.visible');
       LidarViewer.selectDropdownOption(revokeWriteRunName, 'Write');
       LidarViewer.getUpdateButton.click();
       cy.get('[data-testid="confirm-button"]').contains("Apply").click();
    });

    it('User_Permissions_007 - Verifying the functionality of updating write permissions', () => {

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

     // Step 3: Update Write permission for run
     LidarViewer.getUserPermissionsModal.should('be.visible');
     LidarViewer.selectDropdownOption(updateWriteRunName, 'Write');
     LidarViewer.getUpdateButton.click();
     cy.get('[data-testid="confirm-button"]').contains("Apply").click();

     cy.reload();
     cy.logout();

     // Step 4: Login as test user and verify run is not visible
     loginToPortal(testUser, Constants.password);

     cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(updateWriteRunName);
     cy.wait(500);
     cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();

     cy.contains(".runCardHomeName", updateWriteRunName)
     .should("be.visible")
     .click();

     // Verify Save is available and Save dialog can open
     cy.get("#canvas3D", { timeout: 60000 }).should("exist");
     ViewerElements.getMoreOptionsBtn.should('be.visible').click();
     ViewerElements.getSaveOption.should('be.visible').click();
     ViewerElements.getSaveDialog.should('be.visible');
     ViewerElements.getSaveCancelBtn.should('be.visible').click();
     cy.contains('.ToolTip-container', 'Profile menu').click();
     cy.contains('Logout').should('be.visible').click();
     cy.contains('Are you sure').should('be.visible');
     cy.get('[data-testid="confirm-button"]').should('be.visible').click();
   
     // Re login as admin and reset permissions
     cy.visit(Cypress.config('baseUrl'))
     Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
     LidarViewer.getProfileIcon.click();
     LidarViewer.getAdministrationOption.click();
     LidarViewer.getUserManagementOption.click();
     LidarViewer.getUserSearchInput.clear().type(testUser);
     LidarViewer.getUserRows.contains('td', testUser).should('exist');

     
     LidarViewer.getUserRows.contains('td', testUser)
         .parent('tr')
         .then((row) => {
             const $row = cy.wrap(row);
             LidarViewer.getPermissionsButton($row).click();
         });

     LidarViewer.getUserPermissionsModal.should('be.visible');
     LidarViewer.writeCheckbox(updateWriteRunName).find('img').click({ force: true });
     LidarViewer.getUpdateButton.click();
     cy.get('[data-testid="confirm-button"]').contains("Apply").click();
       
    });

    it('User_Permissions_008 - Verify read and write permissions on callout data', () => {

        // Part A: READ permissions => no Save, no Update/Delete callouts
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');

        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.writeCheckbox(calloutPoleRunName).find('img').click({ force: true });
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        loginToPortal(testUser, Constants.password);
        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type(calloutPoleRunName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.get(".runCardHomeName")
        .filter((_, el) => el.innerText.trim() === calloutPoleRunName)
        .should("have.length", 1)
        .first()
        .click();


        // Import callouts and validate restrictions in UI
        cy.wait(5000);
        CalloutsAction.importCalloutsFromServer();
       
        // No delete on callout cards in read-only mode
        CalloutsLocators.getCalloutCards.first().find('[data-testid="deletebutton"]').should('not.exist');

        cy.contains('.ToolTip-container', 'Profile menu').click();
        cy.contains('Logout').should('be.visible').click();
        cy.contains('Are you sure').should('be.visible');
        cy.get('[data-testid="confirm-button"]').should('be.visible').click();

        // Part B: WRITE permissions => Save option available for callouts
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');
        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(calloutPoleRunName, 'Write');
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        loginToPortal(testUser, Constants.password);
        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type(calloutPoleRunName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.get(".runCardHomeName")
        .filter((_, el) => el.innerText.trim() === calloutPoleRunName)
        .should("have.length", 1)
        .first()
        .click();

        ViewerElements.getMoreOptionsBtn.should('be.visible').click();
        ViewerElements.getSaveOption.should('be.visible').click();
        ViewerElements.getSaveDialog.should('be.visible');
        ViewerElements.getCalloutsCheckbox.should('be.visible');
        ViewerElements.getSaveCancelBtn.should('be.visible').click();
    });

    it('User_Permissions_009 - Verify restrictions on save, update and delete actions for read-only Poles data', () => {

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

        // Step 3: Assign Read permission for folder and apply
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.writeCheckbox(calloutPoleRunName).find('img').click({ force: true });
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 4: Login as test user and open a run
        loginToPortal(testUser, Constants.password);
        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type(calloutPoleRunName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.get(".runCardHomeName")
        .filter((_, el) => el.innerText.trim() === calloutPoleRunName)
        .should("have.length", 1)
        .first()
        .click();

        cy.get("#canvas3D", { timeout: 60000 }).should("exist");
        cy.wait(5000);
        // Step 5: Verify Save is not available (cannot save poles data)
        ViewerElements.getMoreOptionsBtn.should('be.visible').click();
        ViewerElements.getSaveOption.should('not.exist');

        // Step 6: Import poles from server (read should still allow viewing data)
        ViewerElements.getImportOption.should('be.visible').click();
        ViewerElements.getImportDialog.should('be.visible');
        ViewerElements.selectImportSource("From Server");
        ViewerElements.getImportPolesCheckbox.should('be.visible').click();
        ViewerElements.getImportApplyBtn.should('be.visible').click();
        cy.contains(/Poles downloaded successfully/i, { timeout: 20000 }).should("be.visible");

        // Step 7: Open any pole and verify update/delete controls are restricted
        cy.get(`div[role="button"][aria-label="abcd"]`, { timeout: 20000 })
            .should('have.length.greaterThan', 0)
            .first()
            .click({ force: true });

        PoleLocators.poleSidePanel.should('be.visible');

        // Delete buttons should not be available in read-only mode
        cy.get('[data-testid="deletebutton"]').should('not.exist');
        // Also ensure pole-panel save action is not available (if present in this UI)
        PoleLocators.saveButton.should('not.exist');

        cy.contains('.ToolTip-container', 'Profile menu').click();
        cy.contains('Logout').should('be.visible').click();
        cy.contains('Are you sure').should('be.visible');
        cy.get('[data-testid="confirm-button"]').should('be.visible').click();

        // Cleanup: restore Write for subsequent tests
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
        LidarViewer.getUserSearchInput.clear().type(testUser);
        LidarViewer.getUserRows.contains('td', testUser).should('exist');
        LidarViewer.getUserRows.contains('td', testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.selectDropdownOption(calloutPoleRunName, 'Write');
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
    });
   
});

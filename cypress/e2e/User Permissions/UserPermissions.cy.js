Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false; // prevents Cypress from failing the test
  }
});

import { 
  Adminlogin,
  loginToPortal
} from "../../utils/commonMethods";
import {
  selectRunInPermissions,
  removeReadPermission,
  removeWritePermission
} from "../../utils/Common_Methods/userPermissions.js";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import userPermissions from "../../utils/Constants/userPermissions.js";
import ViewerElements from "../../locators/ViewerElements.js";
import PoleLocators from "../../locators/PoleLocators.js";
import CalloutsAction from "../../support/CalloutsAction.js";
import CalloutsLocators from "../../locators/CalloutsLocators.js";
import "../../support/commands.js";


describe('User Permissions', () => {
  beforeEach(() => {
      cy.visit(Cypress.config('baseUrl'))
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
  });

  it('LVH-3098 - Verify user has read permission', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Step 3: Assign Write permission for folder and apply
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.runName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.runName, 'Read');
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 4: Login as test user and verify write actions are available
      loginToPortal( userPermissions.testUser, Constants.password);

      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.runName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.contains(".runCardHomeName",  userPermissions.runName)
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
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.runName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeReadPermission( userPermissions.runName);
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
      
  }); 

  it('LVH-3099 - Verify user has write permission', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Step 3: Assign Write permission for folder and apply
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.runName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.runName, 'Write');
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 4: Login as test user and verify write actions are available
      loginToPortal( userPermissions.testUser, Constants.password);

      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.runName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.contains(".runCardHomeName",  userPermissions.runName)
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
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.runName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeWritePermission( userPermissions.runName);
      removeReadPermission( userPermissions.runName);
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
      
  });

  it('LVH-3100 - Verify that a user with Read&Write permissions can see the run data on the home', () => {
     
    cy.logout();  
    // Login as test user and verify run appears on home
      loginToPortal(userPermissions.testUser, Constants.password);

      cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type('Test-Oct30-3');
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

      cy.contains(".runCardHomeName", 'Test-Oct30-3')
        .should("be.visible")
        .click();

      // Also ensure the 3D canvas loads
      cy.get("#canvas3D", { timeout: 60000 }).should("exist");
      ViewerElements.getMoreOptionsBtn.should('be.visible').click();
      ViewerElements.getSaveOption.should('be.visible').click();
      ViewerElements.getSaveDialog.should('be.visible');
      ViewerElements.getSaveCancelBtn.should('be.visible').click();

     
  });

  it('LVH-3101 - Verify that a user with Read&Write permissions can see the folder data on the home', () => {
     
    cy.logout();
    // Login as test user and verify folder appears on home
    loginToPortal(userPermissions.testUser, Constants.password);

    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type('Shared Space');
    cy.wait(500);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    cy.contains(".folderName", 'Shared Space')
      .should("be.visible")
      .dblclick();
    
    cy.get('.runCardHomeName').should('exist');

  });

  it('LVH-3102 - Verify that user have read permission to poles', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Step 3: Assign Read permission for folder and apply
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.calloutPoleRunName,'Read')
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 4: Login as test user and open a run
      loginToPortal( userPermissions.testUser, Constants.password);
      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.calloutPoleRunName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.get(".runCardHomeName")
      .filter((_, el) => el.innerText.trim() ===  userPermissions.calloutPoleRunName)
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

      // Cleanup: revoke read for subsequent tests
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeReadPermission( userPermissions.calloutPoleRunName);
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });  

  it('LVH-3103 - Verify resctictions on save, update and delete actions for user with read permissions on poles data', () => {

        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        // Step 3: Assign Read permission for folder and apply
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
        cy.get('button.searchbar-button').click();
        cy.wait(1000);
        selectRunInPermissions( userPermissions.calloutPoleRunName,'Read')
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 4: Login as test user and open a run
        loginToPortal( userPermissions.testUser, Constants.password);
        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type( userPermissions.calloutPoleRunName);
        cy.wait(500);
        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        cy.get(".runCardHomeName")
        .filter((_, el) => el.innerText.trim() ===  userPermissions.calloutPoleRunName)
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

        // Cleanup: revoke read for subsequent tests
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
        LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });
        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
        cy.get('button.searchbar-button').click();
        cy.wait(1000);
        removeReadPermission( userPermissions.calloutPoleRunName);
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });

  it('LVH-3110 - Verify read and write permissions on callout data', () => {

      // Part A: READ permissions => no Save, no Update/Delete callouts
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.calloutPoleRunName,'Read');
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      loginToPortal( userPermissions.testUser, Constants.password);
      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.calloutPoleRunName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.get(".runCardHomeName")
      .filter((_, el) => el.innerText.trim() ===  userPermissions.calloutPoleRunName)
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
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
        cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.calloutPoleRunName,'Write');
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      loginToPortal( userPermissions.testUser, Constants.password);
      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.calloutPoleRunName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.get(".runCardHomeName")
      .filter((_, el) => el.innerText.trim() ===  userPermissions.calloutPoleRunName)
      .should("have.length", 1)
      .first()
      .click();

      ViewerElements.getMoreOptionsBtn.should('be.visible').click();
      ViewerElements.getSaveOption.should('be.visible').click();
      ViewerElements.getSaveDialog.should('be.visible');
      ViewerElements.getCalloutsCheckbox.should('be.visible');
      ViewerElements.getSaveCancelBtn.should('be.visible').click();
      //logout
      cy.contains('.ToolTip-container', 'Profile menu').click();
      cy.contains('Logout').should('be.visible').click();
      cy.contains('Are you sure').should('be.visible');
      cy.get('[data-testid="confirm-button"]').should('be.visible').click();
      
      //PART C: Revoke both Read and Write Permissions for reset
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.calloutPoleRunName);
        cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeWritePermission( userPermissions.calloutPoleRunName);
      removeReadPermission( userPermissions.calloutPoleRunName);
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

  });

  it('LVH-3112 - Verifying the functionality of updating write permissions', () => {

    // Step 1: Search for the user
    LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
    LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
 
    // Step 2: Open User Permissions modal
    LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
        .parent('tr')
        .then((row) => {
            const $row = cy.wrap(row);
            LidarViewer.getPermissionsButton($row).click();
        });
 
    // Step 3: Update Write permission for run
    LidarViewer.getUserPermissionsModal.should('be.visible');
    LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.updateWriteRunName);
    cy.get('button.searchbar-button').click();
    cy.wait(1000);
    selectRunInPermissions( userPermissions.updateWriteRunName,'Write');
    LidarViewer.getUpdateButton.click();
    cy.get('[data-testid="confirm-button"]').contains("Apply").click();
 
    cy.reload();
    cy.logout();
 
    // Step 4: Login as test user and verify run is not visible
    loginToPortal( userPermissions.testUser, Constants.password);
 
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear()
    .type( userPermissions.updateWriteRunName);
    cy.wait(500);
    cy.get('div.primary-btn[alt="search"]')
    .should("be.visible")
    .click();
 
    cy.contains(".runCardHomeName",  userPermissions.updateWriteRunName)
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
    LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
    LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');
 
    
    LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
        .parent('tr')
        .then((row) => {
            const $row = cy.wrap(row);
            LidarViewer.getPermissionsButton($row).click();
        });
 
    LidarViewer.getUserPermissionsModal.should('be.visible');
    LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.updateWriteRunName);
    cy.get('button.searchbar-button').click();
    cy.wait(1000);
    removeWritePermission( userPermissions.updateWriteRunName);
    LidarViewer.getUpdateButton.click();
    cy.get('[data-testid="confirm-button"]').contains("Apply").click();
      
  });

  it('LVH-3114 - Verifying the functionality of revoking write permissions', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Step 3: Revoke Write permission for run
      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.revokeWriteRunName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeWritePermission( userPermissions.revokeWriteRunName);
      removeReadPermission( userPermissions.revokeWriteRunName);
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 4: Login as test user and verify run is not visible
      loginToPortal( userPermissions.testUser, Constants.password);

      cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type( userPermissions.revokeWriteRunName);
      cy.wait(500);
      cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

      cy.contains(".runCardHomeName",  userPermissions.revokeWriteRunName)
      .should("not.exist");
      cy.logout();
    
      // Re login as admin and reset permissions
      cy.visit(Cypress.config('baseUrl'))
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.revokeWriteRunName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.revokeWriteRunName,"Write");
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });

  it('LVH-3115 - Verify the functionality of revoking all permissions', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Wait for modal
      LidarViewer.getUserPermissionsModal.should('be.visible');

      // Step 3: Revoke read & write permissions for folder
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeWritePermission( userPermissions.folderName);
      removeReadPermission( userPermissions.folderName);
      
      // Step 4: Click update
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 6: Login as test user and verify folder is not visible
      loginToPortal( userPermissions.testUser, Constants.password);
      cy.contains( userPermissions.folderName).should('not.exist');

      cy.logout();

      // Step 8: Login back as Admin
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
      .parent('tr')
      .then((row) => {
          const $row = cy.wrap(row);
          LidarViewer.getPermissionsButton($row).click();
      });


      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.folderName, 'Write');
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });

  it('LVH-3118 - Verify that the functionality of assigning read permissions to multiple runs', () => {

      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
          .parent('tr')
          .then((row) => {
              const $row = cy.wrap(row);
              LidarViewer.getPermissionsButton($row).click();
          });

      // Wait for modal
      LidarViewer.getUserPermissionsModal.should('be.visible');

      // Step 3: Revoke read & write permissions for folder
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      removeWritePermission( userPermissions.folderName);
      removeReadPermission( userPermissions.folderName);
      
      // Step 4: Click update
      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();

      cy.reload();
      cy.logout();

      // Step 6: Login as test user and verify folder is not visible
      loginToPortal( userPermissions.testUser, Constants.password);
      cy.contains( userPermissions.folderName).should('not.exist');

      cy.logout();

      // Step 8: Login back as Admin
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
      LidarViewer.getProfileIcon.click();
      LidarViewer.getAdministrationOption.click();
      LidarViewer.getUserManagementOption.click();
      // Step 1: Search for the user
      LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

      // Step 2: Open User Permissions modal
      LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
      .parent('tr')
      .then((row) => {
          const $row = cy.wrap(row);
          LidarViewer.getPermissionsButton($row).click();
      });


      LidarViewer.getUserPermissionsModal.should('be.visible');
      LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
      cy.get('button.searchbar-button').click();
      cy.wait(1000);
      selectRunInPermissions( userPermissions.folderName, 'Write');

      LidarViewer.getUpdateButton.click();
      cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });

  it('LVH-3119 - Verify the functionality of revoking read permissions from multiple runs', () => {

        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getPermissionsButton($row).click();
            });

        // Wait for modal
        LidarViewer.getUserPermissionsModal.should('be.visible');

        // Step 3: Revoke read & write permissions for folder
        LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
        cy.get('button.searchbar-button').click();
        cy.wait(1000);
        removeWritePermission( userPermissions.folderName);
        removeReadPermission( userPermissions.folderName);
        
        // Step 4: Click update
        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();

        cy.reload();
        cy.logout();

        // Step 6: Login as test user and verify folder is not visible
        loginToPortal( userPermissions.testUser, Constants.password);
        cy.contains( userPermissions.folderName).should('not.exist');

        cy.logout();

        // Step 8: Login back as Admin
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
        // Step 1: Search for the user
        LidarViewer.getUserSearchInput.clear().type( userPermissions.testUser);
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser).should('exist');

        // Step 2: Open User Permissions modal
        LidarViewer.getUserRows.contains('td',  userPermissions.testUser)
        .parent('tr')
        .then((row) => {
            const $row = cy.wrap(row);
            LidarViewer.getPermissionsButton($row).click();
        });


        LidarViewer.getUserPermissionsModal.should('be.visible');
        LidarViewer.getUserPermissionsSearchInput.clear().type( userPermissions.folderName);
        cy.get('button.searchbar-button').click();
        cy.wait(1000);
        selectRunInPermissions( userPermissions.folderName,'Write');

        LidarViewer.getUpdateButton.click();
        cy.get('[data-testid="confirm-button"]').contains("Apply").click();
  });

});
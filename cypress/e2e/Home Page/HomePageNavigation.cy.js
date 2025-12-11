

describe("Home Page Navigation Tests", () => {
beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

    it('Home_Project_nav_001_Verify that double-clicking on a folder from the home page navigates the user into the folder.', () => {
        
        openDynamicFolderAndRun(folderPath, runName);
        cy.wait(2000);
        cy.get('.body3.ActiveCrumb.pointer').contains('Orbital-21-16482-2')

    });

    it('Home_Project_nav_002_Verify that clicking on the root element navigates the user back to the root view and displays all available data in home page', () => {
        openDynamicFolderAndRun(folderPath, runName);
        cy.wait(2000);
        cy.get('.body3.InactiveCrumb.pointer').contains('Runs').click()
        HomeLocators.ConfirmActionApplyButton.click()
        LidarViewer.getHomeText.should('have.text','Home Page')

    });

});
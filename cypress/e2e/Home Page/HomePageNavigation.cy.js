import {
  Adminlogin,
  openDynamicFolderAndRun,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";

describe("Home Page Navigation Tests", () => {
  const folderPath = ["Shared Space", "Automation"];
  const runName = "Automation_Atchyutha-";
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("LVH-3976 - Verify that double-clicking on a folder from the home page navigates the user into the folder.", () => {
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(2000);
    cy.get(".body3.ActiveCrumb.pointer").contains("Automation_Atchyutha-");
  });

  it('LVH-3977 - Verify that clicking on the root element navigates the user back to the root view and displays all available data in home page', () => {

    folderPath.forEach((folderPaths) => {
        cy.get(".folderName").contains(folderPaths).should("be.visible").dblclick();
        cy.wait(2000);
    });

    cy.get('.body3.InactiveCrumb.pointer').contains('Root').click()
    LidarViewer.getHomeText.should('have.text','Home Page')

  });

  it('LVH-3978 - Verify that clicking on a folder from search results opens the folder correctly.', () => {
   
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test');
    cy.wait(2000);
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click();
    cy.wait(2000);
    cy.get('.folderName').contains('Test').dblclick()
  });

  it('LVH-3979 - Verify that the select checkbox is displayed when more than one run is available.', () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="run-card-container"]').filter(':visible').should('have.length.gte', 2)
    cy.contains('div[role="checkbox"]', 'Select').should('be.visible')
  });

  it('LVH-3980 - Verify that the open button is displayed when at least one run is available.', () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="run-card-container"]').filter(':visible').should('have.length.gte', 1)
    cy.contains('div.primary-btn', 'Open').should('be.visible')
  });

  it('LVH-3381 - Verifying that the opening of multiple runs', () => {
    
    let firstRunName
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.wait(2000)
    cy.contains('div[role="checkbox"]', 'Select').should('be.visible').click()

    cy.get('[data-testid="run-card-container"]').filter(':visible')
    .then($runs => {
        firstRunName = $runs.eq(0).find('[data-testid="run-name"]').text().trim()
        cy.wrap($runs.eq(0)).click()
        cy.wrap($runs.eq(1)).click()
    })
    cy.contains('div.primary-btn', 'Open').should('be.visible').click()
    cy.get('.body3.ActiveCrumb.pointer').should('be.visible').and(($el) => {
    expect($el.text().trim()).to.eq(firstRunName)
    })
  });

  it('LVH-3982 - Verify that an alert is displayed when the user attempts to open more than 10 runs ', () => {
    
    cy.get(".folderName").contains("Atc").should("be.visible").dblclick()
    cy.wait(2000)
    cy.contains('div[role="checkbox"]', 'Select').should('be.visible').click()

    cy.get('[data-testid="run-card-container"]').filter(':visible').should('have.length.gte', 11)
      .then($runs => {
        Cypress._.take($runs.toArray(), 11).forEach(run => {
        cy.wrap(run).click()
      })
    })

    cy.contains('div.primary-btn', 'Open').should('be.visible').click()
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Maximum number of selected runs cannot be more than 10')
    })

  });

  it("LVH-3983 - Verify that the deselect of runs ", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.contains('div[role="checkbox"]', 'Select').should('be.visible').click()
    cy.get('[data-testid="run-card-container"]').filter(':visible')
    .then($runs => {
        cy.wrap($runs.eq(0)).click()
        cy.wrap($runs.eq(1)).click()
    })
    cy.get(".FileManager.flex-r.justify-between.m-30").contains(
      "Selected Runs 2"
    );
    cy.get('[data-testid="run-card-container"]').filter(':visible')
    .then($runs => {
        cy.wrap($runs.eq(0)).click()
        cy.wrap($runs.eq(1)).click()
    })
    cy.get(".FileManager.flex-r.justify-between.m-30").should(
      "not.contain",
      "Selected Runs 2"
    );
  });
  
});

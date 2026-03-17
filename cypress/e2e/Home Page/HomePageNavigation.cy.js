import {
  Adminlogin,
  openDynamicFolderAndRun,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import ViewerElements from "../../locators/ViewerElements.js";

describe("Home Page Navigation Tests", () => {
  const folderPath = ["Shared Space", "Automation"];
  const runName = "Automation_Atchyutha-";
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("LVH-3976 Home_Project_nav_001_Verify that double-clicking on a folder from the home page navigates the user into the folder.", () => {
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(2000);
    cy.get(".body3.ActiveCrumb.pointer").contains("Automation_Atchyutha-");
  });
  it('LVH-3978 Home_Project_nav_003_Verify that clicking on a folder from search results opens the folder correctly.', () => {
   
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test');
    cy.wait(2000);
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click();
    cy.wait(2000);
    cy.get('.folderName').contains('Test').dblclick()
  });
  it('LVH-3342 Home_Project_nav_006_Verifying that the opening of multiple runs', () => {
    
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
  it('LVH-3352 Multi-run_001_Verify that data can be successfully imported for all opened runs from the server', () => {
    
    let firstRunName
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get(".folderName").contains("Atc").should("be.visible").dblclick()
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

    ViewerElements.getMoreOptionsBtn
        .should("be.visible")
        .click();
    
    ViewerElements.getImportOption
        .click();
    
    ViewerElements.getImportDialog
        .should("be.visible");
    
    ViewerElements.selectImportSource("From Server");
    ViewerElements.getRunSelectDropdown.click();

    ViewerElements.getSelectAllRunsOption
      .should('be.visible')
      .click();
    ViewerElements.getRunSelectDropdown.click();
    ViewerElements.getMeasurementsCheckbox.click();
    
    ViewerElements.getImportApplyBtn
        .click();
    
    cy.wait(500);
    
    LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /downloaded/i);

  });
  it('LVH-3421 Home_Project_nav_008_Verify that clicking on the next button navigates to the next page', () => {
   
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
      // Verify starting on page 1
    cy.get('.pagination-item.selected')
    .should('contain', '1');

    // Click Next (right arrow)
    cy.get('.arrow.right')
      .should('be.visible')
      .click();

    // Verify page changed to 2
    cy.get('.pagination-item.selected')
      .should('contain', '2');

  });
  it('LVH-3422 Home_Project_nav_009_Verify that clicking on the previous button navigates to the previous page', () => {

    // Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Go to page 2 first
    cy.contains('.pagination-item', '2')
      .should('be.visible')
      .click();
  
    // Verify we are on page 2
    cy.get('.pagination-item.selected')
      .should('contain', '2');
  
    // Click Previous (left arrow)
    cy.get('.pagination-container .arrow.left')
      .should('be.visible')
      .click();
  
    // Verify we returned to page 1
    cy.get('.pagination-item.selected')
      .should('contain', '1');
  
  });

});

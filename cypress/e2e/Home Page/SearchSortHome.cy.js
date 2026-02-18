import {
  generateRandomCoordinates,
  Adminlogin,
  PolePlacement,
  SavePoleData,
  ZoomIN,
  openDynamicFolderAndRun,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import HomeLocators from "../../locators/HomeLocators.js";
import PoleLocators from "../../locators/PoleLocators.js";
import UserManagementLocators from "../../locators/UserManagementLocators.js";
import Constants from "../../utils/Constants.js";


describe("Search Sort Home Tests", () => {
  const folderPath = ["Shared Space", "Automation"];
  const runName = "Automation_Atchyutha-";
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("Automation pole", () => { 
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    PoleLocators.PoleIcon.click();
    cy.wait(6000);
    cy.get("#canvas3D").should("exist");
    ZoomIN();
    cy.wait(6000);
    UserManagementLocators.getSelectPoleFromNavbar.click();
    generateRandomCoordinates(1);
    PoleLocators.Id.type("Automation pole");
    SavePoleData();
    PoleLocators.PoleSaveMessage.should("have.text", "Pole saved successfully");
  });

  it("Home_001_Verify that the search functionality correctly displays runs based on the entered Pole ID that is available in the server.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type("Automation pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains("Orbital-21-16482-2");
  });

  it("Home_002_Verify that the system displays a clear no data available  message when searching for a pole id that is not available in the server.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type("No Pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    HomeLocators.NoRunsAvailableText.contains("No Runs available");
  });

  it("Home_004_Verify that searching for a Pole ID with leading or trailing spaces returns the correct run name.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type(" Automation pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains(
      "Automation_Atchyutha-"
    );
  });

  it("Home_007_Verify that the search feature correctly displays associated run data for valid latitude and longitude values.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('[data-testid="searchbar-container"]').type("34.164884,-84.178951");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains("feb2025run");
  });

  it("Home_008_Verify that the application handles invalid latitude and longitude values appropriately.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('[data-testid="searchbar-container"]').type("34.164884-84.178951"); // run name - feb2025run
    cy.get(".primary-btn").eq(1).click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains("longitude cannot be empty");
    });
  });

  it('Home_031_"Verify that the search functionality on the home page correctly identifies and displays existing folders based on the search query', () => {
    cy.get('[data-testid="searchbar-container"]').type("Demo"); // folder name :- Demo
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get(".folderName").contains("Demo");
  });

  it('Home_032_"Verify that the search functionality on the home page correctly identifies and displays existing runs based on the search query', () => {
    cy.get('[data-testid="searchbar-container"]').type("Automation_Atchyutha-"); // folder name :- Demo
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains(
      "Automation_Atchyutha-"
    );
  });

  it("Home_036_Verify the display of the back button after performing  a search.", () => {
    
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test')
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click()
    cy.get('button.padding-5').should('be.visible').click()
    cy.get('.folderName').contains('Shared Space').should('be.visible')
    cy.get('input[placeholder="Type for search"]').should('be.visible')

  });

  it("Home_037_Verify that clicking on the list view icon displays all runs in list view", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="list-view-icon-inactive"]').should('be.visible').click()
    cy.get('[data-testid="list-view-icon-active"]').should('be.visible')
    cy.get('.Table').should('be.visible')
    cy.get('.TableData').should('have.length.greaterThan', 0)
  });

  it("Home_038_Clicking on the grid view icon displays all runs in grid view", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="grid-view-icon-active"]').should('be.visible')
    cy.get('[data-testid="run-card-container"]').filter(':visible')
      .should('have.length.greaterThan', 0)
      .each($card => {
        cy.wrap($card)
          .parents('a.linkDecoration').should('exist')
      })
  });

});
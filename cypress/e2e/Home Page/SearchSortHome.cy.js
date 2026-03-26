Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false; // prevents Cypress from failing the test
  }
});
import {
  Adminlogin,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import HomeLocators from "../../locators/HomeLocators.js";
import PoleLocators from "../../locators/PoleLocators.js";
import UserManagementLocators from "../../locators/UserManagementLocators.js";
import Constants from "../../utils/Constants.js";
import PoleActions from "../../support/PoleAction.js";
import ViewerElements from "../../locators/ViewerElements.js";
import "../../support/commands.js";



describe("Search Sort Home Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("LVH-3412 - Verify that the search functionality correctly displays runs based on the entered Pole ID that is available in the server.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3413 - Verify that the system displays a clear no data available  message when searching for a pole id that is not available in the server.", () => {
    
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type("No Pole");
    cy.get('div.primary-btn[alt="search"]')
    .should("be.visible")
    .click();
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /no runs/i);
  });

  it("LVH-3414 - Verify that the application can save a pole with a custom ID containing all types of characters (letters, numbers, special characters, spaces) and display the associated run name when searched.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350, `Pole_123#@!$${Date.now()}`);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3415 - Verify that searching for a Pole ID with leading or trailing spaces returns the correct run name.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type("  " + poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3416 - Verify network failure functionality when searching with a valid pole id", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.simulateOffline();
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /check internet connection/i);
    cy.simulateOnline();
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3417 - Verify that the search feature correctly displays associated run data for valid latitude and longitude values.", () => {

    let latlng = "26.974109339800187, -82.15931013816875";

    cy.get(".HomeDropDown").first().select("LatLng");

    cy.get('[data-testid="searchbar-container"]')
      .type(latlng);

    cy.get('div.primary-btn[alt="search"]').click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")


  });

  it("LVH-3418 - Verify that the application handles invalid latitude and longitude values appropriately.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type("34.164884-84.178951");

     cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains("longitude cannot be empty");
    });
  });

  it("LVH-3419 - Verify the network failure functionality for Latitude and Longitude search", () => {
    
    let latlng = "26.974109339800187, -82.15931013816875";
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(latlng);
    cy.simulateOffline();
     cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    LidarViewer.infoMessageContainer
     .should("be.visible")
     .invoke("text")
     .should("match", /check internet connection/i);
    cy.simulateOnline();
    cy.get('div.primary-btn[alt="search"]')
    .should("be.visible")
    .click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")

  });

  it("LVH-3441 - Verify that the search functionality on the home page correctly identifies and displays existing folders based on the search query", () => {
     // Search Folder
     const folderName="Automation";
     cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(folderName);

   cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    cy.get(".folderName").contains(folderName);
  });

  it("LVH-3442 - Verify that the search functionality on the home page correctly identifies and displays existing runs based on the search query", () => {
     // Search Run
    const runName="Test-Oct30-3"
     cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(runName);

   cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();

   // Open Run
   cy.contains(".runCardHomeName", runName)
     .should("be.visible")
  });

  it("LVH-3446 - Verify the display of the back button after performing a search.", () => {
    
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test')
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click()
    cy.get('button.padding-5').should('be.visible').click()
    cy.get('.folderName').contains('Shared Space').should('be.visible')
    cy.get('input[placeholder="Type for search"]').should('be.visible')

  });

  it("LVH-3447 - Verify that clicking on the list view icon displays all runs in list view", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="list-view-icon-inactive"]').should('be.visible').click()
    cy.get('[data-testid="list-view-icon-active"]').should('be.visible')
    cy.get('.Table').should('be.visible')
    cy.get('.TableData').should('have.length.greaterThan', 0)
  });

  it("LVH-3448 - Verify that clicking on the grid view icon displays all runs in grid view", () => {
    
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
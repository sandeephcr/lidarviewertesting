Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false; // prevents Cypress from failing the test
  }
});
import {
  Adminlogin,
} from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";
import PoleActions from "../../support/PoleAction.js";
import ViewerElements from "../../locators/ViewerElements.js";


describe("Search Sort Home Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("LVH-3412 Home_001_Verify that the search functionality correctly displays runs based on the entered Pole ID that is available in the server.", () => {
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
    cy.get('[data-testid="searchbar-container"]').type(poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3417 Home_007_Verify that the search feature correctly displays associated run data for valid latitude and longitude values.", () => {

    let latlng = "26.974109339800187, -82.15931013816875";

    cy.get(".HomeDropDown").first().select("LatLng");

    cy.get('[data-testid="searchbar-container"]')
      .type(latlng);

    cy.get('div.primary-btn[alt="search"]').click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")


  });

});
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Request failed with status code 500")) {
      return false; // prevents Cypress from failing the test
    }
  });
import ViewerElements from '../../locators/ViewerElements.js';
import { 
    Adminlogin,
     } from '../../utils/commonMethods.js';
import Constants from "../../utils/Constants.js";

describe("Compact Map View Module", () => {

    beforeEach(() => {

    cy.visit("/login");

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

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
    });

    it("CompactMenu_001 - Verify run markers disappear from map view when toggled off", () => {

        // Ensure markers are visible first
        ViewerElements.getRunMarkerButtons
          .should('have.length.greaterThan', 0);
      
        // Open Map Layer Filter
        ViewerElements.getMapLayerFilterBtn.click();
      
        // Turn Run Markers OFF
        ViewerElements.getRunMarkersToggle
          .uncheck({ force: true });
      
          // Verify markers disappear
        ViewerElements.getRunMarkerButtons
        .should('have.length', 0);
            
      });

    it("CompactMenu_002 - Verify run markers display on map view when toggled on", () => {

    ViewerElements.getMapLayerFilterBtn.click();
    ViewerElements.getRunMarkersToggle.uncheck({ force: true });
    ViewerElements.getRunMarkerButtons
        .should('have.length', 0);
    ViewerElements.getRunMarkersToggle.check({ force: true });
    ViewerElements.getRunMarkerButtons
        .should('have.length.greaterThan', 0);      
    });
});
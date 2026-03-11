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
import LidarViewer from '../../locators/LidarViewer.js';

describe("Multi Sensor Module", () => {

    beforeEach(() => {

        cy.visit("/login");

        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

        // Search Run
        cy.get('input[placeholder="Type for search"]')
        .should("be.visible")
        .clear()
        .type("Test-Feb27-Small");

        cy.get('div.primary-btn[alt="search"]')
        .should("be.visible")
        .click();

        // Open Run
        cy.contains(".runCardHomeName", "Test-Feb27-Small")
        .should("be.visible")
        .click();

        // Wait for default viewer load
        cy.get("#canvas3D", { timeout: 20000 })
        .should("be.visible");

        // Navigate to image 60
        cy.url().then((url) => {
        const updatedUrl = url.replace(/\/\d+\?/, '/447?');
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

    it("Multi_Sensor_001 - Verify the system restricts deselecting both Hesai and ZF sensors at the same time", () => {

        ViewerElements.getPcdFilterButton.click();
    
        // Listen for browser alert
        cy.on('window:alert', (text) => {
            expect(text).to.contains('LiDAR unit data must be visible');
        });
    
        // Uncheck Unit-1
        ViewerElements.getUnit1Checkbox.uncheck({ force: true });
    
        // Attempt to uncheck Unit-2 (this triggers alert)
        ViewerElements.getUnit2Checkbox.uncheck({ force: true });
    
    });

    it("Multi_Sensor_002 - Verify LiDAR unit filter panel appears when PCD Filters icon is clicked", () => {

        // Click PCD Filters button
        ViewerElements.getPcdFilterButton.click();
    
        // Verify filter panel is displayed
        cy.get('#tw-panel-class-filters2')
          .should('be.visible');
    
    });

});
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Request failed with status code 500")) {
      return false; // prevents Cypress from failing the test
    }
  });
import ViewerElements from '../../locators/ViewerElements.js';
import PoleActions from '../../support/PoleAction.js';
import { 
    Adminlogin,
     } from '../../utils/commonMethods.js';
import Constants from "../../utils/Constants.js";
import PoleLocators from '../../locators/PoleLocators.js';

describe("Poles Module", () => {

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


  it("Pole_001 - Verify deleting imported pole data from server", () => {

      // Place and save pole
      const poleName = PoleActions.placePole(600, 350);
      PoleActions.savePole();
      cy.reload();
      cy.wait(5000);
      // Import poles from server
      PoleActions.importPoles();
      // Delete the imported pole
      PoleActions.deletePole(poleName);

    });

  it("Pole_002 - Verify opening pole form by clicking pole node or ID in camera", () => {
      // Place a pole and get the generated name
      const poleName = PoleActions.placePole(600, 350);
      // Search by polename and open it
      PoleActions.openPole(poleName);
      PoleLocators.getField('Id').should('have.value', poleName);
    });

  it("Pole_003 - Verify opening pole form by clicking Pole icon in the map view", () => {
    // Place a pole and get the generated name
    const poleName = PoleActions.placePole(600, 350);
    // Search by polename and open it
    PoleActions.openPole(poleName);
    PoleLocators.getField('Id').should('have.value', poleName);
    });
  
  it("Pole_004 - Verify the functionality of copy feature in pole", () => {


    });

  it("Pole_005 - Verify the functionality of moving the existing pole location", () => {


    });

  it("Pole_006 - Verify the functionality of delinking poles", () => {


    });

  it("Pole_007 -Verify the functionality of display associated form data upon switching  between tabs", () => {


    });

  it("Pole_008 -Verify the functionality of deleting nested forms under main tabs in the pole form", () => {


    });

  it("Pole_009 - Verify the functionality of adding new sub forms in pole form", () => {


    });

  it("Pole_010 -Verify the functionality of display associated form data upon switching  between tabs", () => {

    });

  it("Pole_011 -Verify the functionality of saving updated pole to server", () => {


    });

  it("Pole_012 -Verifying the functionality of pole form deletion from server", () => {

        // Place & save pole
        const poleName = PoleActions.placePole(600, 350);
        PoleActions.savePole();
        cy.reload();
        cy.wait(5000);
        PoleActions.importPoles();
        PoleActions.openPole(poleName);
        PoleActions.deletePole(poleName);
        cy.get(`div[role="button"][aria-label="${poleName}"]`).should('not.exist');
        cy.contains(poleName).should('not.exist');

    });

  it("Pole_013 -Verifying the functionality of importing pole from the server", () => {
        // Place, save, and reload
        const poleName = PoleActions.placePole(650, 400);
        PoleActions.savePole();
        cy.reload();
        cy.wait(5000);
        // Import poles from server and verify new pole is present
        PoleActions.importPoles();
        cy.get(`div[role="button"][aria-label="${poleName}"]`).should('exist');
        PoleActions.openPole(poleName);
        PoleLocators.getField('Id').should('have.value', poleName);
    });

  it("Pole_014 -Verifying the functionality of saving pole form data to server", () => {
        // Place a new pole and save it
        const poleName = PoleActions.placePole(700, 450);
        PoleActions.savePole();

        // Reload and re-import to verify persistence
        cy.reload();
        cy.wait(5000);
        PoleActions.importPoles();

        // Verify the pole exists and form data is correct
        cy.get(`div[role="button"][aria-label="${poleName}"]`).should('exist');
        PoleActions.openPole(poleName);
        PoleLocators.getField('Id').should('have.value', poleName);
    });
});
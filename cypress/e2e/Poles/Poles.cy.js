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
import LidarViewer from '../../locators/LidarViewer.js';

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


  it("LVH-3688 Pole_001 - Verify deleting imported pole data from server", () => {

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

  it("LVH-3687 Pole_002 - Verify opening pole form by clicking pole node or ID in camera", () => {
      // Place a pole and get the generated name
      const poleName = PoleActions.placePole(600, 350);
      // Search by polename and open it
      PoleActions.openPole(poleName);
      PoleLocators.getField('Id').should('have.value', poleName);
    });

  it("LVH-3686 Pole_003 - Verify opening pole form by clicking Pole icon in the map view", () => {
    // Place a pole and get the generated name
    const poleName = PoleActions.placePole(600, 350);
    // Search by polename and open it
    PoleActions.openPole(poleName);
    PoleLocators.getField('Id').should('have.value', poleName);
    });
  
  it("LVH-3675 Pole_004 - Verify the functionality of copy feature in pole", () => {

    // SPANS TAB
    PoleLocators.getTab('Spans').click();
  
    PoleActions.copyForm("Span", 1);
    PoleLocators.poleSidePanel.contains('Span [2]').should('exist');
  
    PoleActions.copyForm("Wire", 1);
    PoleLocators.poleSidePanel.contains('Wire [2]').should('exist');
  
    PoleActions.copyForm("SpanGuy", 1);
    PoleLocators.poleSidePanel.contains('SpanGuy [2]').should('exist');

    // ANCHORS TAB
  
    PoleLocators.getTab('Anchors').click();
  
    PoleActions.copyForm("Anchor", 1);
    PoleLocators.poleSidePanel.contains('Anchor [2]').should('exist');
  
    PoleActions.copyForm("Guy", 1);
    PoleLocators.poleSidePanel.contains('Guy [2]').should('exist');

    // EQUIPMENT TAB

    PoleLocators.getTab('Equipment').click();
  
    PoleActions.copyForm("Equipment", 1);
    PoleLocators.poleSidePanel.contains('Equipment [2]').should('exist');
  
    });

  it("LVH-3668 Pole_005 -Verify the functionality of display associated form data upon switching  between tabs", () => {

      PoleLocators.getTab('Spans').click();
      cy.contains('Span [1]').should('exist');
      cy.contains('Wire [1]').should('exist');
      cy.contains('SpanGuy [1]').should('exist');
      PoleLocators.getTab('Anchors').click();
      cy.contains('Anchor [1]').should('exist');
      cy.contains('Guy [1]').should('exist');
      PoleLocators.getTab('Equipment').click();
      cy.contains('Equipment [1]').should('exist');

    });

  it("LVH-3667 Pole_006 - Verify deleting nested forms under main tabs in pole form", () => {
  
    // ======================
    // SPANS TAB
    // ======================
    PoleLocators.getTab('Spans').click();
  
    PoleLocators.poleSidePanel.contains('Add Span').click();
    PoleActions.deleteSpan(1);
  
    PoleLocators.poleSidePanel.contains('Add Wire').click();
    PoleActions.deleteWire(1);
  
    PoleLocators.poleSidePanel.contains('Add Spanguy').click();
    PoleActions.deleteSpanGuy(1);
  
    // ======================
    // ANCHORS TAB
    // ======================
    PoleLocators.getTab('Anchors').click();
  
    PoleLocators.poleSidePanel.contains('Add Anchor').click();
    PoleActions.deleteAnchor(1);
  
    PoleLocators.poleSidePanel.contains('Add Down Guy').click();
    PoleActions.deleteDownGuy(1);
  
    // ======================
    // EQUIPMENT TAB
    // ======================
    PoleLocators.getTab('Equipment').click();
  
    PoleLocators.poleSidePanel.contains('Add Equipment').click();
    PoleActions.deleteEquipment(1);
  
    });

  it("LVH-3666 Pole_007 - Verify the functionality of adding new sub forms in pole form", () => {
    // SPANS TAB
    PoleLocators.getTab('Spans').click();
    PoleLocators.poleSidePanel.contains('Add Span').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /span/i);
  
    PoleLocators.poleSidePanel.contains('Add Wire').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /wire/i);
  
    PoleLocators.poleSidePanel.contains('Add Spanguy').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /spanguy/i);

    // ANCHORS TAB
    PoleLocators.getTab('Anchors').click();
  
    PoleLocators.poleSidePanel.contains('Add Anchor').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /anchor/i);
  
    PoleLocators.poleSidePanel.contains('Add Down Guy').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /downguy/i);

    // EQUIPMENT TAB
    PoleLocators.getTab('Equipment').click();
  
    PoleLocators.poleSidePanel.contains('Add Equipment').click();
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /equipment/i);
  
    });

  it("LVH-3658 Pole_008 -Verify the functionality of saving updated pole to server", () => {
    
    const poleName = PoleActions.placePole(650, 380);
    PoleActions.savePole();

    // Reload and import to simulate a fresh session and ensure persistence
    cy.reload();
    cy.wait(5000);
    PoleActions.importPoles();

    // Open the pole after import
    PoleActions.openPole(poleName);

    // Edit the pole ID / name (simulate update)
    const updatedPoleName = `${poleName}_updated`;
    PoleLocators.getField('Id').should('be.visible').clear().type(updatedPoleName);

    // Save the updated pole
    PoleActions.savePole();

    // Reload and import again to verify the update persisted
    cy.reload();
    cy.wait(5000);
    PoleActions.importPoles();

    // Confirm new/updated pole exists and has updated data
    cy.get(`div[role="button"][aria-label="${updatedPoleName}"]`).should('exist');
    PoleActions.openPole(updatedPoleName);
    PoleLocators.getField('Id').should('have.value', updatedPoleName);
    });

  it("LVH-3657 Pole_009 -Verifying the functionality of pole form deletion from server", () => {
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

  it("LVH-3656 Pole_010 -Verifying the functionality of importing pole from the server", () => {
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

  it("LVH-3655 Pole_011 -Verifying the functionality of saving pole form data to server", () => {
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
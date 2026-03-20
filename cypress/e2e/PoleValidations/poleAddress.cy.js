Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false;
  }
});
import { VALIDATION_DATA } from '../../utils/poleValidationConstants';

import { Adminlogin } from "../../utils/commonMethods";

describe("Poles Module", () => {

  beforeEach(() => {

    cy.intercept('GET', '**/Points/**/0_0_0_0.dat.int').as('loadPCD');

    cy.visit("/login");
    Adminlogin("admin@hcrobo.com", "Cnsw-123")

    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]').click();

    cy.contains(".runCardHomeName", "Test-Oct30-3").click();

    cy.get("#canvas3D", { timeout: 20000 }).should("be.visible");

    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    cy.get("#canvas3D", { timeout: 20000 }).should("be.visible");

    cy.contains('.ToolTip-container', 'PCD + Camera')
      .should("be.visible")
      .click();

    // Wait for point cloud root tile to load instead of cy.wait(5000)
    cy.wait('@loadPCD', { timeout: 180000 });

  });

  /* ================= COMMON METHODS ================= */

  function placePole() {

  cy.get("#canvas3D").should("be.visible");

  cy.contains('.ToolTip-container', 'Add pole')
    .should("be.visible")
    .click();

  // Add Pole is a UI mode change only — no network request fires.
  // Using a short wait for canvas to stabilize in Add Pole mode.
  cy.wait(2000);

  cy.get('#canvas3D')
    .click('center', { force: true });

  cy.contains('.SideBarHeader span', 'Pole Details')
    .should('be.visible');
}

function deletePole(poleName) {

  // Click the pole to open it first
  openPole(poleName);

  // Click the delete button
  cy.get('[data-testid="deletebutton"]')
    .should('be.visible')
    .click();

  // Click the Apply/confirm button in the confirmation dialog
  cy.get('[data-testid="confirm-button"]')
    .should('be.visible')
    .click();

  // Verify pole is removed from the list
  cy.get(`div[role="button"][aria-label="${poleName}"]`)
    .should('not.exist');
}

  function setPoleField(fieldName, value) {

    cy.get('.SideBarBody')
      .scrollTo('top', { ensureScrollable: false });

    cy.contains('.SideBarHeader span', 'Pole Details')
      .closest('.flex-c')
      .contains('span', fieldName)
      .parent()
      .find('input, textarea')
      .scrollIntoView()
      .should('be.visible')
      .clear({ force: true })
      .type(value, { force: true })
      .should('have.value', value);
  }

  function savePole() {

    cy.contains('.ToolTip-container', 'More options')
      .click();

    cy.contains('.MoreOption', 'Save')
      .should('be.visible')
      .click();

    cy.get('.ModalMedium')
      .should('be.visible');

    cy.contains('[role="checkbox"]', 'Poles')
      .click();

    cy.get('[data-testid="confirm-button"]')
      .click();

    cy.contains('saved successfully', { timeout: 30000 })
      .should('be.visible');
  }

  function importPole() {

       cy.reload();
    cy.intercept('GET', '**/Points/**/0_0_0_0.dat.int').as('loadPCDAfterReload');

 

    // Wait for PCD to reload instead of cy.wait(5000)
    cy.wait('@loadPCDAfterReload', { timeout: 30000 });

    cy.contains('.ToolTip-container', 'More options')
      .click();

    cy.contains('.MoreOption', 'Import')
      .click();

    cy.contains('.ModalMedium', 'Import')
      .should('be.visible');

    cy.get('.ModalMedium select')
      .select('From Server');

    cy.contains('.import-options [role="checkbox"]', 'Poles')
      .click();

    cy.get('.ModalMedium [data-testid="confirm-button"]')
      .click();

    cy.contains('Poles downloaded successfully', { timeout: 10000 })
      .should('be.visible');
  }

  function saveAndImportPoles(fieldName, value) {
    const poleName = `AutoPole_${Date.now()}`;
    placePole();
    setPoleField('Id', poleName);
    setPoleField(fieldName, value);
    savePole();
    importPole();
    openPole(poleName);
    verifyPoleField(fieldName, value);
  }

  function verifyPoleField(fieldName, value) {

    cy.get('.SideBarBody')
      .scrollTo('top', { ensureScrollable: false });

    cy.contains('.SideBarHeader span', 'Pole Details')
      .closest('.flex-c')
      .contains('span', fieldName)
      .parent()
      .find('input, textarea')
      .scrollIntoView()
      .should('have.value', value);
  }

  function openPole(poleName) {

    cy.get(`div[role="button"][aria-label="${poleName}"]`)
      .should('exist')
      .click({ force: true });

    cy.contains('.SideBarHeader span', 'Pole Details')
      .should('be.visible');
  }

 it("LVH-7185 LVH-7440 Verify Pole Address accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.INTEGER);
  });
 
  it("LVH-7187 LVH-7443 Verify Pole Address accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.FLOATING_POINT);
  });
 
  it("LVH-7186 LVH-7445 Verify Pole Address accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.STRING);
  });
 
  it("LVH-7190 LVH-7446 Verify Pole Address accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.ALPHANUMERIC);
  });
 
  it("LVH-7188 LVH-7450 Verify Pole Address accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.SPECIAL_CHARS);
  });
 
  it("LVH-7192 LVH-7449 Verify Pole Address accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.QUOTES);
  });
 
  it("LVH-7193 LVH-7448 Verify Pole Address accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.SCRIPTS);
  });
 
  it("LVH-7191 LVH-7447 Verify Pole Address accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.SPACES_ESCAPE);
  });
 
  it("LVH-7189 LVH-7441 Verify Pole Address accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.ZERO_VALUE);
  });
 
  it("LVH-7442 Verify Pole Address accepts Negative, imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.NEGATIVE);
  });
 
  it("LVH-7444 Verify Pole Address accepts Scientific Notation, imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.SCIENTIFIC);
  });
 
  it("LVH-7451 Verify Pole Address accepts Geo Data, imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.GEO_DATA);
  });
 
  it("LVH-7194 Verify Pole Address accepts Boolean, saves to server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.BOOLEAN);
  });
 
});
 
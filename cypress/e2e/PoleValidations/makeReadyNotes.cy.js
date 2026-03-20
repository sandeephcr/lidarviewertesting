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

 it("LVH-7225 LVH-7488 Verify Make Ready Notes accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.INTEGER);
  });
 
  it("LVH-7227 LVH-7491 Verify Make Ready Notes accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.FLOATING_POINT);
  });
 
  it("LVH-7226 LVH-7493 Verify Make Ready Notes accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.STRING);
  });
 
  it("LVH-7230 LVH-7494 Verify Make Ready Notes accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.ALPHANUMERIC);
  });
 
  it("LVH-7228 LVH-7498 Verify Make Ready Notes accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.SPECIAL_CHARS);
  });
 
  it("LVH-7232 LVH-7497 Verify Make Ready Notes accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.QUOTES);
  });
 
  it("LVH-7233 LVH-7496 Verify Make Ready Notes accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.SCRIPTS);
  });
 
  it("LVH-7231 LVH-7495 Verify Make Ready Notes accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.SPACES_ESCAPE);
  });
 
  it("LVH-7229 LVH-7489 Verify Make Ready Notes accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.ZERO_VALUE);
  });
 
  it("LVH-7490 Verify Make Ready Notes accepts Negative, imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.NEGATIVE);
  });
 
  it("LVH-7492 Verify Make Ready Notes accepts Scientific Notation, imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.SCIENTIFIC);
  });
 
  it("LVH-7499 Verify Make Ready Notes accepts Geo Data, imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.GEO_DATA);
  });
 
  it("LVH-7234 Verify Make Ready Notes accepts Boolean, saves to server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.BOOLEAN);
  });
 
});
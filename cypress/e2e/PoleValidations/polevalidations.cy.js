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

  /* ================= TEST Fielding Status ================= */

  // it("LVH-7115 LVH-7356 Verify fielding status accepts integer and saves to server and import from server", () => {
  //     saveAndImportPoles('Fielding Status','12345');
  // });

  // it("LVH-7125 LVH-7368 Verify rework reason accepts integer and saves to server and import from server", () => {
  //     saveAndImportPoles('Rework Reason','12345');
  // });

  // it("LVH-7378 LVH-7128 Verify rework reason accepts special Characters and saves to server and import from server", () => {
  //   saveAndImportPoles('Rework Reason', '!@##@#@##@');
  // });

    it("LVH-7378 LVH-7128 Verify rework reason accepts special Characters and saves to server and import from server", () => {
    saveAndImportPoles('Rework Reason', '17.406498,78.4772439');
  });

  

  //   it("LVH-7378 LVH-7128 Verify rework reason accepts special Characters and saves to server and import from server", () => {
  //   saveAndImportPoles('Rework Reason', '!@##@#@##@');
  // });


  // it("LVH-7115 Verify fielding status accepts integer", () => {
  //     const poleName = `AutoPole_${Date.now()}`;
  //     placePole();
  //     setPoleField('Id',poleName);
  //     setPoleField('Fielding Status','12345');
  //     savePole();
  //     importPole();
  //     openPole(poleName);
  //     verifyPoleField('Fielding Status','12345');
  // });



// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Fielding Status', () => {

  it("LVH-7115 LVH-7356 Verify Fielding Status accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7117 LVH-7359 Verify Fielding Status accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7116 LVH-7361 Verify Fielding Status accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.STRING);
  });

  it("LVH-7120 LVH-7362 Verify Fielding Status accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7118 LVH-7366 Verify Fielding Status accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7122 LVH-7365 Verify Fielding Status accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7123 LVH-7364 Verify Fielding Status accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7121 LVH-7363 Verify Fielding Status accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7119 LVH-7357 Verify Fielding Status accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7358 Verify Fielding Status accepts Negative and imports from server", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7360 Verify Fielding Status accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7367 Verify Fielding Status accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7124 Verify Fielding Status accepts Boolean and saves to server", () => {
    saveAndImportPoles('Fielding Status', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Rework Reason', () => {

  it("LVH-7125 LVH-7368 Verify Rework Reason accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7127 LVH-7371 Verify Rework Reason accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7126 LVH-7373 Verify Rework Reason accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.STRING);
  });

  it("LVH-7130 LVH-7374 Verify Rework Reason accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7128 LVH-7378 Verify Rework Reason accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7132 LVH-7377 Verify Rework Reason accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7133 LVH-7376 Verify Rework Reason accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7131 LVH-7375 Verify Rework Reason accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7129 LVH-7369 Verify Rework Reason accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7370 Verify Rework Reason accepts Negative and imports from server", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7372 Verify Rework Reason accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7379 Verify Rework Reason accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7134 Verify Rework Reason accepts Boolean and saves to server", () => {
    saveAndImportPoles('Rework Reason', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Recollect Notes', () => {

  it("LVH-7135 LVH-7380 Verify Recollect Notes accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7137 LVH-7383 Verify Recollect Notes accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7136 LVH-7385 Verify Recollect Notes accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.STRING);
  });

  it("LVH-7140 LVH-7386 Verify Recollect Notes accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7138 LVH-7390 Verify Recollect Notes accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7142 LVH-7389 Verify Recollect Notes accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7143 LVH-7388 Verify Recollect Notes accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7141 LVH-7387 Verify Recollect Notes accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7139 LVH-7381 Verify Recollect Notes accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7382 Verify Recollect Notes accepts Negative and imports from server", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7384 Verify Recollect Notes accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7391 Verify Recollect Notes accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7144 Verify Recollect Notes accepts Boolean and saves to server", () => {
    saveAndImportPoles('Recollect Notes', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Sequence', () => {

  it("LVH-7145 LVH-7392 Verify Sequence accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7147 LVH-7395 Verify Sequence accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7146 LVH-7397 Verify Sequence accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.STRING);
  });

  it("LVH-7150 LVH-7398 Verify Sequence accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7148 LVH-7402 Verify Sequence accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7152 LVH-7401 Verify Sequence accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7153 LVH-7400 Verify Sequence accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7151 LVH-7399 Verify Sequence accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7149 LVH-7393 Verify Sequence accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7394 Verify Sequence accepts Negative and imports from server", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7396 Verify Sequence accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7403 Verify Sequence accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7154 Verify Sequence accepts Boolean and saves to server", () => {
    saveAndImportPoles('Sequence', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Map #', () => {

  it("LVH-7155 LVH-7404 Verify Map # accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7157 LVH-7407 Verify Map # accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7156 LVH-7409 Verify Map # accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.STRING);
  });

  it("LVH-7160 LVH-7410 Verify Map # accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7158 LVH-7414 Verify Map # accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7162 LVH-7413 Verify Map # accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7163 LVH-7412 Verify Map # accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7161 LVH-7411 Verify Map # accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7159 LVH-7405 Verify Map # accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7406 Verify Map # accepts Negative and imports from server", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7408 Verify Map # accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7415 Verify Map # accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7164 Verify Map # accepts Boolean and saves to server", () => {
    saveAndImportPoles('Map #', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Id', () => {

  it("LVH-7165 LVH-7416 Verify Id accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7167 LVH-7419 Verify Id accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7166 LVH-7421 Verify Id accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.STRING);
  });

  it("LVH-7170 LVH-7422 Verify Id accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7168 LVH-7426 Verify Id accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7172 LVH-7425 Verify Id accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7173 LVH-7424 Verify Id accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7171 LVH-7423 Verify Id accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7169 LVH-7417 Verify Id accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7418 Verify Id accepts Negative and imports from server", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7420 Verify Id accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7427 Verify Id accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7174 Verify Id accepts Boolean and saves to server", () => {
    saveAndImportPoles('Id', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Type', () => {

  it("LVH-7175 LVH-7428 Verify Type accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7177 LVH-7431 Verify Type accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7176 LVH-7433 Verify Type accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.STRING);
  });

  it("LVH-7180 LVH-7434 Verify Type accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7178 LVH-7438 Verify Type accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7182 LVH-7437 Verify Type accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7183 LVH-7436 Verify Type accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7181 LVH-7435 Verify Type accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7429 Verify Type accepts Zero Value and imports from server", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7430 Verify Type accepts Negative and imports from server", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7432 Verify Type accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7439 Verify Type accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7184 Verify Type accepts Boolean and saves to server", () => {
    saveAndImportPoles('Type', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Circumference', () => {

  it("LVH-7524 Verify Circumference accepts Integer and imports from server", () => {
    saveAndImportPoles('Circumference (")', VALIDATION_DATA.INTEGER);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Pole Address', () => {

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

  it("LVH-7442 Verify Pole Address accepts Negative and imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7444 Verify Pole Address accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7451 Verify Pole Address accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7194 Verify Pole Address accepts Boolean and saves to server", () => {
    saveAndImportPoles('Pole Address', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Field Notes', () => {

  it("LVH-7195 LVH-7452 Verify Field Notes accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7197 LVH-7455 Verify Field Notes accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7196 LVH-7457 Verify Field Notes accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.STRING);
  });

  it("LVH-7200 LVH-7458 Verify Field Notes accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7198 LVH-7462 Verify Field Notes accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7202 LVH-7461 Verify Field Notes accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7203 LVH-7460 Verify Field Notes accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7201 LVH-7459 Verify Field Notes accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7199 LVH-7453 Verify Field Notes accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7454 Verify Field Notes accepts Negative and imports from server", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7456 Verify Field Notes accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7463 Verify Field Notes accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7204 Verify Field Notes accepts Boolean and saves to server", () => {
    saveAndImportPoles('Field Notes', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Note', () => {

  it("LVH-7205 Verify Note accepts Integer and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7207 Verify Note accepts Floating Point and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7206 Verify Note accepts String and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.STRING);
  });

  it("LVH-7210 Verify Note accepts Alphanumeric and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7208 Verify Note accepts Special Characters and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7212 Verify Note accepts Quotes and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7213 Verify Note accepts Scripts and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7211 Verify Note accepts Spaces/Escape Types and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7209 Verify Note accepts Zero Value and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7214 Verify Note accepts Boolean and saves to server", () => {
    saveAndImportPoles('Note', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Load Capacity', () => {

  it("LVH-7215 LVH-7476 Verify Load Capacity accepts Integer, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.INTEGER);
  });

  it("LVH-7217 LVH-7479 Verify Load Capacity accepts Floating Point, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.FLOATING_POINT);
  });

  it("LVH-7216 LVH-7481 Verify Load Capacity accepts String, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.STRING);
  });

  it("LVH-7220 LVH-7482 Verify Load Capacity accepts Alphanumeric, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.ALPHANUMERIC);
  });

  it("LVH-7218 LVH-7486 Verify Load Capacity accepts Special Characters, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.SPECIAL_CHARS);
  });

  it("LVH-7222 LVH-7485 Verify Load Capacity accepts Quotes, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.QUOTES);
  });

  it("LVH-7223 LVH-7484 Verify Load Capacity accepts Scripts, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.SCRIPTS);
  });

  it("LVH-7221 LVH-7483 Verify Load Capacity accepts Spaces/Escape Types, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.SPACES_ESCAPE);
  });

  it("LVH-7219 LVH-7477 Verify Load Capacity accepts Zero Value, saves to server and imports correctly", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.ZERO_VALUE);
  });

  it("LVH-7478 Verify Load Capacity accepts Negative and imports from server", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7480 Verify Load Capacity accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7487 Verify Load Capacity accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7224 Verify Load Capacity accepts Boolean and saves to server", () => {
    saveAndImportPoles('Load Capacity', VALIDATION_DATA.BOOLEAN);
  });

});

// ═══════════════════════════════════════════════════════════════════════════════
describe('Pole Info Tab — Make Ready Notes', () => {

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

  it("LVH-7490 Verify Make Ready Notes accepts Negative and imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.NEGATIVE);
  });

  it("LVH-7492 Verify Make Ready Notes accepts Scientific Notation and imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.SCIENTIFIC);
  });

  it("LVH-7499 Verify Make Ready Notes accepts Geo Data and imports from server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.GEO_DATA);
  });

  it("LVH-7234 Verify Make Ready Notes accepts Boolean and saves to server", () => {
    saveAndImportPoles('Make Ready Notes', VALIDATION_DATA.BOOLEAN);
  });

}); 

});

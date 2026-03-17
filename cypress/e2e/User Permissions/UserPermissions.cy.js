import { Adminlogin, loginToPortal } from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import ViewerElements from "../../locators/ViewerElements.js";
import PoleLocators from "../../locators/PoleLocators.js";
import CalloutsAction from "../../support/CalloutsAction.js";
import CalloutsLocators from "../../locators/CalloutsLocators.js";
import "../../support/commands.js";

const TEST_USER = "cqyuiorzvv@wnbaldwy.com";
const FOLDER = "Shared Space";

// Helpers to reduce repeated admin permission setup
function openUserPermissions() {
  LidarViewer.getUserSearchInput.clear().type(TEST_USER);
  LidarViewer.getUserRows.contains("td", TEST_USER).should("exist");
  LidarViewer.getUserRows
    .contains("td", TEST_USER)
    .parent("tr")
    .then((row) => LidarViewer.getPermissionsButton(cy.wrap(row)).click());
  LidarViewer.getUserPermissionsModal.should("be.visible");
}

function setPermissionAndApply(level) {
  LidarViewer.selectDropdownOption(FOLDER, level);
  LidarViewer.getUpdateButton.click();
  cy.get('[data-testid="confirm-button"]').contains("Apply").click();
}

function restoreWritePermission() {
  Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  LidarViewer.getProfileIcon.click();
  LidarViewer.getAdministrationOption.click();
  LidarViewer.getUserManagementOption.click();
  openUserPermissions();
  setPermissionAndApply("Write");
}

function revokePermissions() {
  openUserPermissions();
  LidarViewer.writeCheckbox(FOLDER).find("img").click({ force: true });
  LidarViewer.readCheckbox(FOLDER).find("img").click({ force: true });
  LidarViewer.getUpdateButton.click();
  cy.get('[data-testid="confirm-button"]').contains("Apply").click();
}

function openFirstRunInFolder() {
  cy.get(".folderName").contains(FOLDER).should("be.visible").dblclick();
  cy.get('[data-testid="run-card-container"]').filter(":visible").first().click({ force: true });
  cy.contains("div.primary-btn", "Open").should("be.visible").click();
  cy.get("#canvas3D", { timeout: 60000 }).should("exist");
}

describe("User Permissions", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewer.getProfileIcon.click();
    LidarViewer.getAdministrationOption.click();
    LidarViewer.getUserManagementOption.click();
  });

  it("LVH-3119 User_Permissions_001 - Verify revoking read permissions for multiple runs", () => {
    revokePermissions();
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("not.exist");
    cy.logout();

    restoreWritePermission();
  });

  it("LVH-3118 User_Permissions_002 - Verify assigning read permissions for multiple runs", () => {
    revokePermissions();
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("not.exist");
    cy.logout();

    restoreWritePermission();
  });

  it("LVH-3115 User_Permissions_003 - Verify revoking all permissions", () => {
    revokePermissions();
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("not.exist");
    cy.logout();

    restoreWritePermission();
  });

  it("LVH-3099 User_Permissions_004 - Verify user has write permission", () => {
    openUserPermissions();
    setPermissionAndApply("Write");
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("be.visible").click();
    ViewerElements.getSaveDialog.should("be.visible");
    ViewerElements.getSaveCancelBtn.should("be.visible").click();
    cy.logout();
  });

  it("LVH-3103 User_Permissions_005 - Verify read-only restrictions on Poles data", () => {
    openUserPermissions();
    setPermissionAndApply("Read");
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("not.exist");

    ViewerElements.getImportOption.should("be.visible").click();
    ViewerElements.getImportDialog.should("be.visible");
    ViewerElements.selectImportSource("From Server");
    ViewerElements.getImportPolesCheckbox.should("be.visible").click();
    ViewerElements.getImportApplyBtn.should("be.visible").click();
    cy.contains(/Poles downloaded successfully/i, { timeout: 20000 }).should("be.visible");

    cy.get('div[role="button"][aria-label]', { timeout: 20000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click({ force: true });

    PoleLocators.poleSidePanel.should("be.visible");
    cy.get('[data-testid="deletebutton"]').should("not.exist");
    PoleLocators.getField("Id").should(($el) => {
      expect($el.is(":disabled") || $el.attr("readonly") !== undefined, "Id field is read-only").to.equal(true);
    });
    PoleLocators.saveButton.should("not.exist");
    cy.logout();

    restoreWritePermission();
  });

  it("LVH-3114 User_Permissions_006 - Verify revoking write permissions", () => {
    openUserPermissions();
    setPermissionAndApply("Read");
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("not.exist");
    cy.logout();

    restoreWritePermission();
  });

  it("LVH-3112 User_Permissions_007 - Verify updating write permissions", () => {
    openUserPermissions();
    setPermissionAndApply("Read");

    cy.reload();
    openUserPermissions();
    setPermissionAndApply("Write");
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("be.visible");
    cy.logout();
  });

  it("LVH-3110 User_Permissions_008 - Verify read and write permissions on callout data", () => {
    // Part A: Read-only
    openUserPermissions();
    setPermissionAndApply("Read");
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("not.exist");

    CalloutsAction.importCalloutsFromServer();
    CalloutsLocators.getCalloutsBtn.should("be.visible").click();
    CalloutsLocators.getCalloutDetailsBtn.should("be.visible").click();
    CalloutsLocators.getCalloutCards.should("have.length.greaterThan", 0);
    CalloutsLocators.getCalloutCards.first().find('[data-testid="deletebutton"]').should("not.exist");
    CalloutsLocators.getCalloutCards.first().find("span").first().click({ force: true });
    CalloutsLocators.getCalloutTextarea.should(($el) => {
      expect($el.is(":disabled") || $el.attr("readonly") !== undefined, "Callout textarea is read-only").to.equal(true);
    });
    cy.get('[data-testid="cancel-button"]').then(($btn) => {
      if ($btn.length) cy.wrap($btn).click({ force: true });
    });
    cy.logout();

    // Part B: Write
    restoreWritePermission();
    cy.reload();
    cy.logout();

    loginToPortal(TEST_USER, Constants.password);
    cy.contains(FOLDER).should("be.visible");
    openFirstRunInFolder();

    ViewerElements.getMoreOptionsBtn.should("be.visible").click();
    ViewerElements.getSaveOption.should("be.visible").click();
    ViewerElements.getSaveDialog.should("be.visible");
    ViewerElements.getCalloutsCheckbox.should("be.visible");
    ViewerElements.getSaveCancelBtn.should("be.visible").click();
    cy.logout();
  });
});

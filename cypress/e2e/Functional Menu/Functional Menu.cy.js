import ViewerElements from "../../locators/ViewerElements.js";
import { Adminlogin } from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";

describe("Functional Menu Module", () => {
  beforeEach(() => {
    cy.visit("/login");
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

    cy.get('input[placeholder="Type for search"]').should("be.visible").clear().type("Test-Oct30-3");
    cy.get('div.primary-btn[alt="search"]').should("be.visible").click();
    cy.contains(".runCardHomeName", "Test-Oct30-3").should("be.visible").click();
    cy.get("#canvas3D", { timeout: 20000 }).should("be.visible");

    cy.url().then((url) => {
      cy.visit(url.replace(/\/\d+\?/, "/60?"));
    });
    cy.get("#canvas3D", { timeout: 20000 }).should("be.visible");

    ViewerElements.getPcdCameraViewBtn.should("be.visible").click();
    cy.wait(5000);
  });

  it("LVH-3231 FunctionalMenu_001 - Verify the functionality of snapshot", () => {
    ViewerElements.getSnapshotBtn.should("be.visible").click();
    cy.exec("dir cypress\\downloads").then((result) => {
      expect(result.stdout).to.include(".png");
      cy.exec("del cypress\\downloads\\*.png");
    });
  });
});

import ViewerElements from "../../locators/ViewerElements.js";
import { Adminlogin } from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";

describe("Compact Map View Module", () => {
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

  it("LVH-3077 CompactMenu_001 - Verify run markers disappear when toggled off", () => {
    ViewerElements.getRunMarkerButtons.should("have.length.greaterThan", 0);
    ViewerElements.getMapLayerFilterBtn.click();
    ViewerElements.getRunMarkersToggle.uncheck({ force: true });
    ViewerElements.getRunMarkerButtons.should("have.length", 0);
  });

  it("LVH-3076 CompactMenu_002 - Verify run markers display when toggled on", () => {
    ViewerElements.getMapLayerFilterBtn.click();
    ViewerElements.getRunMarkersToggle.uncheck({ force: true });
    ViewerElements.getRunMarkerButtons.should("have.length", 0);
    ViewerElements.getRunMarkersToggle.check({ force: true });
    ViewerElements.getRunMarkerButtons.should("have.length.greaterThan", 0);
  });
});

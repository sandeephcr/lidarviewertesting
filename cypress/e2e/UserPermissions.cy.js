import UserManagementLocators from "../locators/UserManagementLocators";
import PoleLocators from "../locators/PoleLocators";
import Constants from "../utils/Constants";
import "cypress-real-events/support";
import coordinates from "../fixtures/coordinates.json";
import {
  updateUserPermissions,
  openDynamicFolderAndRun,
  PointPlacement,
  ClickonPoint,
  CalloutPlacement,
  PolylinePlacement,
} from "../utils/UserPermessionMethods";
import { login } from "../utils/LoginMethods";
import {
  ZoomIN,
  SelectAndPlacePole,
  PoleAlldelbtns,
} from "../utils/PoleMethods";
import MeasurementsLocators from "../locators/MeasurementsLocators";
import PointLocators from "../locators/PointLocators";
import CalloutsLocators from "../locators/CalloutsLocators";

describe("UserPermissions", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("ReadPermission_001_Verify that a user with read-only permissions cannot delete or save poles data", () => {
    const testDataB = {
      email: "atchyutha.padarthi@hcrobo.com",
      runName: "ZF_03Dec2025_IMG472",
      permissionType: "Read",
    };

    // updateUserPermissions(
    //   testDataB.email,
    //   testDataB.runName,
    //   testDataB.permissionType
    // );

    login(testDataB.email, Constants.testuserPwd);
    const folderPath = ["Shared Space", "ZF_03Dec2025_IMG472"];
    const runName = testDataB.runName;

    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    cy.get(".ToolTip-container").eq(11).click();
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").should(
      "not.contain",
      "Save"
    );
    cy.wait(4000);
    ZoomIN();
    const [x, y] = coordinates.coordinates[1];
    SelectAndPlacePole(x, y);
    PoleAlldelbtns();
    PoleLocators.getPoleDeleteIcon.should("not.exist");
  });

  it("ReadPermission_002_Verify that a user with read-only permissions cannot delete or save measurements data", () => {
    const testDataA = {
      email: "atchyutha.padarthi@hcrobo.com",
      runName: "ZF_03Dec2025_IMG472",
      permissionType: "Read",
    };

    // updateUserPermissions(
    //   testDataA.email,
    //   testDataA.runName,
    //   testDataA.permissionType
    // );

    login(testDataA.email, Constants.testuserPwd);
    const folderPath = ["Shared Space", "Automation"];
    const runName = "ZF_03Dec2025_IMG472";
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    cy.get(".ToolTip-container").eq(11).click();
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").should(
      "not.contain",
      "Save"
    );

    // Import Measurements From server
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog")
      .contains("Import")
      .click();
    cy.get(".import-options").contains("Measurements").click();
    cy.get(".primary-btn").click();
    MeasurementsLocators.getMeasurementDeleteButton.should("not.exist");
  });

  it("ReadPermission_003_Verify that a user with read-only permissions cannot delete or save points data", () => {
    const testDataC = {
      email: "atchyutha.padarthi@hcrobo.com",
      runName: "ZF_03Dec2025_IMG472",
      permissionType: "Read",
    };

    updateUserPermissions(
      testDataC.email,
      testDataC.runName,
      testDataC.permissionType
    );

    login(testDataC.email, Constants.testuserPwd);
    const folderPath = ["Shared Space", "Automation"];
    const runName = testDataC.runName;
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);

    cy.get(".ToolTip-container").eq(11).click();
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").should(
      "not.contain",
      "Save"
    );
    cy.wait(6000);
    // ZoomIN();
    PointPlacement(211, 595);
    ClickonPoint(211, 595);
    PointLocators.PointEditIcon.click();
    PointLocators.getPointFeatureDeleteButton.should("not.exist");
  });

  it("ReadPermission_004_Verify that a user with read-only permissions cannot delete or save callouts data", () => {
    const testDataE = {
      email: "atchyutha.padarthi@hcrobo.com",
      runName: "ZF_03Dec2025_IMG472",
      permissionType: "Read",
    };

    updateUserPermissions(
      testDataE.email,
      testDataE.runName,
      testDataE.permissionType
    );

    login(testDataE.email, Constants.testuserPwd);
    const folderPath = ["Shared Space", "Automation"];
    const runName = testDataE.runName;
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    cy.get(".ToolTip-container").eq(11).click();
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").should(
      "not.contain",
      "Save"
    );
    cy.wait(6000);
    CalloutPlacement();
    CalloutsLocators.getCalloutDeleteIcon.should("not.exist");
  });

  it.only("ReadPermission_005_Verify that a user with read-only permissions cannot delete or save polylines data", () => {
    const testDataF = {
      email: "atchyutha.padarthi@hcrobo.com",
      runName: "ZF_03Dec2025_IMG472",
      permissionType: "Read",
    };

    // updateUserPermissions(
    //   testDataF.email,
    //   testDataF.runName,
    //   testDataF.permissionType
    // );

    login(testDataF.email, Constants.testuserPwd);
    const folderPath = ["Shared Space", "Automation"];
    const runName = testDataF.runName;
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    cy.get(".ToolTip-container").eq(11).click();
    cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").should(
      "not.contain",
      "Save"
    );
    cy.wait(6000);
    PolylinePlacement();
    MeasurementsLocators.getMeasurementDeleteButton.should("not.exist");
  });
});

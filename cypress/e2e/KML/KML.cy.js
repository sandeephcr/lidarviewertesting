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
import MeasurementActions from '../../support/MeasurementAction.js';
import MeasurementLocators from '../../locators/MeasurementLocators.js';
import SettingsLocators from '../../locators/SettingsLocators.js';
import PoleLocators from '../../locators/PoleLocators.js';
import PoleActions from '../../support/PoleAction.js';
import CalloutsAction from '../../support/CalloutsAction.js';
import CalloutsLocators from '../../locators/CalloutsLocators.js';
import PointsAction from '../../support/PointsAction.js';
import PointsLocators from '../../locators/PointsLocators.js';

describe("KML Module", () => {

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

it("KML_001 - Verifying the functionality of exporting all types of measurement data as KML file to local machine ", () => {

  
    // Step 3: Place or ensure measurements exist (optional if data already exists)
    MeasurementActions.placeHorizontalMeasurement(500, 800, 600, 850);
    MeasurementActions.placeVerticalOffsetMeasurement(520, 810);
    MeasurementActions.placePerpendicularMeasurement(530, 615, 570, 655, 600, 700);
    MeasurementActions.placePointToPointMeasurement(540, 725, 560, 745);
  
    MeasurementActions.exportMeasurementsToKML();
  
    cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('kml');
        cy.exec('del cypress\\downloads\\*kml*.kml');
      });

});

it("KML_002 - Verifying the functionality of exporting horizontal measurement data as GeoJason file format to local machine  ", () => {

    MeasurementActions.placeHorizontalMeasurement(500, 800, 600, 850);
    MeasurementActions.exportMeasurementsToGeoJson();
  
    cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('Geo');
        cy.exec('del cypress\\downloads\\*geo*.json');
      });

});

it("KML_003 - Verify the functionality of exporting vertical measurement data as a shapefile to local machine", () => {

    MeasurementActions.placeVerticalMeasurement(500, 800, 500, 550);
    MeasurementActions.exportMeasurementsToShape();
  
    cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('shape');
        cy.exec('del cypress\\downloads\\*shape*.zip');
      });

});

it("KML_004 - Verify the functionality of exporting Point-to-Point measurement data as a shapefile to local machine", () => {

    MeasurementActions.placePointToPointMeasurement(510, 820, 630, 880);
    MeasurementActions.exportMeasurementsToShape();
  
    cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('shape');
        cy.exec('del cypress\\downloads\\*shape*.zip');
    });

});


});
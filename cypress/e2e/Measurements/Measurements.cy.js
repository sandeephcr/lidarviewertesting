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

describe("Measurements Module", () => {

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

  it("Measurement_001 - Verify the functionality of deleting point-to-point measurement", () => {

    MeasurementActions.placePointToPointMeasurement(500, 600, 600, 650);

    MeasurementActions.getLatestMeasurementId().then((measurementId) => {
  
      MeasurementActions.deleteMeasurementById(measurementId);
      MeasurementLocators.measurementsContainer
        .find(`[data-measurement-id="${measurementId}"]`)
        .should('not.exist');
    });

  });

  it("Measurement_002 - Verify saving P2P measurement data to server", () => {

    // Place measurement
    MeasurementActions.placePointToPointMeasurement(500, 600, 600, 650);
    MeasurementLocators.measurementsContainer.find('[data-measurement-id]').should('have.length.at.least', 1);
    MeasurementActions.saveMeasurementsToServer();
  
  });

  it("Measurement_003 - Verify saving with no measurement data", () => {

    // Try to save measurements
    ViewerElements.getMoreOptionsBtn.click();
    ViewerElements.getSaveOption.click();
    ViewerElements.getSaveDialog.should('be.visible');
    ViewerElements.getMeasurementsCheckbox.click();
    ViewerElements.getSaveConfirmBtn.click();
  
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /measurement.*empty/i);
  
  });

  it("Measurement_004 - Verify deleting a horizontal measurement", () => {

    // 1. Perform a horizontal measurement
    MeasurementActions.placeHorizontalMeasurement(500, 800, 700, 850);
  
      MeasurementActions.getLatestMeasurementId().then((measurementId) => {
  
        MeasurementActions.deleteMeasurementById(measurementId);
        MeasurementLocators.measurementsContainer
          .find(`[data-measurement-id="${measurementId}"]`)
          .should('not.exist');
      });
  });

  it("Measurement_005 - Verify the functionality of saving horizontal measurement data to server", () => {

    // Place measurement
    MeasurementActions.placeHorizontalMeasurement(500, 800, 700, 850);
    MeasurementLocators.measurementsContainer.find('[data-measurement-id]').should('have.length.at.least', 1);
    MeasurementActions.saveMeasurementsToServer();
  
  });

  it("Measurement_006 - Verify deleting an angle measurement", () => {

    // Place angle measurement
    MeasurementActions.placeAngleMeasurement(500, 800, 600, 850, 600, 900);
  
    MeasurementActions.getLatestMeasurementId().then((measurementId) => {
  
      MeasurementActions.deleteMeasurementById(measurementId);
  
      MeasurementLocators.measurementsContainer
        .find(`[data-measurement-id="${measurementId}"]`)
        .should('not.exist');
    });
  
  });

  it("Measurement_007 - Verify the functionality of saving angle measurement data to server", () => {

    // Place angle measurement
    MeasurementActions.placeAngleMeasurement(500, 800, 600, 850, 600, 900);
    MeasurementLocators.measurementsContainer.find('[data-measurement-id]').should('have.length.at.least', 1);
    // Save measurements
    MeasurementActions.saveMeasurementsToServer();
  
  });

  it("Measurement_008 - Verify the functionality of saving perpendicular measurement data to server", () => {

    // Place perpendicular measurement
    MeasurementActions.placePerpendicularMeasurement(500, 800, 600, 850, 600, 900);
    MeasurementLocators.measurementsContainer.find('[data-measurement-id]').should('have.length.at.least', 1);
    MeasurementActions.saveMeasurementsToServer();
  
  });

  it("Measurement_009 - Verify updated vertical offset measurement functionality", () => {

    ViewerElements.getSettingsBtn.click();
    SettingsLocators.measurementsTab.should('be.visible').click();
    MeasurementActions.setVerticalOffsetValue(40);
    SettingsLocators.closeSettingsBtn.click();
  
    // Activate measurement tool
    MeasurementActions.placeVerticalOffsetMeasurement({
      x: 500,
      y: 650
    });
  
    // Verify measurement created and reflects offset value
    MeasurementLocators.measurementsContainer
      .find('[data-measurement-id]')
      .should('contain', '40');
  
  });

  it("Measurement_010 - Verify deleting a vertical offset measurement", () => {

    // 1. Perform vertical offset measurement
    MeasurementActions.placeVerticalOffsetMeasurement({
      x: 500,
      y: 650
    });
  
    MeasurementActions.getLatestMeasurementId().then((measurementId) => {
      MeasurementActions.deleteMeasurementById(measurementId);
      MeasurementLocators.measurementsContainer
        .find(`[data-measurement-id="${measurementId}"]`)
        .should('not.exist');
    });
  
  });

  it("Measurement_011 - Verify the functionality of deleting polyline measurement", () => {

    // 1. Place a polyline measurement with multiple points
    MeasurementActions.placePolylineMeasurement([
      { x: 500, y: 300 },
      { x: 550, y: 350 },
      { x: 600, y: 400 }
    ]);
  
    // 2. Get the latest measurement ID
    MeasurementActions.getLatestMeasurementId().then((measurementId) => {
  
      MeasurementActions.deleteMeasurementById(measurementId);
 
      MeasurementLocators.measurementsContainer
        .find(`[data-measurement-id="${measurementId}"]`)
        .should('not.exist');
    
    });
  
  });

  it("Measurement_012 - Verify the functionality of saving polyline measurement data to server", () => {

    // 1. Place a polyline measurement with multiple points
    MeasurementActions.placePolylineMeasurement([
      { x: 500, y: 300 },
      { x: 550, y: 350 },
      { x: 600, y: 400 }
    ]);

    MeasurementLocators.measurementsContainer.find('[data-measurement-id]').should('have.length.at.least', 1);
    MeasurementActions.savePolylineToServer();
  });

  it("Measurement_013 - Verify the functionality of clearing measurements", () => {

    // 1. Draw a polyline
    MeasurementActions.placePolylineMeasurement([
      { x: 500, y: 300 },
      { x: 550, y: 350 },
      { x: 600, y: 400 }
    ]);
  
    MeasurementActions.clearAllMeasurements();
  });

  it("Measurement_014 - Verify saving measurement file to local machine and server", () => {

    // Create a measurement
    MeasurementActions.placeHorizontalMeasurement(500, 800, 650, 850);
  
    MeasurementLocators.measurementsContainer
      .find('[data-measurement-id]')
      .should('have.length.at.least', 1);
  
    MeasurementActions.saveMeasurementsToLocalAndServer();
  
    cy.exec('dir cypress\\downloads').then((result) => {
      expect(result.stdout).to.include('measurements');
      cy.exec('del cypress\\downloads\\*measurements*.lwv');
    });
  
  });

});
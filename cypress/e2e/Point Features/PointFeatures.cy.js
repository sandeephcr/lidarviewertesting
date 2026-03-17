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
import PointsAction from '../../support/PointsAction.js';
import '../../support/commands.js'

describe("Point Features Module", () => {

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

it("LVH-3174 Points_001 - Verify placing and saving a point to server", () => {

    // 1–4 Activate point feature, place point, open dialog, fill data
    PointsAction.placePoint(500, 800);
    
    // 5 Save point to server
    PointsAction.savePointsToServer();
  
  });

it("LVH-3178 Points_002 - Verify deleting a point", () => {

    // Define point location once
    const point = { x: 500, y: 700 };

    // Place the point
    PointsAction.placePoint(point.x, point.y);

    // Delete the point
    PointsAction.deletePoint(point.x, point.y);

    // Verify delete message
    LidarViewer.infoMessageContainer
        .should("be.visible")
        .invoke("text")
        .should("match", /point.*deleted/i);

});

it("LVH-3181 Points_003 - Verify deleting an imported point from server", () => {
  
    const point = { x: 500, y: 600 };
  
    // Place a point
    PointsAction.placePoint(point.x, point.y);
    PointsAction.savePointsToServer();
    cy.reload();
    cy.wait(5000);
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");
  
    // Import points from server
    PointsAction.importPointsFromServer();
    cy.wait(3000);
    PointsAction.deletePoint(point.x, point.y);
  
    // Verify delete message
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /point.*deleted/i);
  
  });

 it("LVH-3188 Points_004 - Verify saving points data to server", () => {
 
    // 1–4 Activate point feature, place point, open dialog, fill data
    PointsAction.placePoint(500, 750);
    
    // 5 Save point to server
    PointsAction.savePointsToServer();
  
  });

it("LVH-3183 Points_005 - Verify saving points data to local machine", () => {
  
    PointsAction.placePoint(500, 850);
    PointsAction.savePointsToLocalMachine();
    cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('PointFeatures');
        cy.exec('del cypress\\downloads\\*PointFeatures*.lwv');
    });
});
  
it("LVH-3184 Points_006 - Verify importing points data from server", () => {
  
    const point = { x: 500, y: 600 };

    // Place a point
    PointsAction.placePoint(point.x, point.y);
    PointsAction.savePointsToServer();
    cy.reload();
    cy.wait(5000);
    cy.get("#canvas3D", { timeout: 20000 })
        .should("be.visible");

    // Import points from server
    PointsAction.importPointsFromServer();

});

it("LVH-3188 Points_007 - Verify network failure when saving points to server", () => {
  
    const point = { x: 500, y: 650 };
    // Place a point
    PointsAction.placePoint(point.x, point.y);
    cy.simulateOffline();
    ViewerElements.getMoreOptionsBtn.click();
    ViewerElements.getSaveOption.click();
    ViewerElements.getSaveDialog
        .should('be.visible');
    ViewerElements.getPointFeaturesCheckbox
        .click();
    ViewerElements.getSaveConfirmBtn
        .click();
    // Verify network error message
    LidarViewer.infoMessageContainer
    .should("be.visible")
    .invoke("text")
    .should("match", /unable to save|internet connection/i);
  
    // Restore network
    cy.simulateOnline();
  
  });

it("LVH-3190 Points_008 - Verify updating point locations", () => {
  
    const point1 = { x: 500, y: 650 };
    const point2 = { x: 600, y: 700 };

    const newPoint1 = { x: 700, y: 800 };
    const newPoint2 = { x: 800, y: 850 };

    // Place two points
    PointsAction.placePoint(point1.x, point1.y);
    PointsAction.placePoint(point2.x, point2.y);

    // Measure them
    PointsAction.measureBetweenExistingPoints(point1, point2);

    // Drag first point
    cy.get('#canvas3D')
        .trigger('mousedown', point1.x, point1.y, { force: true }).wait(200)
        .trigger('mousemove', newPoint1.x, newPoint1.y, { force: true }).wait(200)
        .trigger('mouseup', { force: true });

    // Drag connected point
    cy.get('#canvas3D')
        .trigger('mousedown', point2.x, point2.y, { force: true }).wait(200)
        .trigger('mousemove', newPoint2.x, newPoint2.y, { force: true }).wait(200)
        .trigger('mouseup', { force: true });


});

});
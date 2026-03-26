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
import CalloutsAction from '../../support/CalloutsAction.js';
import CalloutsLocators from '../../locators/CalloutsLocators.js';
import '../../support/commands.js'

describe("Callouts Module", () => {

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

  it("LVH-2888 - Verify the functionality of saving callout to server", () => {
    // Step 1: Place a callout
    CalloutsAction.placeCallout(300, 650).then((calloutName) => {
      // Step 2: Save callouts to server
      CalloutsAction.saveCalloutsToServer();
      CalloutsAction.deleteCallout(calloutName);
    });
  });

  it("LVH-2889 - Verify the functionality of saving callout to local machine", () => {
    // Step 1: Place a callout
    CalloutsAction.placeCallout(350, 700).then(() => {
      // Step 2: Save callouts to local machine
      CalloutsAction.saveCalloutsToLocalMachine();
      cy.exec('dir cypress\\downloads').then((result) => {
        expect(result.stdout).to.include('callouts');
        cy.exec('del cypress\\downloads\\*callouts*.lwv');
      });
    });
  });

  it("LVH-2890 - Verify the functionality of importing callout from the server", () => {
    // Step 1: Place a callout
    CalloutsAction.placeCallout(400, 800).then((calloutName) => {
      // Step 2: Save callouts to server
      CalloutsAction.saveCalloutsToServer();
      cy.reload();
      cy.wait(5000);
      CalloutsAction.importCalloutsFromServer();
      CalloutsLocators.getCalloutsContainer
        .contains('span', calloutName).should('exist');
      CalloutsAction.deleteCallout(calloutName);
    });
  });

  it("LVH-2892 - Verify the functionality of deleting a callout", () => {

    // Step 0: Place a new callout
    CalloutsAction.placeCallout(500, 800).then((calloutName) => {

      CalloutsAction.deleteCallout(calloutName);
      CalloutsLocators.getCalloutsContainer
        .contains('span', calloutName)
        .should('not.exist');
    });

  });

  it("LVH-2893 - Verify the functionality of clearing all callout data", () => {

    // Step 0: Place a few callouts so there’s something to clear
    CalloutsAction.placeCallout(500, 800);
    CalloutsAction.placeCallout(600, 700);

    // Step 2: Click the "Clear" button in the callouts menu
    CalloutsLocators.getClearCalloutsBtn
      .should('be.visible')
      .click();
    cy.get('[data-testid="confirm-button"]').contains('Apply').should('be.visible').click();
    // Step 3: Confirm all callouts are removed
    LidarViewer.infoMessageContainer
      .should('be.visible')
      .invoke('text')
      .should('match', /callouts.*cleared/i);
    CalloutsLocators.getCalloutsContainer
      .find('.CalloutCard')
      .should('have.length', 0);

  });

  it("LVH-2894 - Verify network failure when saving callout to server", () => {

    // Step 1: Place a callout
    CalloutsAction.placeCallout(500, 800).then((calloutName) => {
  
      // Step 2: Simulate network OFF
      cy.simulateOffline();
  
      // Step 3: Attempt to save
      ViewerElements.getMoreOptionsBtn.click();

      ViewerElements.getSaveOption.click();

      ViewerElements.getSaveDialog
        .should('be.visible');

      ViewerElements.getCalloutsCheckbox.click();

      ViewerElements.getSaveConfirmBtn.click();
  
      // Step 4: Validate error message
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /internet connection/i);
  
      // Step 5: Restore network
      cy.simulateOnline();
  
      // Step 6: Reload and verify callout NOT saved
      cy.reload();
      cy.wait(5000);
      CalloutsAction.importCalloutsFromServer();
  
      CalloutsLocators.getCalloutsContainer
        .contains('span', calloutName)
        .should('not.exist');
  
    });
  
  });

  it("LVH-2897 - Verify saving unchanged callout data to server", () => {

    // Step 0: Place a new callout and save it to server first
    CalloutsAction.placeCallout(500, 800).then((calloutName) => {

      CalloutsAction.saveCalloutsToServer();

      // Step 1: Reload or re-import callouts from server to ensure fresh state
      cy.reload();
      cy.wait(5000);
      CalloutsAction.importCalloutsFromServer();

      ViewerElements.getMoreOptionsBtn.click();
      ViewerElements.getSaveOption.click();
      ViewerElements.getSaveDialog
        .should('be.visible');
      ViewerElements.getCalloutsCheckbox.click();
      ViewerElements.getSaveConfirmBtn.click();
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /no updated/i);
      
      CalloutsAction.deleteCallout(calloutName);

    });

  });

  it("LVH-2898 - Verify saving updated callout data to server", () => {
    // Step 0: Place new callout and wrap as alias
    CalloutsAction.placeCallout(500, 800).then((initialCalloutName) => {

      const updatedText = `UpdatedCallout_${Date.now()}`;
      CalloutsAction.saveCalloutsToServer();
      cy.reload();
      cy.wait(5000);
      CalloutsAction.importCalloutsFromServer();

      // Step 3: Wait for the callout to appear before updating
      CalloutsLocators.getCalloutsContainer
        .contains('span', initialCalloutName, { timeout: 10000 })
        .should('be.visible')
        .then(() => {
          // Now safely update
          CalloutsAction.updateCallout(initialCalloutName, updatedText);
        });

      // Step 4: Save updated callouts
      CalloutsAction.saveCalloutsToServer();

      // Step 5: Verify the updated callout text exists
      CalloutsLocators.getCalloutsContainer
        .contains('span', updatedText, { timeout: 10000 })
        .should('exist');

      CalloutsAction.deleteCallout(updatedText);
    });

  });

  it("LVH-2899 - Verify character limit in callout text box", () => {

    const longText = 'A'.repeat(320); // exceed limit
    const expectedText = 'A'.repeat(300);
  
    // Step 1: Place callout
    CalloutsAction.placeCallout(500, 800).then((calloutName) => {
  
      CalloutsLocators.getCalloutsContainer
        .contains('span', calloutName, { timeout: 10000 })
        .should('be.visible')
        .then(() => {
          // Now safely update
          CalloutsAction.updateCallout(calloutName, longText);
        });
  
      // Step 5: Open the same callout and validate text length
      CalloutsLocators.getCalloutsContainer
      .contains('span', longText, { timeout: 10000 })
      .should('not.exist');

      CalloutsLocators.getCalloutsContainer
      .contains('span', expectedText, { timeout: 10000 })
      .should('exist')
      .click();
      CalloutsLocators.getCalloutTextarea.invoke('val')
      .should('have.length', 300);
      
    });
  
  });

  it("LVH-2900 - Verify the recent placed callout should highlight in the callout list", () => {

    CalloutsAction.placeCallout(500, 800);

    CalloutsAction.placeCallout(500, 700).then((calloutName2) => {

      // Verify latest callout is highlighted
      CalloutsLocators.getCalloutsContainer
        .contains('span', calloutName2)
        .parents('.CalloutCard')
        .should('have.class', 'latestCallout');

    });

  });

});

import ViewerElements from '../locators/ViewerElements.js';
import CalloutsLocators from '../locators/CalloutsLocators.js';
import LidarViewer from '../locators/LidarViewer.js';

class CalloutsActions {

  placeCallout(x, y) {

    const calloutName = `AutoCallout_${Date.now()}`;
  
    CalloutsLocators.getCalloutsBtn.click();
    CalloutsLocators.getAddCalloutBtn.click();
    cy.wait(5000);
  
    cy.get('#canvas3D')
      .click(x, y, { force: true });
  
    CalloutsLocators.getCalloutDialog
      .should('be.visible');
  
    CalloutsLocators.getCalloutTextarea
      .clear()
      .type(calloutName);
  
    CalloutsLocators.getCalloutApplyBtn.click();

    return cy.wrap(calloutName);
  }

  updateCallout(calloutName, newText) {

    CalloutsLocators.getCalloutsContainer.contains('span', calloutName).click();
    CalloutsLocators.getCalloutTextarea.clear().type(newText);
    CalloutsLocators.getCalloutApplyBtn.click();
  }

  deleteCallout(calloutName) {

    // Open callout details sidebar
    CalloutsLocators.getCalloutsBtn.click();
    CalloutsLocators.getCalloutDetailsBtn.click();
  
    // Find the specific callout and delete it
    CalloutsLocators.getCalloutsContainer
      .contains('span', calloutName)
      .should('be.visible')
      .parents('.CalloutCard')
      .find('[data-testid="deletebutton"]')
      .click();

    // Confirm delete
    cy.get('[data-testid="confirm-button"]').contains('Apply')
      .should('be.visible')
      .click();
  
  }

  saveCalloutsToServer() {

    ViewerElements.getMoreOptionsBtn.click();

    ViewerElements.getSaveOption.click();

    ViewerElements.getSaveDialog
      .should('be.visible');

    ViewerElements.getCalloutsCheckbox.click();

    ViewerElements.getSaveConfirmBtn.click();

  LidarViewer.infoMessageContainer
    .should('be.visible')
    .invoke('text')
    .should('match', /callouts.*saved/i);

  }

  saveCalloutsToLocalMachine() {

    ViewerElements.getMoreOptionsBtn.click();

    ViewerElements.getSaveOption.click();

    ViewerElements.getSaveDialog
      .should('be.visible');
    ViewerElements.getSaveToServerCheckbox.click();
    ViewerElements.getSaveToLocalCheckbox.click();

    ViewerElements.getCalloutsCheckbox.click();

    ViewerElements.getSaveConfirmBtn.click();

  LidarViewer.infoMessageContainer
    .should('be.visible')
    .invoke('text')
    .should('match', /callouts.*saved/i);
  }

  importCalloutsFromServer() {

    ViewerElements.getMoreOptionsBtn
      .should("be.visible")
      .click();

    ViewerElements.getImportOption.click();

    ViewerElements.getImportDialog
      .should("be.visible");

    ViewerElements.selectImportSource("From Server");

    ViewerElements.getImportCalloutsCheckbox.click();

    ViewerElements.getImportApplyBtn.click();

    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /callouts.*downloaded.*successfully/i);

  }

}

export default new CalloutsActions();
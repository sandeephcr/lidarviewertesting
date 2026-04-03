import ViewerElements from '../locators/ViewerElements.js';
import PoleLocators from '../locators/PoleLocators.js';
import LidarViewer from '../locators/LidarViewer.js';

class PoleActions {

    placePole(x = 500, y = 300, poleName = `AutoPole_${Date.now()}`) {
  
      cy.get("#canvas3D").should("be.visible");
      ViewerElements.getAddPoleBtn.should("be.visible").click();
      cy.wait(5000);
      cy.get('#canvas3D').should('be.visible').click(x, y, { force: true });
      PoleLocators.poleSidePanel.should("be.visible");
      PoleLocators.getField('Id').should('be.visible').clear().type(poleName);
      return poleName;
    }

    savePole() {
      ViewerElements.getMoreOptionsBtn.click();
      ViewerElements.getSaveOption.click();
      ViewerElements.getSaveDialog.should("be.visible");
      ViewerElements.getPolesCheckbox.should('be.visible').click();
      ViewerElements.getSaveConfirmBtn.click();
      cy.contains("saved successfully", { timeout: 10000 }).should("be.visible");
    }

    importPoles() {
      ViewerElements.getMoreOptionsBtn.should("be.visible").click();
      ViewerElements.getImportOption.click();
      ViewerElements.getImportDialog.should("be.visible");
      ViewerElements.selectImportSource("From Server");
      ViewerElements.getImportPolesCheckbox.click();
      ViewerElements.getImportApplyBtn.click();
      cy.wait(500);
      cy.contains("Poles downloaded successfully", { timeout: 10000 }).should("be.visible");
    }
    
    deletePole(poleName) {
      cy.get(`div[role="button"][aria-label="${poleName}"]`)
        .should('exist')
        .click({ force: true });
      PoleLocators.deleteButton.should('be.visible').click();
      cy.get('[data-testid="confirm-button"]').should('be.visible').click();
      LidarViewer.infoMessageContainer.should('be.visible').and('contain.text', 'Pole Deleted');
      cy.get('div[role="button"][aria-label]').contains(poleName, { timeout: 10000 }).should('not.exist');
    }

    openPole(poleName) {
      cy.get(`div[role="button"][aria-label="${poleName}"]`)
        .should('exist')
        .click({ force: true });
      // Wait for side panel to appear
      PoleLocators.poleSidePanel.should('be.visible');
    }

    deleteSpan(index = 1) {
      cy.contains(`Span [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /span/i);
    }

    deleteWire(index = 1) {
      cy.contains(`Wire [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /wire/i);
    }

    deleteSpanGuy(index = 1) {
      cy.contains( `SpanGuy [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /spanguy/i);
    }

    deleteAnchor(index = 1) {
      cy.contains(`Anchor [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /anchor/i);
    }

    deleteDownGuy(index = 1) {
      cy.contains(`Guy [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /downguy/i);
    }

    deleteEquipment(index = 1) {
      cy.contains(`Equipment [${index}]`)
        .parent()
        .find('[data-testid="deletebutton"]')
        .click();
    
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /equipment/i);
    }

    copyForm(formName, index = 1) {

      PoleLocators.poleSidePanel
        .contains(`${formName} [${index}]`)
        .parent()
        .find('[data-testid="copybutton"]')
        .click();
    
      LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /copied/i);
    }
    
  }
  
  export default new PoleActions();
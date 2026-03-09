import ViewerElements from '../locators/ViewerElements.js';
import LidarViewer from '../locators/LidarViewer.js';
import SettingsLocators from '../locators/SettingsLocators.js';
import PointsLocators  from '../locators/PointsLocators.js';

class PointsActions{

    placePoint(x = 500, y = 400) {

        const uniqueKey = `AutoPointKey_${Date.now()}`;
        const uniqueValue = `AutoPointValue_${Date.now()}`;
    
        ViewerElements.getAddPointBtn.should('be.visible').click();
        cy.wait(5000);
    
        // Place point
        cy.get('#canvas3D').should('be.visible').click(x, y, { force: true });
        cy.get('#canvas3D').click(x, y, { force: true });
    
        // Open edit modal
        PointsLocators.editPointBtn.should('be.visible').click();
        PointsLocators.pointFeatureModal.should('be.visible');
        PointsLocators.keyInputField.clear().type(uniqueKey);
        PointsLocators.valueInputField.clear().type(uniqueValue);
        PointsLocators.savePointBtn.should('be.visible').click();
        cy.log(`Point created: ${uniqueKey} = ${uniqueValue}`);
    
      }

    savePointsToServer() {

    ViewerElements.getMoreOptionsBtn.click();
    
    ViewerElements.getSaveOption.click();
    
    ViewerElements.getSaveDialog
        .should('be.visible');
    
    ViewerElements.getPointFeaturesCheckbox
        .click();
    
    ViewerElements.getSaveConfirmBtn
        .click();
    
    LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /point.*saved/i);
    
    }

    savePointsToLocalMachine() {

        ViewerElements.getMoreOptionsBtn.click();
      
        ViewerElements.getSaveOption.click();
    
        ViewerElements.getSaveDialog
            .should('be.visible');
        ViewerElements.getSaveToLocalCheckbox.click();
        ViewerElements.getSaveToServerCheckbox.click();
        ViewerElements.getPointFeaturesCheckbox
          .click();
      
        ViewerElements.getSaveConfirmBtn
        .click();
    
        LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /point.*saved/i);
      
      }

    importPointsFromServer() {

    ViewerElements.getMoreOptionsBtn
        .should("be.visible")
        .click();
    
    ViewerElements.getImportOption
        .click();
    
    ViewerElements.getImportDialog
        .should("be.visible");
    
    ViewerElements.selectImportSource("From Server");
    
    ViewerElements.getImportPointFeaturesCheckbox
        .click();
    
    ViewerElements.getImportApplyBtn
        .click();
    
    cy.wait(500);
    
    LidarViewer.infoMessageContainer
        .should('be.visible')
        .invoke('text')
        .should('match', /downloaded/i);
    
    }
    
    deletePoint(x = 500, y = 400) {

        // Click point again to reveal edit icon
        cy.get('#canvas3D')
          .should('be.visible')
          .click(x, y, { force: true });
      
        // Click edit icon
        PointsLocators.editPointBtn
          .should('be.visible')
          .click();
      
        // Verify modal opened
        PointsLocators.pointFeatureModal
          .should('be.visible');
      
        // Click delete
        PointsLocators.deletePointBtn
          .should('be.visible')
          .click();
      
        // Confirm delete
        cy.get('[data-testid="confirm-button"]').contains('Apply')
          .should('be.visible')
          .click();
      
        // Verify delete message
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .invoke('text')
          .should('match', /point.*deleted/i);
      
    }

    measureBetweenExistingPoints(point1, point2) {

        // Activate Point Measurement tool
        ViewerElements.getPointMeasurement
          .should('be.visible')
          .click();
      
        // Click first point
        cy.get('#canvas3D')
          .click(point1.x, point1.y, { force: true });
      
        // Click second point
        cy.get('#canvas3D')
          .click(point2.x, point2.y, { force: true });
      
      }
}

export default new PointsActions();
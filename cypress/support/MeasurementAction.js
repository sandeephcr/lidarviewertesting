import ViewerElements from '../locators/ViewerElements.js';
import MeasurementLocators from '../locators/MeasurementLocators.js';
import LidarViewer from '../locators/LidarViewer.js';
import SettingsLocators from '../locators/SettingsLocators.js';

class MeasurementActions{

    placePointToPointMeasurement(x1 = 500, y1 = 300, x2 = 600, y2 = 350) {

        // Select measurement tool
        ViewerElements.getPointToPointMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000); // viewer needs a moment
      
        // First point
        cy.get('#canvas3D')
          .should('be.visible')
          .click(x1, y1, { force: true });
      
        // Second point
        cy.get('#canvas3D')
          .click(x2, y2, { force: true });
      
      }

      getLatestMeasurementId() {
        return MeasurementLocators.measurementsContainer
          .find('[data-measurement-id]')
          .last()
          .invoke('attr', 'data-measurement-id');
      }

      deleteMeasurementById(measurementId) {

        MeasurementLocators.measurementsContainer
          .find(`[data-measurement-id="${measurementId}"]`)
          .within(() => {
            cy.get('[data-testid="deletebutton"]').click();
          });
      
        cy.get('[data-testid="confirm-button"]')
          .should('be.visible')
          .click();
      
        LidarViewer.infoMessageContainer
          .should('contain.text', 'deleted');
      
      }

      saveMeasurementsToServer() {
        ViewerElements.getMoreOptionsBtn.click();
        ViewerElements.getSaveOption.click();
        ViewerElements.getSaveDialog.should('be.visible');
      
        ViewerElements.getMeasurementsCheckbox.click();
        ViewerElements.getSaveConfirmBtn.click();
      
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .invoke('text')
          .should('match', /measurement.*saved/i);
      }

      placeHorizontalMeasurement(x1 = 500, y1 = 300, x2 = 600, y2 = 350) {

        // Select measurement tool
        ViewerElements.getHorizontalMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000); // viewer needs a moment
      
        // First point
        cy.get('#canvas3D')
          .should('be.visible')
          .click(x1, y1, { force: true });
      
        // Second point
        cy.get('#canvas3D')
          .click(x2, y2, { force: true });
      
      }

      placeAngleMeasurement(x1 = 500, y1 = 500, x2 = 600, y2 = 500, x3 = 600, y3 = 600) {

        // Activate angle measurement tool
        ViewerElements.getAngleMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000);
      
        // Click three points to create the angle
        cy.get('#canvas3D').should('be.visible').click(x1, y1, { force: true });
        cy.get('#canvas3D').should('be.visible').click(x2, y2, { force: true });
        cy.get('#canvas3D').should('be.visible').click(x3, y3, { force: true });
      
      }

      placePerpendicularMeasurement(x1 = 500, y1 = 300, x2 = 600, y2 = 350,  x3 = 600, y3 = 600) {

        // Select measurement tool
        ViewerElements.getPerpendicularMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000); // viewer needs a moment
      
        // Click three points to create the angle
        cy.get('#canvas3D').should('be.visible').click(x1, y1, { force: true });
        cy.get('#canvas3D').should('be.visible').click(x2, y2, { force: true });
        cy.get('#canvas3D').should('be.visible').click(x3, y3, { force: true });
      
      }

      placePolylineMeasurement(points = [
        { x: 500, y: 300 },
        { x: 550, y: 350 },
        { x: 600, y: 400 }
      ]) {
        // Select polyline tool
        ViewerElements.getPolylineMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000); // give viewer a moment
      
        // Click all points
        points.forEach(point => {
          cy.get('#canvas3D')
            .should('be.visible')
            .click(point.x, point.y, { force: true });
        });
      
        // Click the polyline tool again to finish measurement
        ViewerElements.getPolylineMeasurement.click();
      }

      savePolylineToServer() {
        ViewerElements.getMoreOptionsBtn.click();
        ViewerElements.getSaveOption.click();
        ViewerElements.getSaveDialog.should('be.visible');
      
        ViewerElements.getPolylinesCheckbox.click();
        ViewerElements.getSaveConfirmBtn.click();
      
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .invoke('text')
          .should('match', /polyline.*saved/i);
      }

      clearAllMeasurements() {
        // Open measurements panel if not already visible
        ViewerElements.getMeasurementsBtn.click();
      
        // Click Clear measurements
        ViewerElements.getClearMeasurementsBtn.click();
      
        // Confirm the clear action
        cy.get('[data-testid="confirm-button"]')
          .should('be.visible')
          .click();
      
        // Verify the cleared message
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .invoke('text')
          .should('match', /measurements cleared/i);
      
        // Verify measurements container is empty
        MeasurementLocators.measurementsContainer
          .find('[data-measurement-id]')
          .should('have.length', 0);
      }

      placeVerticalOffsetMeasurement(x = 500, y = 300) {

        // Select vertical offset measurement tool
        ViewerElements.getVerticalOffsetMeasurement
          .should('be.visible')
          .click();
      
        cy.wait(3000); // viewer needs a moment
      
        // Click once to place the measurement
        cy.get('#canvas3D')
          .should('be.visible')
          .click(x, y, { force: true });
      
      }

      setVerticalOffsetValue(value) {

        SettingsLocators.getVerticalOffsetSlider
          .should('be.visible')
          .then(($slider) => {
      
            const slider = $slider[0];
      
            const nativeInputValueSetter =
              Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              ).set;
      
            nativeInputValueSetter.call(slider, value);
      
            slider.dispatchEvent(new Event('input', { bubbles: true }));
            slider.dispatchEvent(new Event('change', { bubbles: true }));
          });
      
        // Verify slider value updated in UI
        SettingsLocators.getVerticalOffsetValue
          .should('contain', value);
      }

      saveMeasurementsToLocalAndServer() {

        ViewerElements.getMoreOptionsBtn.click();
        ViewerElements.getSaveOption.click();
      
        ViewerElements.getSaveDialog.should('be.visible');
      
        ViewerElements.getSaveToLocalCheckbox.click();
        //ViewerElements.getSaveToServerCheckbox.click();
        ViewerElements.getMeasurementsCheckbox.click();
      
        ViewerElements.getSaveConfirmBtn.click();
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .invoke('text')
          .should('match', /measurement.*saved/i);
      }
}

export default new MeasurementActions();

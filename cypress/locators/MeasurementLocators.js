class MeasurementLocators {

    // ===== SIDEBAR =====
    get measurementSidePanel() {
      return cy.contains('.SideBarHeader span', 'Measurement Details')
        .should('be.visible')
        .closest('.SideBarContainer');
    }
  
    // ===== MEASUREMENT LIST =====
    get measurementsContainer() {
      return cy.get('[data-testid="measurements-container"]');
    }
  
    getMeasurementCard(index = 0) {
      return this.measurementsContainer
        .find('[data-measurement-id]')
        .eq(index);
    }
  
    // ===== BUTTONS =====
    getDeleteButton(index = 0) {
      return this.getMeasurementCard(index)
        .find('[data-testid="deletebutton"]');
    }
  
    getCopyButton(index = 0) {
      return this.getMeasurementCard(index)
        .find('[data-testid="copybutton"]')
        .first();
    }
  
    // ===== START / END COORDINATES =====
    getStartCoordinates(index = 0) {
      return this.getMeasurementCard(index)
        .contains('Start')
        .parent()
        .find('.body2')
        .last();
    }
  
    getEndCoordinates(index = 0) {
      return this.getMeasurementCard(index)
        .contains('End')
        .parent()
        .find('.body2')
        .last();
    }
  
    // ===== CLOSE SIDEBAR =====
    get closeButton() {
      return cy.get('[data-testid="closeIcon"]');
    }
  
  }
  
  export default new MeasurementLocators();
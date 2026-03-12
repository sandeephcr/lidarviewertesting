class PointsLocators{
    // Edit icon container (appears after clicking a placed point)
get pointFeatureOptionsContainer() {
    return cy.get('[data-testid="point-feature-options-container"]');
  }
  
  // Edit point icon
  get editPointBtn() {
    return cy.get('[data-testid="edit-icon"]');
  }

  // Edit icon container (appears after clicking a placed point)
  get pointFeatureOptionsContainer() {
    return cy.get('[data-testid="point-feature-options-container"]');
  }

  // Edit icon button
  get editPointBtn() {
    return cy.get('[data-testid="edit-icon"]');
  }

  // Point feature modal container
  get pointFeatureModal() {
    return cy.get('.ModalPointFeature');
  }

  // Modal header
  get pointFeatureModalHeader() {
    return cy.get('[data-testid="modal-header-container"]');
  }

  // Close button
  get closePointModalBtn() {
    return cy.get('[data-testid="closeButton"]');
  }

  // Add remarks button
  get addRemarksBtn() {
    return cy.get('.point-feature-btn-add-remarks');
  }

  // Delete point button
  get deletePointBtn() {
    return cy.get('.btn-delete-point-feature');
  }

  // Key input field
  get keyInputField() {
    return cy.get('[data-testid="key-input-0"]');
  }

  // Value input field
  get valueInputField() {
    return cy.get('[data-testid="value-input-0"]');
  }

  // Cancel button
  get cancelBtn() {
    return cy.get('[data-testid="cancel-button"]');
  }

  // Save button
  get savePointBtn() {
    return cy.get('[data-testid="confirm-button"]');
  }

}
export default new PointsLocators();
class PoleLocators {

    // ===== SIDEBAR BASE =====
    get poleSidePanel() {
      return cy.contains('.SideBarHeader span', 'Pole Details')
        .should('be.visible')
        .closest('.flex-c');
    }
  
    // ===== GENERIC FIELD GETTER =====
    getField(label) {
      return this.poleSidePanel
        .contains('span', label)
        .parent()
        .find('input, textarea');
    }
  
    getDropdown(label) {
      return this.poleSidePanel
        .contains('span', label)
        .parent()
        .find('[role="combobox"], select');
    }
  
    // ===== BUTTONS =====
    get saveButton() {
      return this.poleSidePanel.contains('button', 'Save');
    }
  
    get deleteButton() {
      return cy.get('[data-testid="deletebutton"]');
    }
  
    get closeButton() {
      return cy.get('[data-testid="closeIcon"]');
    }
  
    // ===== MEASUREMENTS =====
    get measurementContainer() {
      return cy.get('[data-testid="measurementContainer"]');
    }
  
    get measurementLinkButton() {
      return cy.get('[data-testid="measurementLinkButton"]');
    }
  
    // ===== TABS (Pole / Span / Anchor / Equipment) =====
    getTab(tabName) {
      return this.poleSidePanel.contains('span', tabName);
    }
  }
  
  export default new PoleLocators();
class CalloutsLocators {

    get getCalloutsBtn() {
      return cy.contains('.ToolTip-container', 'Callouts');
    }
  
    get getAddCalloutBtn() {
      return cy.contains('.NavBarToggleIconButton', 'Add');
    }
  
    get getCalloutDetailsBtn() {
      return cy.contains('.NavBarToggleIconButton', 'Details');
    }
  
    get getClearCalloutsBtn() {
      return cy.contains('.NavBarToggleIconButton', 'Clear');
    }

    // Dialog
  get getCalloutDialog() {
    return cy.contains('.ModalHeader', 'Edit Dialog');
  }

  get getCalloutTextarea() {
    return cy.get('[data-testid="textarea"]');
  }

  get getCalloutLocation() {
    return cy.get('[data-testid="location"]');
  }

  get getCalloutApplyBtn() {
    return cy.get('[data-testid="confirm-button"]');
  }

  get getCalloutCancelBtn() {
    return cy.get('[data-testid="cancel-button"]');
  }

  get getCalloutCloseBtn() {
    return cy.get('[data-testid="closeButton"]');
  }

   // Sidebar
   get getCalloutsContainer() {
    return cy.get('[data-testid="callouts-container"]');
  }

  get getCalloutCards() {
    return cy.get('[data-testid="callouts-container"]').find('.CalloutCard');
  }

  get getLatestCalloutCard() {
    return cy.get('.latestCallout');
  }

  get getCopyCalloutBtn() {
    return cy.get('[data-testid="copy-button"]');
  }

  get getDeleteCalloutBtn() {
    return cy.get('[data-testid="deletebutton"]');
  }

  get getCloseSidebarBtn() {
    return cy.get('[data-testid="closeIcon"]');
  }


  
  }
  
  export default new CalloutsLocators();
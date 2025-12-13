class LoginLocators {
  get getEmail() {
    return cy.get(
      "#root > div > main > div.flex.page.width-100.align-center.justify-between > div > div:nth-child(2) > div > form > div:nth-child(1) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input"
    );
  }

  get getPassword() {
    return cy.get(
      "#root > div > main > div.flex.page.width-100.align-center.justify-between > div > div:nth-child(2) > div > form > div:nth-child(2) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input"
    );
  }

  get getLoginBtn() {
    return cy.get(
      "#root > div > main > div.flex.page.width-100.align-center.justify-between > div > div:nth-child(2) > div > form > button"
    );
  }

  // Locator for logout option
  get getLogoutOption() {
    return cy.get(".gap-15 > :nth-child(3)");
  }

  get getConfirmLoginText() {
    return cy.get(".padding-30 > div.gap-20 > .heading2");
  }

  get getConfirmLogout() {
    return cy.get(
      "#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn"
    );
  }

  //Navigation Locators
  get getNavigationMenuFromUserManagementpage() {
    return cy.get(
      "#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div:nth-child(3) > img"
    );
  }
}

export default new LoginLocators();

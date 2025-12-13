class UserManagementLocators {
  get getNavigationMenu() {
    return cy.get(
      "#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div:nth-child(3)"
    );
  }

  get getAdministrationButton() {
    return cy.get(
      "#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div.flex-c.gap-25.ProfilePopUpMenu.justify-start.shawdow-light.round-corner-6.padding-20 > div.flex-c.gap-15 > div:nth-child(1)"
    );
  }

  get getUserManagementMenuButton() {
    return cy.contains("User Management", { timeout: 10000 }).closest("div");
  }

  get getSearchUserPermissions() {
    return cy.get(".form-control");
  }

  get getClickSearchBtnUserPermissions() {
    return cy.get(".searchbar-button");
  }

  get geButtonDropdown() {
    return cy.get(".buttonDropdowns");
  }

  get getClickUpdatebtn() {
    return cy.get('[data-testid="confirm-button"]');
  }

  get getclickconfirmbtn() {
    return cy.get(
      '.ModalSmall > .ModalFooter > .gap-2 > [data-testid="confirm-button"]'
    );
  }

  // Pole Locators
}
export default new UserManagementLocators();

import LoginLocators from "../locators/LoginLocators";
import PoleLocators from "../locators/PoleLocators";
import UserManagementLocators from "../locators/UserManagementLocators";
import Constants from "./Constants";

export const navigateToUserManagement = () => {
  UserManagementLocators.getNavigationMenu.click();
  cy.wait(1000);
  UserManagementLocators.getAdministrationButton.click();
  cy.wait(1000);
  UserManagementLocators.getUserManagementMenuButton
    .should("be.visible", { timeout: 10000 })
    .click();
};

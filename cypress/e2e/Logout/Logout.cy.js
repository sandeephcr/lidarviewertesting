import { Adminlogin } from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";
import "../../support/commands.js";

describe("Logout Module Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("LVH-2417 Logout_001 - Verify that users can successfully logout from the application", () => {
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    cy.logout();
    cy.url().should("include", "/login");
  });
});

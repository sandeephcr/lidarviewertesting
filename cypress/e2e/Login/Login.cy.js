import { login1 } from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";

describe("Login", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("LVH-1483 Login_003_Verify that login with invalid email and valid password", () => {
    cy.wait(2000);
    login1(Constants.inValidEmail, Constants.password);
    cy.on("window:alert", (str) => {
      expect(str).to.include("Invalid email or password");
    });
  });
});

import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";

describe("Login Page Tests", () => {

  beforeEach(() => {
    cy.visit("/login");
  });

  it.only("Login_Attempts_001 - User should be locked after 4 failed login attempts", () => {
    for (let i = 0; i <= 5; i++) {
      LidarViewerElements.getEmail.clear().type(Constants.validEmail);
      LidarViewerElements.getPassword.clear().type(Constants.invalidPwd);
      LidarViewerElements.getLoginBtn.click();
      cy.wait(500);
    }

    cy.contains("Too many login attempts")
      .should("be.visible");
  });

  it("Login_Attempts_002 - User should be locked after 3 failed OTP attempts", () => {

    // Login with valid email + password to reach OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();

    for (let i = 0; i < 4; i++) {
      cy.get("input[type='tel']").clear().type("000000"); // invalid OTP
      cy.contains("button", "Verify OTP").click();
      cy.wait(500);
    }

    cy.contains("Your account has been locked due to multiple failed OTP attempts")
      .should("be.visible");
  });

  it("Login_Attempts_003 - User should be locked after 3 failed forgot-password attempts", () => {

    LidarViewerElements.forgotPassword.click();

    for (let i = 0; i < 4; i++) {
      LidarViewerElements.emailInForgotPasswordField.clear().type(Constants.notExistingEmail);
      LidarViewerElements.sendRecoverLinkBtn.click();
      cy.wait(500);
    }

    cy.contains("Your account has been locked due to multiple failed recovery attempts")
      .should("be.visible");
  });


});

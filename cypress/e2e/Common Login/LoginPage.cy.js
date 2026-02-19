import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import {
  loginToPortal,
} from "../../utils/commonMethods.js";
import "../../support/commands.js";

describe("Login Page Tests", () => {

  beforeEach(() => {
    cy.visit("/login");
  });

  it("Login_Attempts_001 - User should be locked after 5 failed login attempts", () => {
    for (let i = 0; i <= 5; i++) {
      LidarViewerElements.getEmail.clear().type(Constants.validEmail);
      LidarViewerElements.getPassword.clear().type(Constants.invalidPwd);
      LidarViewerElements.getLoginBtn.click();
      cy.wait(500);
    }
    cy.contains("Too many login attempts")
      .should("be.visible");

    cy.unblockUser(Constants.validEmail);
  });

  it("Login_Attempts_002 - User should be locked after 5 failed OTP attempts", () => {

    // Login with valid email + password to reach OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();

    for (let i = 0; i <=5; i++) {
      
      cy.get("input[type='text']").type("000000");
      cy.contains("button", "Verify").should("be.visible").click();
      cy.wait(500);
      cy.get("input[type='text']").should("be.visible").clear();
    }

    cy.contains(/otp attempts/i).should("be.visible");


    cy.unblockUser(Constants.validEmail);
  });

  it("Login_Attempts_003 - User should be locked after 5 failed forgot-password attempts", () => {

    LidarViewerElements.forgotPassword.click();

    for (let i = 0; i <=5; i++) {
      LidarViewerElements.emailInForgotPasswordField.clear().type(Constants.nonExistingEmailForgot);
      LidarViewerElements.sendRecoverLinkBtn.click();
      cy.wait(500);
    }

    cy.contains(/failed/i).should("be.visible");

    cy.unblockUser(Constants.validEmail);
  });

  it("Block_001 - Verify user can successfully login after admin", () =>{

    LidarViewerElements.getEmail.type(Constants.AdminEmail);
    LidarViewerElements.getPassword.clear().type(Constants.AdminPassword);
    LidarViewerElements.getLoginBtn.click();

  });

  it("OTP_001_Verify that login with valid OTP", () => {
     loginToPortal(Constants.testDesignEngineerEmail, Constants.password)
     LidarViewerElements.getHomeText.should("have.text", "Home Page");
   });


});

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

  // it("Login_Attempts_001 - User should be locked after 5 failed login attempts", () => {
  //   for (let i = 0; i <= 5; i++) {
  //     LidarViewerElements.getEmail.clear().type(Constants.validEmail);
  //     LidarViewerElements.getPassword.clear().type(Constants.invalidPwd);
  //     LidarViewerElements.getLoginBtn.click();
  //     cy.wait(500);
  //   }
  //   cy.contains("Too many login attempts")
  //     .should("be.visible");

  //   cy.unblockUser(Constants.validEmail);
  // });

  // it("Login_Attempts_002 - User should be locked after 5 failed OTP attempts", () => {

  //   // Login with valid email + password to reach OTP page
  //   LidarViewerElements.getEmail.type(Constants.validEmail);
  //   LidarViewerElements.getPassword.type(Constants.password);
  //   LidarViewerElements.getLoginBtn.click();

  //   for (let i = 0; i <=5; i++) {
      
  //     cy.get("input[type='text']").type("000000");
  //     cy.contains("button", "Verify").should("be.visible").click();
  //     cy.wait(500);
  //     cy.get("input[type='text']").should("be.visible").clear();
  //   }

  //   cy.contains(/otp attempts/i).should("be.visible");


  //   cy.unblockUser(Constants.validEmail);
  // });

  // it("Login_Attempts_003 - User should be locked after 5 failed forgot-password attempts", () => {

  //   LidarViewerElements.forgotPassword.click();

  //   for (let i = 0; i <=5; i++) {
  //     LidarViewerElements.emailInForgotPasswordField.clear().type(Constants.nonExistingEmailForgot);
  //     LidarViewerElements.sendRecoverLinkBtn.click();
  //     cy.wait(500);
  //   }

  //   cy.contains(/failed/i).should("be.visible");

  //   cy.unblockUser(Constants.validEmail);
  // });

  it("Block_001 - Verify user can successfully login after admin unblocks user account", () =>{

    //Blocking user account
    for (let i = 0; i <= 5; i++) {
      LidarViewerElements.getEmail.clear().type(Constants.validEmail);
      LidarViewerElements.getPassword.clear().type(Constants.invalidPwd);
      LidarViewerElements.getLoginBtn.click();
      cy.wait(500);
    }
    cy.contains("Too many login attempts")
      .should("be.visible");
    // Unblocking user account as admin
    cy.unblockUser(Constants.validEmail);
    cy.logout();
    //Logging in to user account successfully
    cy.visit('/login');
    loginToPortal(Constants.validEmail, Constants.password)
    LidarViewerElements.getHomeText.should("have.text", "Home Page");

  });

  it("OTP_001_Verify that login with valid OTP", () => {
     loginToPortal(Constants.testDesignEngineerEmail, Constants.password)
     LidarViewerElements.getHomeText.should("have.text", "Home Page");
   });

it.only("Profile_001 - Verify user able to update password from view profile dialog", () => {
  // Step 1: Login to user account
  loginToPortal(Constants.validEmail, Constants.password);
  LidarViewerElements.getHomeText.should("have.text", "Home Page");

  // Step 2: Open profile/view profile dialog
  LidarViewerElements.getProfileIcon.click();
  LidarViewerElements.getViewProfileOption.click();
  LidarViewerElements.getEditProfileHeader.should('be.visible');
  LidarViewerElements.getChangePasswordBtn.click();

  // Step 4: Fill out change password fields
  const timestamp = Date.now().toString().slice(-5);
const newPwd = `Tp_${timestamp}!A1`;
  LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
  LidarViewerElements.getNewPasswordField.clear().type(newPwd);
  LidarViewerElements.getConfirmNewPasswordField.clear().type(newPwd);
  LidarViewerElements.getUpdatePasswordBtn.click();


  // Step 6: Expect a success message and redirect/logout if app requires
  cy.contains("Password updated successfully", { timeout: 10000 }).should("be.visible");

  // Step 7: Log out after password change
  cy.logout();

  // Step 8: Login again with new password to verify
  loginToPortal(Constants.validEmail, newPwd);
  LidarViewerElements.getHomeText.should("have.text", "Home Page");

  // Step 8: Reset password back to original
  LidarViewerElements.getProfileIcon.click();
  LidarViewerElements.getViewProfileOption.click();
  LidarViewerElements.getChangePasswordBtn.click();

  LidarViewerElements.getOldPasswordField.clear().type(newPwd);
  LidarViewerElements.getNewPasswordField.clear().type(Constants.password);
  LidarViewerElements.getConfirmNewPasswordField.clear().type(Constants.password);
  LidarViewerElements.getUpdatePasswordBtn.click();

  cy.contains("Password updated successfully", { timeout: 10000 }).should("be.visible");

  // Final logout to keep test isolated
  cy.logout();
});

});

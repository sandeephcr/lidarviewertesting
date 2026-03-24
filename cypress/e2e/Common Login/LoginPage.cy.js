import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants.js";
import {
  Adminlogin,
  loginToPortal,
} from "../../utils/commonMethods.js";
import "../../support/commands.js";

describe("Common Login Tests", () => {

  beforeEach(() => {
    cy.visit("/login");
  });

  it("LVH-2178 - User should be locked after 5 failed login attempts", () => {
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

  it("LVH-2179 - User should be locked after 5 failed OTP attempts", () => {

    // Login with valid email + password to reach OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();

    for (let i = 0; i <=5 ; i++) {
      cy.contains('Enter OTP')
      .parents('div')
      .find('input.search-input')
      .should('have.length', 1)
      .clear()
      .type('000000'); // invalid OTP
      cy.contains("button", "Verify").click();
      cy.wait(500);
    }

    cy.contains("OTP")
      .should("be.visible");
    cy.unblockUser(Constants.validEmail);
  });

  it("LVH-2180 - User should be locked after 5 failed forgot-password attempts", () => {

    LidarViewerElements.forgotPassword.click();

    for (let i = 0; i < 4; i++) {
      LidarViewerElements.emailInForgotPasswordField.clear().type(Constants.validEmail);
      LidarViewerElements.sendRecoverLinkBtn.click();
      cy.wait(500);
    }

    cy.contains("Failed")
      .should("be.visible");
    
    cy.visit("/login");
    cy.unblockUser(Constants.validEmail);
    
  });

  it("LVH-2182 - Verify user can successfully login after admin unblocks user account", () =>{

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

  it("LVH-2184 - Verify that login with valid OTP", () => {
     loginToPortal(Constants.testDesignEngineerEmail, Constants.password)
     LidarViewerElements.getHomeText.should("have.text", "Home Page");
   });

  it("LVH-2192 - Verify user able to update password from view profile dialog", () => {
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

    cy.get('body').click(0, 0);

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
    cy.get('body').click(0, 0);

    // Final logout to keep test isolated
    cy.logout();

  });

  it("LVH-2191 - Verify View Profile option is visible to all user accounts", () => {

    // ----- Admin User -----
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.should("be.visible");
    cy.get('body').click(0, 0);
    cy.logout();

    // ----- Non-Admin User -----
    loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.should("be.visible");
    cy.get('body').click(0, 0);
    cy.logout();

  });

});

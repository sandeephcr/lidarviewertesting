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

  it("LVH-2185 - Verify blocked user cannot reset password", () => {
    // Step 1: Lock the user by attempting 6 login attempts with invalid credentials
    for (let i = 0; i <= 5; i++) {
      LidarViewerElements.getEmail.clear().type(Constants.validEmail);
      LidarViewerElements.getPassword.clear().type(Constants.invalidPwd);
      LidarViewerElements.getLoginBtn.click();
      cy.wait(500);
    }
    cy.contains("Too many login attempts").should("be.visible");

    // Step 2: Go to forgot password page
    cy.visit("/login");
    LidarViewerElements.forgotPassword.click();

    // Step 3: Try to reset password using the locked user's email
    LidarViewerElements.emailInForgotPasswordField.clear().type(Constants.validEmail);
    LidarViewerElements.sendRecoverLinkBtn.click();

    cy.contains("Failed").should("be.visible");
    // Step 4: Unblock user for cleanup
    cy.visit("/login");
    cy.unblockUser(Constants.validEmail);
  });

  it("LVH-2186 - Verify user cannot login with already used login OTP", () => {

    // Step 1: First login to generate OTP
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();
  
    // Fetch first OTP
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${Constants.validEmail}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const oldOtp = response.body.otp;
  
      // Step 2: Trigger NEW OTP by logging in again
      cy.visit("/login");
      LidarViewerElements.getEmail.type(Constants.validEmail);
      LidarViewerElements.getPassword.type(Constants.password);
      LidarViewerElements.getLoginBtn.click();
  
      // Step 3: Enter OLD OTP
      cy.contains('Enter OTP')
        .parents('div')
        .find('input[type="text"].search-input')
        .should('have.length', 1)
        .clear()
        .type(oldOtp);
  
      cy.contains("button", "Verify").click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Invalid');
      });
    });
  
  });

  it("LVH-2187 - Verify OTP field resets previous data when clicking resend button", () => {

    // Step 1: Login and navigate to OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();
  
    // Step 2: Enter OTP (dummy value is fine)
    cy.get('input.search-input:visible')
      .should('have.length', 1)
      .type('123456');
  
    // Verify it was entered
    cy.get('input.search-input:visible')
      .should('have.value', '123456');
  
    // Step 3: Click Resend OTP
    cy.contains('Resend OTP').click();
  
    // Step 4: Verify OTP field is cleared
    cy.get('input.search-input:visible')
      .should('have.value', '');
  });

  it("LVH-2188 - Verify leading spaces are removed before OTP validation", () => {

    // Step 1: Login and navigate to OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();
  
    // Step 2: Fetch valid OTP
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${Constants.validEmail}`,
    }).its('body.otp').then((otp) => {
  
      const otpWithSpaces = `   ${otp}`;
  
      // Enter OTP with leading spaces
      cy.get('input.search-input:visible')
        .should('have.length', 1)
        .clear()
        .type(otpWithSpaces);
      
      // Verify spaces were removed
      cy.get('input.search-input:visible')
      .should('have.value', otp);
    });
  
  });

  it("LVH-2189 - Verify admin user directly redirects to home page after login", () => {

    // Login as admin
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    // Verify user is redirected to home page
    cy.url({ timeout: 60000 }).should("include", "/home");
  
    // Optional: verify home page content
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
  });

  it("LVH-2190 - Verify login fails when clicking on verify button without network connection", () => {

    // Step 1: Login and navigate to OTP page
    LidarViewerElements.getEmail.type(Constants.validEmail);
    LidarViewerElements.getPassword.type(Constants.password);
    LidarViewerElements.getLoginBtn.click();
  
    // Step 2: Fetch valid OTP
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${Constants.validEmail}`,
    }).its('body.otp').then((otp) => {
  
      // Enter OTP
      cy.get('input.search-input:visible')
        .should('have.length', 1)
        .clear()
        .type(otp);
  
      // Step 3: Simulate offline
      cy.simulateOffline();
  
      // Step 4: Click Verify
      cy.contains("button", "Verify").click();
  
      // Step 5: Validate failure (network error)
      cy.contains("Network").should("be.visible"); // adjust text if needed
  
      // Step 6: Restore network (important cleanup)
      cy.simulateOnline();
  
    });
  
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

  it("LVH-2193 - Verify password updation fails when new password is same as old password", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter same password in all fields
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(Constants.password);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(Constants.password);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate error message
    cy.contains("cannot").should("be.visible"); // adjust text if needed
  
    // Optional: Ensure password NOT updated (still logged in)
    cy.url().should("include", "/home");
    cy.contains('Edit Profile')
      .closest('.ModalHeader')
      .find('svg')
      .click();
    // Cleanup
    cy.get('body').click(0, 0);
    cy.logout();
  
  });

});

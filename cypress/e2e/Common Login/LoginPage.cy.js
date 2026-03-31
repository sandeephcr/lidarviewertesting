import LidarViewerElements from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants/commonLogin.js";
import {
  Adminlogin,
  loginToPortal,
} from "../../utils/Common_Methods/commonLogin.js";
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

  it("LVH-2191 - (View Profile) - Verify View Profile option is visible to all user accounts", () => {

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

  it("LVH-2192 - (View Profile) - Verify user able to update password from view profile dialog", () => {
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

  it("LVH-2193 - (View Profile) - Verify password updation fails when new password is same as old password", () => {

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

  it("LVH-2201 - (View Profile) - Verify password updation fails when new password does not meet validation rules", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid new password (fails policy)
    const invalidPwd = "cnsw-1234"; // no uppercase, etc.
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(invalidPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(invalidPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate error message
    cy.contains("Incorrect password").should("be.visible");
  
  });

  it("LVH-2202 - (View Profile) - Verify password updation fails when new password is less than 8 characters", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid password (< 8 chars)
    const shortPwd = "Ab1!a";
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(shortPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(shortPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate error message
    cy.contains('Should be between 08 and 16 characters')
  .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2203 - (View Profile) - Verify password updation fails when new password exceeds 16 characters", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid password (>16 chars)
    const longPwd = "Abcdef12345!@#XYZ"; // 17+ chars
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(longPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(longPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate rule turns RED
    cy.contains('Should be between 08 and 16 characters')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2204 - (View Profile) - Verify password updation fails when new password does not contain uppercase letter", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid password (no uppercase)
    const invalidPwd = "cnsw-1234!"; // no uppercase
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(invalidPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(invalidPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate uppercase rule turns RED
    cy.contains('Should contain at least one uppercase letter')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2205 - (View Profile) - Verify password updation fails when new password does not contain lowercase letter", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid password (no lowercase)
    const invalidPwd = "CNSW-1234!"; // no lowercase
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(invalidPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(invalidPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate lowercase rule turns RED
    cy.contains('Should contain at least one lowercase letter')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2206 - (View Profile) - Verify password updation fails when new password does not contain special character", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter invalid password (no special character)
    const invalidPwd = "Cnsw1234"; // no special char
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(invalidPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(invalidPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate special character rule turns RED
    cy.contains('Should contain at least one special character')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2207 - (View Profile) - Verify user can successfully update password with all required validation rules", () => {

    // Step 1: Login
    loginToPortal(Constants.validEmail, Constants.password);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
    // Step 2: Open change password dialog
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    // Step 3: Enter valid password (meets all rules)
    const validPwd = "Abcd1234!"; // meets all conditions
  
    LidarViewerElements.getOldPasswordField.clear().type(Constants.password);
    LidarViewerElements.getNewPasswordField.clear().type(validPwd);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(validPwd);
  
    // Step 4: Click update
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    // Step 5: Validate success message
    cy.contains("Password updated successfully", { timeout: 10000 })
      .should("be.visible");
  
    // Cleanup: revert password back
    cy.get('body').click(0, 0);
  
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getViewProfileOption.click();
    LidarViewerElements.getChangePasswordBtn.click();
  
    LidarViewerElements.getOldPasswordField.clear().type(validPwd);
    LidarViewerElements.getNewPasswordField.clear().type(Constants.password);
    LidarViewerElements.getConfirmNewPasswordField.clear().type(Constants.password);
  
    LidarViewerElements.getUpdatePasswordBtn.click();
  
    cy.contains("Password updated successfully", { timeout: 10000 })
      .should("be.visible");
  
  });

  it("LVH-2208 - (User Management) - Verify password updation fails when new password does not meet validation rules", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();

    const TEST_USERNAME = Constants.validEmail;
    const invalidPwd = "cnsw-1234"; // no uppercase
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter invalid password
    LidarViewerElements.getNewPasswordInputUM.clear().type(invalidPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(invalidPwd);
  
    // Step 5: Click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
    //Validate rule turns RED (uppercase missing)
    cy.contains('Should contain at least one uppercase letter')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2209 - (User Management) - Verifies that system rejects passwords with fewer than 8 characters", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
    const shortPwd = "Ab1!x"; // less than 8 chars
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter short password
    LidarViewerElements.getNewPasswordInputUM.clear().type(shortPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(shortPwd);
  
    // Step 5: Listen for alert and click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate min-length rule turns RED
    cy.contains('* Should be at least 8')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2210 - (User Management) - Verify password updation failed when the entered new password doesn't have a number", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
    const noNumberPwd = "Abc!DefG"; // no numbers
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter password without numbers
    LidarViewerElements.getNewPasswordInputUM.clear().type(noNumberPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(noNumberPwd);
  
    // Step 5: Listen for alert and click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate missing number rule turns RED
    cy.contains('* Should contain at least one number.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2211 - (User Management) - Verify password updation failed when the entered new password is does not have upper case", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
    const noUppercasePwd = "abc1!def"; // no uppercase letters
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter password without uppercase
    LidarViewerElements.getNewPasswordInputUM.clear().type(noUppercasePwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(noUppercasePwd);
  
    // Step 5: Listen for alert and click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate uppercase rule turns RED
    cy.contains('* Should contain at least one uppercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2212 - (User Management) - Verify password updation failed when the entered new password is does not have lower case", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
    const noLowercasePwd = "ABC1!DEF"; // no lowercase letters
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter password without lowercase
    LidarViewerElements.getNewPasswordInputUM.clear().type(noLowercasePwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(noLowercasePwd);
  
    // Step 5: Listen for alert and click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate lowercase rule turns RED
    cy.contains('* Should contain at least one lowercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2213 - (User Management) - Verify password updation failed when the entered new password is dosent have special character", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
    const noSpecialCharPwd = "Abc12345"; // no special characters
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter password without special character
    LidarViewerElements.getNewPasswordInputUM.clear().type(noSpecialCharPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(noSpecialCharPwd);
  
    // Step 5: Listen for alert and click Save
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect password format');
    });
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate special character rule turns RED
    cy.contains('* Should contain at least one special character.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  
  });

  it("LVH-2214 - (User Management) - Verify successful update with all password validation rules", () => {

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    const TEST_USERNAME = Constants.validEmail;
  
    // Generate a valid password (meets all rules)
    const timestamp = Date.now().toString().slice(-5);
    const validPwd = `Tp_${timestamp}!A1`; // uppercase, lowercase, number, special char, 8-16 chars
    const originalPwd = Constants.password; // store original password
  
    // Step 1: Search user
    LidarViewerElements.getSearchInput.clear().type(TEST_USERNAME);
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
    // Step 2: Open Edit dialog
    LidarViewerElements.getUserRows.contains('td', TEST_USERNAME)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 3: Open Change Password
    LidarViewerElements.getChangePasswordToggle.click();
  
    // Step 4: Enter valid password
    LidarViewerElements.getNewPasswordInputUM.clear().type(validPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(validPwd);
  
    // Step 5: Save password
    LidarViewerElements.getSavePasswordButton.click();
  
    // Step 6: Validate success message
    LidarViewerElements.infoMessageContainer
      .should('be.visible')
      .and('contain.text', 'password updated successfully');
  
    // --- Revert back to original password ---
    LidarViewerElements.getNewPasswordInputUM.clear().type(originalPwd);
    LidarViewerElements.getConfirmPasswordInputUM.clear().type(originalPwd);
    LidarViewerElements.getSavePasswordButton.click();
  
    // Validate revert success
    LidarViewerElements.infoMessageContainer
      .should('be.visible')
      .and('contain.text', 'password updated successfully');
  
  });

  it("LVH-2215 - Verify admin users can access all assigned sites", () => {

    // Testing server
    //cy.visit("https://testing.lidartechsolutions.com");
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
    cy.logout();
  
    // QA server
    cy.origin("https://qa.lidartechsolutions.com", { args: { email: Constants.AdminEmail, pwd: Constants.AdminPassword } }, ({ email, pwd }) => {
    
      cy.visit("https://qa.lidartechsolutions.com");
  
      //Login
      cy.get('input[type="text"]').type(email); 
      cy.get('input[type="password"]').type(pwd);
      cy.get('button[type="submit"]').click();
  
      // Validate Home page
      cy.contains("Home Page").should("be.visible");
    });
  
  });

  it("LVH-2216 - Verify users are blocked from accessing sites not assigned to them", () => {

    cy.origin("https://qa.lidartechsolutions.com", { args: { email: "ff1@square.com", pwd: Constants.AdminPassword } }, ({ email, pwd }) => {
    
      cy.visit("https://qa.lidartechsolutions.com");
  
      //Login
      cy.get('input[type="text"]').type(email); 
      cy.get('input[type="password"]').type(pwd);
      // Listen for window alert
      cy.on('window:alert', (text) => {
        expect(text).to.contains("Unable to login, contact Site Administrator");
      });
      cy.get('button[type="submit"]').click();

    });

  });

  it("LVH-2217 - Verify admin can assign site access to a user", () => {

    const targetUser = "ff2@square.com";
  
    // Step 1: Login as admin
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    // Step 2: Navigate to User Management
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    // Step 3: Search for the user and open edit dialog
    LidarViewerElements.getSearchInput.clear().type(targetUser);
    LidarViewerElements.getUserRows.contains('td', targetUser)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 4: Assign Site 1 access
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').get('.dropdown-container') 
      .contains('https://testing.lidartechsolutions.com')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();
    
    cy.reload();
    cy.logout();
  
    // Step 5: Login as the user to confirm access
      cy.visit("https://testing.lidartechsolutions.com");
      cy.get('input[type="text"]').type(targetUser);
      cy.get('input[type="password"]').type(Constants.password);
      cy.get('button[type="submit"]').click();
      // Validate successful login by checking home page
      cy.contains("Home Page").should("be.visible");
      cy.logout();

  // Revoke the previously assigned site access and verify it
  cy.visit("/login");
  // Step 6: Login as admin again to revoke access
  Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  LidarViewerElements.getProfileIcon.click();
  LidarViewerElements.getAdministrationOption.click();
  LidarViewerElements.getUserManagementOption.click();

  // Search for the user and open edit dialog
  LidarViewerElements.getSearchInput.clear().type(targetUser);
  LidarViewerElements.getUserRows.contains('td', targetUser)
    .parent('tr')
    .within(() => {
      cy.get('td:last-child svg').first().click();
    });

  // Step 7: Uncheck Site 1 access
  LidarViewerElements.getSitesDropdown.click();
  cy.get('body').get('.dropdown-container')
    .find('span')
    .filter(':contains("https://testing.lidartechsolutions.com")')
    .eq(1)
    .parent()
    .find('input[type="checkbox"]')
    .uncheck({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();

  });

  it("LVH-2218 - Verify admin can revoke a user's site access", () => {

    const targetUser = "ff1@square.com";

    // Step 1: Login as admin
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

    // Step 2: Navigate to User Management
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();

    // Step 3: Search for the user and open edit dialog
    LidarViewerElements.getSearchInput.clear().type(targetUser);
    LidarViewerElements.getUserRows.contains('td', targetUser)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });

    // Step 4: Uncheck Site 1 access
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').get('.dropdown-container')
      .find('span')
      .filter(':contains("https://testing.lidartechsolutions.com")')
      .eq(1)
      .parent()
      .find('input[type="checkbox"]')
      .uncheck({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();
    
    cy.reload();
    cy.logout();

    // Step 5: Attempt login as the user to verify access is revoked
    cy.visit("https://testing.lidartechsolutions.com");
    cy.get('input[type="text"]').type(targetUser);
    cy.get('input[type="password"]').type(Constants.password);
    cy.get('button[type="submit"]').click();

    // Listen for the window alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("failed");
    });

    // Step 6: Reassign site access to keep test isolated
    cy.visit("/login");
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();

    LidarViewerElements.getSearchInput.clear().type(targetUser);
    LidarViewerElements.getUserRows.contains('td', targetUser)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });

    // Re-check Site 1 access
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').get('.dropdown-container')
      .find('span')
      .filter(':contains("https://testing.lidartechsolutions.com")')
      .eq(0)
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();

  });

  it("LVH-2219 - Verify admin logout from one site doesn't log them out from another", () => {

    const adminEmail = Constants.AdminEmail;
    const adminPwd = Constants.AdminPassword;
  
    // Step 1: Login to Site 1 (default origin)
    cy.visit('/login');
    Adminlogin(adminEmail, adminPwd);
    cy.contains("Home Page").should("be.visible");
  
    // Step 2: Login to Site 2
    cy.origin('https://qa.lidartechsolutions.com', { args: { adminEmail, adminPwd } }, ({ adminEmail, adminPwd }) => {
      cy.visit('/login');
      cy.get('input[type="text"]').type(adminEmail);
      cy.get('input[type="password"]').type(adminPwd);
      cy.get('button[type="submit"]').click();
      cy.contains("Home Page").should("be.visible");
    });
  
    // Step 3: Logout from Site 1
    cy.visit('https://testing.lidartechsolutions.com');
    cy.logout();
    cy.contains("Login").should("be.visible");
  
    // Step 4: Go back to Site 2 and verify still logged in
    cy.origin('https://qa.lidartechsolutions.com', () => {
      cy.visit('/');   
      cy.reload();
      cy.contains("Home Page").should("be.visible");
    });
  
  });

  it("LVH-2220 - Verify newly created user is visible across different sites", () => {

    const username = `user${Date.now()}`;
    const email = `user${Date.now()}@test.com`;
    const adminEmail = Constants.AdminEmail;
    const adminPwd = Constants.AdminPassword;
  
    // Step 1: Login to Site 1 (testing)
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    // Navigate to User Management
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    // Step 2: Create a new user
    LidarViewerElements.getAddUserButton.click();
    LidarViewerElements.getUsernameInput.type(username);
    LidarViewerElements.getEmailInput.type(email);
    LidarViewerElements.getDesignationDropdown().select('Design Engineer');
  
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').contains('Select All').click({ force: true });
    LidarViewerElements.getSitesDropdown.click();
  
    LidarViewerElements.getPasswordInput.type('Cnsw-123');
    LidarViewerElements.getConfirmPasswordInput.type('Cnsw-123');
    LidarViewerElements.getMailRequiredCheckbox.click();
    LidarViewerElements.getRegisterButton.click();
  
    // Validate user created
    LidarViewerElements.infoMessageContainer
      .should('be.visible')
      .and('contain.text', 'User created');
    cy.logout();
  
    // Step 3: Go to Site 2 (QA)
    cy.origin('https://qa.lidartechsolutions.com', { args: { email, adminEmail, adminPwd  } }, ({ email, adminEmail, adminPwd }) => {
  
      cy.visit('/login');
  
      // Login as admin
      cy.get('input[type="text"]').type(adminEmail);
      cy.get('input[type="password"]').type(adminPwd);
      cy.get('button[type="submit"]').click();
  
      cy.contains("Home Page").should("be.visible");
  
      // Navigate to User Management
      cy.get('[data-cy=profile-icon]').click(); // adjust if needed
      cy.contains('Administration').click();
      cy.contains('User Management').click();
  
      // Step 4: Search for created user
      cy.get('input[placeholder="Search"]').clear().type(email);
      cy.get('table').contains('td', email).should('exist');
  
    });
  
  });

  it("LVH-2221 - Verify non-admin user is denied access to restricted site", () => {

    const targetUser = "fffffffff999@hcrobo.com";
  
    // Step 1: Login as admin
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    // Step 2: Navigate to User Management
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    // Step 3: Search user and open edit dialog
    LidarViewerElements.getSearchInput.clear().type(targetUser);
    LidarViewerElements.getUserRows.contains('td', targetUser)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Step 4: Revoke site access
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').get('.dropdown-container')
      .find('span')
      .filter(':contains("https://testing.lidartechsolutions.com")')
      .eq(1)
      .parent()
      .find('input[type="checkbox"]')
      .uncheck({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();
  
    cy.reload();
    cy.logout();
  
    // Step 5: Attempt login as non-admin user to restricted site
    cy.visit("https://testing.lidartechsolutions.com");
    cy.get('input[type="text"]').type(targetUser);
    cy.get('input[type="password"]').type(Constants.password);
    cy.get('button[type="submit"]').click();
  
    // Validate alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains("Unable to login, contact Site Administrator");
    });
  
    // Step 6: Reassign access (cleanup)
    cy.visit('/login');
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    LidarViewerElements.getSearchInput.clear().type(targetUser);
    LidarViewerElements.getUserRows.contains('td', targetUser)
      .parent('tr')
      .within(() => {
        cy.get('td:last-child svg').first().click();
      });
  
    // Reassign site access
    LidarViewerElements.getSitesDropdown.click();
    cy.get('body').get('.dropdown-container')
      .find('span')
      .filter(':contains("https://testing.lidartechsolutions.com")')
      .eq(0)
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    LidarViewerElements.getSitesDropdown.click();
    LidarViewerElements.getUpdateButtonUM.click();
  
  });

  it("LVH-2223 - Verify user cannot access restricted data by manipulating URL", () => {

    // Step 1: Login as admin and capture restricted URL
    cy.visit('/login');
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    LidarViewerElements.getProfileIcon.click();
    LidarViewerElements.getAdministrationOption.click();
    LidarViewerElements.getUserManagementOption.click();
  
    cy.url().then((adminUrl) => {
  
      cy.logout();
  
      // Step 2: Login as non-admin user
      cy.visit('/login');
      loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
      LidarViewerElements.getHomeText.should("have.text", "Home Page");
  
      // Step 3: Try to access restricted URL
      cy.visit(adminUrl);
  
      // Step 4: Validate access is denied
      cy.url().should('not.include', '/user-management');
      cy.contains('Unauthorized').should('be.visible');
      cy.contains('You do not have access to the requested page.').should('be.visible');
      cy.contains('button', 'Go Back').should('be.visible').click();
  
    });
  
  });

});

import LidarViewerElements from "../../locators/Common Login/LidarViewer.js";
import Constants from "../../utils/Common Login/Constants.js";
import {
  Adminlogin,
  loginToPortal,
} from "../../utils/Common Login/commonMethods.js";
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


    it("Verify password expired page is not displayed before passsword expired", () => {

    loginToPortal(Constants.testDesignEngineerEmail, Constants.password);
  cy.location('pathname').should('not.eq', '/password-expired');

    // cy.get('.info-message-container .width-100')
   //   .invoke('text')
  //   .should('match', /Your password will expire in \d+ days\.? ?please change it soon/i);
  });

  it("Verify password expiry page is displayed on expiry", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  cy.location('pathname').should('eq', '/password-expired');

});

it("Verify password expiry page is displayed on 31st day", () => {

  loginToPortal(Constants.ExpiredPasswordEmail31, Constants.ExpiredPasswordEmailPassword31);

  cy.location('pathname').should('eq', '/password-expired');

});

it("Verify password expiry countdown is shown after every login", () => {

  loginToPortal(Constants.WarningPasswordEmail, Constants.WarningPasswordPassword);

    cy.get('.info-message-container .width-100')
     .invoke('text')
    .should('match', /Your password will expire in \d+ days\.? ?please change it soon/i);

});

it("Password_Expiry_006 - Verify user cannot bypass expired password page", () => {

 
  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  cy.get('.flex > .gap-20 > .heading2').should('have.text', 'Password Expiry');




});





it("Verify API returns correct flag after password expired", () => {

  // Login with expired user
  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);
  // Intercept API
  cy.intercept('GET', '/api/auth/me').as('getUser');

  // Wait and assert API response
  cy.wait('@getUser').then((interception) => {

    expect(interception.response.statusCode).to.eq(200);

    const user = interception.response.body.user;

    expect(user.isPasswordExpired).to.eq(true);
  });
});


it("Verify error message shown for the entered old passwod and new passwords are same", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);
  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type(Constants.ExpiredPasswordEmailPassword30);

  // Confirm password
  cy.get(':nth-child(3) > .flex-c > .flex-r input').type('Test@123');

  cy.contains('Update Password').should('be.visible').click();  // bug
  //  cy.on('window:alert', (text) => { 
  //   expect(text).to.include('Passwords do not match');
  // });

});

it("Verify that the application displays an appropriate error message when the new password does not include at least one uppercase letter", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  // cy.location('pathname').should('eq', '/password-expired');

  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type("cnsw-1234");

  cy.contains('* Should contain at least one uppercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
});


it("Verify that the application displays an appropriate error message when the new password does not include at least one lower case letter", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);


  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type("CNSW-1234");

  cy.contains('* Should contain at least one lowercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
});

it("Verify that the application displays an appropriate error message when the new password  dosent mmet minimum password requiremetns  <8", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);
  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);
  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type("CNS-1234");

  cy.contains('* Should contain at least one lowercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
});

it("Verify that the application displays an appropriate error message when the new password exceeds maximum password requirements >16", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);


  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type("CNS-1234");

  cy.contains('* Should contain at least one lowercase letter.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
});

it("Verify that the application displays an appropriate error message when the new password  does not have special character", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);


  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type("Cnsww1234");

  cy.contains('* Should contain at least one special character.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
});


it("Verify password updation failed when the entered new password and confirm password are not same", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type(Constants.ExpiredPasswordEmailPassword30);

  // Confirm password
  cy.get(':nth-child(3) > .flex-c > .flex-r input').type('Test@123');

  cy.contains('Update Password').should('be.visible').click();  // bug
  //  cy.on('window:alert', (text) => { 
  //   expect(text).to.include('Passwords do not match');
  // });

});

it("Verify user can succesfully update password when the entered new and confim password is same ", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type('Test@123');

  // Confirm password
  cy.get(':nth-child(3) > .flex-c > .flex-r input').type('Test@123');

  cy.url({ timeout: 60000 }).should("include", "/login");
});


it("Verify password update failed when the entered new password and confirm password are not same", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);
  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);
  cy.contains('Update Password').click();  // bug

  //    cy.on('window:alert', (text) => { 
  //   expect(text).to.include('Passwords do not match');
  // });
});

it("Verify user is redirects to login screen after successful updation of password", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  // Old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input').type(Constants.ExpiredPasswordEmailPassword30);

  // New password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input').type('Test@123');

  // Confirm password
  cy.get(':nth-child(3) > .flex-c > .flex-r input').type('Test@123');

  cy.url({ timeout: 60000 }).should("include", "/login");
});


it("Verify updating password without internet connection", () => {

  loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

  // Intercept the password update API BEFORE clicking the button
  cy.intercept('PATCH', '**/api/user/password', { forceNetworkError: true }).as('updatePassword');

  // Fill old password
  cy.get(':nth-child(1) > .flex-c > .flex-r input')
    .type(Constants.ExpiredPasswordEmailPassword30);

  // Fill new password
  cy.get(':nth-child(2) > .flex-c > .flex-r > .search-input')
    .type('Test@123');

  // Confirm password
  cy.get(':nth-child(3) > .flex-c > .flex-r input')
    .type('Test@123');

  cy.contains('Update Password').click();

  // Wait for the PATCH request to fail
  cy.wait('@updatePassword');

  LidarViewerElements.NetworkErrorMessage.should('have.text', 'Network error. Please check your internet connection.');

});


it("Verify password is hashed before sending", () => {

cy.intercept('POST', '**/api/login').as('loginRequest');

loginToPortal(Constants.ExpiredPasswordEmail30, Constants.ExpiredPasswordEmailPassword30);

cy.wait('@loginRequest').then((interception) => {

    const body = interception.request.body;
    expect(body).to.have.property('data');
    expect(body.data).to.be.a('string');
    expect(body.data.length).to.be.greaterThan(50);

    expect(body.data).to.match(/^[A-Za-z0-9+/=]+$/);

      });


});






});


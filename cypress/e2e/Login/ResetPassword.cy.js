import LidarViewerElements from "../../locators/LidarViewer";
import Constants from "../../utils/Constants";
import {
  loginToPortal,
} from "../../utils/commonMethods.js";

describe("Reset Password Module", () => {

  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    LidarViewerElements.forgotPassword.click(); 
  });

  it("Reset_Password_001_Verify user can reset password using reset link", () => {

    const email = Constants.resetPasswordEmail;
    const newPassword = "NewPass123!";

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      const token = response.body.resetToken;

      // Step 2 – Build reset password link
      const resetUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.log("Reset URL:", resetUrl);

      // Step 3 – Visit reset password page
      cy.visit(resetUrl);

      // Step 4 – Fill reset password form using locators
      LidarViewerElements.NewPasswordField.type(newPassword);
      LidarViewerElements.ConfirmPasswordField.type(newPassword);
      LidarViewerElements.ResetPasswordBtn.click();

      // Step 5 – Verify redirect + success message
      cy.url().should("include", "/login");
      cy.contains("Password updated successfully", { timeout: 15000 })
        .should("be.visible");
    });

  });

  it("Reset_Password_002_Verify user can login with the reset password", () => {

    const email = Constants.resetPasswordEmail;
    const newPassword = "NewPass123!";

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      const token = response.body.resetToken;

      // Step 2 – Build reset password link
      const resetUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.log("Reset URL:", resetUrl);

      // Step 3 – Visit reset password page
      cy.visit(resetUrl);

      // Step 4 – Fill reset password form using locators
      LidarViewerElements.NewPasswordField.type(newPassword);
      LidarViewerElements.ConfirmPasswordField.type(newPassword);
      LidarViewerElements.ResetPasswordBtn.click();

      // Step 5 – Verify redirect + success message
      cy.url().should("include", "/login");
      cy.contains("Password updated successfully", { timeout: 15000 })
        .should("be.visible");

     loginToPortal(email, newPassword)
     LidarViewerElements.getHomeText.should("have.text", "Home Page");
    });

  });

  it("Reset_Password_003_Verify valid reset link works within allowed time window", () => {

    const email = Constants.resetPasswordEmail;
    const newPassword = "NewPass123!";

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      const token = response.body.resetToken;

      // Step 2 – Build reset password link
      const resetUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.log("Reset URL:", resetUrl);

      // Step 3 – Visit reset password page
      cy.visit(resetUrl);

      // Step 4 – Fill reset password form using locators
      LidarViewerElements.NewPasswordField.type(newPassword);
      LidarViewerElements.ConfirmPasswordField.type(newPassword);
      LidarViewerElements.ResetPasswordBtn.click();

      // Step 5 – Verify redirect + success message
      cy.url().should("include", "/login");
      cy.contains("Password updated successfully", { timeout: 15000 })
        .should("be.visible");

     loginToPortal(email, newPassword)
     LidarViewerElements.getHomeText.should("have.text", "Home Page");
    });

  });

  it("Reset_Password_004_Verify the functionality of confirm password field", () => {

    const email = Constants.resetPasswordEmail;
    const newPassword = "NewPass123!";

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      const token = response.body.resetToken;

      // Step 2 – Build reset password link
      const resetUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.log("Reset URL:", resetUrl);

      // Step 3 – Visit reset password page
      cy.visit(resetUrl);

      // Step 4 – Leave the confirm password as empty and click on reset password
      LidarViewerElements.NewPasswordField.type(newPassword);
      LidarViewerElements.ResetPasswordBtn.click();

      // Step 5 – Verify redirect + success message
      cy.contains("Please confirm your password.", { timeout: 15000 })
        .should("be.visible");
    });

  });

  it("Reset_Password_005_Verify the application behaviour leaving new password field as empty and clickng on reset", () => {

    const email = Constants.resetPasswordEmail;
    const newPassword = "NewPass123!";

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      const token = response.body.resetToken;

      // Step 2 – Build reset password link
      const resetUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.log("Reset URL:", resetUrl);

      // Step 3 – Visit reset password page
      cy.visit(resetUrl);

      // Step 4 – Leave the new password as empty and click on reset password
      LidarViewerElements.ResetPasswordBtn.click();

      // Step 5 – Verify redirect + success message
      
      cy.get('.info-message-container .width-100', { timeout: 5000 })
        .should('be.visible')
        .and('contain.text', "New password can't be empty.");
    });

  });

  it("Reset_Password_006_Validate_All_Rules_Turn_Green_When_Valid_Password_Is_Entered", () => {

  const email = Constants.resetPasswordEmail;
  const validPassword = "ValidPass123!";   // meets all rules

  // Step 1 – Trigger forgot password request manually via API
  cy.request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
    failOnStatusCode: false
  }).then((response) => {

    expect(response.status).to.eq(200);
    expect(response.body.msg).to.eq("Email sent successfully");
    expect(response.body.resetToken).to.exist;

    const token = response.body.resetToken;

    // Step 2 – Open reset page
    cy.visit(`${Cypress.config("baseUrl")}/resetpassword/${token}`);

    // Step 3 – Enter valid password
    LidarViewerElements.NewPasswordField.type(validPassword);

    // Step 4 – Validation rules
    const rules = [
      "Should be at least 8 characters long.",
      "Should contain at least one number.",
      "Should contain at least one lowercase letter.",
      "Should contain at least one uppercase letter.",
      "Should contain at least one special character."
    ];

    rules.forEach(rule => {
      cy.contains("span", rule)
        .parent()   // the <div style="color: ...">
        .should("have.attr", "style")
        .and("include", "color: green");   // final expected state
    });

  });

  });

  it("Reset_Password_007_Verify new password and confirm password mismatch", () => {

  const email = Constants.resetPasswordEmail;
  const newPassword = "NewPass123!";
  const confirmPassword = "Mismatch123!";

  // Step 1 – Trigger forgot password request manually via API
  cy.request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
    failOnStatusCode: false
  }).then((response) => {

    expect(response.status).to.eq(200);
    expect(response.body.msg).to.eq("Email sent successfully");
    expect(response.body.resetToken).to.exist;

    const token = response.body.resetToken;

    // Step 2 – Open reset password page
    cy.visit(`${Cypress.config("baseUrl")}/resetpassword/${token}`);

    // Step 3 – Enter new password and mismatched confirm password
    LidarViewerElements.NewPasswordField.type(newPassword);
    LidarViewerElements.ConfirmPasswordField.type(confirmPassword);

    // Step 4 – Click Reset button
    LidarViewerElements.ResetPasswordBtn.click();

    // Step 5 – Verify error message appears
    cy.get('.info-message-container .width-100', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', "Passwords do not match");

  });

  });

  it("Reset_Password_008_Verify application restricts modified reset password link", () => {

    const email = Constants.resetPasswordEmail;

    // Step 1 – Trigger forgot password request manually via API
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("Email sent successfully");
      expect(response.body.resetToken).to.exist;

      let token = response.body.resetToken;

      // Step 2 – Modify token (simulate URL tampering)
      token = token.slice(0, -1) + "X"; // replace last character

      // Step 3 – Visit modified reset password link
      const modifiedUrl = `${Cypress.config("baseUrl")}/resetpassword/${token}`;
      cy.visit(modifiedUrl);

      // Step 4 – Verify invalid/expired token message
      cy.get('.overlay-heading.bold')
        .should('be.visible')
        .and('contain.text', 'Invalid or expired token');

    });

  });


});

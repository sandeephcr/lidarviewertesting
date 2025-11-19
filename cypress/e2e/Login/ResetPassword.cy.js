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

  it("Reset_Password_003_Verify user can login with the reset password", () => {

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

  it("Reset_Password_004_Verify valid reset link works within allowed time window", () => {

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

});

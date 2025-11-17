import LidarViewerElements from "../../locators/LidarViewer";
import Constants from "../../utils/Constants";

describe("Forgot Password Tests", () => {

  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    LidarViewerElements.forgotPassword.click();
  });

  it("Forgot_Password_001_Verify user can request password reset link with valid email", () => {
    cy.intercept("POST", "/api/forgotPassword/*").as("forgotReq");

    LidarViewerElements.emailInForgotPasswordField
      .type(Constants.validForgotEmail);

    LidarViewerElements.sendRecoverLinkBtn.click();

    cy.wait("@forgotReq").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.msg).to.eq("Email sent successfully");
      expect(interception.response.body.resetToken).to.exist;
    });
  });

it("Forgot_Password_002_Verify user cannot request password reset with INVALID email format", () => {

    LidarViewerElements.emailInForgotPasswordField
      .type(Constants.invalidFormatEmail);

    LidarViewerElements.sendRecoverLinkBtn.click();

    LidarViewerElements.infoMessageContainer
      .should("be.visible")
      .and("have.text", "Invalid email format");
  });


it("Forgot_Password_003_Verify user cannot request password reset with NON-EXISTING email", () => {
  
  LidarViewerElements.emailInForgotPasswordField
    .type(Constants.nonExistingEmailForgot);

  LidarViewerElements.sendRecoverLinkBtn.click();

  LidarViewerElements.infoMessageContainer
  .should("be.visible")
  .and(($el) => expect(
      ["email is not registered", "failed to send reset password link"].some(m => $el.text().toLowerCase().includes(m))
    ).to.be.true);

    });


  it("Forgot_Password_004_Verify submitting EMPTY email field", () => {
    LidarViewerElements.sendRecoverLinkBtn.click();

    LidarViewerElements.infoMessageContainer
      .should("be.visible")
      .should("contain.text", "Email can't be empty.");
  });

});

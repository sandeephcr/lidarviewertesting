import LidarViewerElements from "../../locators/LidarViewer";
import Constants from "../../utils/Constants";
import "../../support/commands";

describe("Login Module and Network Error & Responsive Tests", () => {
beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });
  // -------------------------------
  // NETWORK ERROR TESTS
  // -------------------------------

    it.only("Network_Error_001_Handle_Network_Failure_On_Login", () => {
        const email = Constants.produserEmail;
        const password = Constants.ProduserPwd;

        cy.simulateOffline();

        cy.visit(`${Cypress.config("baseUrl")}/login`);
        LidarViewerElements.getEmail.type(email);
        LidarViewerElements.getPassword.type(password);
        LidarViewerElements.getLoginBtn.click();

        // Verify the toast text
        cy.get(".info-message-container .width-100", { timeout: 5000 })
            .should("be.visible")
            .and("contain.text", "Network error. Please check your internet connection and try again.");

        cy.simulateOnline()

    });


    it("Network_Error_002_Handle_Network_Failure_On_Send_Recovery_Link", () => {
        const email = Constants.resetPasswordEmail;

        // Force TRUE network failure for Forgot Password API
        cy.intercept(
            "POST",
            `${Cypress.config("baseUrl")}/api/forgotPassword`,
            { forceNetworkError: true }
        ).as("forgotPass");

        LidarViewerElements.forgotPassword.click();

        cy.visit(`${Cypress.config("baseUrl")}/forgotpassword`);
        LidarViewerElements.ForgotPassEmailField.type(email);
        LidarViewerElements.SendRecoveryLinkButton.click();

        // Wait for the failed API call
        cy.wait("@forgotPass");

        // Validate UI error message
        cy.contains("Network error").should("be.visible");
    });



  it("Network_Error_003_Handle_Network_Failure_On_Reset_Password", () => {
    const token = "dummyToken123";
    const validPassword = "ValidPass123!";

    // Force network error on reset password
    cy.intercept("POST", `${Cypress.config("baseUrl")}/api/resetPassword/${token}`, { forceNetworkError: true });

    cy.visit(`${Cypress.config("baseUrl")}/resetpassword/${token}`);
    LidarViewerElements.NewPasswordField.type(validPassword);
    LidarViewerElements.ConfirmPasswordField.type(validPassword);
    LidarViewerElements.ResetPasswordButton.click();

    cy.contains("Network error").should("be.visible");
  });

  // -------------------------------
  // RESPONSIVENESS TESTS
  // -------------------------------

  const viewports = [
    [1920, 1080],   // Desktop
    [1366, 768],    // Laptop
    [768, 1024],    // Tablet
    [375, 667]      // Mobile
  ];

  const checkNoHorizontalScroll = () => {
    cy.document().then((doc) => {
      const body = doc.body;
      expect(body.scrollWidth <= body.clientWidth).to.be.true;
    });
  };

  it("Page_Responsiveness_001_Login_Page_Is_Fully_Responsive", () => {
    viewports.forEach(([width, height]) => {
      cy.viewport(width, height);
      cy.visit(`${Cypress.config("baseUrl")}/login`);

      checkNoHorizontalScroll();
      cy.get("form").should("be.visible");
      cy.contains("Login").should("be.visible");
    });
  });


  it("Page_Responsiveness_002_Forgot_Password_Page_Is_Fully_Responsive", () => {
    viewports.forEach(([width, height]) => {
      cy.viewport(width, height);
      cy.visit(`${Cypress.config("baseUrl")}/forgotpassword`);

      checkNoHorizontalScroll();
      cy.contains("Forgot Password").should("be.visible");
      cy.get("input").should("be.visible");
    });
  });


  it("Page_Responsiveness_003_Reset_Password_Page_Is_Fully_Responsive", () => {
    const dummyToken = "testtoken123";

    viewports.forEach(([width, height]) => {
          cy.viewport(width, height);
          cy.visit(`${Cypress.config("baseUrl")}/resetpassword/${dummyToken}`);

          checkNoHorizontalScroll();
          cy.contains("Reset Password").should("be.visible");
          cy.get('input[type="password"]').should("be.visible");
    });
  });

});

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

    it("Network_Error_001_Handle_Network_Failure_On_Login", () => {
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

        LidarViewerElements.forgotPassword.click();

        cy.simulateOffline();

        LidarViewerElements.emailInForgotPasswordField.type(email);
        LidarViewerElements.sendRecoverLinkBtn.click();

         // Verify the toast text
        cy.get(".info-message-container .width-100", { timeout: 5000 })
            .should("be.visible")
            .and("contain.text", "Network error. Please check your internet connection and try again.");

        cy.simulateOnline()
    });



  it.only("Network_Error_003_Handle_Network_Failure_On_Reset_Password", () => {
    
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
    
          cy.simulateOffline();

          LidarViewerElements.NewPasswordField.type(newPassword);
          LidarViewerElements.ConfirmPasswordField.type(newPassword);
          LidarViewerElements.ResetPasswordBtn.click();
            
          // Verify the toast text
        cy.get(".info-message-container .width-100", { timeout: 5000 })
            .should("be.visible")
            .and("contain.text", "Network error. Please check your internet connection and try again.");

        cy.simulateOnline();
          
        });
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

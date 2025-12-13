import LoginLocators from "../locators/LoginLocators";
import PoleLocators from "../locators/PoleLocators";
import UserManagementLocators from "../locators/UserManagementLocators";
import Constants from "./Constants";

export const login = (email, pwd, requiresOtp = null) => {
  let otp;

  //  Login to the application with admin and non admin users
  LoginLocators.getEmail.type(email);
  LoginLocators.getPassword.type(pwd);
  LoginLocators.getLoginBtn.click();

  const handleContinueSessionPopup = () => {
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if (
        $body.find(
          "#root > div > main > div.single-session > div > div > button.continue-btn"
        ).length > 0
      ) {
        cy.log("Continue session popup found. Clicking it...");
        cy.get(
          "#root > div > main > div.single-session > div > div > button.continue-btn"
        ).click();
      } else {
        cy.log("No continue session popup found.");
      }
    });
  };

  const proceedToHome = () => {
    handleContinueSessionPopup();
    cy.url({ timeout: 60000 }).should("include", "/home");
    cy.log("Successfully logged in and navigated to home");
  };

  const proceedWithOtp = (otpValue) => {
    cy.wait(2000);
    cy.get("input.search-input").type(otpValue);
    cy.get(".Login_Button").click();
    proceedToHome();
  };

  const fetchOtp = (attempt = 1) => {
    cy.log(`Fetching OTP - Attempt ${attempt}`);
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${email}`,
      timeout: 30000,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`OTP API Response Status: ${response.status}`);

      if (response.status === 200) {
        otp = response.body.otp;
        cy.log(`OTP received: ${otp}`);
        proceedWithOtp(otp);
      } else if (attempt < 3) {
        cy.log("OTP not ready yet, retrying in 3s...");
        cy.wait(3000);
        fetchOtp(attempt + 1);
      } else {
        throw new Error(
          `Failed to get OTP after ${attempt} attempts (last status: ${response.status})`
        );
      }
    });
  };

  const handleOtpLogin = () => {
    cy.get("input.search-input", { timeout: 20000 })
      .should("exist")
      .then(() => {
        fetchOtp();
      });
  };

  // Auto-detect OTP requirement if not explicitly specified
  if (requiresOtp === null) {
    cy.log("Auto-detecting OTP requirement by checking OTP API...");

    // Try to fetch OTP to determine if user needs it
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${email}`,
      timeout: 10000,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`OTP API Detection Response Status: ${response.status}`);

      if (response.status === 200) {
        // OTP is available for this user
        cy.log("OTP is required for this user");
        otp = response.body.otp;
        proceedWithOtp(otp);
      } else if (response.status === 401 || response.status === 404) {
        // 401/404 means this is an admin user - no OTP needed
        cy.log(
          "OTP not available (Admin user detected) - proceeding without OTP"
        );
        proceedToHome();
      } else {
        // Other errors - try to proceed without OTP as fallback
        cy.log(
          `Unexpected OTP API response (${response.status}) - proceeding without OTP`
        );
        proceedToHome();
      }
    });
  } else if (!requiresOtp) {
    // Admin user: no OTP required, proceed directly to home
    cy.log("Admin user login (no OTP required)");
    proceedToHome();
  } else {
    // Non-admin user: requires OTP
    cy.log("Non-admin user login (OTP required)");
    handleOtpLogin();
  }
};

export const LogoutFromUsermanagement = () => {
  LoginLocators.getNavigationMenuFromUserManagementpage.click({
    force: true,
    timeout: 20000,
  });
  LoginLocators.getLogoutOption.click();
  LoginLocators.getConfirmLogout.click();
  LoginLocators.getConfirmLoginText.should("have.text", "Login");
};

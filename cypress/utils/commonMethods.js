import LidarViewerElements from "../locators/LidarViewer.js";
import Constants from "./Constants";

export const loginToPortal = (email, pwd) => {
  let otp;

  LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();

  const fetchOtp = (attempt = 1) => {
    cy.log(`Fetching OTP - Attempt ${attempt}`);
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${email}`,
      timeout: 30000,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("Response code is =============>", response.status);

      if (response.status === 200) {
        otp = response.body.otp;
        cy.log(`OTP received: ${otp}`);
        proceedWithOtp(otp);
      } else if (attempt < 3) {
        cy.log("OTP not ready yet, retrying in 3s...");
        cy.wait(3000);
        fetchOtp(attempt + 1);
      } else {
        throw new Error(`Failed to get OTP after ${attempt} attempts (last status: ${response.status})`);
      }
    });
  };

  const proceedWithOtp = (otp) => {
    cy.wait(2000);
    cy.get('input.search-input').type(otp);
    cy.get(".Login_Button").click();

    cy.wait(3000);
    cy.get("body").then(($body) => {
      if ($body.find("#root > div > main > div.single-session > div > div > button.continue-btn").length > 0) {
        cy.log("Continue session popup found. Clicking it...");
        cy.get("#root > div > main > div.single-session > div > div > button.continue-btn").click();
      } else {
        cy.log("No continue session popup found.");
      }
    });

    cy.url({ timeout: 60000 }).should("include", "/home");
  };
  fetchOtp();
};



export const loginToPortal1 = (email, pwd) => {
  let otp;

  LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();

  const fetchOtp = (attempt = 1) => {
    cy.log(`Fetching OTP - Attempt ${attempt}`);
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/login/get-otp/${email}`,
      timeout: 30000,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("Response code is =============>", response.status);

      if (response.status === 200) {
        otp = response.body.otp;
        cy.log(`OTP received: ${otp}`);
        proceedWithOtp(otp);
      } else if (attempt < 3) {
        cy.log("OTP not ready yet, retrying in 3s...");
        cy.wait(3000);
        fetchOtp(attempt + 1);
      } else {
        throw new Error(`Failed to get OTP after ${attempt} attempts (last status: ${response.status})`);
      }
    });
  };

  const proceedWithOtp = (otp) => {
    cy.wait(2000);
    cy.get('input.search-input').type(otp);
    cy.get(".Login_Button").click();
  };
  fetchOtp();
};

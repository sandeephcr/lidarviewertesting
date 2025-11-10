import LidarViewerElements from "../locators/LidarViewer.js";




export const loginToPortal = (email, pwd) => {

   let otp;
      LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();
  cy.request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}/api/login/get-otp/${
          email
        }`,
        timeout: 30000,
        failOnStatusCode: false,
      }).then((response) => { 
        cy.log("Response code is =============>", response.status)
        expect(response.status).to.eq(200);
        otp = response.body.otp;
        cy.log(otp);
        cy.wait(2000)
        cy.get('input.search-input').type(otp);
        cy.get(".Login_Button").click();
        if (cy.get("#root > div > main > div.single-session > div > div > button.continue-btn").should('exist')) {
          cy.get("#root > div > main > div.single-session > div > div > button.continue-btn").click()
        }
        cy.url().should("include", "/home");
      });
}




export const login1 = (email, pwd) => {
  LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();
  cy.wait(2000);
};

export const loginEmpty = (email, pwd) => {
  if (email) {
    LidarViewerElements.getEmail.type(email);
  }
  
  if (pwd) {
    LidarViewerElements.getPassword.type(pwd);
  }

  LidarViewerElements.getLoginBtn.click();
  cy.wait(2000);
};

export const login2 = (email, pwd) => {
  LidarViewerElements.getEmail.type(email);
  // LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();
  cy.wait(2000);
};

export const Clientlogin = (email, pwd) => {
  LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  // cy.pause()
  LidarViewerElements.getLoginBtn.click();
  cy.wait(2000);
};

export const Adminlogin = (email, pwd) => {
  LidarViewerElements.getEmail.type(email);
  LidarViewerElements.getPassword.type(pwd);
  LidarViewerElements.getLoginBtn.click();
};

export const forgotPassword = (email) => {
  LidarViewerElements.forgotPassword.click();
  LidarViewerElements.emailInForgotPasswordField.type(email);
  LidarViewerElements.sendRecoverLinkBtn.click();
};

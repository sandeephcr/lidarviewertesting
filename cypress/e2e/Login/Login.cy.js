import LidarViewerElements from "../../locators/LidarViewer.js";
import {
  Adminlogin,
  loginToPortal,
  login1,
  login2,
  loginEmpty,
} from "../../utils/commonMethods.js";
import Constants from "../../utils/Constants.js";

describe("Login", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  
  //  it("Login_Client_Login_001_Verify that login with valid client email and valid client password", () => {
  //    loginToPortal(Constants.testDesignEngineerEmail, Constants.password)
  //    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  //  });
 
  it("Admin_Login_002_Verify that login with valid admin email and valid admin password", () => {
    cy.wait(2000);
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    LidarViewerElements.getHomeText.should("have.text", "Home Page");
  });

  it("Login_003_Verify that login with invalid email and valid password", () => {
    cy.wait(2000);
    login1(Constants.inValidEmail, Constants.password);
    cy.on("window:alert", (str) => {
      expect(str).to.include("Invalid email or password");
    });
  });

  it("Login_004_Verify that login with valid email and invalid password", () => {
    cy.wait(2000);
    login1(Constants.validEmail, Constants.invalidPwd);
    cy.on("window:alert", (str) => {
      expect(str).to.include("Invalid email or password");
    });
  });

  it("Login_005_Verify that login with empty email", () => {
    loginEmpty(Constants.emptyString, Constants.validEmail);
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Email should not be empty");
  });

  it("Login_006_Verify that login with empty password", () => {
    login2(Constants.validEmail);
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Password should not be empty");
  });

  it("Login_007_Verify that login with special characters in email", () => {
    login1(Constants.SpecialCharEmail, Constants.password);
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Invalid email format");
  });

  it("Login_008_Verify that login with SQL injection in email", () => {
    login1(Constants.sqlInjection, Constants.password);
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Invalid email format");
  });

  it("Login_009_Verify that login with SQL injection in password", () => {
    cy.wait(2000);
    login1(Constants.validEmail, Constants.sqlInjection);
    cy.on("window:alert", (str) => {
      expect(str).to.include("Invalid email or password");
    });
  });

  it("Login_010_Verify that the functionality of case-insensitive in email field", () => {
    cy.wait(2000);
    login1(Constants.Case_Insensitive_Email, Constants.password);
    cy.url().should('include', '/home');
  LidarViewerElements.getHomeText.should("contain.text", "Home Page");
  });

  it("Login_011_Verify that the functionality of lower-case email field", () => {
    cy.wait(2000);
    login1(Constants.lowerCaseEmail, Constants.password);
    cy.url().should('include', '/home');
  LidarViewerElements.getHomeText.should("contain.text", "Home Page");
  });

  it("Login_012_Verify that the functionality of upper-case email field", () => {
    cy.wait(2000);
    login1(Constants.upperCaseEmail, Constants.password);
    cy.url().should('include', '/home');
  LidarViewerElements.getHomeText.should("contain.text", "Home Page");
  });

  it("Login_013_Verify that the functionality of mixed-case email field", () => {
    cy.wait(2000);
    login1(Constants.MixedCaseEmail, Constants.password);
    
    cy.url().should('include', '/home');
  LidarViewerElements.getHomeText.should("contain.text", "Home Page");
  });

  it("Login_014_Verify that the functionality of non-existing email", () => {
    cy.wait(2000);
    login1(Constants.notExistingEmail, Constants.password);
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Invalid email format");
  });

  it("Auto_015_Verify login with empty email and empty password", () => {
    cy.wait(2000);
    LidarViewerElements.getLoginBtn.click();
    cy.get("#root > div > main > div.info-message-container > span.width-100")
      .should("be.visible")
      .should("have.text", "Email and Password should not be empty");
  });
});
import {
  generateRandomCoordinates,
  Adminlogin,
  PolePlacement,
  SavePoleData,
  ZoomIN,
  openDynamicFolderAndRun,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import HomeLocators from "../../locators/HomeLocators.js";
import PoleLocators from "../../locators/PoleLocators.js";
import UserManagementLocators from "../../locators/UserManagementLocators.js";
import Constants from "../../utils/Constants.js";

describe("Home Page Navigation Tests", () => {
  const folderPath = ["Shared Space", "Automation"];
  const runName = "Automation_Atchyutha-";
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("Automation pole", () => {
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    PoleLocators.PoleIcon.click();
    cy.wait(6000);
    cy.get("#canvas3D").should("exist");
    ZoomIN();
    cy.wait(6000);
    UserManagementLocators.getSelectPoleFromNavbar.click();
    generateRandomCoordinates(1);
    PoleLocators.Id.type("Automation pole");
    SavePoleData();
    PoleLocators.PoleSaveMessage.should("have.text", "Pole saved successfully");
  });

  it("Home_001_Verify that the search functionality correctly displays runs based on the entered Pole ID that is available in the server.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type("Automation pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains("Orbital-21-16482-2");
  });

  it("Home_002_Verify that the system displays a clear no data available  message when searching for a pole id that is not available in the server.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type("No Pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    HomeLocators.NoRunsAvailableText.contains("No Runs available");
  });

  it("Home_004_Verify that searching for a Pole ID with leading or trailing spaces returns the correct run name.", () => {
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('[data-testid="searchbar-container"]').type(" Automation pole");
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains(
      "Automation_Atchyutha-"
    );
  });

  it("Home_007_Verify that the search feature correctly displays associated run data for valid latitude and longitude values.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('[data-testid="searchbar-container"]').type("34.164884,-84.178951"); // run name - feb2025run
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains("feb2025run");
  });

  it("Home_008_Verify that the application handles invalid latitude and longitude values appropriately.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('[data-testid="searchbar-container"]').type("34.164884-84.178951"); // run name - feb2025run
    cy.get(".primary-btn").eq(1).click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains("longitude cannot be empty");
    });
  });

  it('Home_031_"Verify that the search functionality on the home page correctly identifies and displays existing folders based on the search query', () => {
    cy.get('[data-testid="searchbar-container"]').type("Demo"); // folder name :- Demo
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get(".folderName").contains("Demo");
  });

  it('Home_032_"Verify that the search functionality on the home page correctly identifies and displays existing runs based on the search query', () => {
    cy.get('[data-testid="searchbar-container"]').type("Automation_Atchyutha-"); // folder name :- Demo
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get('[data-testid="run-card-container"]').contains(
      "Automation_Atchyutha-"
    );
  });

  it("Home_036_Verify the display of the back button after performing  a search.", () => {
    cy.get(".folderName").contains("Shared Space").dblclick();
    cy.get('[data-testid="searchbar-container"]').type("DemoRun7"); // folder name :- Demo
    cy.get(".primary-btn").eq(1).click();
    cy.wait(2000);
    cy.get("button.padding-5").should("be.visible");
  });

  it("Home_037_Verify that clicking on the list view icon displays all runs in list view", () => {
    cy.wait(2000);
    cy.get(".FileManager.flex-r.justify-between.m-30")
      .children()
      .eq(1)
      .children()
      .eq(9)
      .click();
    cy.get("table.Table")
      .find(".TableHeader")
      .find("th")
      .eq(0) // First column: Run Name
      .invoke("text")
      .should("match", /^Run Name$/); // Ensure it's "Run Name" without any extra spaces

    cy.get("table.Table")
      .find(".TableHeader")
      .find("th")
      .eq(1)
      .invoke("text")
      .should("match", /^Location$/);

    cy.get("table.Table")
      .find(".TableHeader")
      .find("th")
      .eq(2)
      .invoke("text")
      .should("match", /^Distance$/);

    cy.get("table.Table")
      .find(".TableHeader")
      .find("th")
      .eq(3)
      .invoke("text")
      .should("match", /^Created On\s*$/);
  });

  it("Home_038_Clicking on the grid view icon displays all runs in grid view", () => {
    cy.wait(2000);
    cy.get(".FileManager.flex-r.justify-between.m-30")
      .children()
      .eq(1)
      .children()
      .eq(9)
      .click();
    cy.get(".FileManager.flex-r.justify-between.m-30")
      .children()
      .eq(1)
      .children()
      .eq(8)
      .click();
    cy.get('[data-testid="run-card-container"]')
      .first()
      .should("not.contain.text", "Run Name");
    cy.get('[data-testid="run-card-container"]')
      .first()
      .should("not.contain.text", "Location");
    cy.get('[data-testid="run-card-container"]')
      .first()
      .should("not.contain.text", "Distance");
    cy.get('[data-testid="run-card-container"]')
      .first()
      .should("not.contain.text", "Created On");
  });

  it("Home_Project_nav_001_Verify that double-clicking on a folder from the home page navigates the user into the folder.", () => {
    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(2000);
    cy.get(".body3.ActiveCrumb.pointer").contains("Automation_Atchyutha-");
  });

 it('Home_Project_nav_002_Verify that clicking on the root element navigates the user back to the root view and displays all available data in home page', () => {

    folderPath.forEach((folderPaths) => {
        cy.get(".folderName").contains(folderPaths).should("be.visible").dblclick();
        cy.wait(2000);
    });

    cy.get('.body3.InactiveCrumb.pointer').contains('Root').click()
    LidarViewer.getHomeText.should('have.text','Home Page')

});

it('Home_Project_nav_003_Verify that clicking on a folder from search results opens the folder correctly.', () => {
   
    const folderPath = ["Shared Space"];
    folderPath.forEach((folderPaths) => {
        cy.get(".folderName").contains(folderPaths).should("be.visible").dblclick();
        cy.wait(2000);
    });
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test');
    cy.wait(2000);
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click();
    cy.wait(2000);
    cy.get('.folderName').contains('Test').dblclick()
});

it('Home_Project_nav_006_Verifying that the opening of multiple runs', () => {
    
    let firstRunName
    const folderPath = ["Shared Space"]
    folderPath.forEach((folderPaths) => {
        cy.get(".folderName").contains(folderPaths).should("be.visible").dblclick()
        cy.wait(2000)
    });
    cy.wait(2000)
    cy.contains('div[role="checkbox"]', 'Select').should('be.visible').click()

    cy.get('[data-testid="run-card-container"]').filter(':visible')
    .then($runs => {
        firstRunName = $runs.eq(0).find('[data-testid="run-name"]').text().trim()
        cy.wrap($runs.eq(0)).click()
        cy.wrap($runs.eq(1)).click()
    })
    cy.contains('div.primary-btn', 'Open').should('be.visible').click()
    cy.get('.body3.ActiveCrumb.pointer').should('be.visible').and(($el) => {
    expect($el.text().trim()).to.eq(firstRunName)
    })
});

  it("Home_Project_nav_008_Verify that the deselect of runs ", () => {
    cy.get(".FileManager.flex-r.justify-between.m-30")
      .children()
      .contains("Select")
      .click();
    cy.get('[data-testid="run-card-container"]')
      .children()
      .contains("AutomationRun8")
      .click();
    cy.get(".FileManager.flex-r.justify-between.m-30").contains(
      "Selected Runs 1"
    );
    cy.get('[data-testid="run-card-container"]')
      .children()
      .contains("AutomationRun8")
      .click();
    cy.get(".FileManager.flex-r.justify-between.m-30").should(
      "not.contain",
      "Selected Runs 1"
    );
  });
});

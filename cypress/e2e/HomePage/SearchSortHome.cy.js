Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false; // prevents Cypress from failing the test
  }
});
import {
  Adminlogin,
} from "../../utils/commonMethods.js";
import LidarViewer from "../../locators/LidarViewer.js";
import HomeLocators from "../../locators/HomeLocators.js";
import PoleLocators from "../../locators/PoleLocators.js";
import UserManagementLocators from "../../locators/UserManagementLocators.js";
import Constants from "../../utils/Constants.js";
import PoleActions from "../../support/PoleAction.js";
import ViewerElements from "../../locators/ViewerElements.js";
import "../../support/commands.js";

describe("Search Sort Home Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  });

  it("LVH-3412 - Verify that the search functionality correctly displays runs based on the entered Pole ID that is available in the server.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");
    cy.wait(500);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3413 - Verify that the system displays a clear no data available  message when searching for a pole id that is not available in the server.", () => {
    
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type("No Pole");
    cy.get('div.primary-btn[alt="search"]')
    .should("be.visible")
    .click();
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /no runs/i);
  });

  it("LVH-3414 - Verify that the application can save a pole with a custom ID containing all types of characters (letters, numbers, special characters, spaces) and display the associated run name when searched.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350, `Pole_123#@!$${Date.now()}`);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3415 - Verify that searching for a Pole ID with leading or trailing spaces returns the correct run name.", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type("  " + poleName);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3416 - Verify network failure functionality when searching with a valid pole id", () => {
    // Search Run
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test-Oct30-3");

    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();

    // Open Run
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
      .click();

    // Wait for default viewer load
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Navigate to image 60
    cy.url().then((url) => {
      const updatedUrl = url.replace(/\/\d+\?/, '/60?');
      cy.visit(updatedUrl);
    });

    // Wait again after re-visit
    cy.get("#canvas3D", { timeout: 20000 })
      .should("be.visible");

    // Enable PCD + Camera
    ViewerElements.getPcdCameraViewBtn
      .should("be.visible")
      .click();

    cy.wait(5000);
    // Place and save pole
    const poleName = PoleActions.placePole(600, 350);
    PoleActions.savePole();
    cy.visit(Cypress.config("baseUrl"));
    cy.get(".HomeDropDown").first().select("PoleId");
    cy.get('input[placeholder="Type for search"]')
    .should("be.visible")
    .clear().type(poleName);
    cy.simulateOffline();
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /check internet connection/i);
    cy.simulateOnline();
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")
  });

  it("LVH-3417 - Verify that the search feature correctly displays associated run data for valid latitude and longitude values.", () => {

    let latlng = "26.974109339800187, -82.15931013816875";

    cy.get(".HomeDropDown").first().select("LatLng");

    cy.get('[data-testid="searchbar-container"]')
      .type(latlng);

    cy.get('div.primary-btn[alt="search"]').click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")


  });

  it("LVH-3418 - Verify that the application handles invalid latitude and longitude values appropriately.", () => {
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type("34.164884-84.178951");

     cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains("longitude cannot be empty");
    });
  });

  it("LVH-3419 - Verify the network failure functionality for Latitude and Longitude search", () => {
    
    let latlng = "26.974109339800187, -82.15931013816875";
    cy.get(".HomeDropDown").first().select("LatLng");
    cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(latlng);
    cy.simulateOffline();
     cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    LidarViewer.infoMessageContainer
     .should("be.visible")
     .invoke("text")
     .should("match", /check internet connection/i);
    cy.simulateOnline();
    cy.get('div.primary-btn[alt="search"]')
    .should("be.visible")
    .click();
    cy.contains(".runCardHomeName", "Test-Oct30-3")
      .should("be.visible")

  });

  it("LVH-3420 - Verify that exactly 20 folders are displayed per page", () => {

    // Step 1: Navigate to folder view (Shared Space)
    cy.get(".folderName")
      .contains("Shared Space")
      .dblclick();
  
    // Step 2: Ensure folders are visible
    cy.get(".folderName")
      .should("have.length.greaterThan", 0);
  
    // Step 3: Validate exactly 20 folders displayed
    cy.get(".folderName")
      .its("length")
      .should("eq", 20);
  
  });

  it("LVH-3421 - Verify that clicking on the next button navigates to the next page", () => {

    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    // Verify starting on page 1
    cy.get('.pagination-item.selected')
    .should('contain', '1');

    // Click Next (right arrow)
    cy.get('.arrow.right')
      .first()
      .should('be.visible')
      .click();

    // Verify page changed to 2
    cy.get('.pagination-item.selected')
      .should('contain', '2');

  });

  it('LVH-3422 - Verify that clicking on the previous button navigates to the previous page', () => {

    // Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Go to page 2 first
    cy.contains('.pagination-item', '2')
      .first()
      .should('be.visible')
      .click();
  
    // Verify we are on page 2
    cy.get('.pagination-item.selected')
      .should('contain', '2');
  
    // Click Previous (left arrow)
    cy.get('.pagination-container .arrow.left')
      .first()
      .should('be.visible')
      .click();
  
    // Verify we returned to page 1
    cy.get('.pagination-item.selected')
      .should('contain', '1');
  
  });

  it('LVH-3423 - Verify that selecting a specific page number navigates to the correct page', () => {

    // Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Go to page 2 first
    cy.contains('.pagination-item', '2')
      .first()
      .should('be.visible')
      .click();
  
    // Verify we are on page 2
    cy.get('.pagination-item.selected')
      .should('contain', '2');

  });

  it("LVH-3424 - Verify first page is selected by default on page load", () => {

    cy.get(".folderName")
    .contains("Shared Space")
    .dblclick();

  // Wait for folders to load
  cy.get(".folderName:visible")
    .should("have.length.greaterThan", 0);

  // Target correct pagination
  cy.get('.pagination-container')
    .first()
    .within(() => {

      cy.get('.pagination-item.selected')
        .should('contain', '1');

    });

  
  });

  it("LVH-3425 - Verify that the next button is disabled on the last page", () => {

    // Step 1: Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .dblclick();
  
    // Wait for folders to load
    cy.get(".folderName:visible")
      .should("have.length.greaterThan", 0);
  
    // Step 2: Navigate to last page using Next button
    cy.get('.pagination-container')
      .first()
      .within(() => {
  
        // Click next until disabled
        cy.get('.arrow.right').then(($btn) => {
  
          function goToLastPage() {
            cy.wrap($btn).parent().then(($parent) => {
              if (!$parent.hasClass('disabled')) {
                cy.wrap($btn).click();
                cy.wait(500); // small wait for UI update
                cy.get('.arrow.right').then(goToLastPage);
              }
            });
          }
  
          goToLastPage();
        });
  
      });
  
    // Step 3: Verify Next button is disabled
    cy.get('.pagination-container')
      .first()
      .find('.arrow.right')
      .parent()
      .should('have.class', 'disabled');
  
  });

  it("LVH-3426 - Verify that the previous button is disabled on the first page", () => {

    // Step 1: Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Step 2: Wait for folders to load
    cy.get(".folderName:visible")
      .should("have.length.greaterThan", 0);
  
    // Step 3: Verify we are on page 1 and Previous is disabled
    cy.get('.pagination-container')
      .first()
      .within(() => {
  
        // Confirm page 1 is selected
        cy.get('.pagination-item.selected')
          .should('contain', '1');
  
        // Verify Previous button is disabled
        cy.get('.arrow.left')
          .parent()
          .should('have.class', 'disabled');
  
      });
  
  });

  it("LVH-3427 - Verify pagination controls are responsive on different screen sizes", () => {

    const viewports = [
      [1280, 720],  // Desktop
      [768, 1024],  // Tablet
      [375, 667]    // Mobile
    ];
  
    viewports.forEach((size) => {
  
      cy.viewport(size[0], size[1]);
  
      // Open folder
      cy.get(".folderName")
        .contains("Shared Space")
        .should("be.visible")
        .dblclick();
  
      // Wait for folders
      cy.get(".folderName:visible")
        .should("have.length.greaterThan", 0);
  
      // Validate pagination visible & functional
      cy.get('.pagination-container')
        .first()
        .within(() => {
  
          // Pagination should be visible
          cy.get('.pagination-item')
            .should('be.visible');
  
          // Click Next
          cy.get('.arrow.right')
            .click();
  
          // Validate page changed
          cy.get('.pagination-item.selected')
            .should('contain', '2');
  
        });
  
      cy.logout();
      cy.visit(Cypress.config("baseUrl"));
      cy.get('.cookie-banner', { timeout: 10000 })
      .should('be.visible');
    
      cy.contains('.cookie-banner button', 'OK')
        .click();
      Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  
    });
  
  });

  it("LVH-3428 - Verify total number of pages is displayed correctly", () => {

    cy.get(".folderName")
      .contains("Shared Space")
      .dblclick();
  
    cy.get(".folderName:visible")
      .should("have.length.greaterThan", 0);
  
    cy.get('.pagination-container')
      .first()
      .find('.pagination-item')
      .not(':has(.arrow)')
      .should('have.length', 2); // ✅ expected pages
  
  });

  it("LVH-3429 - Verify exactly 20 runs are displayed on each page", () => {

    // Step 1: Open folder containing runs
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Step 2: Wait for runs to load
    cy.get(".runCardHomeName:visible")
      .should("have.length.greaterThan", 0);
  
    // Step 3: Validate exactly 20 runs on page
    cy.get(".runCardHomeName:visible")
      .should("have.length", 20);
  
  });

  it("LVH-3430 - Verify funtionality of tooltip ", () => {


    cy.get(".folderName:visible")
    .first()
    .then(($el) => {

      const folderText = $el.text().trim();

      // Force show tooltip (bypass hover)
      cy.get('.ToolTip-HC')
        .invoke('show');

      // Validate tooltip text
      cy.get('.ToolTip-HC:visible')
        .should('contain', folderText);

    });
  });

  it("LVH-3431 - Verify search bar remains fixed during vertical scrolling", () => {

    cy.viewport(1280, 500);

     cy.get(".folderName")
     .contains("Shared Space")
     .should("be.visible")
     .dblclick();

      // Step 1: Capture initial position
      cy.get('input[placeholder="Type for search"]')
      .should('be.visible')
      .then(($el) => {

        const initialTop = $el[0].getBoundingClientRect().top;

      // Step 2: Scroll container
        cy.get('div.flex-c.gap-20[style*="overflow"]')
          .scrollTo('bottom');

        // Step 3: Verify position unchanged
        cy.get('input[placeholder="Type for search"]')
          .should('be.visible')
          .then(($elAfter) => {

            const afterTop = $elAfter[0].getBoundingClientRect().top;

            expect(afterTop).to.eq(initialTop);

          });

  });
  
  });

  it("LVH-3432 - Verify search panel header remains fixed during vertical scrolling", () => {

    cy.viewport(1280, 500);
  
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Step 1: Capture initial position of search panel header
    cy.get(".HomeDropDown")
      .first()
      .should("be.visible")
      .then(($el) => {
  
        const initialTop = $el[0].getBoundingClientRect().top;
  
        // Step 2: Scroll container
        cy.get('div.flex-c.gap-20[style*="overflow"]')
          .scrollTo('bottom')
          .then($container => {
            expect($container[0].scrollTop).to.be.greaterThan(0);
          });
  
        // Step 3: Verify position unchanged
        cy.get(".HomeDropDown")
          .first()
          .should("be.visible")
          .then(($elAfter) => {
  
            const afterTop = $elAfter[0].getBoundingClientRect().top;
  
            expect(Math.abs(afterTop - initialTop)).to.be.lessThan(5);
  
          });
  
      });
  
  });

  it.skip("LVH-3433 - Verify network error when opening run from home page", () => {

    // Step 1: Ensure runs are visible
    cy.get(".runCardHomeName")
      .should("have.length.greaterThan", 0);
  
    // Step 2: Simulate offline
    cy.simulateOffline();
  
    // Step 3: Click any run
    cy.get(".runCardHomeName")
      .first()
      .click();
  
    // Step 4: Validate error message
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /network/i);
  
    // Step 5: Restore network
    cy.simulateOnline();
  
  });

  it("LVH-3434 - Verify network error when clicking back button after search while offline", () => {

    // Step 1: Perform search
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test");
    cy.wait(500);
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
  
    // Step 2: Ensure results are loaded
    cy.get(".folderName, .runCardHomeName")
      .should("have.length.greaterThan", 0);
  
    // Step 3: Simulate offline
    cy.simulateOffline();
  
    // Step 4: Click back button
    cy.get('button.padding-5')
      .should('be.visible')
      .click();
  
    // Step 5: Validate error message
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /network/i);
  
    // Step 6: Restore network
    cy.simulateOnline();
  
  });

  it("LVH-3435 - Verify network error when clicking search button while offline", () => {

    // Step 1: Enter search text
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type("Test");
  
    // Step 2: Simulate offline
    cy.simulateOffline();
    cy.wait(500);
    // Step 3: Click search
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
  
    // Step 4: Validate error message
    LidarViewer.infoMessageContainer
      .should("be.visible")
      .invoke("text")
      .should("match", /network/i);
  
    // Step 5: Restore network
    cy.simulateOnline();
  
  });

  it("LVH-3436 - Verify displayed runs count matches search results", () => {

    const searchText = "Oct30";
  
    // Step 1: Perform search
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type(searchText);
    
    cy.wait(500);
    cy.get('div.primary-btn[alt="search"]')
      .click();
    cy.wait(500);
    // Step 2: Count displayed runs
    cy.get(".runCardHomeName:visible")
      .then(($runs) => {
  
        const actualCount = $runs.length;
  
        // Step 3: Get count next to "Home Page"
        cy.contains('p', 'Home Page')
          .parent()
          .find('p')
          .last()
          .invoke('text')
          .then((text) => {
  
            const displayedCount = Number(text.trim());
  
            // Step 4: Compare
            expect(displayedCount).to.eq(actualCount);
  
          });
  
      });
  
  });

  it("LVH-3437 - Verify home page responsiveness", () => {

      // Step 1: Set viewport
      cy.viewport(931, 866);
    
      // Step 2: Basic UI visibility
      cy.get('input[placeholder="Type for search"]').should('be.visible');
      cy.get('.HomeDropDown').should('be.visible');
      cy.get('div.primary-btn[alt="search"]').should('be.visible');
    
      // Step 3: Ensure runs/folders are visible
      cy.get('.folderName, .runCardHomeName')
        .should('have.length.greaterThan', 0);
    
      // Step 4: Perform a search (functionality check)
      cy.get('input[placeholder="Type for search"]')
        .clear()
        .type('Test');
    
      cy.get('div.primary-btn[alt="search"]')
        .click();
    
      // Step 5: Verify results appear
      cy.get('.folderName, .runCardHomeName')
        .should('have.length.greaterThan', 0);
    
      // Step 6: Click a run to ensure navigation works
      cy.get('.runCardHomeName:visible')
        .first()
        .click();
    
      // Step 7: Viewer should load
      cy.get('#canvas3D', { timeout: 20000 })
        .should('be.visible');
    
  });

  it("LVH-3438 - Verify that refreshing the home page resets  to default view ", () => {

    // Validate core elements
    cy.get('input[placeholder="Type for search"]').should('be.visible');
    cy.get('.HomeDropDown').should('be.visible');
    cy.get('div.primary-btn[alt="search"]').should('be.visible');
  
    // Validate content loads
    cy.get('.folderName, .runCardHomeName')
      .should('have.length.greaterThan', 0);
    // Refresh
    cy.reload();
  
    // Validate core elements
    cy.get('input[placeholder="Type for search"]').should('be.visible');
    cy.get('.HomeDropDown').should('be.visible');
    cy.get('div.primary-btn[alt="search"]').should('be.visible');
  
    // Validate content loads
    cy.get('.folderName, .runCardHomeName')
      .should('have.length.greaterThan', 0);
  
  });

  it("LVH-3439 - Verify that refreshing the home page while on a specific pagination page retains the current page and data.", () => {

    // Step 1: Open folder
    cy.get(".folderName")
      .contains("Shared Space")
      .should("be.visible")
      .dblclick();
  
    // Step 2: Navigate to Page 3
    cy.contains('.pagination-item', '3')
      .first()
      .should('be.visible')
      .click();
  
    // Step 3: Verify Page 3 is selected
    cy.get('.pagination-item.selected')
      .should('contain', '3');
  
    // Step 4: Capture some data from Page 3 (first folder/run)
    cy.get('.runCardHomeName:visible')
      .first()
      .invoke('text')
      .as('page3FirstItem');
  
    // Step 5: Refresh page
    cy.reload();
  
    // Step 6: Verify still on Page 3
    cy.get('.pagination-item.selected', { timeout: 10000 })
      .should('contain', '3');
  
    // Step 7: Verify same data still present
    cy.get('@page3FirstItem').then((itemText) => {
      cy.get(' .runCardHomeName:visible')
        .first()
        .should('contain', itemText);
    });
  
  });

  it("LVH-3440 - Verify refresh resets search and pagination to default home view", () => {

    const searchText = "Test";
  
    // Step 1: Perform search
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type(searchText);
  
    cy.get('div.primary-btn[alt="search"]')
      .click();
  
    // Step 2: Navigate to Page 2
    cy.contains('.pagination-item', '2')
      .first()
      .should('be.visible')
      .click();
  
    // Step 3: Verify Page 2 is selected
    cy.get('.pagination-item.selected')
      .should('contain', '2');
  
    // Step 4: Refresh page
    cy.reload();
  
    // Validate core elements
    cy.get('input[placeholder="Type for search"]').should('be.visible');
    cy.get('.HomeDropDown').should('be.visible');
    cy.get('div.primary-btn[alt="search"]').should('be.visible');
  
    // Validate content loads
    cy.get('.folderName, .runCardHomeName')
      .should('have.length.greaterThan', 0);
  
  });

  it("LVH-3441 - Verify that the search functionality on the home page correctly identifies and displays existing folders based on the search query", () => {
     // Search Folder
     const folderName="Automation";
     cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(folderName);

   cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();
    cy.get(".folderName").contains(folderName);
  });

  it("LVH-3442 - Verify that the search functionality on the home page correctly identifies and displays existing runs based on the search query", () => {
     // Search Run
    const runName="Test-Oct30-3"
     cy.get('input[placeholder="Type for search"]')
     .should("be.visible")
     .clear()
     .type(runName);

   cy.get('div.primary-btn[alt="search"]')
     .should("be.visible")
     .click();

   // Open Run
   cy.contains(".runCardHomeName", runName)
     .should("be.visible")
  });

  it("LVH-3443 - Verify search bar functionality", () => {

    const searchText = "Test-Oct30-3";
  
    // Step 1: Enter text in search bar
    cy.get('input[placeholder="Type for search"]')
      .should("be.visible")
      .clear()
      .type(searchText);
    cy.wait(500);
    // Step 2: Click the search button
    cy.get('div.primary-btn[alt="search"]')
      .should("be.visible")
      .click();
    cy.wait(500);
    // Step 3: Verify search results appear
    cy.get('.runCardHomeName')
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        expect($el.text()).to.include(searchText);
      });
  
    // Step 4: Click the back button
    cy.get('button.padding-5') // assuming this is your back button
      .should('be.visible')
      .click();
  
    // Step 5: Verify all runs and folders are displayed
    cy.get('.folderName')
      .should('have.length.greaterThan', 0);
  
    cy.get('.runCardHomeName')
      .should('have.length.greaterThan', 0);
  
  });

  it("LVH-3444 - Verify that runs can be sorted by name ascending/descending", () => {

  cy.wait(2000);
  // Step 1: Open filter dropdown and select "Name"
  cy.get(".HomeDropDown").eq(1)
    .should("be.visible")
    .select("Name");

  // Step 2: Click ascending sort (first click)
  cy.get('img[alt="sort"]')
    .should("be.visible")
    .click(); // Ascending

  // Step 3: Capture run names in ascending order
  cy.get('.runCardHomeName')
    .then(($runs) => {
      const namesAsc = $runs.toArray().map(el => el.innerText);
      const sortedAsc = [...namesAsc].sort((a, b) => a.localeCompare(b));
      expect(namesAsc).to.deep.eq(sortedAsc);
    });

  // Step 4: Click descending sort (second click)
  cy.get('img[alt="sort"]')
    .click(); // Descending

  // Step 5: Capture run names in descending order
  cy.get('.runCardHomeName')
    .then(($runs) => {
      const namesDesc = $runs.toArray().map(el => el.innerText);
      const sortedDesc = [...namesDesc].sort((a, b) => b.localeCompare(a));
      expect(namesDesc).to.deep.eq(sortedDesc);
    });
  
  });  

  it("LVH-3461 - Verify default folder arrangement by creation date", () => {

    
    LidarViewer.getProfileIcon.click();
    LidarViewer.getAdministrationOption.click();
    LidarViewer.getRunManagementOption.click();
    const folderName = `AutoFolder_${Date.now()}`;

      // Step 1: Click Add Folder
      cy.contains('div', 'Add Folder')
        .should('be.visible')
        .click();

      // Step 2: Verify modal opens
      cy.contains('.heading2', 'Create new folder')
      .should('be.visible');

      // Step 3: Enter folder name
      cy.get('input.search-input')
          .eq(1)
          .should('be.visible')
        .clear()
        .type(folderName);

      // Step 4: Click Apply
      cy.get('[data-testid="confirm-button"]')
        .should('be.visible')
        .click();

      // Step 5: Wait for folder to appear (important)
      cy.get('.folderName')
        .should('contain', folderName);

      // Step 4: Go to Home Page (if not already there)
      cy.visit(Cypress.config("baseUrl"));

      // Step 5: Wait for folders to load
      cy.get('.folderName')
        .should('have.length.greaterThan', 0);

      // Step 6: Verify new folder is last in list
      cy.get('.folderName').then(($folders) => {
        const folderList = $folders.toArray().map(el => el.innerText.trim());
        const lastFolder = folderList[folderList.length - 1];

        expect(lastFolder).to.eq(folderName);
      });

    LidarViewer.getProfileIcon.click();
    LidarViewer.getAdministrationOption.click();
    LidarViewer.getRunManagementOption.click();
    cy.contains('div[role="checkbox"]', 'Select')
      .within(() => {
        cy.get('.CheckBox').click();
      });
    cy.contains('.folderName', folderName)
      .should('be.visible')
      .click();
    cy.contains('div.pointer', 'Delete')
      .should('be.visible')
      .click();
    cy.get('[data-testid="confirm-button"]')
      .should('be.visible')
      .click();
    LidarViewer.infoMessageContainer.should('be.visible').and('contain.text', 'deleted');
  
  });

  it("LVH-3446 - Verify the display of the back button after performing a search.", () => {
    
    cy.get('input[placeholder="Type for search"]').should('be.visible').clear().type('Test')
    cy.get('div.primary-btn[alt="search"]').should('be.visible').click()
    cy.get('button.padding-5').should('be.visible').click()
    cy.get('.folderName').contains('Shared Space').should('be.visible')
    cy.get('input[placeholder="Type for search"]').should('be.visible')

  });

  it("LVH-3447 - Verify that clicking on the list view icon displays all runs in list view", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="list-view-icon-inactive"]').should('be.visible').click()
    cy.get('[data-testid="list-view-icon-active"]').should('be.visible')
    cy.get('.Table').should('be.visible')
    cy.get('.TableData').should('have.length.greaterThan', 0)
  });

  it("LVH-3448 - Verify that clicking on the grid view icon displays all runs in grid view", () => {
    
    cy.get(".folderName").contains("Shared Space").should("be.visible").dblclick()
    cy.get('[data-testid="grid-view-icon-active"]').should('be.visible')
    cy.get('[data-testid="run-card-container"]').filter(':visible')
      .should('have.length.greaterThan', 0)
      .each($card => {
        cy.wrap($card)
          .parents('a.linkDecoration').should('exist')
      })
  });

  it("LVH-3449 - Verify that runs are sorted by date in ascending order", () => {

    cy.wait(2000);
  // Step 1: Select 'Date' from the second dropdown
    cy.get(".HomeDropDown").eq(1)
    .should("be.visible")
    .select("Date");

    // Step 2: Click sort icon (ascending)
    cy.get('img[alt="sort"]').first()
      .should("be.visible")
      .click();

    // Step 3: Capture run dates
    cy.get('.runCardHomeCreated')
      .then(($dates) => {
        const dates = $dates.toArray().map(el => {
          const text = el.innerText.trim();       // e.g., "12/28/2025"
          const [month, day, year] = text.split('/').map(Number);
          return new Date(year, month - 1, day);  // JS Date
        });

        const sortedAsc = [...dates].sort((a, b) => a - b);
        expect(dates).to.deep.eq(sortedAsc);
      });
      
  });

  it("LVH-3450 - Verify that runs are sorted by date in descending order", () => {
    cy.wait(2000);
    cy.get(".HomeDropDown").eq(1).select("Date");
    cy.get('img[alt="sort"]').first().click(); // Ascending
    cy.get('img[alt="sort"]').first().click(); // Now descending
  
    cy.get('.runCardHomeCreated').then(($dates) => {
      const dates = $dates.toArray().map(el => {
        const [month, day, year] = el.innerText.trim().split('/').map(Number);
        return new Date(year, month - 1, day);
      });
  
      const sortedDesc = [...dates].sort((a, b) => b - a);
      expect(dates).to.deep.eq(sortedDesc);
    });
  });

  it("LVH-3451 - Verify that runs are sorted alphabetically by location name in ascending order", () => {
    
    cy.wait(2000);
    // Step 1: Select 'Location' from the second dropdown
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Location");
  
    // Step 2: Click sort icon (ascending)
    cy.get('img[alt="sort"]').first()
      .should("be.visible")
      .click();
  
    // Step 3: Capture run locations
    cy.get('.runCardHomeLocation')
      .then(($locations) => {
        const locations = $locations.toArray().map(el => el.innerText.trim());
  
        // Create a sorted copy (A → Z)
        const sortedAsc = [...locations].sort((a, b) => a.localeCompare(b));
  
        // Assert original order matches ascending sort
        expect(locations).to.deep.eq(sortedAsc);
      });
  });

  it("LVH-3452 - Verify that runs are sorted alphabetically by location name in descending order", () => {
    
    cy.wait(2000);
    // Step 1: Select 'Location' from the second dropdown
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Location");
  
      cy.get('img[alt="sort"]').first().click(); // Ascending
      cy.get('img[alt="sort"]').first().click(); // Now descending
  
    // Step 3: Capture run locations
    cy.get('.runCardHomeLocation')
      .then(($locations) => {
        const locations = $locations.toArray().map(el => el.innerText.trim());
  
        // Create a descending sorted copy (Z → A)
        const sortedDesc = [...locations].sort((a, b) => b.localeCompare(a));
  
        // Assert original order matches descending sort
        expect(locations).to.deep.eq(sortedDesc);
      });
  });

  it("LVH-3453 - Verify that runs are sorted by distance in ascending order", () => {
    
    cy.wait(2000);
    // Step 1: Select 'Distance' from the dropdown (2nd dropdown)
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Distance");
  
    // Step 2: Click sort icon once for ascending
    cy.get('img[alt="sort"]').first()
      .should("be.visible")
      .click();
  
    // Step 3: Capture distances
    cy.get('.runCardHomeDistance p')
      .then(($distances) => {
        const distances = $distances.toArray().map(el => parseFloat(el.innerText.replace('Kms','').trim()));
  
        // Create ascending sorted copy
        const sortedAsc = [...distances].sort((a, b) => a - b);
  
        // Assert original order matches ascending sort
        expect(distances).to.deep.eq(sortedAsc);
      });
  });

  it("LVH-3454 - Verify that runs are sorted by distance in descending order", () => {
    
    
    cy.wait(2000);
    // Step 1: Select 'Distance' from the dropdown (2nd dropdown)
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Distance");
  
    cy.get('img[alt="sort"]').first().click(); // Ascending
    cy.get('img[alt="sort"]').first().click(); // Now descending
  
    // Step 3: Capture distances
    cy.get('.runCardHomeDistance p')
      .then(($distances) => {
        const distances = $distances.toArray().map(el => parseFloat(el.innerText.replace('Kms','').trim()));
  
        // Create descending sorted copy
        const sortedDesc = [...distances].sort((a, b) => b - a);
  
        // Assert original order matches descending sort
        expect(distances).to.deep.eq(sortedDesc);
      });
  });

  it("LVH-3455 - Verify that runs are sorted alphabetically by name in ascending order", () => {
    
    cy.wait(2000);
    // Step 1: Select 'Name' from the dropdown (2nd dropdown)
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Name");
  
    // Step 2: Click sort icon to ensure ascending
    cy.get('img[alt="sort"]').first()
      .should("be.visible")
      .click();
  
    // Step 3: Capture names
    cy.get('.runCardHomeName')
      .then(($names) => {
        const runNames = $names.toArray().map(el => el.innerText.trim());
  
        // Create ascending sorted copy
        const sortedAsc = [...runNames].sort((a, b) => a.localeCompare(b));
  
        // Assert original order matches ascending sort
        expect(runNames).to.deep.eq(sortedAsc);
      });
  });

  it("LVH-3456 - Verify that runs are sorted alphabetically by name in descending order", () => {
    
    cy.wait(2000);
    // Step 1: Select 'Name' from the dropdown (2nd dropdown)
    cy.get(".HomeDropDown").eq(1)
      .should("be.visible")
      .select("Name");

    cy.get('img[alt="sort"]').first().click(); // Ascending
    cy.get('img[alt="sort"]').first().click(); // Now descending
  
    // Step 3: Capture names
    cy.get('.runCardHomeName')
      .then(($names) => {
        const runNames = $names.toArray().map(el => el.innerText.trim());
  
        // Create descending sorted copy
        const sortedDesc = [...runNames].sort((a, b) => b.localeCompare(a));
  
        // Assert original order matches descending sort
        expect(runNames).to.deep.eq(sortedDesc);
      });
  });

  it("LVH-3457 - Verify total number equals the sum of folders and runs across all pages", () => {
    
    let totalFolders = 0;
    let totalRuns = 0;
  
    const countCurrentPage = () => {
      cy.get('.folderName:visible').then(($folders) => {
        totalFolders += $folders.length;
      });
      cy.get('.runCardHomeName:visible').then(($runs) => {
        totalRuns += $runs.length;
      });
    };
  
    const goThroughPages = () => {
      countCurrentPage();
  
      // Check if Next button exists and is enabled
      cy.get('body').then(($body) => {
        if ($body.find('.pagination-container .arrow.right').length > 0) {
          cy.get('.pagination-container .arrow.right').then(($next) => {
            if (!$next.hasClass('disabled')) {
              cy.wrap($next).first().click();
              cy.wait(500);
              goThroughPages();
            }
          });
        }
      });
    };
  
    // Start counting pages
    goThroughPages();
  
    // Verify total count
    cy.get('.flex-r.g-10.align-center p:nth-child(3)').invoke('text').then((countText) => {
      const displayedCount = parseInt(countText.trim(), 10);
      expect(displayedCount).to.eq(totalFolders + totalRuns);
    });
  });


});
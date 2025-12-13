import CalloutsLocators from "../locators/CalloutsLocators";
import LoginLocators from "../locators/LoginLocators";
import PointLocators from "../locators/PointLocators";
import PoleLocators from "../locators/PoleLocators";
import UserManagementLocators from "../locators/UserManagementLocators";
import Constants from "./Constants";

import { login, LogoutFromUsermanagement } from "./LoginMethods";
import { navigateToUserManagement } from "./NavigationMethods";
import { ZoomIN } from "./PoleMethods";
import MeasurementsLocators from "../locators/MeasurementsLocators";

export const findEmailAndClickSecondIcon = (email) => {
  const searchPage = () => {
    let emailFound = false;

    cy.get("table").should("be.visible");

    cy.get("tr.TData")
      .each(($row, index, $rows) => {
        if (emailFound) return; // Stop further checks if already found

        cy.wrap($row)
          .find("td")
          .eq(1)
          .invoke("text")
          .then((text) => {
            if (text.trim() === email) {
              emailFound = true;
              cy.log(`Found the email: ${email}`);
              cy.wrap($row)
                .find(".iconsContainer .flex-r.pointer")
                .eq(1)
                .click();
            }
          });
      })
      .then(() => {
        if (emailFound) {
          return; // Exit early if found
        }

        // Check if the "next" page button is enabled
        cy.get("ul.pagination-container")
          .find("div.arrow.right")
          .parents("li.pagination-item")
          .then(($nextBtn) => {
            if (!$nextBtn.hasClass("disabled")) {
              cy.wrap($nextBtn).click();
              cy.wait(500); // Adjust this as needed for your table reload
              searchPage(); // Recursive call to search next page
            } else {
              throw new Error(`Email not found: ${email}`);
            }
          });
      });
  };

  searchPage();
};

export const updateUserPermissions = (email, runName, permissionType) => {
  login(Constants.validEmail, Constants.password);
  navigateToUserManagement();

  // Find user and open permissions
  findEmailAndClickSecondIcon(email);

  // Search for the run
  UserManagementLocators.getSearchUserPermissions
    .should("be.visible")
    .clear()
    .type(runName);

  UserManagementLocators.getClickSearchBtnUserPermissions
    .should("be.visible")
    .click();

  // Set permission
  UserManagementLocators.geButtonDropdown.should("be.visible").click();
  cy.get(".dropdown-menu").contains(permissionType).click();

  // Update and confirm
  UserManagementLocators.getClickUpdatebtn.should("be.visible").click();
  UserManagementLocators.getclickconfirmbtn.click();

  // Verify success message
  cy.get("div.info-message-container span.width-100")
    .should("exist")
    .invoke("text")
    .should("contain", "Permissions updated successfully");

  // Logout
  LogoutFromUsermanagement();
};

// Open dynamic folder and run the specified run

export const openDynamicFolderAndRun = (folderNames, runName) => {
  cy.wait(2000);
  folderNames.forEach((folderName) => {
    cy.get(".folderName").contains(folderName).should("be.visible").dblclick();
    cy.wait(2000);
  });

  // Open the specific run inside the last folder
  cy.get('[data-testid="run-card-container"]')
    .contains(runName)
    .should("be.visible")
    .click();
  // cy.log(`Successfully navigated through folders: ${folderNames.join(' > ')} and opened run: ${runName}`);
};

// Point Placement Method

export const PointPlacement = () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  PointLocators.getPointIconFromSideToolbar.click();
  ZoomIN();
  clickAtCoordinates();
};

export const clickAtCoordinates = (x, y) => {
  cy.get("#canvas3D")
    .should("exist")
    .then(($canvas) => {
      const canvasWidth = $canvas[0].width;
      const canvasHeight = $canvas[0].height;

      // UI element sizes to exclude
      const leftToolbarWidth = 119; // Left toolbar width
      const topToolbarHeight = 222; // Top toolbar height
      const rightPanelWidth = 404.987; // Right panel width (Pole Details)
      const rightPanelHeight = 706; // Right panel height (Pole Details)
      const fullScreenIconSize = 25; // Full screen icon (25x25)

      // Check if the given coordinates fall within any excluded UI area
      if (
        // Check if click falls in the left toolbar area
        x < leftToolbarWidth ||
        // Check if click falls in the top toolbar area
        y < topToolbarHeight ||
        // Check if click falls in the right panel area (pole details)
        x > canvasWidth - rightPanelWidth - fullScreenIconSize ||
        y > canvasHeight - rightPanelHeight - fullScreenIconSize
      ) {
        // Log the issue with coordinates
        cy.log(`Invalid click coordinates: (${x}, ${y})`);

        // Fail the test case if the click is outside the available area
        throw new Error(
          `Click coordinates (${x}, ${y}) are not valid. Test failed.`
        );
      }

      // If coordinates are valid, proceed with the click action
      cy.wrap($canvas).click(x, y);
    });
};

export const ClickonPoint = () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  // PointLocators.getPointIconFromSideToolbar.click();
  // ZoomIN();
  clickAtCoordinates();
};

export const CalloutPlacement = () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  CalloutsLocators.getOpencalloutMenuFromMoreOptions.click();
  CalloutsLocators.getCalloutAddIcon.click();
  ZoomIN();
  clickAtCoordinates();
  CalloutsLocators.getCalloutApplyButton.click();
};

export const PolylinePlacement = () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  MeasurementsLocators.getPolylineSelectIcon.click();
  ZoomIN();
  clickAtCoordinates();
  clickAtCoordinates();
};

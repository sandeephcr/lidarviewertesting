import LoginLocators from "../locators/LoginLocators";
import PoleLocators from "../locators/PoleLocators";
import UserManagementLocators from "../locators/UserManagementLocators";
import Constants from "./Constants";

export const SelectAndPlacePole = (x, y) => {
  cy.wait(2000);
  cy.get("#canvas3D").should("exist");
  cy.wait(2000);
  ZoomIN();
  SelectPoleFromNavbar();
  cy.wait(2000);
  clickAndLogCoordinates(x, y); // Step 2: Place the pole at the desired coordinates
  ConfirmPoleDetailsPanle();
};

export const SelectPoleFromNavbar = () => {
  PoleLocators.getSelectPoleFromNavbar.should("be.visible").click();
  // cy.log('Pole Icon selected from tool bar')
};

export const clickAndLogCoordinates = (x = null, y = null) => {
  cy.get("#canvas3D")
    .should("exist")
    .then(($canvas) => {
      const canvasWidth = $canvas[0].width;
      const canvasHeight = $canvas[0].height;

      // UI element sizes to exclude
      const leftToolbarWidth = 119; // Left toolbar width
      const topToolbarHeight = 222; // Top toolbar height
      const rightPanelWidth = 404.987; // Right panel width (Pole Details)
      const fullScreenIconSize = 25; // Full screen icon (25x25)

      // Calculate valid ranges
      const validXMin = leftToolbarWidth;
      const validXMax = canvasWidth - rightPanelWidth - fullScreenIconSize;
      const validYMin = topToolbarHeight;
      const validYMax = canvasHeight - fullScreenIconSize;

      // Check if specific coordinates are provided
      if (x !== null && y !== null) {
        // Validate the provided coordinates
        if (
          x >= validXMin &&
          x <= validXMax &&
          y >= validYMin &&
          y <= validYMax
        ) {
          // If valid, click on the provided coordinates
          cy.wrap($canvas).click(x, y, { force: true });
          cy.log(`Clicked at provided valid coordinates: (${x}, ${y})`);
          return;
        } else {
          cy.log(`Invalid provided coordinates: (${x}, ${y})`);
        }
      }

      // Generate random valid coordinates if provided coordinates are invalid or not given
      const randomX = Math.floor(
        Math.random() * (validXMax - validXMin + 1) + validXMin
      );
      const randomY = Math.floor(
        Math.random() * (validYMax - validYMin + 1) + validYMin
      );

      // Click at the random valid coordinates
      cy.wrap($canvas).click(randomX, randomY, { force: true });
      cy.log(`Clicked at random valid coordinates: (${randomX}, ${randomY})`);
    });
};

export const ConfirmPoleDetailsPanle = () => {
  PoleLocators.getConfirmPoleDetailsPanle.should("have.text", "Pole Details");
};

export const PoleAlldelbtns = () => {
  PoleLocators.getPoleMainDelBtn.should("not.exist");
  cy.wait(2000);
  PoleLocators.getSpanstab.click();
  PoleLocators.getPoleSpanDelBtn.should("not.exist");
  // cy.wait(2000);
  PoleLocators.getPoleWireDelBtn.should("not.exist");
  // cy.wait(2000);
  PoleLocators.getPoleSpanguyDelBtn.should("not.exist");
  // cy.wait(2000);
  PoleLocators.getAnchortab.click();
  PoleLocators.getPoleAnchorDelBtn.should("not.exist");
  // cy.wait(2000);
  PoleLocators.getPoleDownguyDelBtn.should("not.exist");
  //  cy.wait(2000);
  PoleLocators.getEquipmenttab.click();
  //  cy.wait(2000);
  PoleLocators.getPoleEquipmentsDelBtn.should("not.exist");
};

export const ZoomIN = () => {
  const xPosition = 400;
  const yPosition = 300;

  const zoomInAmount = 200; // Adjust this for the zoom level as we need
  for (let i = 0; i < 21; i++)
    cy.get("#canvas3D").trigger("wheel", {
      deltaY: -zoomInAmount, // Negative value zooms in
      clientX: xPosition, // Zoom at the x-coordinate where the element was placed
      clientY: yPosition, // Zoom at the y-coordinate where the element was placed
    });
};

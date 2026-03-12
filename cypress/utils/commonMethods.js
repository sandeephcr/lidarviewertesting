import LidarViewerElements from "../locators/LidarViewer.js";
import PoleLocators from "../locators/PoleLocators";
import UserManagementLocators from "../locators/UserManagementLocators";
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

export const forgotPasswordRequest = (email) => {
  cy.request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/forgotPassword/${email}`,
    failOnStatusCode: false,
  });
};



export const getMeasurement = () => {
  cy.wait(2000);
  let nameInBreadcrumb;
  LidarViewerElements.nameInbreadcrumb.should(
    (name) => (nameInBreadcrumb = name.text())
  );
  LidarViewerElements.nameInbreadcrumb.click();
  cy.get("#canvas3D").should("exist");
  cy.wait(9000);
};

export const getAngle = (item, x, y, x1, y1, x2, y2) => {
  cy.wait(2000);
  let nameInBreadcrumb;
  login(Constants.validEmail, Constants.password);
  cy.get(".folderName").contains("Shared Space").dblclick();
  LidarViewerElements.nameInbreadcrumb.should(
    (name) => (nameInBreadcrumb = name.text())
  );
  LidarViewerElements.nameInbreadcrumb.click();
  cy.wait(5000);
  cy.get(item).click();
  cy.get("#canvas3D").trigger("mousemove", 100, 100);
  cy.get("#canvas3D").click(x, y, { force: true });
  cy.get("#canvas3D").click(x1, y1, { force: true });
  cy.get("#canvas3D").click(x2, y2, { force: true });
};

export const navigateToUserManagement = () => {
  UserManagementLocators.getNavigationMenu.click();
  UserManagementLocators.getAdministrationButton.click();
  UserManagementLocators.getUserManagementMenuButton.click();
};

//Add User

export const addUser = (uname, email, password, confirmPassword) => {
  
  UserManagementLocators.getAddUserIcon.click();
  UserManagementLocators.getUserNameInAddUser.type(uname);
  UserManagementLocators.getUserEmailInAddUser.type(email);
  UserManagementLocators.getUserPasswordInAddUser.type(password);
  UserManagementLocators.getUserConfirmPasswordInAddUser.type(confirmPassword);
  UserManagementLocators.getRegisterButtonInAddUser.click();
};

export const validateAddedUser = (uname, email) => {
  UserManagementLocators.getSearchInUserManagement.type(uname);
  UserManagementLocators.getUsernameSearchResult.should("have.text", email);
};

export const DisableUser = () => {
  navigateToUserManagement();
  UserManagementLocators.getDisableUser.click();
};

export const EnableUser = () => {
  navigateToUserManagement();
  UserManagementLocators.getEnableUser.click();
};

export const getUserPermessionsDialogbox = () => {
  UserManagementLocators.getUserPermessionsDialogbox.click();
};

export const getSelectCheckbox = () => {
  UserManagementLocators.getSelectCheckbox
    .should("be.visible")
    .and("not.be.disabled")
    .check()
    .should("be.checked");
};

export const getClickUpdatebtn = () => {
  UserManagementLocators.getClickUpdatebtn.click();
};

export const clickconfirmbtn = () => {
  UserManagementLocators.getclickconfirmbtn.click();
};

export const VerifyFolderVisibility = () => {
  UserManagementLocators.getVerifyFolderVisibility.should(
    "have.text",
    "Shared Space"
  );
};

export const LogoutFromUsermanagement = () => {
  UserManagementLocators.getNavigationMenuFromUserManagementpage.click({
    force: true,
    timeout: 20000,
  });
  UserManagementLocators.getLogoutOption.click();
  UserManagementLocators.getConfirmLogout.click();
  UserManagementLocators.getConfirmLoginText.should("have.text", "Login");
};

export const SearchUserpermessions = () => {
  UserManagementLocators.getSearchUserpermessions.type(
    "Orbital-21-16482-2"
  );
};

export const clickSearchbtnUserPermessions = () => {
  UserManagementLocators.getclickSearchBtnUSerPermessions.click();
};

export const OpenfolderInUserPermessions = () => {
  // UserManagementLocators.getOpenfolderInUserPermessions.click()
  cy.contains("Shared Space").click();
};

export const OpenReadPermessionRun = () => {
  const folderPath = ['Shared Space', 'Test'];
  const runName = 'feb2025run';
  openDynamicFolderAndRun(folderPath, runName);

};

export const OpenMoreoptionsMenu = () => {
  cy.get(".ToolTip-container").eq(12).click();
};

export const ConfirmSaveOptionnotVisible = () => {
  UserManagementLocators.getConfirmSaveOptionVisible.should(
    "not.contain",
    "Save"
  );
};

export const ReadPermission = () => {
  navigateToUserManagement();
  cy.wait(2000);
  getUserPermessionsDialogbox();

  OpenfolderInUserPermessions();
  UserManagementLocators.getConfirmopenFoldertextInBreadcrumbs.should(
    "have.text",
    "Shared Space"
  );
  UserManagementLocators.getSearchUserpermessions.type("Cy_00101010101010101");
  clickSearchbtnUserPermessions();
  getSelectCheckbox();
  getClickUpdatebtn(); // Make sure the check box is deselected
  cy.wait(2000);
  clickconfirmbtn();
  cy.wait(2000);
  //it logout user fro user management page
  LogoutFromUsermanagement();

  login(Constants.testuserEmail, Constants.testuserPwd);
  OpenReadPermessionRun();
  cy.wait(4000);
  OpenMoreoptionsMenu();
  cy.wait(6000);
  ConfirmSaveOptionnotVisible();
};

export const SelectPoleIcon = () => {
  UserManagementLocators.getSelectPoleIcon.click();
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

export const ConfirmPoleDetailsPanle = () => {
  UserManagementLocators.getConfirmPoleDetailsPanle.should(
    "have.text",
    "Pole Details"
  );
};

export const SelectPoleFromNavbar = () => {
  UserManagementLocators.getSelectPoleFromNavbar.should("be.visible").click();
  // cy.log('Pole Icon selected from tool bar')
};

// It place a pole on the camera screen
export const PolePlacement = () => {
  // OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  SelectPoleFromNavbar();
  ZoomIN();
  generateRandomCoordinates();
};

export const PointPlacement = () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  UserManagementLocators.getPointIconFromSideToolbar.click();
  ZoomIN();
  clickAtCoordinates();
};

export const ClickonPoint= () => {
  //  OpenReadPermessionRun()
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000); // wait untill the PCD gets load completely
  UserManagementLocators.getPointIconFromSideToolbar.click();
  ZoomIN();
  clickAtCoordinates();
};

//Switch to each tab and confirm delete button is not present in pole panel

export const PoleAlldelbtns = () => {
  UserManagementLocators.getPoleMainDelBtn.should("not.exist");
  cy.wait(2000);
  UserManagementLocators.getSpanstab.click();
  UserManagementLocators.getPoleSpanDelBtn.should("not.exist");
  // cy.wait(2000);
  UserManagementLocators.getPoleWireDelBtn.should("not.exist");
  // cy.wait(2000);
  UserManagementLocators.getPoleSpanguyDelBtn.should("not.exist");
  // cy.wait(2000);
  UserManagementLocators.getAnchortab.click();
  UserManagementLocators.getPoleAnchorDelBtn.should("not.exist");
  // cy.wait(2000);
  UserManagementLocators.getPoleDownguyDelBtn.should("not.exist");
  //  cy.wait(2000);
  UserManagementLocators.getEquipmenttab.click();
  //  cy.wait(2000);
  UserManagementLocators.getPoleEquipmentsDelBtn.should("not.exist");
};

export const PoleAllDelBtnsExist = () => {
  // Confirm the main delete button exists
  UserManagementLocators.getPoleDeleteBtn.should("exist");
  cy.wait(2000);

  UserManagementLocators.getSpanstab.click();
  cy.wait(2000);
  UserManagementLocators.getPoleSpanDelBtn.should("be.visible");
  UserManagementLocators.getPoleWireDelBtn
    .scrollIntoView()
    .should("be.visible");
  UserManagementLocators.getPoleSpanguyDelBtn
    .scrollIntoView()
    .should("be.visible");
  UserManagementLocators.getAnchortab.click();
  cy.wait(2000);
  UserManagementLocators.getPoleAnchorDelBtn
    .scrollIntoView()
    .should("be.visible");
  UserManagementLocators.getPoleDownguyDelBtn
    .scrollIntoView()
    .should("be.visible");
  UserManagementLocators.getEquipmenttab.click();
  cy.wait(2000);
  UserManagementLocators.getPoleEquipmentsDelBtn
    .scrollIntoView()
    .should("be.visible");
};

export const SelectallCheckboxes = () => {
  cy.get(".import-options > div").each(($checkbox) => {
    cy.wrap($checkbox).find("span.CheckBox").click({ force: true });
  });
};

export const SelectPointFromToolbar = () => {
  UserManagementLocators.getSelectPointFromToolbar.click();
};


export const ReadAndWriteAccessToRun = () => {
  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
};

export const findEmailAndClickSecondIcon = (email) => {
  const searchPage = () => {
    let emailFound = false;

    cy.get("table").should("be.visible");

    cy.get("tr.TData").each(($row, index, $rows) => {
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
    }).then(() => {
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



export const processUserPermission = (email) => {
  findEmailAndClickSecondIcon(email);



  UserManagementLocators.getSearchUserPermissions
  .should("be.visible")
  .clear()
  .type(runName);

UserManagementLocators.getClickSearchBtnUserPermissions
  .should("be.visible")
  .click();
  cy.get('input[type="checkbox"].form-check-input', { timeout: 10000 })
    .should('be.visible')
    .uncheck({ force: true });

  cy.get('input[type="checkbox"].form-check-input')
    .should('not.be.checked');

    cy.get('.ModalHeaderContainer')
    .find('div')
    .last()
    .click(); // Assumes the close icon is the last div inside the header

  // Wait a bit for modal to fully close before next iteration
  cy.wait(1000);




  // Optional: Close modal or go back
  // cy.get('.close-button').click(); // Update if needed
};


export const assignWriteAccessToUser = (email, runName) => {
  // Step 1: Locate the user by email and open permissions modal
  findEmailAndClickSecondIcon(email);

  // Step 2: Search for the specific run
  UserManagementLocators.getSearchUserPermissions
    .should("be.visible")
    .clear()
    .type(runName);

  UserManagementLocators.getClickSearchBtnUserPermissions
    .should("be.visible")
    .click();

  UserManagementLocators.geButtonDropdown.should("be.visible").click();

  LogoutFromUsermanagement();
};


export const importDataFromServer = (dataType) => {
  // Open the "More Options" menu
  cy.wait(4000);

  cy.get(".ToolTip-container").eq(11).click();

  UserManagementLocators.ClickOnSaveOption.should("be.visible");

  cy.get(".flex-c.gap-0.absolute.MoreOptionDialog").contains("Import").click();
  cy.get(".import-options").contains(dataType).click();
  cy.get(".primary-btn").click();
};


export const ReadAccessToRun = () => {

  login(Constants.validEmail, Constants.password);
  navigateToUserManagement();

  // Open permission dialog
  cy.get("tr.TData")
    .eq(1)
    .find("td .iconsContainer .ToolTip-container")
    .eq(1)
    .click();

  // Search for the specific run
  UserManagementLocators.getSearchUserpermessions
    .type("Orbital-21-16482-2");
  UserManagementLocators.getclickSearchBtnUSerPermessions.click();

  // Check current permission value
  UserManagementLocators.geButtonDropdown
    .invoke("text")
    .then((currentPermission) => {
      const permission = currentPermission.trim();
      cy.log(`Current permission: ${permission}`);

      // Always click Update and Confirm
      if (permission === "Read") {
        cy.log("Already has 'Read' permission. Proceeding to confirm.");
        UserManagementLocators.getClickUpdatebtn.should("be.visible").click();
        UserManagementLocators.getclickconfirmbtn.click();

        // Expect: No changes made
        cy.get("div.info-message-container span.width-100")
          .should("exist")
          .invoke("text")
          .should("eq", "No changes made to permissions.");
      } else {
         
        cy.log("Assigning 'Read' permission.");

        // Uncheck, assign 'Read', update and confirm
        UserManagementLocators.getSelectCheckbox.uncheck();
        UserManagementLocators.geButtonDropdown.click();
        cy.get(".dropdown-menu").contains("Read").click();

        UserManagementLocators.getClickUpdatebtn.should("be.visible").click();
        UserManagementLocators.getclickconfirmbtn.click();

        // Expect: Permissions updated
        cy.get("div.info-message-container span.width-100")
          .should("exist")
          .invoke("text")
          .should("eq", "Permissions updated successfully");
      }
    });

  // Logout
  LogoutFromUsermanagement();
};


export const SavePoleData = () => {
  OpenMoreoptionsMenu();
  UserManagementLocators.ClickOnSaveOption.click();
  UserManagementLocators.SelectPoleCheckBoxInSave.click();
  UserManagementLocators.ClickSavebtnInSaveDialogbox.click();
   PoleLocators.getPolesaveMessage.should(
        "contain",
        "Pole saved successfully")
};

export const ImportPoleData = () => {

  OpenMoreoptionsMenu();
  UserManagementLocators.ImportPoleData.should("be.visible")
    .and("contain", "Import")
    .click();
  UserManagementLocators.SelectPoleOption.click();
  cy.wait(2000);
  UserManagementLocators.ClickApplyBtnInImportDialog.click();

};

export const typeInField = (locator, Constants) => {
  // Directly use the testData parameter passed to the function
  locator.type(Constants);
};

export const saveAndVerifyPoleData = (fieldLocator, fieldValue) => {

    SavePoleData();
    cy.reload();
    cy.wait(4000);
    ImportPoleData();
    // PoleLocators.PoleIcon.click()
};

export const placeRandomPoleAttachment = () => {
  cy.get("#canvas3D").then(($canvas) => {
    const canvasWidth = $canvas[0].width; // Accessing the native canvas width
    const canvasHeight = $canvas[0].height; // Accessing the native canvas height
    // Log the canvas dimensions
    cy.log(`Canvas Width: ${canvasWidth}, Canvas Height: ${canvasHeight}`);

    // Number of random pole attachments to place
    const numberOfAttachments = 1;
    for (let i = 0; i < numberOfAttachments; i++) {
      const x = Math.floor(Math.random() * canvasWidth);
      const y = Math.floor(Math.random() * canvasHeight);
      // Log the random coordinates
      cy.log(
        `Placing pole attachment at Coordinate ${i + 1}: X = ${x}, Y = ${y}`
      );
      //   cy.get(PoleLocators.PoleTipHeight).should('be.visible').click();
      PoleLocators.PoleTipHeight.click();
      cy.wrap($canvas).dblclick(x, y);
      cy.log(
        `Pole attachment placed at Coordinate ${i + 1}: X = ${x}, Y = ${y}`
      );
      cy.wait(500);
    }
  });
};

export const LogoutFromProjectPage = () => {
  PoleLocators.getProfileMenu.click();
  PoleLocators.ClickOnLogout.click();
  PoleLocators.getApplyBtn.click();
};


export const generateRandomCoordinates = (numClicks = 100) => {
  cy.get("#canvas3D")
    .should("exist")
    .then(($canvas) => {
      const canvasWidth = $canvas[0].width;
      const canvasHeight = $canvas[0].height;

      const leftToolbarWidth = 119; // Left toolbar width
      const topToolbarHeight = 222; // Top toolbar height
      const rightPanelWidth = 404.987; // Right panel width (Pole Details)
      const rightPanelHeight = 706; // Right panel height (Pole Details)
      const fullScreenIconSize = 25; // Full screen icon (25x25)

      for (let i = 0; i < numClicks; i++) {
        const randomX = Math.floor(
          Math.random() * (canvasWidth - leftToolbarWidth - rightPanelWidth - fullScreenIconSize) +
            leftToolbarWidth
        );

        const randomY = Math.floor(
          Math.random() * (canvasHeight - topToolbarHeight - rightPanelHeight - fullScreenIconSize) +
            topToolbarHeight
        );

        // Directly log the coordinates inside the chain for better alignment with click
        cy.log(`Generated random click coordinates #${i + 1}: (${randomX}, ${randomY})`);

        // Click at the calculated coordinates after the log
        cy.get("#canvas3D").click(randomX, randomY).then(() => {
          cy.log(`Clicked at coordinates: (${randomX}, ${randomY})`);
        });
      }
    });
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
        throw new Error(`Click coordinates (${x}, ${y}) are not valid. Test failed.`);
      }

      // If coordinates are valid, proceed with the click action
      cy.wrap($canvas).click(x, y);
    });
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
        if (x >= validXMin && x <= validXMax && y >= validYMin && y <= validYMax) {
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

export const panCameraDown = (startX, startY, distance = 100) => {
  cy.get("#canvas3D")
    .should("exist")
    .then(($canvas) => {
      const canvas = $canvas[0];
      const canvasRect = canvas.getBoundingClientRect();

      const canvasOffsetX = canvasRect.left;
      const canvasOffsetY = canvasRect.top;

      const adjustedStartX = canvasOffsetX + startX;
      const adjustedStartY = canvasOffsetY + startY;
      const adjustedEndY = adjustedStartY + distance;

      cy.wrap($canvas)
        .trigger("mousedown", {
          button: 0,
          clientX: adjustedStartX,
          clientY: adjustedStartY,
          force: true
        })
        .trigger("mousemove", {
          clientX: adjustedStartX,
          clientY: adjustedEndY,
          force: true
        })
        .trigger("mouseup", { force: true });

      cy.log(`Panned camera down from Y: ${adjustedStartY} to Y: ${adjustedEndY}`);
    });
};

export const SelectAndPlacePole = (x, y) => {

  cy.wait(2000)
  cy.get("#canvas3D").should("exist");
  cy.wait(2000);
  ZoomIN();
  SelectPoleFromNavbar();
  cy.wait(2000);
  clickAndLogCoordinates(x, y); // Step 2: Place the pole at the desired coordinates
  ConfirmPoleDetailsPanle();

};

export const SelectAndPlacePoint = (x, y) => {
  //  cy.wait(4000)
  cy.get("#canvas3D").should("exist");
  cy.wait(4000);
  ZoomIN();
  UserManagementLocators.getSelectPointFromToolbar.click();
  clickAtCoordinates(x, y); // Step 2: Place the pole at the desired coordinates
};

export const confirmTextInTextField = (selectorKey, expectedTextKey) => {
  // Dynamically access the selector and expected text from the passed keys
  const selector = PoleLocators[selectorKey]; // Get the selector dynamically
  const expectedText = Constants[expectedTextKey]; // Get the expected text dynamicall

  // PoleLocators.FieldingStatus.click()
  cy.get(PoleLocators.FieldingStatus).should("have.value", expectedText);
};

export const TriggerPole = (x, y) => {
  cy.wait(4000);
  cy.get("#canvas3D").should("exist");
  cy.wait(4000);
  ZoomIN();
  cy.wait(4000);
  clickAndLogCoordinates(x, y); 
  ConfirmPoleDetailsPanle();

};


export const openDynamicFolderAndRun = (folderNames, runName) => {
  cy.wait(2000);
  folderNames.forEach((folderName) => {
    cy.get(".folderName").contains(folderName).should("be.visible").dblclick();
    cy.wait(2000);
  });

  // Open the specific run inside the last folder
  cy.get('[data-testid="run-card-container"]') // Locate the run container
    .children()
    .contains(runName) // Match the run name dynamically
    .should("be.visible") // Ensure the run is visible
    .click(); // Open the run

};

export const SavePointData = () => {
  UserManagementLocators.getOpenMoreOptionsMenu.click();
  UserManagementLocators.getConfirmSaveOptionVisible.click();
  cy.get(".import-options").contains("Point features").click();
  cy.get(".primary-btn").click();
};

export const selectCheckboxByName = (checkboxName) => {
  UserManagementLocators.getOpenMoreOptionsMenu.click();
  UserManagementLocators.getConfirmSaveOptionVisible.click();
  cy.get(
    "#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > div"
  )
    .contains(checkboxName) // Locate the checkbox by its name
    .should("be.visible") // Ensure the checkbox is visible
    .click(); // Click the checkbox
};

export const updateUserPermissions = (email, runName, permissionType) => {
  loginToPortal(Constants.validEmail, Constants.password);
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
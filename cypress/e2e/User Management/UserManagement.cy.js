import { Adminlogin } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants/userManagement.js";
import "../../support/commands.js"
import { verifySorted } from "../../utils/Common_Methods/userManagement.js";

describe('User Management Module', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
    });

    it('LVH-3508 - Verify that the search, edit, disable/enable, and register functionalities are loaded and displayed correctly when the user management tab is clicked', () => {

        const TEST_USERNAME = Constants.UserManagementTestUser;

        // 1. Verify Search panel
        LidarViewer.getSearchInput
          .should('be.visible');
      
        // 2. Verify Register New User button
        LidarViewer.getAddUserButton
          .should('be.visible')
      
        // Search the user
        LidarViewer.getSearchInput.clear().type(TEST_USERNAME);
        LidarViewer.getUserRows.contains('td', TEST_USERNAME).should('exist');
    
        // Step 2: Disable the user
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .then((row) => {
                cy.get('td:last-child svg').first().should('be.visible');
                const $row = cy.wrap(row);
                LidarViewer.getDisableButton($row).should('be.visible');
            });
      
    });

    it('LVH-3510 - Verify that clicking on the "Register New User" icon navigates to the user registration page and display user registration form', () => {

        // Step 1: Click Register New User
        LidarViewer.getAddUserButton
          .should('be.visible')
          .click();
      
        // Step 2: Verify registration form is displayed
        LidarViewer.getHeader
          .should('be.visible');
      
        // Step 3: Verify key fields are present
        LidarViewer.getUsernameInput
          .should('be.visible');
      
        LidarViewer.getEmailInput
          .should('be.visible');
      
        LidarViewer.getPasswordInput
          .should('be.visible');
      
        LidarViewer.getConfirmPasswordInput
          .should('be.visible');
      
        LidarViewer.getDesignationDropdown()
          .should('be.visible');
      
        LidarViewer.getSitesDropdown
          .should('be.visible');
      
        // Step 4: Verify Register button exists
        LidarViewer.getRegisterButton
          .should('be.visible');
      
    });

    it('LVH-3511 - Verify that the functionality of creating a new user with valid credentials', () => {
        
        LidarViewer.getAddUserButton.click();
        const username=`hcr${Date.now()}`;
        const mail=`hcr${Date.now()}@hcrobotics.com`;
        // Fill out the user registration form
        LidarViewer.getUsernameInput.type(username);
        LidarViewer.getEmailInput.type(mail);
        LidarViewer.getDesignationDropdown().select('Design Engineer');  // example role

        LidarViewer.getSitesDropdown.click();
        cy.wait(200); 
        cy.get('body') 
            .contains('Select All') 
            .click({ force: true });
        LidarViewer.getSitesDropdown.click();

        // Enter password and confirm password
        LidarViewer.getPasswordInput.type('Cnsw-123');
        LidarViewer.getConfirmPasswordInput.type('Cnsw-123');

        // Check Mail Required
        LidarViewer.getMailRequiredCheckbox.click();

        // Click Register
        LidarViewer.getRegisterButton.click();

        // Validate the success message in info container
        LidarViewer.infoMessageContainer.should('contain', 'User created').and('be.visible');

        LidarViewer.getSearchInput.clear().type(username);
        cy.get('table').contains('td', mail).should('exist');

    });

    it('LVH-3512 - Verify the functionality of displaying an error message when the "Confirm Password" does not match the "Password" field', () => {

        const timestamp = Date.now();
        const username = `hcr${timestamp}`;
        const mail = `hcr${timestamp}@hcrobotics.com`;
      
        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton.click();
      
        // Step 2: Fill valid details
        LidarViewer.getUsernameInput.type(username);
        LidarViewer.getEmailInput.type(mail);
        LidarViewer.getDesignationDropdown().select('Design Engineer');
      
        // Step 3: Select sites
        LidarViewer.getSitesDropdown.click();
        cy.contains('Select All').should('be.visible').click({ force: true });
        LidarViewer.getSitesDropdown.click();
      
        // Step 4: Enter mismatched passwords
        LidarViewer.getPasswordInput.type('Cnsw-123');
        LidarViewer.getConfirmPasswordInput.type('Cnsw-999'); // mismatch
      
        // Step 5: Click Register
        LidarViewer.getRegisterButton.click();
      
        // Step 6: Verify error message
        cy.contains(/doesn't match/i)
          .should('be.visible')
          .and('have.css', 'color', 'rgb(222, 55, 54)');
      
    });

    it('LVH-3513 - Verify that the application displays an error message when the dot symbol is missed in email', () => {

        const timestamp = Date.now();
        const username = `hcr${timestamp}`;
        const invalidEmail = `hcr${timestamp}@hcrobocom`;
      
        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton.click();
      
        // Step 2: Fill valid fields except email
        LidarViewer.getUsernameInput.type(username);
        LidarViewer.getEmailInput.type(invalidEmail);
        LidarViewer.getDesignationDropdown().select('Design Engineer');
      
        // Step 3: Select sites
        LidarViewer.getSitesDropdown.click();
        cy.contains('Select All').click({ force: true });
        LidarViewer.getSitesDropdown.click();
      
        // Step 4: Enter valid password
        LidarViewer.getPasswordInput.type('Cnsw-123');
        LidarViewer.getConfirmPasswordInput.type('Cnsw-123');
      
        // Step 5: Submit form
        LidarViewer.getRegisterButton.click();
      
        // Step 6: Validate email field shows error
        cy.contains(/invalid email/i)
          .should('be.visible')
          .and('have.css', 'color', 'rgb(222, 55, 54)'); 
      
    });

    it('LVH-3515 - Verify that the application displays an error message when the email field is left empty', () => {

        const timestamp = Date.now();
        const username = `hcr${timestamp}`;
      
        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton.click();
      
        LidarViewer.getUsernameInput.type(username);
      
        LidarViewer.getDesignationDropdown().select('Design Engineer');
      
        LidarViewer.getSitesDropdown.click();
        cy.contains('Select All').click({ force: true });
        LidarViewer.getSitesDropdown.click();
      
        // Step 4: Enter valid password
        LidarViewer.getPasswordInput.type('Cnsw-123');
        LidarViewer.getConfirmPasswordInput.type('Cnsw-123');
      
        // Step 5: Submit form
        LidarViewer.getRegisterButton.click();
      
        cy.contains(/invalid email/i)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(222, 55, 54)'); 
      
        cy.get('.info-message-container')
        .should('be.visible')
        .and('contain.text', 'Email is required');
      
    });

    it('LVH-3516 - Verify that the application displays an error message when an email address that already exists is entered', () => {

        const timestamp = Date.now();
        const username = `hcr${timestamp}`;
      
        // Step 1: Get an existing email from table
        cy.get('table tbody tr')
          .first()
          .find('td')
          .eq(1) // email column
          .invoke('text')
          .then((existingEmail) => {
      
            // Step 2: Open Add User modal
            LidarViewer.getAddUserButton.click();
      
            // Step 3: Fill form with existing email
            LidarViewer.getUsernameInput.type(username);
            LidarViewer.getEmailInput.type(existingEmail.trim());
            LidarViewer.getDesignationDropdown().select('Design Engineer');
      
            // Step 4: Select sites
            LidarViewer.getSitesDropdown.click();
            cy.contains('Select All').click({ force: true });
            LidarViewer.getSitesDropdown.click();
      
            // Step 5: Enter valid password
            LidarViewer.getPasswordInput.type('Cnsw-123');
            LidarViewer.getConfirmPasswordInput.type('Cnsw-123');
      
            // Step 6: Submit form
            LidarViewer.getRegisterButton.click();
      
            // Step 7: Validate error message
            cy.get('.info-message-container')
              .should('be.visible')
              .and('contain.text', 'already registered');
      
          });
      
    });

    it('LVH-3518 - Verify that the application handles email addresses in a case-insensitive manner and does not treat differently cased versions of the same email as distinct', () => {

        cy.get('table tbody tr')
        .first()
        .find('td')       // all cells in the row
        .eq(1)           // assuming email is in the second column; adjust if needed
        .invoke('text')
        .then((existingEmail) => {
          const uppercaseEmail = existingEmail.toUpperCase();// convert to uppercase
    
            // Step 3: Fill in the Add User form
            LidarViewer.getAddUserButton.click();
            LidarViewer.getUsernameInput.type(`TestUser${Date.now()}`); // unique username
            LidarViewer.getEmailInput.type(uppercaseEmail);
            LidarViewer.getDesignationDropdown().select('Design Engineer');  // example role

            LidarViewer.getSitesDropdown.click();
            cy.wait(200); 
            cy.get('body') // search globally, since rmsc may render outside dropdown container
                .contains('Select All') // find the item with text "Select All"
                .click({ force: true });
            LidarViewer.getSitesDropdown.click();
    
            // Enter password and confirm password
            LidarViewer.getPasswordInput.type('Cnsw-123');
            LidarViewer.getConfirmPasswordInput.type('Cnsw-123');
    
            // Check Mail Required
            LidarViewer.getMailRequiredCheckbox.click();
    
            // Step 4: Submit the form
            LidarViewer.getRegisterButton.click();
    
            // Step 5: Verify info message container
            LidarViewer.infoMessageContainer
                .should('be.visible')
                .and('contain.text', 'Email already registered');
          });
    });

    it('LVH-3519 - Verify the functionality of toggle buttons in the password and confirm password input fields', () => {

        const password = 'Cnsw-123';
      
        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton.click();
      
        // Step 2: Enter password and confirm password
        LidarViewer.getPasswordInput.type(password);
        LidarViewer.getConfirmPasswordInput.type(password);
      
        // Step 3: Toggle password visibility
        LidarViewer.getPasswordInput
            .parent()
            .find('img[alt="IconView"]')
            .click();
      
        // Verify password is visible (type = text)
        LidarViewer.getPasswordInput
          .should('have.attr', 'type', 'text');
      
        // Step 4: Toggle back
        LidarViewer.getPasswordInput
            .parent()
            .find('img[alt="IconView"]')
            .click();
      
        // Verify password is hidden (type = password)
        LidarViewer.getPasswordInput
          .should('have.attr', 'type', 'password');
      
        // Step 5: Repeat for confirm password
        LidarViewer.getConfirmPasswordInput
            .parent()
            .find('img[alt="View"]')
            .click();
      
        LidarViewer.getConfirmPasswordInput
          .should('have.attr', 'type', 'text');
      
        LidarViewer.getConfirmPasswordInput
          .parent()
          .find('img[alt="View"]')
          .click();
      
        LidarViewer.getConfirmPasswordInput
          .should('have.attr', 'type', 'password');
      
    });

    it("LVH-3520 - Verify that the search bar remains fixed and visible during vertical scrolling", () => {
        // Step 1: Reduce viewport to force scroll
        cy.viewport(1280, 500);

        // Step 2: Capture initial position
        LidarViewer.getSearchInput
        .should('be.visible')
        .then(($el) => {

            const initialTop = $el[0].getBoundingClientRect().top;

            // Step 3: Scroll the correct container
            cy.get('.userTable.scroll')
            .scrollTo('bottom');

            // Step 4: Verify position unchanged
            LidarViewer.getSearchInput
            .should('be.visible')
            .then(($elAfter) => {

                const afterTop = $elAfter[0].getBoundingClientRect().top;

                expect(afterTop).to.eq(initialTop);

            });

        });
    });

    it('LVH-3521 - Verify that clicking the back button on the user registration page navigates the user back to the User Management section', () => {

        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton
          .should('be.visible')
          .click();
      
        // Step 2: Verify modal is open
        LidarViewer.getHeader
        .should('be.visible');
      
        cy.get('img[alt="leftArrow"]')
        .should('be.visible')
        .click();

        LidarViewer.getHeader
        .should('not.exist');
      
        // Step 5: Verify User Management page is visible again
        LidarViewer.getSearchInput
          .should('be.visible');
      
        cy.get('table')
          .should('be.visible');
        
        LidarViewer.getAddUserButton
          .should('be.visible')
      
    });

    it('LVH-3522 - Verify that a network error message is displayed when attempting to register a user during a network failure', () => {

        const timestamp = Date.now();
        const username = `hcr${timestamp}`;
        const email = `hcr${timestamp}@hcrobotics.com`;
      
        // Step 1: Open Add User modal
        LidarViewer.getAddUserButton.click();
      
        // Step 2: Fill valid details
        LidarViewer.getUsernameInput.type(username);
        LidarViewer.getEmailInput.type(email);
        LidarViewer.getDesignationDropdown().select('Design Engineer');
      
        LidarViewer.getSitesDropdown.click();
        cy.contains('Select All').click({ force: true });
        LidarViewer.getSitesDropdown.click();
      
        LidarViewer.getPasswordInput.type('Cnsw-123');
        LidarViewer.getConfirmPasswordInput.type('Cnsw-123');
      
        // Step 3: Simulate network failure
        cy.simulateOffline();
      
        // Step 4: Click Register
        LidarViewer.getRegisterButton.click();
        cy.contains('Network Error').should('be.visible');
      
        // Step 6: Restore network
        cy.simulateOnline();
      
    });

    it('LVH-3523 - Verify that a network error message is displayed when the back button is clicked during a network failure on the user registration page', () => {

        // Step 1: Open Add User modal/page
        LidarViewer.getAddUserButton.click();
      
        // Step 2: Ensure page is visible
        LidarViewer.getHeader
        .should('be.visible');
      
        // Step 3: Simulate offline
        cy.simulateOffline();
      
        // Step 4: Click Back button
        cy.get('img[alt="leftArrow"]')
          .should('be.visible')
          .click();
      
        // Step 5: Validate network error message (robust way)
        cy.contains('Network Error', { timeout: 5000 })
          .should('be.visible');
      
        // Step 6: Restore network
        cy.simulateOnline();
      
    });

    it('LVH-3524 - Verify that when an admin updates a users password, a notification email is sent to the user', () => {

        const TEST_USERNAME = Constants.UserManagementTestUser;
        const NEW_PASSWORD = Constants.UserManagementTestPassword;
        // Step 1: Search the user in the table
        LidarViewer.getSearchInput.clear().type(TEST_USERNAME);
        LidarViewer.getUserRows.contains('td', TEST_USERNAME).should('exist');
    
        // Step 2: Click Edit for the user
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .within(() => {
                // Click the first "Edit" button in Actions
                cy.get('td:last-child svg').first().click();
            });
    
        // Step 3: Click "Change Password"
        LidarViewer.getChangePasswordToggle.click();
    
        // Step 4: Enter new password and confirm
        LidarViewer.getNewPasswordInputUM.clear().type(NEW_PASSWORD);
        LidarViewer.getConfirmPasswordInputUM.clear().type(NEW_PASSWORD);
    
        // Step 5: Save password
        LidarViewer.getSavePasswordButton.click();
    
        // Step 6: Validate success message using LidarViewer.infoMessageContainer
        LidarViewer.infoMessageContainer
            .should('be.visible')
            .and('contain.text', 'password updated successfully');
    });

    it('LVH-3525 - Verify the functionality of editing user details such as username and role by an admin', () => {

        const ORIGINAL_USERNAME = "2TestUser";
        const UPDATED_USERNAME = `updated${Date.now()}`;
      
        // Step 1: Search user
        LidarViewer.getSearchInput.clear().type(ORIGINAL_USERNAME);
        LidarViewer.getUserRows.contains('td', ORIGINAL_USERNAME).should('exist');
      
        // Step 2: Click Edit
        LidarViewer.getUserRows.contains('td', ORIGINAL_USERNAME)
          .parent('tr')
          .within(() => {
            cy.get('td:last-child svg').first().click();
          });
      
        // Step 3: Update username
        LidarViewer.getUsernameInput.clear().type(UPDATED_USERNAME);
      
        // Step 4: Update role/designation
        LidarViewer.getDesignationDropdown().select('Client');
      
        // Step 5: Save changes
       cy.get('button.primary-btn').contains('Update').should('be.visible').click();
        // Step 6: Verify success message
        LidarViewer.infoMessageContainer
          .should('be.visible')
          .and('contain.text', 'updated'); // adjust message
      
        // Step 7: Verify updated data in table
        LidarViewer.getSearchInput.clear().type(UPDATED_USERNAME);
        cy.get('table').contains('td', UPDATED_USERNAME).should('exist');

        // Step 8: Revert changes
        LidarViewer.getSearchInput.clear().type(UPDATED_USERNAME);
        LidarViewer.getUserRows.contains('td', UPDATED_USERNAME)
          .parent('tr')
          .within(() => {
            cy.get('td:last-child svg').first().click();
          });

      
        LidarViewer.getUsernameInput.clear().type(ORIGINAL_USERNAME);

        LidarViewer.getDesignationDropdown().select('Design Engineer'); 

        cy.get('button.primary-btn').contains('Update').should('be.visible').click();

        LidarViewer.infoMessageContainer
          .should('contain.text', 'updated');
      
    });

    it('LVH-3526 - Verify the systems behavior when the network is down during the process of clicking update button', () => {

      const USER = Constants.UserManagementTestUser;
    
      // Step 1: Search and open user for edit
      LidarViewer.getSearchInput.clear().type(USER);
    
      LidarViewer.getUserRows.contains('td', USER)
        .should('exist')
        .parent('tr')
        .within(() => {
          cy.get('td:last-child svg').first().click();
        });
    
      // Step 2: Ensure edit form is visible
      LidarViewer.getUsernameInput.should('be.visible');
    
      // Step 3: Simulate network failure
      cy.simulateOffline();
    
      // Step 4: Click Update
      cy.contains('button', 'Update')
        .should('be.visible')
        .click();
    
      // Step 5: Validate network error message
      cy.contains('check internet', { timeout: 5000 })
        .should('be.visible');
    
      // Step 6: Restore network
      cy.simulateOnline();
    
    });

    it('LVH-3527 -Verify that appropriate error message displayed if the entered password dosent match with confirm password', () => {

      const TEST_USERNAME = Constants.UserManagementTestUser;
      const NEW_PASSWORD = Constants.UserManagementTestPassword;
      // Step 1: Search the user in the table
      LidarViewer.getSearchInput.clear().type(TEST_USERNAME);
      LidarViewer.getUserRows.contains('td', TEST_USERNAME).should('exist');
  
      // Step 2: Click Edit for the user
      LidarViewer.getUserRows.contains('td', TEST_USERNAME)
          .parent('tr')
          .within(() => {
              // Click the first "Edit" button in Actions
              cy.get('td:last-child svg').first().click();
          });
  
      // Step 3: Click "Change Password"
      LidarViewer.getChangePasswordToggle.click();
  
      // Step 4: Enter new password and confirm
      LidarViewer.getNewPasswordInputUM.clear().type(NEW_PASSWORD);
      LidarViewer.getConfirmPasswordInputUM.clear().type("Cnsw-999");
  
      // Step 5: Save password
      LidarViewer.getSavePasswordButton.click();
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contain("do not match");
      });
    });

    it('LVH-3528 - Verify that functionality of enabling and disabling user accounts by an admin', () => {

        const TEST_USERNAME = Constants.UserManagementTestUser;
    
        // Step 1: Search the user
        LidarViewer.getSearchInput.clear().type(TEST_USERNAME);
        LidarViewer.getUserRows.contains('td', TEST_USERNAME).should('exist');
    
        // Step 2: Disable the user
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getDisableButton($row).click();
            });
    
        // Step 3: Wait for Enable button to appear (re-query row)
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
    
                LidarViewer.getEnableButton($row)
                    .should('be.visible')
                    .and('contain.text', 'Enable');
            });
    
        // Step 4: Click Enable
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
                LidarViewer.getEnableButton($row).click();
            });
    
        // Step 5: Verify Disable appears again
        LidarViewer.getUserRows.contains('td', TEST_USERNAME)
            .parent('tr')
            .then((row) => {
                const $row = cy.wrap(row);
    
                LidarViewer.getDisableButton($row)
                    .should('be.visible')
                    .and('contain.text', 'Disable');
            });
    
    });

    it('LVH-3529 - Verify that the Enable/Disable icon does not appear for admin users', () => {

      const ADMIN_USER = Constants.AdminEmail;
    
      // Step 1: Search for admin user
      LidarViewer.getSearchInput.clear().type(ADMIN_USER);
    
      // Step 2: Locate admin row
      LidarViewer.getUserRows.contains('td', ADMIN_USER)
        .should('exist')
        .parent('tr')
        .within(() => {
    
          // Step 3: Verify Disable button NOT present
          cy.get('.ToolTip-container:contains("Disable")').should('not.exist');
    
          // Step 4: Verify Enable button NOT present
          cy.get('svg[style*="var(--status-green)"]').should('not.exist');
    
        });
    
    });

    it('LVH-3530 - Verify the systems behavior when the network is down during the process of enabling or disabling a user account', () => {

      const TEST_USERNAME = Constants.UserManagementTestUser;
      let initialState; // 'enable' or 'disable'
    
      // Step 1: Search user
      LidarViewer.getSearchInput.clear().type(TEST_USERNAME);
      LidarViewer.getUserRows.contains('td', TEST_USERNAME).should('exist');
    
      // Step 2: Capture initial state
      LidarViewer.getUserRows.contains('td', TEST_USERNAME)
        .parent('tr')
        .then((row) => {
          const $row = cy.wrap(row);
    
          // Check which button is present
          $row.then(($el) => {
            if ($el.find('.ToolTip-container:contains("Disable")').length > 0) {
              initialState = 'disable';
            } else {
              initialState = 'enable';
            }
          });
        });
    
      // Step 3: Simulate offline
      cy.simulateOffline();
    
      // Step 4: Attempt action based on state
      LidarViewer.getUserRows.contains('td', TEST_USERNAME)
        .parent('tr')
        .then((row) => {
          const $row = cy.wrap(row);
    
          if (initialState === 'disable') {
            LidarViewer.getDisableButton($row).click();
          } else {
            LidarViewer.getEnableButton($row).click();
          }
        });
    
      // Step 5: Validate network error
      cy.contains('Network Error', { timeout: 5000 })
        .should('be.visible');
    
      // Step 6: Verify state is unchanged
      LidarViewer.getUserRows.contains('td', TEST_USERNAME)
        .parent('tr')
        .then((row) => {
          const $row = cy.wrap(row);
    
          if (initialState === 'disable') {
            LidarViewer.getDisableButton($row).should('be.visible');
          } else {
            LidarViewer.getEnableButton($row).should('be.visible');
          }
        });
    
      // Step 7: Restore network
      cy.simulateOnline();
    
    });

    it('LVH-3531 - Verify the functionality of the search operation within the manage users panel', () => {

      const EMAIL = Constants.UserManagementTestUser;
    
      // Step 1: Search by Email
      LidarViewer.getSearchInput.clear().type(EMAIL);
    
      // Verify relevant result appears
      LidarViewer.getUserRows.contains('td', EMAIL)
        .should('be.visible');

    });

    it('LVH-3532 - Verify that the email, username and role columns in the Manage Users panel can be sorted in ascending and descending order', () => {

      // -------- EMAIL --------
      cy.contains('th', 'Email').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(2)', 'desc');
    
      cy.contains('th', 'Email').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(2)', 'asc');
    
      // -------- USERNAME --------
      cy.contains('th', 'Username').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(3)', 'desc');
    
      cy.contains('th', 'Username').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(3)', 'asc');
    
      // -------- ROLE --------
      cy.contains('th', 'Role').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(4)', 'desc');
    
      cy.contains('th', 'Role').find('.sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(4)', 'asc');
    
    });

    it('LVH-3533 - Verify that the search results in the manage users panel can be sorted by email, username, and role in ascending and descending order', () => {
    
      // Step 1: Search
      LidarViewer.getSearchInput.clear().type("Test");
    
      // Ensure results are loaded
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
      // ---------------- EMAIL ----------------
    
      // First click → DESC
      cy.get('th.col-email .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(2)', 'desc');
    
      // Second click → ASC
      cy.get('th.col-email .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(2)', 'asc');
    
      // ---------------- USERNAME ----------------
    
      // First click → DESC
      cy.get('th.col-username .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(3)', 'desc');
    
      // Second click → ASC
      cy.get('th.col-username .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(3)', 'asc');
    
      // ---------------- ROLE ----------------
    
      // First click → DESC
      cy.get('th.col-role .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(4)', 'desc');
    
      // Second click → ASC
      cy.get('th.col-role .sortIcon').click({ force: true });
      verifySorted('table tbody tr td:nth-child(4)', 'asc');
    
    });

    it('LVH-3534 - Verify that pagination behavior after removing user from search results', () => {

      let initialPageInfo;
    
      // Step 1: Capture initial pagination state
      cy.get('.pagination-container')
        .first()
        .invoke('text')
        .then((text) => {
          initialPageInfo = text.trim();
        });
    
      // Step 2: Perform search
      
      LidarViewer.getSearchInput.clear().type("Testing");
    
      // Wait for filtered results
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
      // Step 3: Capture pagination after search (should likely change)
      cy.get('.pagination-container')
        .first()
        .invoke('text')
        .then((searchPageInfo) => {
    
          // Optional: ensure it actually changed
          expect(searchPageInfo.trim()).to.not.eq(initialPageInfo);
        });
    
      // Step 4: Clear search
      LidarViewer.getSearchInput.clear();
    
      // Wait for original list to reload
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
      // Step 5: Verify pagination resets
      cy.get('.pagination-container')
        .first()
        .invoke('text')
        .should((finalText) => {
          expect(finalText.trim()).to.eq(initialPageInfo);
        });
    
    });

    it('LVH-3535 - Verify the responsiveness of the manage users page across different screen sizes and devices', () => {

      const viewports = [
        [1920, 1080], // Desktop
        [1366, 768],  // Laptop
        [768, 1024],  // Tablet
      ];
    
      viewports.forEach((size) => {
    
        cy.viewport(size[0], size[1]);
    
        // Step 1: Verify main components are visible
        LidarViewer.getSearchInput.should('be.visible');
        LidarViewer.getAddUserButton.should('be.visible');
        cy.get('table').should('be.visible');
    
        // Step 2: Verify table headers exist
        cy.get('th.col-email').should('be.visible');
        cy.get('th.col-username').should('be.visible');
        cy.get('th.col-role').should('be.visible');
    
        // Step 3: Verify search works
        const SEARCH_TERM = Constants.UserManagementTestUser;
        LidarViewer.getSearchInput.clear().type(SEARCH_TERM);
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
    
        // Step 4: Verify sorting works (just one column is enough here)
        cy.get('th.col-email .sortIcon').click({ force: true });
        verifySorted('table tbody tr td:nth-child(2)', 'desc');
    
        cy.get('th.col-email .sortIcon').click({ force: true });
        verifySorted('table tbody tr td:nth-child(2)', 'asc');
    
        // Step 5: Verify enable/disable button exists for a row
        LidarViewer.getUserRows.first().then((row) => {
          const $row = cy.wrap(row);
        
          LidarViewer.getDisableButton($row).then(($disable) => {
            if ($disable.length > 0) {
              expect($disable).to.exist;
            } else {
              LidarViewer.getEnableButton($row).should('exist');
            }
          });
        });
        // Step 6: Reset search for next viewport
        LidarViewer.getSearchInput.clear();
    
      });
    
    });


});
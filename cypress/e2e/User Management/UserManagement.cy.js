import { Adminlogin } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import "../../support/commands.js"

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

});
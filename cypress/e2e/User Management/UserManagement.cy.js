import { addUser,Adminlogin,validateAddedUser } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import UserManagementLocatos from "../../locators/UserManagementLocators.js"
import Constants from "../../utils/Constants";

describe('UserManagement', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getUserManagementOption.click();
    });

    it('User Management_001 - Verify that the functionality of creating a new user with valid credentials', () => {
        
        LidarViewer.getAddUserButton.click();
        const username=`hcr${Date.now()}`;
        const mail=`hcr${Date.now()}@hcrobotics.com`;
        // Fill out the user registration form
        LidarViewer.getUsernameInput.type(username);
        LidarViewer.getEmailInput.type(mail);
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

        // Click Register
        LidarViewer.getRegisterButton.click();

        // Validate the success message in info container
        LidarViewer.infoMessageContainer.should('contain', 'User created').and('be.visible');

        LidarViewer.getSearchInput.clear().type(username);
        cy.get('table').contains('td', mail).should('exist');

    });

    it('User Management_002 - Verify email is case-insensitive when registering', () => {

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

});
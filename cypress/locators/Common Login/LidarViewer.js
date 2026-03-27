class LidarViewerElements {

    get getEmail(){
        return cy.get('input[placeholder="Email Id"]')
    }

    get getPassword(){
        return cy.get('input[type="password"]')
    }

    get getLoginBtn() {
        return cy.get('button[data-testid="login-button"]')
    }

    get getHomeText() {
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.FileManager.flex-r.justify-between.m-30 > div:nth-child(1) > p:nth-child(1)')
    }

    get passWordEyeIcon() {
        return cy.get('#root > div > main > div.flex.page.width-100.align-center.justify-between > div > div.flex-c.gap-20.justify-between.padding-30.round-corner-6.shawdow-light > form > div:nth-child(2) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > div.absolute > img')
    }

    get forgotPassword() {
    return cy.contains('a.body3', 'Forgot Password');
    }

    get forgotPasswordText() {
        return cy.get('#ForgotPassword > div > div.flex-c.gap-10 > span')
    }

    get emailInForgotPasswordField() {
        return cy.get('#ForgotPassword > div > div.flex-c.gap-5 > form > div.flex-c.gap-5.align-start > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get sendRecoverLinkBtn() {
        return cy.get('#ForgotPassword > div > button')
    }

    get invalidEmailtoast() {
        return cy.get('#root > div > main > div.info-message-container.hide-message > span.ellipsis.width-100', {timeout:10000})
    }

    get nameInbreadcrumb() {
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(5) > div.d-flex.flex-row.g-2.gap-20.flex-wrap.align-start > div:nth-child(1) > div.runCardHeader > div.runCardContainer > div.run > p')
    }

    get runsTextInHeader() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.gap-20.align-center.no-wrap > div > div:nth-child(1) > span')
    }

    get nameInRunHeader() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.gap-20.align-center.no-wrap > div > div:nth-child(2) > span.body3.ActiveCrumb.pointer')
    }

    get applyButton() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn')
    }

    get cancelButton() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.secondary-btn')
    }
   
    get cameraIcon() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(1) > div.flex-r.gap-5.align-center.justify.NavBarToggleIconButton > svg > path:nth-child(1)')
    }

    get pcdIcon() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(2) > div.flex-r.gap-5.align-center.justify.NavBarToggleIconButton > svg > path:nth-child(2)')
    }

    get pcdCameraIcon() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(3) > div.flex-r.gap-5.align-center.justify.NavBarToggleIconButton > svg > path:nth-child(5)')
    }

    get MeasurementDistanceField() {
        return cy.get(
            '#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.flex-r.gap-20.space-between.measurementDistance > div:nth-child(1) > span'
        );
    }

    get TimeRangeCheckbox() {
        return cy.get(
            '#canvas3DContainerSplit > div.d-flex.flex-r.flex-nowrap.align-start.floatingOptions.gap-0 > div > input[type=checkbox]'
        );
    }

    get infoMessageContainer() {
    return cy.get('div.info-message-container:not(.hide-message)');
    }

    get NewPasswordField() {
    return cy.get(
        'div.ResetPassword div:nth-child(3) input'
        );
    }

    get ConfirmPasswordField() {
    return cy.get(
        'div.ResetPassword div:nth-child(4) input'
        );
    }

    get ResetPasswordBtn() {
    return cy.get(".ResetPassword button");
    }

    get getForgotSendBtn() {
    return cy.contains("button", "Send");
    }

    get getProfileIcon() {
        return cy.contains('.relative.ToolTip-container', 'Profile menu');
      }

    get getViewProfileOption() {
        return cy.contains('span', 'View Profile').parent();
      }
    
    get getEditProfileHeader() {
        return cy.contains('div', 'Edit Profile');
      }
    
    get getChangePasswordBtn() {
        return cy.contains('span', 'Change Password').parent();
    }

    get getOldPasswordField() {
        return cy.get('input[placeholder="Old Password"]');
    }
    
    get getNewPasswordField() {
        return cy.get('input[placeholder="New Password"]');
    }
    
    get getConfirmNewPasswordField() {
        return cy.get('input[placeholder="Confirm New Password"]');
    }
    
    get getUpdatePasswordBtn() {
        return cy.contains('button', 'Update Password');
    }

    get getApiKeySection() {
        return cy.contains('.tokenTitle', 'API Key');
      }
      
      get getApiKeyValue() {
        return cy.get('.tokenText');
      }
      
      get getApiKeyCopyBtn() {
        return cy.get('[data-testid="copybutton"]');
      }
      
      get getApiKeyBlockBtn() {
        return cy.get('.tokenBlockButton');
      }
      
      get getApiKeyRegenerateBtn() {
        return cy.get('.regenBtn');
      }

      get getEditProfileCloseBtn() {
        return cy.contains('.ModalHeader', 'Edit Profile')
                 .find('svg');
      }
      get getRegenerateApiModal() {
        return cy.contains('.ModalHeader', 'Regenerate API Key');
      }
      
      get getTokenDurationField() {
        return cy.get('.tokenDaysInput .inputField');
      }
      
      get getRegenerateConfirmBtn() {
        return cy.get('[data-testid="confirm-button"]');
      }
      
      get getRegenerateCancelBtn() {
        return cy.get('[data-testid="cancel-button"]');
      }

      get getAdministrationOption() {
        return cy.contains('span.body2.bold', 'Administration').parent('a');
    }

    get getDashboardOption() {
        return cy.contains('.AdminOptionHeader', 'Dashboard');
    }

    get getUserManagementOption() {
        return cy.contains('.AdminOptionHeader', 'User Management');
    }

    get getRunManagementOption() {
        return cy.contains('.AdminOptionHeader', 'Run Management');
    }

    get getConcurrentUsersOption() {
        return cy.contains('.AdminOptionHeader', 'Concurrent Users');
    }

    get getAlertsOption() {
        return cy.contains('.AdminOptionHeader', 'Alerts');
    }
    // Page Header
    get getManageUsersHeader() {
        return cy.contains('.overlay-heading', 'Manage Users');
    }

    // Search bar container
    get getSearchInput() {
        return cy.get('input[placeholder="Type for search"]');
    }

    // Sort icon for the list
    get getSortIcon() {
        return cy.get('[data-testid="sort-icon"]');
    }

    // Add User button (SVG link)
    get getAddUserButton() {
        return cy.get('.ToolTip-container a[href*="/registration"]');
    }

    // Tooltip for Add User button (optional)
    get getAddUserTooltip() {
        return cy.get('.ToolTip-HC').contains('User Registration');
    }
    // Page Header
    get getHeader() {
        return cy.contains('.heading2', 'User Registration');
    }

    // Username input
    get getUsernameInput() {
        return cy.get('input[placeholder="Username"]');
    }

    // Email input
    get getEmailInput() {
        return cy.get('input[placeholder="Email"]');
    }

    getDesignationDropdown() {
        return cy.get('select');  // since there is only one select for Designation
    }

    // Sites multi-select dropdown
    get getSitesDropdown() {
        return cy.get('.rmsc .dropdown-container');
    }

    // Enter Password input
    get getPasswordInput() {
        return cy.get('input[placeholder="Password"]');
    }

    // Confirm Password input
    get getConfirmPasswordInput() {
        return cy.get('input[placeholder="Confirm Password"]');
    }

    // Mail Required checkbox
    get getMailRequiredCheckbox() {
        return cy.get('.CheckBox');
    }

    // Import from Excel button
    get getImportFromExcel() {
        return cy.contains('span', 'Import from Excel');
    }

    // Register button
    get getRegisterButton() {
        return cy.get('[data-testid="register"]');
    }

    // Password rules text (optional, for validation)
    get getPasswordRules() {
        return cy.get('.flex-c.text-xs div');
    }

    // Table container
    get getUserTable() {
        return cy.get('div.userTable table');
    }

    // Table rows
    get getUserRows() {
        return cy.get('div.userTable table tbody tr.TData');
    }

    // Grab first row (example)
    get getFirstUserRow() {
        return this.getUserRows.first();
    }

    // Grab username/email cell in a row
    getUsernameCell(row) {
        return row.find('td:nth-child(3) span.body1'); // 3rd column = Username
    }

    getEmailCell(row) {
        return row.find('td:nth-child(2) span.body1'); // 2nd column = Email
    }

    getRoleCell(row) {
        return row.find('td:nth-child(4) span.body1'); // 4th column = Role
    }

    // Action buttons in a row
    getEditButton(row) {
        return row.find('td:last-child svg').first(); // First svg in Actions column = Edit
    }

    getPermissionsButton(row) {
        return row.find('td:last-child .ToolTip-container:contains("User Permissions")');
    }

    getDisableButton(row) {
        return row.find('td:last-child .ToolTip-container:contains("Disable")');
    }
    getEnableButton(row) {
        return row.find('td:last-child svg[style*="var(--status-green)"]').closest('.ToolTip-container');
    }

    // Search input at top
    get getUserSearchInput() {
        return cy.get('.SearchSortFilter .search-input');
    }

    // Edit User Details Modal
    get getEditUserModal() {
        return cy.get('div.ModalHeaderContainer').closest('div[style*="max-height: 520px"]');
    }

    get getEditModalHeader() {
        return this.getEditUserModal.find('span.heading2').contains('Edit User Details');
    }

    get getEditModalCloseButton() {
        return this.getEditUserModal.find('[data-testid="closeButton"]');
    }

    // Inputs
    get getEditUsernameInput() {
        return this.getEditUserModal.find('input[placeholder="Username"]');
    }

    get getEditEmailInput() {
        return this.getEditUserModal.find('input[placeholder="Email"]');
    }

    get getEditRoleDropdown() {
        return this.getEditUserModal.find('select');
    }

    get getEditSitesDropdown() {
        return this.getEditUserModal.find('.rmsc .dropdown-container');
    }

    get getClearSitesButton() {
        return this.getEditUserModal.find('.clear-selected-button');
    }

    // Change Password toggle
    get getChangePasswordToggle() {
        return this.getEditUserModal.contains('span', 'Change Password');
    }

    // Update button
    get getUpdateButton() {
        return this.getEditUserModal.find('button').contains('Update');
    }

    // Change Password Section
    get getNewPasswordInputUM() {
        return this.getEditUserModal.find('input[placeholder="Password"]');
    }

    get getConfirmPasswordInputUM() {
        return this.getEditUserModal.find('input[placeholder="Confirm Password"]');
    }

    get getSavePasswordButton() {
        return this.getEditUserModal.contains('button', 'Save Password');
    }

    get getPasswordRules() {
        return this.getEditUserModal.find('.flex-c.text-xs div'); // returns list of all rule divs
    }

       // Modal container
   get getUserPermissionsModal() {
    return cy.contains('.ModalLarge', 'User Permissions');
  }

  // Close button (X)
  get getCloseButton() {
    return this.getUserPermissionsModal
      .find('[data-testid="closeButton"]');
  }

  // Search input inside modal
  get getUserPermissionsSearchInput() {
    return this.getUserPermissionsModal
      .find('input[placeholder="Search"]');
  }

  // Folders section container
  get getFoldersSection() {
    return this.getUserPermissionsModal
      .find('.scrollContainer');
  }

  // Folder row by name
  folderRow(folderName) {
    return this.getFoldersSection
      .contains('.userEllipses', folderName)
      .closest('.rowContainer');
  }

  // Read permission checkbox for a folder
  readCheckbox(folderName) {
    return this.folderRow(folderName)
    .find('button.buttonStyle')
    .filter(':contains("read")');
  }
// Write permission checkbox for a folder
writeCheckbox(folderName) {
    return this.folderRow(folderName)
      .contains('button', /^write$/i)
  }

  // Update button
  get getUpdateButton() {
    return this.getUserPermissionsModal
      .find('[data-testid="confirm-button"]');
  }

  // Cancel button
  get getCancelButton() {
    return this.getUserPermissionsModal
      .find('[data-testid="cancel-button"]');
  }

  // Dropdown toggle button (plus icon)
    getDropdownToggleButton(folderName) {
    return this.folderRow(folderName).find('button#dropdown-autoclose-true.custom-toggle.btn.btn-primary');
  }
//   selectDropdownOption(folderName, optionText) {
//     // Click toggle first to open dropdown
//     this.getDropdownToggleButton(folderName).click();

//     // Then select the option
//     cy.get('div.dropdown-menu.show')
//       .contains('a.dropdown-item', optionText)
//       .click();
// }

getDropdownToggleButton(folderName) {
    return this.folderRow(folderName)
      .find('#dropdown-autoclose-true')
  }
  
  selectDropdownOption(folderName, optionText) {
  
    // open dropdown
    this.getDropdownToggleButton(folderName)
      .should('be.visible')
      .click();
  
    // select option
    cy.get('div.options.dropdown-menu.show')
      .should('be.visible')
      .contains(optionText)
      .click();
  }

// Password expired page elements

   get EnterOldPassword() {
    return cy.get(':nth-child(1) > .flex-c > .flex-r')
  }

  get NetworkErrorMessage() {
    return cy.get('.info-message-container > .width-100').should('be.visible')
  }



}
export default new LidarViewerElements




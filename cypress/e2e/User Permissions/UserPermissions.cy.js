import { it } from "mocha"
import UserManagementLocators from "../locators/UserManagementLocators"
import {login, navigateToUserManagement,  ZoomIN,  SavePoleData, TriggerPole,  clickAtCoordinates, PointPlacement, SavePointData,  importDataFromServer,PoleAllDelBtnsExist, SelectAndPlacePoint, selectCheckboxByName, ClickonPoint, findEmailAndClickSecondIcon} from '../utils/commonMethods'
import {OpenReadPermessionRun,OpenMoreoptionsMenu, openDynamicFolderAndRun,SelectAndPlacePole,} from '../utils/commonMethods'
import {PoleAlldelbtns,ReadAccessToRun,assignWriteAccessToUser, ConfirmPoleDetailsPanle,updateUserPermissions,LogoutFromUsermanagement,processUserPermission}from  '../utils/commonMethods'
import Constants from "../utils/Constants"
import 'cypress-real-events/support';
import PoleLocators from "../locators/PoleLocators"
import coordinates from "../fixtures/coordinates.json";


describe('UserPermissions', () => {            

  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'))

})

// testuserEmail: 'abc@hcrobo.com',
// it place a pole 

it.skip('Test script', () => {

  const folderPath = ['Shared Space', 'Test'];
  const runName = 'feb2025run';
  login(Constants.produserEmail, Constants.ProduserPwd);
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(6000);
  PointPlacement(211,595)
  OpenMoreoptionsMenu()
  SavePointData()

  // SelectAndPlacePole(240,847)
  // SavePoleData()
  // generateRandomCoordinates(6)
});


const emailList = [
  'anamika@hcrobo.com',
  'abc@hcrobo.com',
  // ... add up to 10 emails
];

const  runName = {

run1 

};



it.only('revokes all user permissions for multiple emails', () => {

  login(Constants.validEmail, Constants.password);
  navigateToUserManagement();

  emailList.forEach((email) => {

    const runName = 'Run1';

    processUserPermission(email);
  });
});



it('ReadPermission_001_Verify that a user with read-only permissions cannot delete or save poles data', () => {
    
  const testDataB = {
    email: "anamika@hcrobo.com",
    runName: "Automation_Run9",
    permissionType: "Read",
  };

  updateUserPermissions(testDataB.email, testDataB.runName, testDataB.permissionType);

    login(testDataB.email, Constants.testuserPwd)
    const folderPath = ["Shared Space", "Automation"];
    const runName = testDataB.runName

    openDynamicFolderAndRun(folderPath, runName);
    cy.wait(4000);
    cy.get('.ToolTip-container').eq(11).click();
    cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').should('not.contain', 'Save');
    cy.wait(4000);
    ZoomIN()
    const [x, y] = coordinates.coordinates[1];  
    SelectAndPlacePole(x, y);
    PoleAlldelbtns()
    PoleLocators.getPoleDeleteIcon.should('not.exist')

});


it('ReadPermission_002_Verify that a user with read-only permissions cannot delete or save measurements data', () => {
    
  

  const testDataA = {
    email: "abc@hcrobo.com",
    runName: "Automation_Run9",
    permissionType: "Read",
  };

  updateUserPermissions(testDataA.email, testDataA.runName, testDataA.permissionType);
  login(testDataA.email, Constants.testuserPwd)
  const folderPath = ["Shared Space", "Automation"];
  const runName = "Orbital-21-16482-2";
  openDynamicFolderAndRun(folderPath, runName);
  cy.wait(4000);
  cy.get('.ToolTip-container').eq(11).click();
  cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').should('not.contain', 'Save');

  // Import Measurements From server
  cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').contains('Import').click();
  cy.get('.import-options').contains('Measurements').click()
  cy.get('.primary-btn').click()
  UserManagementLocators.getMeasurementDeleteButton.should('not.exist')

});

it('ReadPermission_003_Verify that a user with read-only permissions cannot delete or save points data', () => {
    
  const testDataC = {
    email: "adi@hcrobo.com",
    runName: "Automation_Run11",
    permissionType: "Read",
  };

  updateUserPermissions(testDataC.email, testDataC.runName, testDataC.permissionType);

  login(testDataC.email, Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = testDataC.runName
  openDynamicFolderAndRun(folderPath, runName);
  cy.wait(4000);

  cy.get('.ToolTip-container').eq(11).click();
  cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').should('not.contain', 'Save');
  cy.wait(6000);
  ZoomIN()
  PointPlacement(211,595)
  ClickonPoint(211,595)
  UserManagementLocators.PointEditIcon.click()
  UserManagementLocators.getPointFeatureDeleteButton.should('not.exist')
});



//  Make sure this test cases have an existing callout data
it('ReadPermission_004_Verify that a user with read-only permissions cannot delete or save callouts data', () => {


  const testDataE = {
    email: "aditya@hcrobo.com",
    runName: "Automation_Run12",
    permissionType: "Read",
  };

  updateUserPermissions(testDataE.email, testDataE.runName, testDataE.permissionType);

  login(testDataE.email, Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = testDataE.runName
  openDynamicFolderAndRun(folderPath, runName);
  cy.wait(4000);

  // Open More Options Menu
  cy.wait(4000);
  cy.get('.ToolTip-container').eq(11).click();
  cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').contains('Import').click();
  cy.get('.import-options').contains('Callouts').click()
  cy.get('.primary-btn').click()
  // UserManagementLocators.getCalloutSelectButton.click()
  UserManagementLocators.getCalloutDeleteIcon.should('not.exist')
});


it('ReadPermission_005_Verify that a user with read-only permissions cannot delete or save polylines data', () => {
    


  const testDataF = {
    email: "admin4@hcrobo.com",
    runName: "Automation_Run13",
    permissionType: "Read",
  };

  updateUserPermissions(testDataF.email, testDataF.runName, testDataF.permissionType);

  login(testDataF.email, Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = testDataF.runName
  openDynamicFolderAndRun(folderPath, runName);
  cy.wait(4000);

  // Import Poles From server
  cy.get('.flex-c.gap-0.absolute.MoreOptionDialog').contains('Import').click();
  cy.get('.import-options').contains('Polylines').click()
  cy.get('.primary-btn').click()
  cy.wait(4000);
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Polylines downloaded from server.'); // Assert the text
  UserManagementLocators.getCalloutDeleteIcon.should('not.exist')

});

// End of read  permissions



// Make sure orbital run dosen't have read and write permissions

it('Read&WritePermission_006_Verify delete button visibility for user with read and write permission for poles', () => {

    login(Constants.validEmail, Constants.password);
    cy.wait(2000);
    // Navigate to User Management
    navigateToUserManagement();
    cy.wait(2000);
    assignWriteAccessToUser(Constants.testuserEmail, 'Orbital-21-16482-2');
    login(Constants.testuserEmail,Constants.testuserPwd)
    const folderPath = ['Shared Space', 'Automation'];
    const runName = 'Orbital-21-16482-2';
    openDynamicFolderAndRun(folderPath,runName)
    cy.wait(4000);
    SelectAndPlacePole(211,595)
    PoleAllDelBtnsExist()

});


// Make sure Automation_Run9 exist and it doesn't have any permissions
// Automation_Run9 run should have existing measurement data in server

it('Read&WritePermission_007_Verify delete button visibility for user with read and write permission for poles', () => {

  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
  assignWriteAccessToUser(Constants.testuserEmail, 'Automation_Run9');
  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run9';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(4000);
  const dataType = 'Measurements'
  importDataFromServer(dataType)
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Measurements downloaded successfully')
  UserManagementLocators.getMeasurementDeleteButton.should('be.visible')

 
});


it('Read&WritePermission_008_Verify delete button visibility for user with read and write permission for polylines', () => {

  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
  assignWriteAccessToUser(Constants.testuserEmail, 'Automation_Run11');

  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run11';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(4000);
  const dataType = 'Polylines'
  importDataFromServer(dataType)
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Polylines downloaded from server.')
  UserManagementLocators.getMeasurementDeleteButton.should('be.visible')

    
});


it('Read&WritePermission_009_Verify delete button visibility for user with read and write permission for point features', () => {

  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
  assignWriteAccessToUser(Constants.testuserEmail, 'Automation_Run12');
  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run12';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(4000);
  const dataType = 'Point features'
  importDataFromServer(dataType)
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Pointfeatures downloaded from server.')
  ZoomIN()
  PointPlacement(211,595)
  ClickonPoint(211,595)
  UserManagementLocators.PointEditIcon.click()
  UserManagementLocators.getPointFeatureDeleteButton.should('be.visible')

});


it('Read&WritePermission_010_Verify delete button visibility for user with read and write permission for callouts', () => {
    
  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
  assignWriteAccessToUser(Constants.testuserEmail, 'Automation_Run13');
  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run13';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(4000);
  const dataType = 'Callouts'
  importDataFromServer(dataType)
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Callouts downloaded successfully')
  UserManagementLocators.getCalloutDeleteIcon.should('be.visible')

});


it('Read&WritePermission_011_Verify that a user with read and write permissions can save poles data to server', () => {
    
  login(Constants.validEmail, Constants.password);
  cy.wait(2000);
  // Navigate to User Management
  navigateToUserManagement();
  cy.wait(2000);
  assignWriteAccessToUser(Constants.testuserEmail, 'Automation_Run14');
  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run14';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(2000);
  ZoomIN()
  SelectAndPlacePole(174, 669);
  ConfirmPoleDetailsPanle();
  SavePoleData()
  
});

// it('Read&WritePermission_012_Verify that a user with read and write permissions can save measurements data to server', () => {
    
// });


// it('Read&WritePermission_013_Verify that a user with read and write permissions can save polylines data to server', () => {
    
  
// });

it('Read&WritePermission_014_Verify that a user with read and write permissions can save points data to server', () => {
    
 
  login(Constants.testuserEmail,Constants.testuserPwd)
  const folderPath = ['Shared Space', 'Automation'];
  const runName = 'Automation_Run15';
  openDynamicFolderAndRun(folderPath,runName)
  cy.wait(9000);
  PointPlacement(211,595)
  const checkboxName = 'Point Features'
  selectCheckboxByName(checkboxName)  
  cy.get('.primary-btn').click()
  PoleLocators.getPolesaveMessage.should('be.visible').and('have.text', 'Point features saved successfully')

  
});


// it('Read&WritePermission_015_Verify that a user with read and write permissions can save callouts data to server', () => {
    

// });


});



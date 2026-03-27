import LidarViewer from "../../locators/LidarViewer";
import { Adminlogin, loginToPortal, navigateToUserManagement,} from "../../utils/commonMethods";
import Constants from "../../utils/Constants";
import UserManagementLocators from "../../locators/UserManagementLocators";


describe("Dashboard Tests", () => {

      beforeEach(() => {
    cy.visit("/login");
  });


    it("Verify that the functionality of dashboard page", () => {

        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);

         UserManagementLocators.getNavigationMenu.click();
         cy.contains("Administration").click();
         UserManagementLocators.getregisterUsers.should("be.visible");
         UserManagementLocators.getusersInLast60Mins.should("be.visible");
         UserManagementLocators.getTotalActiveRuns.should("be.visible");
    }); 

    it("Verify that the functionality of dashboard page for client user", () => {

        cy.intercept('GET', '**/register_user').as('getUsers');
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        UserManagementLocators.getNavigationMenu.click();        
        cy.contains("Administration").click();
        cy.get('.no-overflow > :nth-child(2) > span').click();
        cy.wait(3000); 
        cy.wait('@getUsers').then((interception) => {
        const userCount = interception.response.body.userCount;
        cy.log('User Count:', userCount);
        cy.contains("Dashboard").click()
        cy.get(':nth-child(1) > .flex-c > [style="font-size: 2.25rem;"]').should('be.visible').and('contain', userCount);
        cy.log('Registered Users');

  });
        }); 


it("Verify that the functionality of dashboard page for client user", () => {

    cy.intercept('GET', '**/analytics/usage*', (req) => {

    const url = new URL(req.url);
    const timeMin = Number(url.searchParams.get('timeMin'));
    const timeMax = Number(url.searchParams.get('timeMax'));

    if ((timeMax - timeMin) === 3600000) {
      req.alias = 'last60mins';
    }

  });

    Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
    UserManagementLocators.getNavigationMenu.click();        
    cy.contains("Administration").click();
    cy.wait('@last60mins').then((interception) => {
    const userCount = interception.response.body.userCount;
    UserManagementLocators.getusersInLast60Mins
      .should('be.visible')
      .and('contain', userCount);

  });

    }); 

it("Verify that the functionality of dashboard page for client user", () => {

        cy.intercept('GET', '**/get_data_sets/loc/**').as('getRuns');
    
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        UserManagementLocators.getNavigationMenu.click();        
        cy.contains("Administration").click();

cy.wait('@getRuns').then((res) => {

  const runs = res.response.body;
  const activeRuns = runs.filter(run => run.run_status === 1);
  const activeRunCount = activeRuns.length;
  UserManagementLocators.getTotalActiveRuns
    .should('be.visible')
    .and('contain', activeRunCount);

    });
    });
    }); 

  
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

    it("Verify that the total number of registered users in the application is accurately displayed in the registered users card.", () => {

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


it("Verify that the count of users registered in the last 60 minutes is correctly displayed ", () => {

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

it("Verify that the total number of active runs in the application is correctly displayed in the total runs card", () => {

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

it('Verify the functionality of the today radio button for the user visited bar graph.', () => {

  cy.intercept('GET', '**/analytics/usage*', (req) => {
    const url = new URL(req.url);

    const timeMin = Number(url.searchParams.get('timeMin'));
    const timeMax = Number(url.searchParams.get('timeMax'));

    if ((timeMax - timeMin) === 86400000) {
      req.alias = 'todayAPI';
    } else {
      req.alias = 'yesterdayAPI';
    }
  });

  Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  UserManagementLocators.getNavigationMenu.click();
  cy.contains("Administration").click();

  cy.contains('Today').click();

  let todayValue = 0;
  let yesterdayValue = 0;

  cy.wait('@todayAPI').then((res) => {
    todayValue = Object.keys(res.response.body.userVisitsByMail || {}).length;
    cy.log(`Today Users: ${todayValue}`);
  });

  cy.wait('@yesterdayAPI').then((res) => {
    yesterdayValue = Object.keys(res.response.body.userVisitsByMail || {}).length;
    cy.log(`Yesterday Users: ${yesterdayValue}`);
  });

  cy.contains('Users Visit Comparison')
    .scrollIntoView()
    .should('be.visible');

  cy.contains('Users Visit Comparison')
    .parent()
    .find('.recharts-rectangle')
    .each(($bar) => {

      const rect = $bar[0].getBoundingClientRect();

      cy.wrap($bar).trigger('mousemove', {
        clientX: rect.x + rect.width / 2,
        clientY: rect.y + rect.height / 2,
        force: true
      });

      cy.get('.recharts-tooltip-wrapper')
        .filter(':visible')
        .should('exist')
        .invoke('text')
        .then((text) => {

          const match = text.match(/\d+/);
          const uiValue = Number(match?.[0] || 0);

          cy.log(`Tooltip Text: ${text}`);

          // 🔥 KEY FIX: identify by label
          if (text.includes('Yesterday')) {
            expect(uiValue).to.equal(yesterdayValue);
          }

          if (text.includes('Today')) {
            expect(uiValue).to.equal(todayValue);
          }

        });

    });

    

});


it('Verify the functionality of the This Month radio button for the user visited bar graph.', () => {

cy.intercept('GET', '**/analytics/usage*', (req) => {
  const url = new URL(req.url);

  const timeMin = Number(url.searchParams.get('timeMin'));
  const timeMax = Number(url.searchParams.get('timeMax'));

  if (timeMin === 1772303400000 && timeMax === 1774981800000) {
    req.alias = 'currentMonthAPI';
  }

  if (timeMin === 1769884200000 && timeMax === 1772303400000) {
    req.alias = 'previousMonthAPI';
  }
});

  Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
  UserManagementLocators.getNavigationMenu.click();
  cy.contains("Administration").click();

  cy.contains('This Month').click();

  let currentMonthValue = 0;
  let previousMonthValue = 0;

  // Capture current month
  cy.wait('@currentMonthAPI').then((res) => {
    currentMonthValue = Object.keys(res.response.body.userVisitsByMail || {}).length;
    cy.log(`Current Month Users: ${currentMonthValue}`);
  });

  // Capture previous month
  cy.wait('@previousMonthAPI').then((res) => {
    previousMonthValue = Object.keys(res.response.body.userVisitsByMail || {}).length;
    cy.log(`Previous Month Users: ${previousMonthValue}`);
  });

  cy.contains('Users Visit Comparison')
    .scrollIntoView()
    .should('be.visible');

  // Hover bars
  cy.contains('Users Visit Comparison')
    .parent()
    .find('.recharts-bar-rectangle path.recharts-rectangle') 
    .each(($bar) => {

      const rect = $bar[0].getBoundingClientRect();

      cy.wrap($bar).trigger('mousemove', {
        clientX: rect.x + rect.width / 2,
        clientY: rect.y + rect.height / 2,
        force: true
      });

      cy.get('.recharts-tooltip-wrapper')
        .filter(':visible')
        .should('exist')
        .invoke('text')
        .then((text) => {

          const match = text.match(/\d+/);
          const uiValue = Number(match?.[0] || 0);

          cy.log(`Tooltip Text: ${text}`);

          if (text.includes('Previous Month')) {
            expect(uiValue).to.equal(previousMonthValue);
          }

          if (text.includes('Current Month')) {
            expect(uiValue).to.equal(currentMonthValue);
          }

        });

    });

});

});




















  
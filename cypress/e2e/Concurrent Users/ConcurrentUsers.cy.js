import { 
    Adminlogin

 } from "../../utils/commonMethods";
import LidarViewer from "../../locators/LidarViewer.js";
import Constants from "../../utils/Constants";
import ViewerElements from "../../locators/ViewerElements.js";


describe('Concurrent Users', () => {
    
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewer.getProfileIcon.click();
        LidarViewer.getAdministrationOption.click();
        LidarViewer.getConcurrentUsersOption.click();
    });

    it('ConcurrentUsers_001 - Verify export using custom date range', () => {

        const FROM_DATE = '2026-03-01';
        const TO_DATE = '2026-03-10';
    
        // Open export modal
        ViewerElements.getActiveUsersExportButton.click();
        ViewerElements.getConcurrentUsersExportModal.should('be.visible');
    
        // Set From Date
        ViewerElements.getExportFromDateInput
            .click({ force: true })
            .type(FROM_DATE, { force: true });
    
        // Set To Date
        ViewerElements.getExportToDateInput
            .click({ force: true })
            .type(TO_DATE, { force: true });
    
        // Verify values
        ViewerElements.getExportFromDateInput.should('have.value', FROM_DATE);
        ViewerElements.getExportToDateInput.should('have.value', TO_DATE);
    
        // Export
        ViewerElements.getExportConfirmButton.click();
        cy.wait(2000);
        cy.exec('dir cypress\\downloads').then((result) => {
            expect(result.stdout).to.include('Concurrent');
            cy.exec('del cypress\\downloads\\*concurrent*.xlsx');
          });
    });

    it('ConcurrentUsers_002 - Verify exporting data using Today preset', () => {

        // Step 1: Open Export modal
        ViewerElements.getActiveUsersExportButton.click();
        ViewerElements.getConcurrentUsersExportModal.should('be.visible');
    
        // Step 2: Click "Today" preset
        ViewerElements.getExportPresetTodayButton.click();
    
        // Step 3: Click Export
        ViewerElements.getExportConfirmButton.click();
        cy.wait(2000);
        cy.exec('dir cypress\\downloads').then((result) => {
            expect(result.stdout).to.include('Concurrent');
            cy.exec('del cypress\\downloads\\*concurrent*.xlsx');
          });
    
    });

    it('ConcurrentUsers_003 - Verify switching between servers updates User Metrics Trend graph', () => {

        const SERVER_QA = 'https://qa.lidartechsolutions.com';
        const SERVER_TESTING = 'https://testing.lidartechsolutions.com';
        
        // Step 1: Select QA server
        ViewerElements.getUserMetricsSiteDropdown
            .select(SERVER_QA)
            .should('have.value', SERVER_QA);
    
        // Step 2: Verify chart visible
        ViewerElements.getUserMetricsChart.should('be.visible');

        // Step 3: Switch to Testing server
        ViewerElements.getUserMetricsSiteDropdown
            .select(SERVER_TESTING)
            .should('have.value', SERVER_TESTING);
    
        // Step 4: Verify chart still visible (graph updated)
        ViewerElements.getUserMetricsChart.should('be.visible');
        
        // Step 5: Switch back to QA server
        ViewerElements.getUserMetricsSiteDropdown
            .select(SERVER_QA)
            .should('have.value', SERVER_QA);
    
        // Step 6: Verify chart again
        ViewerElements.getUserMetricsChart.should('be.visible');
    
    });

    it('ConcurrentUsers_004 - Verify User Metrics Trend shows data for testing server', () => {

        const TESTING_SERVER = 'https://testing.lidartechsolutions.com';
        
        // Step 1: Select testing server
        ViewerElements.getUserMetricsSiteDropdown
            .select(TESTING_SERVER)
            .should('have.value', TESTING_SERVER);
    
        // Step 2: Verify chart is displayed
        ViewerElements.getUserMetricsChart
            .should('be.visible');
    
        // Step 3: Switch to another option and back (ensures correct filtering)
        ViewerElements.getUserMetricsSiteDropdown
            .select('global');
    
        ViewerElements.getUserMetricsSiteDropdown
            .select(TESTING_SERVER)
            .should('have.value', TESTING_SERVER);
    
        // Step 4: Chart should still render correctly
        ViewerElements.getUserMetricsChart
            .should('be.visible');
    
    });

    it('ConcurrentUsers_005 - Verify Average Users metric updates graph', () => {

        const RANGE = '1h'; // Last 1 Hour
        const METRIC = 'avgUsers';
        
        ViewerElements.getUserMetricsRangeDropdown
            .select(RANGE)
            .should('have.value', RANGE);

        ViewerElements.getUserMetricsMetricDropdown
            .select(METRIC)
            .should('have.value', METRIC);
 
        ViewerElements.getUserMetricsChart
            .should('be.visible');

        ViewerElements.getUserMetricsRangeDropdown
            .select('24h')
            .should('have.value', '24h');
        ViewerElements.getUserMetricsChart
            .should('be.visible');
    
    });

    it('ConcurrentUsers_006 - Verify Max Users metric updates graph', () => {

        const RANGE = '1h';       // Last 1 Hour
        const METRIC = 'maxUsers';
        // Step 1: Select time range
        ViewerElements.getUserMetricsRangeDropdown
            .select(RANGE)
            .should('have.value', RANGE);
    
        // Step 2: Select Max Users metric
        ViewerElements.getUserMetricsMetricDropdown
            .select(METRIC)
            .should('have.value', METRIC);
    
        // Step 3: Verify chart is visible
        ViewerElements.getUserMetricsChart
            .should('be.visible');
    
        // Step 4: Change time range to confirm graph refresh
        ViewerElements.getUserMetricsRangeDropdown
            .select('24h')
            .should('have.value', '24h');
    
        // Step 5: Chart should still render
        ViewerElements.getUserMetricsChart
            .should('be.visible');
    
    });

    it('ConcurrentUsers_007 - Verify graph updates when switching between Average, Max, and Min Users', () => {

        const RANGE = '24h';
        // Step 1: Select time range
        ViewerElements.getUserMetricsRangeDropdown
            .select(RANGE)
            .should('have.value', RANGE);
    
        // Step 2: Select Average Users
        ViewerElements.getUserMetricsMetricDropdown
            .select('avgUsers')
            .should('have.value', 'avgUsers');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 3: Switch to Max Users
        ViewerElements.getUserMetricsMetricDropdown
            .select('maxUsers')
            .should('have.value', 'maxUsers');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 4: Switch to Min Users
        ViewerElements.getUserMetricsMetricDropdown
            .select('minUsers')
            .should('have.value', 'minUsers');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 5: Repeat switching to ensure stability
        ViewerElements.getUserMetricsMetricDropdown.select('avgUsers');
        ViewerElements.getUserMetricsMetricDropdown.select('maxUsers');
        ViewerElements.getUserMetricsMetricDropdown.select('minUsers');
    
        // Final check
        ViewerElements.getUserMetricsChart.should('be.visible');
    
    });

    it('ConcurrentUsers_008 - Verify Max Users graph updates for selected time range', () => {

        // Step 1: Select Max Users metric
        ViewerElements.getUserMetricsMetricDropdown
            .select('maxUsers')
            .should('have.value', 'maxUsers');
    
        // Step 2: Select Last 1 Hour
        ViewerElements.getUserMetricsRangeDropdown
            .select('1h')
            .should('have.value', '1h');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 3: Change to Last 24 Hours
        ViewerElements.getUserMetricsRangeDropdown
            .select('24h')
            .should('have.value', '24h');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 4: Change to Last 7 Days
        ViewerElements.getUserMetricsRangeDropdown
            .select('week')
            .should('have.value', 'week');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
    });

    it('ConcurrentUsers_009 - Verify Average Users graph updates for selected time range', () => {

        // Step 1: Select Average Users metric
        ViewerElements.getUserMetricsMetricDropdown
            .select('avgUsers')
            .should('have.value', 'avgUsers');
    
        // Step 2: Select Last 1 Hour
        ViewerElements.getUserMetricsRangeDropdown
            .select('1h')
            .should('have.value', '1h');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 3: Change to Last 24 Hours
        ViewerElements.getUserMetricsRangeDropdown
            .select('24h')
            .should('have.value', '24h');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
        // Step 4: Change to Last 7 Days
        ViewerElements.getUserMetricsRangeDropdown
            .select('week')
            .should('have.value', 'week');
    
        ViewerElements.getUserMetricsChart.should('be.visible');
    
    });

});
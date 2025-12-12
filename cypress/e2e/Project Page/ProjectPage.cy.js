
import LidarViewerElements from "../../locators/LidarViewer"
import { Adminlogin,getAngle, getMeasurement, login } from "../../utils/commonMethods"
import Constants from "../../utils/Constants"

describe('Project Page', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
    })

    it('Proj-0059- Verify the current run name and the name in breadcrumbs exactly matched', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        let nameInRunHeader
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewerElements.nameInRunHeader.should(name=> nameInRunHeader = name.text())
        expect(nameInBreadcrumb).eq(nameInRunHeader)
    })
    it('Proj-0061- Verify clicking on the runs should navigate to home page', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewerElements.runsTextInHeader.click()
        LidarViewerElements.applyButton.click()
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
    })
    //TODO - Move to common methods
    it('Proj-0062- Verify clicking on the runs should navigate to home page', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewerElements.runsTextInHeader.click()
        LidarViewerElements.applyButton.should('have.text', 'Apply')
        LidarViewerElements.cancelButton.should('have.text', 'Cancel')
        LidarViewerElements.cancelButton.click()
        LidarViewerElements.runsTextInHeader.click()
        LidarViewerElements.applyButton.click()
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        cy.wait(2000)
    })
    //TODO - Move to common methods
    it('Proj-0064- Verify default camera view is appeared upon opening project page', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewerElements.cameraIcon.should('have.attr', 'stroke').and('equal', '#FF7C40')
        LidarViewerElements.pcdCameraIcon.should('have.attr', 'stroke').and('equal', '#002351')
        LidarViewerElements.pcdIcon.should('have.attr', 'stroke').and('equal', '#002351')
        cy.wait(2000)
    })
    //TODO - Move to common methods
    it('Proj-0065- Verify PCD view in the project page', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewer.pcdIcon.click()
        LidarViewerElements.cameraIcon.should('have.attr', 'stroke').and('equal', '#002351')
        LidarViewerElements.pcdCameraIcon.should('have.attr', 'stroke').and('equal', '#002351')
        LidarViewerElements.pcdIcon.should('have.attr', 'stroke').and('equal', '#FF702F')
        cy.wait(2000)
    })

    //TODO - Move to common methods
    it('Proj-0066- Verifying the disabling the PCD+cameraview functionality', () => {
        cy.wait(2000)
        let nameInBreadcrumb
        Adminlogin(Constants.AdminEmail, Constants.AdminPassword);
        LidarViewerElements.getHomeText.should('have.text', 'Home Page')
        LidarViewerElements.nameInbreadcrumb.should(name=>nameInBreadcrumb = name.text())
        LidarViewerElements.nameInbreadcrumb.click()
        cy.wait(5000)
        LidarViewer.pcdCameraIcon.click()
        LidarViewerElements.cameraIcon.should('have.attr', 'stroke').and('equal', '#002351')
        LidarViewerElements.pcdCameraIcon.should('have.attr', 'stroke').and('equal', '#FF702F')
        LidarViewerElements.pcdIcon.should('have.attr', 'stroke').and('equal', '#002351')
        cy.wait(2000)
    })


    it('Add Point to Point Measurement', () => {
        getMeasurement(Constants.pointToPointMeasurement, 300, 370, 400, 490)
    })

    it('Add Horizontal Measurement', () => {
        getMeasurement(Constants.horizontalMeasurement, 180, 270, 200, 290)
    })

    
    it('Add Vertical Measurement', () => {
        getMeasurement(Constants.verticalMeasurement, 180, 270, 200, 290)
    })

    it('Add angle', () => {
        getAngle(Constants.angleMeasurement, 180, 270, 200, 290, 300, 400)
    })

})
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


}
export default new LidarViewerElements
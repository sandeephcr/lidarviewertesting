class UserManagementLocators {

    get getNavigationMenu(){
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div:nth-child(3)')
    }

    get getAdministrationButton() {
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div.flex-c.gap-25.ProfilePopUpMenu.justify-start.shawdow-light.round-corner-6.padding-20 > div.flex-c.gap-15 > div:nth-child(1)')
    }

    get getUserManagementMenuButton() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.no-overflow.padding-20.round-corner-6 > div:nth-child(2)')
    }

    get getManageUsersText() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.mw-100.mh-100.max-content.padding-20.round-corner-6.gap-30 > div > span')
    }

    get getAddUserIcon() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.mw-100.mh-100.max-content.padding-20.round-corner-6.gap-30 > div > div > div.relative.ToolTip-container')
    }

    get getUserNameInAddUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(4) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getUserEmailInAddUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(5) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getUserPasswordInAddUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(6) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getUserConfirmPasswordInAddUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(7) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getRegisterButtonInAddUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > button')
    }

    get getSearchInUserManagement() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.mw-100.mh-100.max-content.padding-20.round-corner-6.gap-30 > div > div > div.flex-r.gap-20.SearchSortFilter > div > div > input')
    }

    get getUsernameSearchResult() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr > td:nth-child(2) > span')
    }

    get getPwdDoesntMatch() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(7) > div.body2.error')
    }

    get getUserExistsToast() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(4) > div.body2.error')
    }

    get getEmailError() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(5) > div.body2.error')
    }

    get getEmptyEmail() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > form > div.absolute.flex-c.align-center.gap-10.shawdow-light.padding-30.round-corner-6.RegistartionForm > div:nth-child(5) > div.body2.error')
    }

    get getBackButtonInRegPage() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow.relative > div:nth-child(2) > button')
    }

    get getEditIcon() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > svg')
    }

    get getEditUserNameInEditUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > div:nth-child(2) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getRoleInEditUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > div.flex-c.gap-5.align-start.width-100 > select')
    }

    get managerTextInEditUserRole() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > div.flex-c.gap-5.align-start.width-100 > select > option:nth-child(2)')
    }

    get getPasswordInEditUser(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > div:nth-child(4) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getConfirmPasswordInEditUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > div:nth-child(5) > div.flex-r.no-wrap.width-100.IconTextEntry.relative > input')
    }

    get getUpdateButtonInEditUser() {
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > form > button')
    }

    // get getFirstStatus(){
    //     return cy.wait('  #root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > div:nth-child(3) > div > div > svg');
    // }

    get getDisableUser(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > div:nth-child(3) > div > div > svg');
    }
    get getEnableUser(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(10) > td:nth-child(5) > div > div:nth-child(3) > div > div > svg',{timeout:3000}).should('visible')
    }

    get getUserPermessionsDialogbox(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(2) > td:nth-child(5) > div > div:nth-child(2) > div > div > img');
    }

    get getSelectCheckbox(){
        return cy.get('#option3')
    }

    get getClickUpdatebtn(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn')
    }

    get getclickconfirmbtn(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn')
    }

    get getVerifyFolderVisibility(){
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(2) > div.d-flex.flex-row.g-2.gap-10.flex-wrap.align-start > div > div.foldersList.flex-r.g-20.flex-wrap > div > p')
    }
    get getLogoutOption(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div.flex-c.gap-25.ProfilePopUpMenu.justify-start.shawdow-light.round-corner-6.padding-20 > div.flex-c.gap-15 > div:nth-child(2) > span');
    }

    get getConfirmLoginText(){
        return cy.get('#root > div > main > div.flex.page.width-100.align-center.justify-between > div > div.flex-c.gap-20.justify-between.padding-30.round-corner-6.shawdow-light > div > span')
    }
    get getNavigationMenuFromUserManagementpage(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div > div.flex-r.gap-20 > div:nth-child(3) > img')
    }


    get getConfirmLogout(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.flex-r.width-100.space-between.NavBarMain.shawdow-light > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn')
    }

    get scrollintorun(){
        return cy.get('#dropdown-autoclose-true > img')
    }

    get getSearchUserpermessions(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-r > div.flex-r.g-5 > span > input');
    }

    get getclickSearchBtnUSerPermessions(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-r > div.flex-r.g-5 > button')
    }

    get getRunConformVisibility(){
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(5) > div.d-flex.flex-row.g-2.gap-20.flex-wrap.align-start > div > div.runCardHeader > div.runCardContainer > div.run > p')
    }
    get getOpenfolderInUserPermessions(){
       return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-c > div.scrollContainer > div:nth-child(1) > div:nth-child(1) > div.flex-r.pointer > div > div.userEllipses');
    }
    get getConfirmopenFoldertextInBreadcrumbs(){
        return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-c > div.flex-r.gap-5 > div:nth-child(2) > span.body3.ActiveCrumb.pointer');
    }
    get getOpenReadPermessionRun(){
        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(5) > div.d-flex.flex-row.g-2.gap-20.flex-wrap.align-start > div:nth-child(1) > div.runCardHeader > div.runCardContainer > div.run > p')
    }

    get getOpenMoreOptionsMenu() {
        return cy.get('.ToolTip-container').eq(11)
    }

    get getPointFeatureOptionsContainer() {
        return cy.get(
            '#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.point-feature-options-container'
        );
    }
    // it clicks on import option under more options menu
    get getClickOnImportoption(){
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.flex-c.gap-10.round-corner-6.padding-10.shawdow-light > div:nth-child(2) > span');
    }
    get getConfirmSaveOptionVisible(){
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.flex-c.gap-10.round-corner-6.padding-10.shawdow-light > div:nth-child(1) > span',{ timeout: 20000 })
    }

    get getSelectPoleIcon(){
        return cy.get('#canvas3DContainer > div.relative.static.width-100vw.height-100vh.SideToolsBarContainer > div > div > div:nth-child(9) > div > div > svg');
    }

    get getConfirmPoleDetailsPanle(){
        // return  cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span')
return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span');
       
    }

    get getSelectPoleFromNavbar(){
        // return  cy.get('#canvas3DContainer > div.relative.static.width-100vw.height-100vh.SideToolsBarContainer > div > div > div:nth-child(9) > div > div > svg')
        return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(13) > div > div > svg');
    }

get getPoleMainDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.body2.bold.width-100 > div > div > div:nth-child(2) > div.ViewerIconButton')
}

get getPoleSpanDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.pd-top-10.pd-bottom-10.justify-between.hover-shadow.align-center.width-100.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg')
}

get getPoleWireDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children > div > div.flex-c.gap-10 > div:nth-child(8) > div.viewer-accordian-children> div > div.flex-r.pd-top-5.pd-bottom-5.justify-between.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg > path:nth-child(5)')
}

get getPoleSpanguyDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-c.gap-10 > div.flex-c.WiresContent > div.viewer-accordian-children> div > div.flex-r.pb-2.justify-between.flex-nowrap > div > div:nth-child(2) > svg')
}

get getPoleAnchorDelBtn(){

    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.gap-10.justify-between.pd-top-5.pd-bottom-5.width-100 > div > div:nth-child(2) > div.ViewerIconButton > svg')
}
get getPoleDownguyDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children > div > div.flex-c.gap-10 > div.viewer-accordian-children.flex-c.gap-10.align-start> div > div.flex-r.gap-5.justify-between.align-center.pd-bottom-10.pd-top-5.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg')
}
get getPoleEquipmentsDelBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.gap-10.justify-between.pd-bottom-10.pd-top-5 > div > div > div:nth-child(2) > div.ViewerIconButton > svg')
}
get getInfotab(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(1)');
}
get getSpanstab(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(2)');
}
get getAnchortab(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(3)');
}
get getEquipmenttab(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(4)');
}

get getImportDialogApplyBtn(){

    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn',{timeout:3000})
}

get getOpenMeasurementsOption(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(9) > div.flex.NavBarHomeMenuIndicator > div:nth-child(1) > svg > path:nth-child(4)');
}

get getClickonDetailsOtion(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(9) > div.flex.NavBarHomeMenuIndicator > div.absolute.flex-r.gap-15.NavBarHoverMenu > div:nth-child(3) > span');
}

get getConfirmDeleteBtnUnavalible(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span');
}

get getOpenCalloutOption(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(10) > div.flex.NavBarHomeMenuIndicator > div:nth-child(1) > svg');
}
get getClickOnCalloutDetailsOption(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(10) > div.flex.NavBarHomeMenuIndicator > div.absolute.flex-r.gap-15.NavBarHoverMenu > div:nth-child(4)');
}

get getSelectPointFromToolbar(){
    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer> div > ul > li:nth-child(14) > div > div > svg',{timeout:3000});

}

get getConfirmPointplacement(){
    return cy.get('#canvas3DContainer > div.point-feature-options-container > svg');
}


get getPointFeatureDeleteButton() {
    return cy.get(
        '#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.point-feature-options-container > div > div > div.flex-c.gap-10.ModalPointFeatureBody > div.addButtons > div.btn-delete-point-feature'
    );
}


get getConfirmDelBtninPointfeature(){
    return cy.get('#canvas3DContainer > div.point-feature-options-container > div > div > div.flex-c.gap-10.ModalPointFeatureBody > div.addButtons > div.btn-delete-point-feature');
}

get getOpenSharedspace(){
    return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(2) > div.d-flex.flex-row.g-2.gap-10.flex-wrap.align-start > div:nth-child(1) > div.foldersList.flex-r.g-20.flex-wrap > div > p');
}

get getRootElement()
{
    return  cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > p > strong');
}

get getRunsName(){
    return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(5) > div.d-flex.flex-row.g-2.gap-20.flex-wrap.align-start > div:nth-child(1) > div.runCardHeader > div.runCardContainer > div.run > p');
}

get getConfirmMeasurementDetailsPanel(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span');
}

get getDropDownbtmInUserPermission(){
    return cy.get('#dropdown-autoclose-true');
}


get getSelectWriteOption(){
    return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-c > div.scrollContainer > div:nth-child(3) > div.flex-r.buttonDropdowns > div:nth-child(2) > div > div > a:nth-child(2)');
}

get getSelectPoleCheckBox(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > div > div.import-options > div:nth-child(3) > span.body2 > span');
}

get getConfirmEmailID(){
    return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > span')
}

get getClickonConfirmEmailIDUserPermissionsbtn(){

return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.flex-c.max-content.gap-30.justify.space-between > div > table > tbody > tr:nth-child(3) > td:nth-child(5) > div > div:nth-child(2) > div > div > img');
}


get getConfirmUserPermissionsText(){
    return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalHeaderContainer > div > span');
}


get ClickOnSaveOption(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.flex-c.gap-10.round-corner-6.padding-10.shawdow-light > div:nth-child(1) > span');
}
get SelectPoleCheckBoxInSave(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > div > div:nth-child(2) > div > div:nth-child(3) > span.body2');
}

get ClickSavebtnInSaveDialogbox(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn');
}
get getPoleIdDataFiled(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div:nth-child(6) > input');
}

get getPoleDeleteBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.body2.bold.width-100 > div > div > div:nth-child(2) > div.ViewerIconButton > svg');
}

get selectCallout(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > div > div:nth-child(2) > div > div:nth-child(2) > span.body2');
}

get getCalloutDeleteBtn(){
    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div > svg');
}


get getPointToPoint(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(1) > div > div > svg');
}
get getVerticalMeasurement(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(2) > div > div > svg');
}

get ImportPoleData(){

    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.flex-c.gap-10.round-corner-6.padding-10.shawdow-light > div:nth-child(2) > span');
}

get SelectPoleOption(){

    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalMediumBody > div > div.import-options > div:nth-child(3) > span.body2 > span');
}

get ClickApplyBtnInImportDialog(){

    return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div:nth-child(2) > div.flex-c.gap-0.absolute.MoreOptionDialog > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn');
}

get HorizontalMeasurement(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(4) > div > div > svg')
}

get AngleMeasurement(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(5) > div > div > svg');
}

get VerticalOffSetMeasurement(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(3) > div > div > svg');
}

get geButtonDropdown() {
    return cy.get('.buttonDropdowns')
}
get getReadOption() {
    return cy.get('.dropdown-item')
}

get getSuccessMessage() {
    return cy.get('#root > div > main > div.info-message-container > span.width-100');
}
get getCloseUserPermissionDialog() {
    return cy.get(
        '#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalHeaderContainer > div > div'
    );
}

get getMeasurementDeleteButton() {
    return cy.get(
        '#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div:nth-child(1) > div.flex-r.gap-20.space-between.measurementDistance > div:nth-child(2) > svg'
    );
}

get getPointIconFromSideToolbar() {
    return cy.get(
        '#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(14) > div > div > svg'
    );
}


get getCalloutAddIcon() {
    return cy.get(
        '#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(10) > div.flex.NavBarHomeMenuIndicator > div.absolute.flex-r.gap-15.NavBarHoverMenu > div:nth-child(3) > span'
    );
}


get getCalloutSelectButton() {
    return cy.get(
        '#root > div > main > div.flex-c.page.width-100 > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn'
    );
}

get getCalloutDeleteIcon() {
    return cy.get(
        '#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div > svg'
    );
}

get getSearchUserPermissions() {
    return cy.get(
        '#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-r > div.flex-r.g-5 > span > input'
    );
}

get getClickSearchBtnUserPermissions() {
    return cy.get(
        '#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-r > div.flex-r.g-5 > button'
    );
}

get PointEditIcon(){

    return cy.get('#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.point-feature-options-container > svg');
}

get getReadOption(){

    return cy.get('#root > div > main > div.flex-c.width-100vw.height-100vh.no-overflow > div.width-100.no-overflow.padding-20.no-wrap > div > div.flex-c.flex-grow.padding-20.round-corner-6.no-wrap > div > div.background-overlay.align-center.justify-center > div > div.flex-c.gap-10.ModalLargeBody > div.flex-c > div.scrollContainer > div:nth-child(2) > div.flex-r.buttonDropdowns > div:nth-child(2) > div > div > a:nth-child(1)').click();
}


}

export default new UserManagementLocators


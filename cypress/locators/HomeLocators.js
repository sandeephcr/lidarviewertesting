class HomeLocators {

    get NoRunsAvailableText () {

        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.flex-c.gap-20 > div:nth-child(5) > div.d-flex.flex-row.g-2.gap-20.flex-wrap.align-start > div > span');
    }


    get getListView () {

        return cy.get('#root > div > main > div.flex-c.width-100.gap-0.height-100vh.relative > div.flex-c.HomePageContainer.no-overflow.height-100 > div > div.FileManager.flex-r.justify-between.m-30 > div:nth-child(2) > img:nth-child(10)');
    }
  
    get ConfirmActionApplyButton() {
        return cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn');
    }

}

export default new HomeLocators
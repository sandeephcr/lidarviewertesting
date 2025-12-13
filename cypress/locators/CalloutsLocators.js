class CalloutsLocators {
  get getCalloutAddIcon() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(10) > div.flex.NavBarHomeMenuIndicator > div.absolute.flex-r.gap-15.NavBarHoverMenu > div:nth-child(3) > span"
    );
  }
  get getCalloutDeleteIcon() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div > svg"
    );
  }

  get getOpencalloutMenuFromMoreOptions() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-c.gap-10.align-center.justify.NavBarMainCompact.shawdow-light.no-wrap > div > div.flex-r.flex-grow.gap-5.space-between.ToolBarContainer > div.flex-r.gap-10.ToolBarContainer > div:nth-child(10) > div.flex.NavBarHomeMenuIndicator > div > svg"
    );
  }

  get getCalloutApplyButton() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.background-overlay.align-center.justify-center > div > div.flex-r.ModalFooter.justify-content-between.m-2.w-100 > div.flex-r.gap-2 > div.primary-btn"
    );
  }
}
export default new CalloutsLocators();

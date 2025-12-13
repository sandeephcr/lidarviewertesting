class PoleLocators {
  get getPoleDeleteIcon() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.body2.bold.width-100 > div > div > div:nth-child(2) > div.ViewerIconButton"
    );
  }
  get getSelectPoleFromNavbar() {
    // return  cy.get('#canvas3DContainer > div.relative.static.width-100vw.height-100vh.SideToolsBarContainer > div > div > div:nth-child(9) > div > div > svg')
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(13) > div > div > svg"
    );
  }

  get getConfirmPoleDetailsPanle() {
    // return  cy.get('#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span')
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.SideBarHeader > div > span"
    );
  }

  get getPoleMainDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.width-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.body2.bold.width-100 > div > div > div:nth-child(2) > div.ViewerIconButton"
    );
  }

  get getPoleSpanDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.pd-top-10.pd-bottom-10.justify-between.hover-shadow.align-center.width-100.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg"
    );
  }

  get getPoleWireDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children > div > div.flex-c.gap-10 > div:nth-child(8) > div.viewer-accordian-children> div > div.flex-r.pd-top-5.pd-bottom-5.justify-between.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg > path:nth-child(5)"
    );
  }

  get getPoleSpanguyDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-c.gap-10 > div.flex-c.WiresContent > div.viewer-accordian-children> div > div.flex-r.pb-2.justify-between.flex-nowrap > div > div:nth-child(2) > svg"
    );
  }

  get getPoleAnchorDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.gap-10.justify-between.pd-top-5.pd-bottom-5.width-100 > div > div:nth-child(2) > div.ViewerIconButton > svg"
    );
  }
  get getPoleDownguyDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children > div > div.flex-c.gap-10 > div.viewer-accordian-children.flex-c.gap-10.align-start> div > div.flex-r.gap-5.justify-between.align-center.pd-bottom-10.pd-top-5.flex-nowrap > div > div:nth-child(2) > div.ViewerIconButton > svg"
    );
  }
  get getPoleEquipmentsDelBtn() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabContentHolder2 > div > div.viewer-accordian-children> div > div.flex-r.gap-10.justify-between.pd-bottom-10.pd-top-5 > div > div > div:nth-child(2) > div.ViewerIconButton > svg"
    );
  }
  get getInfotab() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(1)"
    );
  }
  get getSpanstab() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(2)"
    );
  }
  get getAnchortab() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(3)"
    );
  }
  get getEquipmenttab() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.TabViewContainer2 > div.TabHeaderHolder2.w-100.justify-content-between > div:nth-child(4)"
    );
  }

  get getPoleDeleteIcon() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div > div.body2.bold.width-100 > div > div > div:nth-child(2) > div.ViewerIconButton"
    );
  }
}
export default new PoleLocators();

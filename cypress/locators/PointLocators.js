class PointLocators {
  get getPointIconFromSideToolbar() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(14) > div > div > svg"
    );
  }

  get PointEditIcon() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.point-feature-options-container > svg"
    );
  }

  get getPointFeatureDeleteButton() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.point-feature-options-container > div > div > div.flex-c.gap-10.ModalPointFeatureBody > div.addButtons > div.btn-delete-point-feature"
    );
  }
  get getPointIconFromSideToolbar() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(14) > div > div > svg"
    );
  }

  get getPointIconFromSideToolbar() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(14) > div > div > svg"
    );
  }
}

export default new PointLocators();

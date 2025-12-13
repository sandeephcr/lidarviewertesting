class MeasurementsLocators {
  get getMeasurementDeleteButton() {
    return cy.get(
      "#root > div > main > div.flex-c.page.width-100 > div.flex-r.w-100.h-100.height-100.gap-0.flex-grow.ProjectContainer > div.flex-c.SideBarContainer.height-100.align-between > div > div.flex-c.SideBarBody > div > div:nth-child(1) > div.flex-r.gap-20.space-between.measurementDistance > div:nth-child(2) > svg"
    );
  }

  get getPolylineSelectIcon() {
    return cy.get(
      "#canvas3DContainerSplit > div.w-100.h-100.position-relative > div.position-absolute.SideToolsBar.shawdow-light.SideToolsBarContainer > div > ul > li:nth-child(8) > div > div"
    );
  }
}

export default new MeasurementsLocators();

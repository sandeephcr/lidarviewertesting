export function enterPoleField(fieldName, value) {
  cy.get('.SideBarBody')
    .scrollTo('top', { ensureScrollable: false });

  cy.contains('.SideBarHeader span', 'Pole Details')
    .closest('.flex-c')
    .contains('span', fieldName)
    .parent()
    .find('input, textarea')
    .scrollIntoView()
    .should('be.visible')
    .clear({ force: true })
    .type(value, { force: true })
    .should('have.value', value);
}
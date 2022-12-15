describe('Ingredient Search', () => {
  it('lets you search in', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.form > :nth-child(1) > input').type("user")
    cy.get(':nth-child(2) > input').type("password1@")
    cy.get('.form > button').click()
    cy.wait(1000)
    cy.get(':nth-child(2) > div > button').click()
    cy.get(':nth-child(1) > :nth-child(1) > #ingredient').type("Steak")
    cy.get(':nth-child(2) > :nth-child(1) > #ingredient').type("potatoes")
    cy.get('.column-search > :nth-child(4)').click()
  })
})
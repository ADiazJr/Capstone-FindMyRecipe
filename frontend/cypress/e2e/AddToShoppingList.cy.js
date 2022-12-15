describe('add to shopping list button', () => {
  it('adds an ingredient to the shopping list', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.form > :nth-child(1) > input').type("user")
    cy.get(':nth-child(2) > input').type("password1@")
    cy.get('.form > button').click()
    cy.get(':nth-child(1) > .recipe-button').click()
    cy.get(':nth-child(2) > .shopping-button').click()
    cy.get('.search > :nth-child(3) > div > :nth-child(2)').click()
  })
})
describe('Favorite Recipes', () => {
  it('logs in and checks favorite recipes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.form > :nth-child(1) > input').type("user")
    cy.get(':nth-child(2) > input').type("password1@")
    cy.get('.form > button').click()
    cy.get(':nth-child(3) > div > :nth-child(1)').click()
  })
})
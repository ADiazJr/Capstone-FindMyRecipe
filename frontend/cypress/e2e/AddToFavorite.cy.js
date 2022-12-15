describe('Add to Favorite', () => {
  it('adds Recipe to Favorites', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.form > :nth-child(1) > input').type("user")
    cy.get(':nth-child(2) > input').type("password1@")
    cy.get('.form > button').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > .recipe-button').click()
    cy.wait(1000)
    cy.get('.addToFavorite').click()
    cy.get('.search > :nth-child(3) > div > :nth-child(1)').click()
  })
})
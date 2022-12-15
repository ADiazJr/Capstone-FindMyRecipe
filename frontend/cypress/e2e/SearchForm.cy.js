describe('Search Bar', () => {
  it('Searches Recipes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.input').type("Cookies")
    cy.get('.input-search').click()
  })
})
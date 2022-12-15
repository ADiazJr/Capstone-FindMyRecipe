describe('Meal Planner', () => {
  it('plans your meals for the day', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.form > :nth-child(1) > input').type("user")
    cy.get(':nth-child(2) > input').type("password1@")
    cy.get('.form > button').click()
    cy.wait(1000)
    cy.get(':nth-child(3) > div > :nth-child(3)').click()
  })
})
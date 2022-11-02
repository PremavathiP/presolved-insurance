import LandingPage from "../../src/landing_page"

describe('client-signup.cy.js', () => {
  it('playground', () => {
    cy.mount(<LandingPage />)
    cy.get('section.banner').should('have.length', 1)
    cy.get('.ant-menu-item').should('have.length', 8)

  })
})
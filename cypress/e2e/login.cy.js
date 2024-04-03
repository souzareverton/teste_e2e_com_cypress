/// <reference path="../support/commands.d.ts" />

describe('Login', () => {
  it('successfully log in', () => {
    let emailAddress = Cypress.env.CYPRESS_USER_EMAIL || Cypress.env('USER_EMAIL')
    let password = Cypress.env.CYPRESS_USER_PASSWORD || Cypress.env('USER_PASSWORD')

    cy.guiLogin(emailAddress, password)

    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', ' Create a new note').should('be.visible')
  })
})
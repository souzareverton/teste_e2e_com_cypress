describe('Login', () => {
  it('successfully log in', () => {
    let emailAddress = Cypress.env('USER_EMAIL1') || Cypress.env('USER_EMAIL')
    let password = Cypress.env('USER_PASSWORD1') || Cypress.env('USER_PASSWORD')

    // if (!emailAddress || !password){
    //   emailAddress =
    //   password =
    // }

    cy.intercept('GET', '**/notes').as('getNotes')

    cy.visit('/login')
    cy.get('#email').type(emailAddress)
    cy.get('#password').type(password)
    cy.contains('button', 'Login').click()

    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', ' Create a new note').should('be.visible')
  })
})
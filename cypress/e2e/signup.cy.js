import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  it('successfully signs up using confirmation code sent via email', () => {

    let emailAddress = Cypress.env.CYPRESS_MAILOSAUR_SERVER_ID || `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
    let password = Cypress.env.CYPRESS_USER_PASSWORD || Cypress.env('USER_PASSWORD')

    cy.fillSignUpFormAndSubmit(emailAddress,password)
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', ' Create a new note').should('be.visible')
  })
})

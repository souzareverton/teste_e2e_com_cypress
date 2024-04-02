import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  it('successfully signs up using confirmation code sent via email', () => {

    let emailAddress = process.env.MAILOSAUR_SERVER_ID
    let password = process.env.USER_PASSWORD

    if (!emailAddress || !password){
      emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
      password = Cypress.env('USER_PASSWORD')
    }

    cy.fillSignUpFormAndSubmit(emailAddress,password)
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', ' Create a new note').should('be.visible')
  })
})

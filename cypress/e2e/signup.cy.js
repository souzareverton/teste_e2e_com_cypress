import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  it('successfully signs up using confirmation code sent via email', () => {

    let emailAddress = process.env.CYPRESS_MAILOSAUR_SERVER_ID1 || `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
    let password = process.env.CYPRESS_USER_PASSWORD1 || Cypress.env('USER_PASSWORD')

    // if (!emailAddress || !password){
    //   emailAddress =s
    //   password =
    // }

    cy.fillSignUpFormAndSubmit(emailAddress,password)
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', ' Create a new note').should('be.visible')
  })
})

Cypress.Commands.add('fillSignUpFormAndSubmit', (email, password) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  const mailosaur_id = Cypress.env.CYPRESS_MAILOSAUR_SERVER_ID || Cypress.env('MAILOSAUR_SERVER_ID')
  cy.mailosaurGetMessage((mailosaur_id), {
    sentTo: email
  }).then(message => {
    // Pode ser de uma das duas formas abaixo
    // const confirmationCode = message.html.body.match(/\d{6}/)[0]
    const confirmationCode = message.html.codes[0].value
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes')
  })
})

Cypress.Commands.add('fillLoginFormAndSubmit', (
  email = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')

  cy.visit('/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password, {log: false})
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes')  //Aguarda a requisição ser completada antes de fazer as validações
})

Cypress.Commands.add('sessionLogin', (
  email = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.fillLoginFormAndSubmit(email, password)
  cy.session(email, login)
})

const attachFileHandler = () => {
  cy.get('#file').selectFile('cypress/fixtures/example.json')
}

Cypress.Commands.add('createNote', (noteName, attachFile = false) => {
  cy.visit('/notes/new')

  cy.get('#content').type(noteName)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Create').should('be.enabled')
  cy.contains('button', 'Create').click()

  cy.contains('.list-group-item', noteName).should('be.visible')
})

Cypress.Commands.add('editNote', (noteName, newNoteName, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote') // pega de uma nota específica

  cy.contains('.list-group-item', noteName)
    .should('be.visible')
    .click()
  cy.wait('@getNote')

  cy.get('#content').clear()
  cy.get('#content').type(newNoteName)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', noteName).should('not.exist')
  cy.contains('.list-group-item', newNoteName).should('be.visible')
})

Cypress.Commands.add('deleteNote', (noteName) => {
  cy.contains('.list-group-item', noteName)
    .should('be.visible')
    .click()
  cy.contains('button', 'Delete').click()

  cy.get('.list-group-item')
    .its('length')
    .should('be.at.least', 1) // Verificação positiva antes da negativa, checa que o botão está sendo exibido
  cy.contains('.list-group-item',noteName).should('not.exist')
})

Cypress.Commands.add('fillSettingsFormAndSubmit', () => {
  cy.visit('/settings')

  cy.get('#storage').type('1')
  cy.get('#name').type('Mary Doe')

  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})
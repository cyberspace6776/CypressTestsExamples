// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('authenticate', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/')
    // No need to log in, if we're already logged in. It will just fail.
    if (Cypress.$('#user_email').length) {
    cy.get('#user_email').type(username)
    cy.get('#user_password').type(password, { sensitive: true })
    cy.get('.btn-primary').click()
    }
  })
})

Cypress.Commands.add('loginAsUser', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/')
    cy.get('#user_email').type(username)
    cy.get('#user_password').type(password, { sensitive: true })
    cy.get('.btn-primary').click()
  })
  cy.intercept('GET', 'https://appsource.powerbi.com/visuals.json').as('visuals')
  cy.visit('risk_dashboard')
  cy.getIframeBody().find('div.pbi-svg-item').should('not.exist')
  cy.wait('@visuals', { timeout: 10000 })
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    // eslint-disable-next-line no-param-reassign
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }
  return originalFn(element, text, options)
})

// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/#custom-command
Cypress.Commands.add('verifyIframeBodyPresence', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get('.report__report___E1Sqv > iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  )
})

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe, minimized log
  return (
    cy
      .get('.report__report___E1Sqv > iframe', { log: false })
      .its('0.contentDocument.body', { log: false })
      // wraps "body" DOM element to allow chaining like ".find(...)"
      .then((body) => cy.wrap(body, { log: false }))
  )
})


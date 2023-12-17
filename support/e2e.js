// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, _runnable) => {
  if (err.message.includes('getElementsByTagName')) {
    return false
  }
  // error on worldmap page
})

if (Cypress.config('hideXHRInCommandLog')) {
  const app = window.top

  if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style')
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }'
    style.setAttribute('data-hide-command-log-request', '')

    app.document.head.appendChild(style)
  }
}

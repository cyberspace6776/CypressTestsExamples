declare namespace Cypress {
  interface Chainable {
    /** creating session to authenticate using
     * username in config.js and password in cypress.env.json
     */
    authenticate(username: string, password: string)

    /** log in user using
     * username in config.js and password in cypress.env.json
     * go to risk_dashboard page and wait it is loaded
     */
    loginAsUser(username: string, password: string)

    /** working with an iFrame for Risk Dashboard
     * used to assert on correct loading of iFrame
     */
    verifyIframeBodyPresence()

    /** working with an iFrame for Risk Dashboard
     * used to chain further actions
     */
    getIframeBody(): Chainable<any>
  }
}

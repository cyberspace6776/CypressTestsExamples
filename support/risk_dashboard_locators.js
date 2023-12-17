// Labels
export const filterByDate = 'h3[aria-label*="Filter by date"]'
export const lastNumberOfDays = 'h3[aria-label*="Last number of days"]'
export const eventsByRisk = '[aria-label="Events by Risk "]'
// Input fields
export const dateField = 'input[aria-label*=" Available input range"]'
// export const startDateField = 'input[aria-label*="Start date. Available input range"]'
// Buttons and Bookmarks - bookmark word work in EN version, it is translated to local lang
export const resetAllButton = 'div[aria-label*="Bookmark . Clears all"]'
export const infoPanelIcon = 'div[aria-label*="Bookmark . Show Information Panel"]'
export const infoPanelVisible = 'div[aria-label*="Bookmark . Click anywhere"] div.imageBackground'
// Chart elements
export const horizontalBar = '[aria-label="Events by Risk "] rect.bar'
export const verticalColumn = '[aria-label*="Event Based Risks"] rect.column'
// Action Plans
const createdActionPlans = '[aria-label^="Created Action Plan"] tspan'
const activeActionPlans = '[aria-label^="Active Action Plan"] tspan'
const percentActive = '[aria-label^="% Active Action Plan"] tspan'

export function verifyActionPlanMetrics({ created, active, percent }) {
  cy.getIframeBody().find(createdActionPlans).should('have.text', created)
  cy.getIframeBody().find(activeActionPlans).should('have.text', active)
  cy.getIframeBody().find(percentActive).should('have.text', percent)
}

// Tabs
const navigationTab = (tabName) => `div[role="tab"] div[title="${tabName}"]`
export function goToTab(tabname) {
  cy.intercept('**/explore/resourcePackageItem/*.svg').as('infoIcon')
  cy.getIframeBody().find(navigationTab(tabname)).click()
  cy.wait('@infoIcon', { timeout: 12000 })
}

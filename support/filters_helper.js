// Filters
const filterDropdown = (filterName) => `div[aria-label="${filterName}"] > i`
// Dropdowns
const selectRecord = (filterName, recordName) =>
  `.slicerContainer div[aria-label="${filterName}"] span[title="${recordName}"]`
const filterDropdownRecordsCount = (filterName) => `.slicerContainer div[aria-label="${filterName}"] span[title]`

function clickFilterDropdownArrow(filterName) {
  cy.getIframeBody().find(filterDropdown(filterName)).click()
}

export function selectRecordInFilter(filterName, recordName) {
  clickFilterDropdownArrow(filterName)
  cy.getIframeBody().find(selectRecord(filterName, recordName)).click()
  clickFilterDropdownArrow(filterName) // need to close dropdown
}

export function countRecordsInFilter(filterName, recordsCount) {
  clickFilterDropdownArrow(filterName)
  cy.getIframeBody().find(filterDropdownRecordsCount(filterName)).should('have.length', recordsCount)

  clickFilterDropdownArrow(filterName)
}

export function checkRecordsInFilter(filterName, recordsCount, recordName) {
  clickFilterDropdownArrow(filterName)
  cy.getIframeBody().find(filterDropdownRecordsCount(filterName)).should('have.length', recordsCount)
  cy.getIframeBody()
    .find(filterDropdownRecordsCount(filterName), { log: false })
    .each((item, index) => {
      expect(Cypress.$(item).text()).to.eq(recordName[index])
    })
  clickFilterDropdownArrow(filterName)
}

export function checkNoRecordsInFilter(filterName) {
  clickFilterDropdownArrow(filterName)
  cy.getIframeBody()
    .find(`.slicer-dropdown-popup p.slicerEmptyResult`)
    .should('exist')
    .and('have.text', 'No results found')
  clickFilterDropdownArrow(filterName)
}



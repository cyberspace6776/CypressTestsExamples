import { checkNoRecordsInFilter, checkRecordsInFilter, selectCountryInFilter } from '../support/filters_helper'
import { goToTab, infoPanelIcon, infoPanelVisible, resetAllButton } from '../support/risk_dashboard_locators'

describe('Risk Dashboard UI specs', () => {
  beforeEach(() => {
    cy.authenticate(Cypress.env('MUSTERMANN_EMAIL'), Cypress.env('USER_PASSWORD'))
    cy.intercept('GET', 'https://app.powerbi.com/reportEmbed?*', (req) => {
      req.headers['accept-language'] = 'en-GB,en-US;q=0.9,en;q=0.8'
    })
    cy.visit('risk_dashboard')
  })

  context('Infopanel and Reset Selection Buttons', () => {
    const tabs = ['Risk Overview', 'Heat Map', 'Top Risk Scores']

    tabs.forEach((tab) => {
      it(`displays infopanel on ${tab}`, () => {
        goToTab(tab)
        cy.getIframeBody().find(infoPanelVisible).should('not.exist')
        cy.getIframeBody().find(infoPanelIcon).click()
        cy.getIframeBody().find(infoPanelVisible, { timeout: 12000 }).should('be.visible')
      })

      it(`has Reset Selection button reseting filters on ${tab}`, () => {
        // test is based on selecting country and checking Own Responsibility filter change
        goToTab(tab)
        selectCountryInFilter('Spain')
        checkNoRecordsInFilter('Own Responsibility')
        cy.getIframeBody().find(resetAllButton).click()
        checkRecordsInFilter('Own Responsibility', 1, ['Yes'])
      })
    })
  })

})

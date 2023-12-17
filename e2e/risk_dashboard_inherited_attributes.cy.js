import { riskobjectdata } from '../fixtures/risk_data_sample.json';
import { checkRecordsInFilter, selectRecordInFilter } from '../support/filters_helper';
import { verifyActionPlanMetrics } from '../support/risk_dashboard_locators';

// customer: Risk Dashboard with AP Test Automation
describe(`Risk object inherited attributes are visible for user with filter`, () => {
  beforeEach(() => {
    const user = 'user@internal.email.com'
    cy.loginAsUser(user, Cypress.env('USER_PASSWORD'))
  })

  riskobjectdata.forEach((riskobject) => {
    it(`verifies attributes for risk object ${riskobject.riskObjectName}`, () => {
      selectRecordInFilter('Risk Object Type', riskobject.riskObjectType)
      checkRecordsInFilter('Business Unit', riskobject.BUlist.length, riskobject.BUlist)
      checkRecordsInFilter('Category', riskobject.CATlist.length, riskobject.CATlist)
      checkRecordsInFilter('Product Group', riskobject.PGlist.length, riskobject.PGlist)
    })
  })

  it(`verifies supply paths list `, () => {
    // SupplyPath1 is not in the list since user is not responsible
    const supplyPathList = ['Select all', 'SupplyPath2', 'SupplyPath3', 'SupplyPath4']

    selectRecordInFilter('Risk Object Type', 'Supply Paths')
    checkRecordsInFilter('Risk Object Name', supplyPathList.length, supplyPathList)
    checkRecordsInFilter('Country', 2, ['Select all', '(Blank)'])

  });

  it('verifies user see Action Plans Metrics', () => {
    // User doesn't see active action plan on SupplyPath1
    verifyActionPlanMetrics({ created: 2, active: 1, percent: 50 })

    // deactivated action plan is not counted
    selectRecordInFilter('Risk Object Name', 'Germany')
    verifyActionPlanMetrics({ created: 0, active: 0, percent: 0 })

    selectRecordInFilter('Risk Object Name', 'Customer1')
    verifyActionPlanMetrics({ created: 1, active: 1, percent: 100 })

    // created action plan is no longer active as it has status done
    selectRecordInFilter('Risk Object Name', 'SupplyPath3')
    selectRecordInFilter('Risk Object Type', 'Supply Paths')
    verifyActionPlanMetrics({ created: 1, active: 0, percent: 0 })

  });
})

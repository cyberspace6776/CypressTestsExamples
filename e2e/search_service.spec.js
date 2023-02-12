import * as usersPage from '../../../pages/rm_customer/usersOverviewPage';
import * as suppliersPage from '../../../pages/risk_objects/suppliers/suppliersOverviewPage';
import * as supplierEditionPage from '../../../pages/risk_objects/suppliers/supplierEditionPage';
import * as bgPage from '../../../pages/admin_area/backgroundPage';
import * as apiv1 from '../../../helpers/apiv1_helper';
import { AdminSubscriptionPage } from '../../../pages/subscriptions/adminSubscriptionPage';
import { AdminCustomersPage } from '../../../pages/rm_customer/customerCreationPage';

let riskmethodsCustomer; let randomNumber;
const dataSourceName = 'Bureau van Dijk © (v2)';

describe('Checking the BvD search service', () => {
  before(() => {
    randomNumber = `${Cypress._.random(0, 1e10)}`;
    riskmethodsCustomer = `Autobot id_search_BvD_V2_${randomNumber}`;

    cy.visit('admins').authenticate();
  });

  it('BvD V2 integration id is received from search service', () => {
    const subscriptionsPage = new AdminSubscriptionPage(riskmethodsCustomer);
    const adminCustomersPage = new AdminCustomersPage(riskmethodsCustomer);

    adminCustomersPage.createClient();
    usersPage.setAPItoken(riskmethodsCustomer);
    apiv1.createSupplier('BMW', 'x', 'x', 'x', 'de');
    subscriptionsPage.addSubscription(dataSourceName);
    subscriptionsPage.activateSubscription(dataSourceName);
    bgPage.waitForBGjob(riskmethodsCustomer);

    usersPage.impersonate(riskmethodsCustomer);
    suppliersPage.edit('BMW');
    supplierEditionPage.bvdIdSearch();
    supplierEditionPage.selectBvdV2SearchResultNumber(2);
    supplierEditionPage.shouldHaveSomeReferenceId('Bureau van Dijk ID (v2)');
  });
});

describe('Checking the browser alert if RO required details are not supplied while using search service', () => {
  before(() => {
    randomNumber = `${Cypress._.random(0, 1e10)}`;
    riskmethodsCustomer = `Autobot id_search_BvD_V2_${randomNumber}`;

    cy.visit('admins').authenticate();
  });

  it('BvD V2 search is not executed', () => {
    const subscriptionsPage = new AdminSubscriptionPage(riskmethodsCustomer);
    const adminCustomersPage = new AdminCustomersPage(riskmethodsCustomer);
    adminCustomersPage.createClient();
    usersPage.setAPItoken(riskmethodsCustomer);
    apiv1.createSupplier('Dummy supplier', 'x', 'x', 'x', 'de');
    subscriptionsPage.addSubscription(dataSourceName);
    subscriptionsPage.activateSubscription(dataSourceName);
    bgPage.waitForBGjob(riskmethodsCustomer);

    usersPage.impersonate(riskmethodsCustomer);
    suppliersPage.create();
    supplierEditionPage.bvdIdSearch();
    cy.browserAlertFound(
      'Please fill out all required fields to proceed with the search.',
    );
  });
});

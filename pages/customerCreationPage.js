export class AdminCustomersPage {
  constructor(customerName) {
    this.customerName = customerName;
  }

  createClient() {
    cy.visit('admins/customers/new');
    cy.get('#customer_name').type(this.customerName);
    cy.get('input[name="commit"]').click();

    cy.contains('Customer created.').should('exist');
    // get master token to use api
    cy.get('#customer_api_token')
      .invoke('val')
      .then((masterToken) => {
        cy.task('setMasterToken', masterToken);
      });
    cy.url().then((url) => {
      const customerId = url.split('/')[5];
      cy.task('setCustomerId', customerId);
    });
  }
  addFeatureFlag(flagName) {
    cy.task('getCustomerId').then((customerId) => {
      cy.visit(`admins/customers/${customerId}/security`);
      // title="Edit Security Settings"
      cy.get('input[name="feature_setting_name"').type(flagName);
      cy.get('input[value="Add"]').click();
    });
  }
}

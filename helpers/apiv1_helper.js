function getUserTokenByAPI() {
  cy.task('getMasterToken').then((masterToken) => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_V1_URL')}tokens`,
      headers: {
        // eslint-disable-next-line no-buffer-constructor
        Authorization: `Basic ${new Buffer(masterToken).toString('base64')}`,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      return resp.body.users[0].token;
    }).as('userToken');
  });
}

export function createSupplier(
  supplierName,
  address,
  city,
  zipCode,
  countryCode,
) {
  getUserTokenByAPI();
  cy.get('@userToken').then((userToken) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_V1_URL')}suppliers`,
      headers: {
        // eslint-disable-next-line no-buffer-constructor
        Authorization: `Basic ${new Buffer(userToken).toString('base64')}`,
      },
      body: {
        supplier: {
          name: supplierName,
          address: {
            address1: address,
            city,
            zip_code: zipCode,
            country_code: countryCode,
          },
        },
      },
    })
      .its('status')
      .should('eq', 201);
  });
}

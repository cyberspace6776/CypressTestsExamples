export function bvdIdSearch() {
  cy.intercept('/risk_object/business_partners/bvd_id_search').as('getSearchResults');
  cy.get('.automated_bureau_van_dijk_search').click();
}

export function hasBvdSearchResult(supplier) {
  cy.get('div[id="bureau-van-dijk-search-modal-body"]').should(
    'contain',
    supplier,
  );
}

export function selectBvdV2SearchResultNumber(index) {
  cy.wait('@getSearchResults');
  cy.get('#bureau-van-dijk-search-modal-body')
    .find('tbody>tr')
    .eq(index)
    .within(() => {
      cy.get('input[type="radio"]').click();
    });

  cy.contains('Select & get data').click();
}

export function selectBvdSearchResult(supplier) {
  cy.get('div[id="bureau-van-dijk-search-modal-body"]').within(() => {
    cy.contains(supplier)
      .siblings()
      .within(() => {
        cy.get('input[type="radio"]').click();
      });
  });
  cy.contains('Select & get data').click();
}

export function shouldHaveSomeReferenceId(dataSourceName) {
  cy.contains(dataSourceName)
    .parent('div')
    .within(() => {
      cy.get('input').invoke('val').should('not.be.empty');
    });
}

export function save() {
  cy.get('input[type="submit"]').click();

  cy.contains('Risk Object updated.').should('exist');
}


export function shouldHaveScore() {
  cy.get('.final-score').should('not.contain', 'N/A');
}

export function shouldHaveNoScore() {
  cy.get('.final-score').should('contain', 'N/A');
}

export function shouldHaveAttachment(name, remainingTries = 30) {
  cy.get('#score_card_document_accordion').then(($body) => {
    if ($body.text().includes('.pdf') || remainingTries <= 0) {
      cy.get('#score_card_documents a').contains('a', name).should('exist');
    } else {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000)
        .reload()
        .then(() => {
          shouldHaveAttachment(name, remainingTries - 1);
        });
    }
  });
}

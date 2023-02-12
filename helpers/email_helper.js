export function emailReceived(subject, emailId, delay) {
  cy.request(
    `https://api.testmail.app/api/json?apikey=${
      Cypress.env('TESTMAIL_API_KEY')
    }&livequery=true&timestamp_from=${
      Date.now() - delay * 1000
    }&namespace=5wk6l&tag=${
      emailId}`,
  ).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.emails[0].subject).to.include(subject);
  });
}

export function emailHasAttachmentFile(fileType, emailId, delay) {
  cy.request(
    `https://api.testmail.app/api/json?apikey=${
      Cypress.env('TESTMAIL_API_KEY')
    }&livequery=true&timestamp_from=${
      Date.now() - delay * 1000
    }&namespace=5wk6l&tag=${
      emailId}`,
  ).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.emails[0].attachments[0].filename).to.include(
      fileType,
    );
  });
}

export function attachmentHasMessage(message, emailId, delay) {
  cy.request(
    `https://api.testmail.app/api/json?apikey=${
      Cypress.env('TESTMAIL_API_KEY')
    }&livequery=true&timestamp_from=${
      Date.now() - delay * 1000
    }&namespace=5wk6l&tag=${
      emailId}`,
  ).then((response) => {
    expect(response.status).to.equal(200);
    cy.forceVisit(response.body.emails[0].attachments[0].downloadUrl);
    cy.get('body').should('contain', message);
  });
}
Cypress.Commands.add('forceVisit', (url) => {
  cy.window().then((win) => win.open(url, '_self'));
});

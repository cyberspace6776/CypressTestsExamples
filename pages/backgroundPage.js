export function waitForJobsToAppear(user, tries = 10) {
  if (tries < 1) {
    cy.get(`td:contains(${user})`).should('exist');
  }
  cy.log(`Waiting for job to appear ${tries}`);
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.visit('admins/background_processes?per_page=100&pending_per_page=100')
    .wait(1500)
    .then(() => {
      cy.document().then(($document) => {
        if (
          [...$document.querySelectorAll('td')]
            .map((td) => td.innerText)
            .filter((txt) => txt.includes(user)).length
        ) {
          cy.log('Job appeared');
        } else {
          cy.log('Job not appeared yet').then(() => {
            waitForJobsToAppear(user, tries - 1);
          });
        }
      });
    });
  cy.on('uncaught:exception', (_err, _runnable) => false);
}
export function waitForBGjob(customerName) {
  cy.visit('admins/background_processes?per_page=100&pending_per_page=100');

  cy.waitUntil(() => cy.reload().then(() => Cypress.$(`td:contains(${customerName})`).length === 0), {
    verbose: true,
    customCheckMessage: 'job not visible', // validation message
    errorMsg: 'Timed out retrying message',
    timeout: 300000, // waits up to 5 minutes, default 5000ms
    interval: 10000, // performs the check every 10s
    customMessage: 'background job is over', // command name
  });
  cy.get(`td:contains(${customerName})`).should('not.exist');
}

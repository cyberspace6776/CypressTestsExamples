const { defineConfig } = require('cypress');

let masterToken;
let customerId;
let customerName;

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 9000,
  video: true,
  videoUploadOnPasses: false,
  videoCompression: 20,
  viewportHeight: 900,
  viewportWidth: 1440,
  projectId: '',
  watchForFileChanges: false,
  hideXHRInCommandLog: true,
  // retries: 1,
  e2e: {
    experimentalRunAllSpecs: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, _config) {
      on('task', {
        setMasterToken: (val) => { masterToken = val; return masterToken; },
        getMasterToken: () => masterToken,

        setCustomerId: (val) => { customerId = val; return customerId; },
        getCustomerId: () => customerId,

        setCustomerName: (val) => { customerName = val; return customerName; },
        getCustomerName: () => customerName,
      });
    },
    baseUrl: '',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
  env: {

  },
});

module.exports = {
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}', // Update the specPattern to look in the e2e folder
    setupNodeEvents(on, config) {
      // Set up node event listeners here
      return config;
    },
    baseUrl: 'http://localhost:5000/api',
  },
};



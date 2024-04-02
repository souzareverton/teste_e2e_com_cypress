const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'uy49kd',
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

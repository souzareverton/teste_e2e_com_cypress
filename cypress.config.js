const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'uy49kd',
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768,
    },

    //setupNodeEvents(on, config) {
    // implement node event listeners here
    //},
  },
})

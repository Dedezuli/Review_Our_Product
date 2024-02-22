const { defineConfig } = require('cypress')
const webpack = require('@cypress/webpack-preprocessor')
const path = require('path')

// Populate process.env with values from .env file
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      path.resolve(__dirname, './cypress/support')
      require('cypress-mochawesome-reporter/plugin')(on)
      require('./cypress/plugins/index.js')(on, config)
      on(
        'file:preprocessor',
        webpack({
          webpackOptions: {
            resolve: {
              alias: {
                '@Support': path.resolve('cypress/support/'),
                '@Fixtures': path.resolve('cypress/fixtures/'),
                '@Utils': path.resolve('cypress/utils/'),
                '@Model': path.resolve('cypress/model/'),
              },
            },
          },
        }),
      )
    },
    paths: {
      '@components': 'cypress/support',
    },
        chromeWebSecurity: false,
        baseUrl: "https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u",
        viewportWidth: 1800,
        viewportHeight: 1300,
        defaultCommandTimeout: 10000,
    }
});

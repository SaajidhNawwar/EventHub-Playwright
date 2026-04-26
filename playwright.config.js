// @ts-check
const { defineConfig } = require('@playwright/test');
const path = require('path');         // 👈 add this
require('dotenv').config();

module.exports = defineConfig({       // 👈 module.exports, NOT export default
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],                                    
    ['html'],                                    
    ['allure-playwright', { 
      outputFolder: 'allure-results',            
      suiteTitle: false 
    }]
  ],
  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: process.env.BASE_URL,    // 👈 add this
    channel: 'chrome',
    headless: !!process.env.CI,
    viewport: { width: 1520, height: 1080 },
    storageState: path.join(__dirname, 'storageState.json'),  // 👈 absolute path
    trace: 'on',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'login',
      testMatch: '**/login.spec.js',
      // inherits everything from global use block above
    },
    {
      name: 'createEvent',
      testMatch: '**/createEvent.spec.js',
      dependencies: ['login'],
      // inherits everything from global use block above
    },
    {
      name: 'bookEvent',
      testMatch: '**/bookEvent.spec.js',
      dependencies: ['createEvent'],
    },
  ],
});
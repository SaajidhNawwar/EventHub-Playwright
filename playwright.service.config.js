const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('./playwright.config');


module.exports = defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential,
  }),
  {
    reporter: [
      ['line'],
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],  // ✅ works in 1.1.5
    ],
  }
);
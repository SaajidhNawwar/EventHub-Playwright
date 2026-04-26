const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { AzureCliCredential } = require('@azure/identity');
const config = require('./playwright.config');

console.log('🔍 PLAYWRIGHT_SERVICE_URL:', process.env.PLAYWRIGHT_SERVICE_URL ? '✅ exists' : '❌ MISSING');

module.exports = defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 10 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new AzureCliCredential(),
  }),
  {
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);
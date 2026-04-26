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
    credential: new ClientSecretCredential(  // 👈 this was missing
      process.env.AZURE_TENANT_ID,
      process.env.AZURE_CLIENT_ID,
      process.env.AZURE_CLIENT_SECRET,
    ),
  }),
  {
    reporter: [
      ['line'],
      ['html', { open: 'never' }],
      ['@azure/playwright/reporter'],
    ],
  }
);
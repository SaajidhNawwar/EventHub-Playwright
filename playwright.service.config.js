const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('./playwright.config');

console.log('🔍 AZURE_TENANT_ID:', process.env.AZURE_TENANT_ID ? '✅ exists' : '❌ MISSING');
console.log('🔍 AZURE_CLIENT_ID:', process.env.AZURE_CLIENT_ID ? '✅ exists' : '❌ MISSING');
console.log('🔍 AZURE_CLIENT_SECRET:', process.env.AZURE_CLIENT_SECRET ? '✅ exists' : '❌ MISSING');
console.log('🔍 PLAYWRIGHT_SERVICE_URL:', process.env.PLAYWRIGHT_SERVICE_URL ? '✅ exists' : '❌ MISSING');

module.exports = defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new ClientSecretCredential(
      process.env.AZURE_TENANT_ID,
      process.env.AZURE_CLIENT_ID,
      process.env.AZURE_CLIENT_SECRET,
    ),
  }),
  {
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);
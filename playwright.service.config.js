const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('./playwright.config');

console.log('🔍 AZURE_TENANT_ID:', process.env.AZURE_TENANT_ID ? '✅ exists' : '❌ MISSING');
console.log('🔍 AZURE_CLIENT_ID:', process.env.AZURE_CLIENT_ID ? '✅ exists' : '❌ MISSING');
console.log('🔍 AZURE_CLIENT_SECRET:', process.env.AZURE_CLIENT_SECRET ? '✅ exists' : '❌ MISSING');
console.log('🔍 PLAYWRIGHT_SERVICE_URL:', process.env.PLAYWRIGHT_SERVICE_URL ? '✅ exists' : '❌ MISSING');

let credential;
try {
  credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET,
  );
  // Test the credential immediately!!!
  credential.getToken('https://management.azure.com/.default')
    .then(token => console.log('✅ Credential token obtained successfully'))
    .catch(err => console.error('❌ Credential token failed:', err.message));
} catch (err) {
  console.error('❌ Credential creation failed:', err.message);
}

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
      ["html", { open: "never" }],
      ["@azure/playwright"],  // 👈 without /reporter
    ],
  }
);
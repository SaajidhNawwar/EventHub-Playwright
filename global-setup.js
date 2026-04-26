const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pageObjects/LoginPage');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

module.exports = async function globalSetup() {
  console.log('🚀 Global setup starting...');
  console.log('🔍 BASE_URL:', process.env.BASE_URL);
  console.log('🔍 EMAIL:', process.env.EMAIL);
  console.log('🔍 PASSWORD:', process.env.PASSWORD ? '***exists***' : '❌ MISSING');

  const browser = await chromium.launch({ 
    channel: 'chrome',
    headless: !!process.env.CI,
    slowMo: process.env.CI ? 0 : 500
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate and fill credentials manually here
    // bypassing LoginPage class to rule out any issue with it
    await page.goto(process.env.BASE_URL);
    console.log('🔍 Page URL before login:', page.url());

    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.EMAIL);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD);
    
    console.log('🔍 Credentials filled, clicking Sign in...');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // 👇 Wait for URL to change away from login page
    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
    console.log('🔍 After login URL:', page.url());

    // 👇 Wait for token to appear in localStorage
    await page.waitForFunction(
      () => localStorage.getItem('eventhub_token') !== null,
      { timeout: 10000 }
    );

    const token = await page.evaluate(() => localStorage.getItem('eventhub_token'));
    console.log('🔍 Token saved:', token ? '✅ exists' : '❌ missing');

    const storageStatePath = path.join(__dirname, 'storageState.json');
    await context.storageState({ path: storageStatePath });

    console.log('✅ storageState saved at:', storageStatePath);
    console.log('✅ File exists:', fs.existsSync(storageStatePath));

  } catch (error) {
    console.error('❌ Global setup FAILED:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
};
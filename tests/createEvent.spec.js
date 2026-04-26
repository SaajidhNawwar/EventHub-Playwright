const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
require('dotenv').config();

test('Create Event', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.waitForLoadState('networkidle');

  // Debug: check token and current state
  const token = await page.evaluate(() => localStorage.getItem('eventhub_token'));
  console.log('🔍 Token in context:', token);
  console.log('🔍 Current URL:', page.url());

  // Verify we're logged in by checking the "Featured Events" h2
  await expect(page.getByRole('heading', { name: 'Featured Events' })).toBeVisible();

  const poManager = new POManager(page);
  const createEventPage = poManager.getCreateEventPage();
  await createEventPage.createNewEvent();
});
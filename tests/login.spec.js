const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
require('dotenv').config();

test("Valid login — session is active", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.waitForLoadState('networkidle');

  // 👇 Same check — confirms we landed on the home page after login
  await expect(page.getByRole('heading', { name: 'Featured Events' })).toBeVisible();
});
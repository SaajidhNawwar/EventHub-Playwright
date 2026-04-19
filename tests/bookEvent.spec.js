const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
require('dotenv').config();

test("Book an Event", async ({page}) => {
    await page.goto(process.env.BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Featured Events' })).toBeVisible();
    const poManager = new POManager(page);
    const bookEventPage = poManager.getBookEventPage();
    await bookEventPage.bookEvent();
})
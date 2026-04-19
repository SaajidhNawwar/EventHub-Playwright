const { expect } = require("@playwright/test");
const testData = require("../Utils/testData.json");

class BookEventPage {
    constructor(page){
        this.page = page;
        this.chooseEvent = page.getByRole('link', { name: 'Book Now' }).nth(3)
        this.inputFullName = page.getByRole("textbox", { name: "Full Name" });
        this.inputEmail = page.getByRole("textbox", { name: "Email" });
        this.inputPhone = page.getByRole("textbox", { name: "Phone Number" });
        this.btnConfirmBooking = page.getByRole('button', { name: 'Confirm Booking' });
        this.txtBookingConfirmed = page.locator("//h3[contains(@class,'text-xl font-bold')]");
        this.btnViewMyBookings = page.getByRole('button', { name: 'View My Bookings' });
        this.viewBookingDetails = page.getByRole('button', { name: 'View Details' }).first();
        this.verifyName = page.locator("(//span[contains(@class,'text-sm font-medium text-gray-900 text-right')])[6]");
    }

    async bookEvent(){

        const { fullName, email, phone } = testData.bookEvent;

        await this.chooseEvent.click();
        await this.page.waitForLoadState('networkidle');
        await this.inputFullName.fill(fullName);
        await this.inputEmail.fill(email);
        await this.inputPhone.fill(phone);
        await this.btnConfirmBooking.click();
        await expect(this.txtBookingConfirmed).toHaveText("Booking Confirmed! 🎉");
        await this.btnViewMyBookings.click();
        await this.viewBookingDetails.click();
        await expect(this.verifyName).toHaveText(fullName);
    }
}
module.exports = { BookEventPage };
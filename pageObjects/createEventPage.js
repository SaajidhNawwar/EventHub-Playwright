const testData = require("../Utils/testData.json");

class CreateEventPage {
    constructor(page){
        this.page = page;
        this.btnEvents = page.getByText('Events', { exact: true })
        this.btnCreateEvent = page.getByRole('button', { name: 'Add New Event' })
        this.inputEventTitle = page.getByPlaceholder("Event title");
        this.inputEventDescription = page.getByRole('textbox', { name: 'Describe the event…' })
        this.categoryDropdown = page.locator("#category");
        this.inputCity = page.getByLabel("City");
        this.inputVenue = page.getByLabel("Venue");
        this.inputDateTime = page.locator('[id="event-date-&-time"]');
        this.inputPrice = page.getByRole("spinbutton", {name: "Price ($)"});
        this.inputTotalSeats = page.getByRole("spinbutton", {name: "Total Seats"});
        this.uploadImage = page.getByRole('textbox', { name: 'Image URL (optional)' });
        this.btnAddEvent = page.getByRole('button', { name: '+ Add Event' });
    }

    async createNewEvent(){

        const { title, description, category, city, venue, dateTime, price, totalSeats, imageUrl } = testData.createEvent;

        await this.btnEvents.click();
        await this.page.waitForLoadState('networkidle');
        await this.btnCreateEvent.click();  
        await this.inputEventTitle.fill(title);
        await this.inputEventDescription.fill(description);
        await this.categoryDropdown.selectOption(category);
        await this.inputCity.fill(city);
        await this.inputVenue.fill(venue);
        await this.inputDateTime.fill(dateTime);
        await this.inputPrice.fill(price);
        await this.inputTotalSeats.fill(totalSeats);
        await this.uploadImage.fill(imageUrl);
        await this.btnAddEvent.click();
        await this.page.waitForTimeout(1000);
    }
}
module.exports = { CreateEventPage };
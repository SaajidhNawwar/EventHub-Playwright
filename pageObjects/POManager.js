const {LoginPage} = require('./loginPage');
const {CreateEventPage} = require('./createEventPage');
const {BookEventPage} = require('./bookEventPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.createEventPage = new CreateEventPage(page);
        this.bookEventPage = new BookEventPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCreateEventPage() {
        return this.createEventPage;
    }

    getBookEventPage() {
        return this.bookEventPage;
    }
}
module.exports = { POManager };
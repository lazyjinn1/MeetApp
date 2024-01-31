import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 250, // slow down by 250ms,
            // timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event-element');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event-element .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event-element .details-btn');
        const eventDetails = await page.$('.event-element .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event-element .details-btn');
        const eventDetails = await page.$('.event-element .details');
        expect(eventDetails).toBeNull();
    });

    test('User can change the number of Events shown', async () => {
        const numberOfEventsInput = await page.$('#numberOfEventsInput');
        const eventList = await page.$('#event-list');

        const inputValue = await page.$eval('#numberOfEventsInput', elements => elements.value);

        await page.click('#numberOfEventsInput');

        // for loop to emulate backspaces equal to the amount of characters in the input
        for (let i = 0; i < inputValue.length; i++) {
            await page.keyboard.press('Backspace');
        }
        await numberOfEventsInput.type('10');
        await page.waitForTimeout(1000);

        // we use $$eval as opposed to $eval because there are multiple elements
        const events = await eventList.$$eval('.event-element', elements => elements.length);
        expect(events).toBe(10);
    });

    test('User can change the location for Events shown', async () => {
        const citySearchInput = await page.$('#city-search');

        // Click on the search input to focus it
        await page.click('#city-search');

        // Type 'Berlin' into the search input
        await citySearchInput.type('Berlin');

        // Wait for suggestions to be visible
        await page.waitForSelector('.suggestions');

        // Click on the first suggestion
        await page.click('.suggestions li');

        // Wait for the UI to update
        await page.waitForTimeout(1000);

        const events = await page.$$eval('.event-element', (eventElements) => {
            return eventElements.map((event) => {
                return event.querySelector('.event-location').textContent;
            });
        });
        
        // Assert that none of the locations match 'Berlin, Germany'
        for (const locationText of events) {
            expect(locationText).toBe('Location: Berlin, Germany');
        }
    });

});
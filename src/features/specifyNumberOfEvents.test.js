/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    let AppComponent;
    let EventListDOM;
    let AppDOM;

    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {

        given('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the user has not specified a number of events', () => { });

        then('the user should see a list of 32 upcoming events', async () => {
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        given('the user has opened the app', () => {
            AppComponent = render(<App />);
        });
        when('the user specifies the number of events as 10', async () => {
            AppDOM = AppComponent.container.firstChild;
            const cityNumberDOM = AppDOM.querySelector('#numberOfEvents');
            const cityNumberInput = within(cityNumberDOM).queryByRole('textbox');
            const user = userEvent.setup();
            await user.type(cityNumberInput, '{backspace}{backspace}10')
        });

        then('the user should see a list of 10 upcoming events', async () => {
            EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});

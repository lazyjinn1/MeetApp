/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';
import React from 'react';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let eventElement;
  let AppComponent;
  let AppDOM;
  let allEvents;
  let eventListDOM;

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });
    when('the user opens the app', async () => {
      AppDOM = AppComponent.container.firstChild;
      eventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(eventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
    then('each event element should be in a collapsed state by default', () => {
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {
    given('an event is collapsed by default', async () => {
      allEvents = await getEvents();
      eventElement = render(<Event event={allEvents[0]} />);
      expect(eventElement.container.querySelector('.details')).not.toBeInTheDocument();
    });

    when('the user clicks on the details-btn button', async () => {
      const detailsButton = eventElement.queryByText('Expand Details');
      const user = userEvent.setup();
      await user.click(detailsButton);
    });

    then('the details of that event should be visible', () => {
      expect(eventElement.container.querySelector('.details')).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {
    given('an event is expanded to show details', async () => {
      allEvents = await getEvents();
      eventElement = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const detailsButton = eventElement.queryByText('Expand Details');
      await user.click(detailsButton);
      expect(eventElement.container.querySelector('.details')).toBeInTheDocument();
    });

    when('the user clicks on the details-btn button', async () => {
      const user = userEvent.setup();
      const detailsButton = eventElement.queryByText('Collapse Details');
      await user.click(detailsButton);
    });

    then('the details of that event should be hidden', () => {
      expect(eventElement.container.querySelector('.details')).not.toBeInTheDocument();
    });
  });
});

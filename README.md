# Meet App

## Project description
A serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique.

## The API the project uses
The application uses the Google Calendar API to fetch upcoming events.

## Serverless Functions
This app uses serverless functions for authorizing access to public calendar events from the Google Calendar API. The user enters a key and secret to ask for an access token from the authorization server. The server informs the user with a consent screen. When the user agrees by logging into their Google account and giving consent, the app can fetch and show the calendar events.

## Key Features:

### Feature 2: Show/Hide Event Details

- As a user, I should be able to see an event element collapsed by default, so that the interface remains uncluttered.
- As a user, I should be able to expand an event to see its details, so that I can learn more about events I'm interested in.
- As a user, I should be able to collapse an event to hide its details, so that I can minimize information overload.

### Feature 3: Specify Number of Events

- As a user, I should see 32 events by default when I haven't specified a number, so that I have a manageable number of events to browse initially.
- As a user, I should be able to change the number of events displayed, so that I can customize my viewing experience according to my preferences.

### Feature 4: Use the App When Offline

- As a user, I should be able to see cached data when there’s no internet connection, so that I can access information offline.
- As a user, I should be shown an error when I change search settings (like city, number of events) without an internet connection, so that I understand why the app isn't functioning as expected.

### Feature 5: Add an App Shortcut to the Home Screen

- As a user, I should be able to install the meet app as a shortcut on my device’s home screen, so that I can quickly and easily access the app.

### Feature 6: Display Charts Visualizing Event Details

- As a user, I should be able to view a chart with the number of upcoming events in each city, so that I can visually understand event distribution and plan accordingly.


### Feature 2: Show/Hide Event Details

#### Given the event element is collapsed by default,
- When I view the event,
- Then I should see a concise interface.
#### Given an event is displayed,
- When I choose to expand the event,
- Then I should see detailed information about the event.
#### Given an event's details are displayed,
- When I choose to collapse the event,
- Then the details should be hidden to reduce clutter.

### Feature 3: Specify Number of Events

#### Given I haven't specified the number of events,
- When I open the event list,
- Then 32 events should be displayed by default.
#### Given the event list is displayed,
- When I change the number of events to be displayed,
- Then the event list should update to show the specified number of events.

### Feature 4: Use the App When Offline

#### Given there is no internet connection,
- When I access the app,
- Then I should see cached data from previous sessions.
#### Given there is no internet connection,
- When I try to change search settings,
- Then I should receive an error message explaining the lack of internet connectivity.

### Feature 5: Add an App Shortcut to the Home Screen

#### Given I am using the meet app,
- When I choose to add the app to my home screen,
- Then a shortcut to the app should be created on my device's home screen.

### Feature 6: Display Charts Visualizing Event Details

#### Given I am viewing event details,
- When I access the chart section,
- Then I should see a chart visualizing the number of upcoming events in each city.
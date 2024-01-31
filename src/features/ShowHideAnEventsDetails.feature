Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default.
    Given the main page is open
    When the user opens the app
    Then each event element should be in a collapsed state by default

  Scenario: User can expand an event to see details.
    Given an event is collapsed by default
    When the user clicks on the details-btn button
    Then the details of that event should be visible

  Scenario: User can collapse an event to hide details.
    Given an event is expanded to show details
    When the user clicks on the details-btn button
    Then the details of that event should be hidden

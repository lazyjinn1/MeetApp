Feature: Specify Number of Events

  Scenario: When user has not specified a number, 32 events are shown by default.
    Given the user opens the app
    When the user has not specified a number of events
    Then the user should see a list of 32 upcoming events

  Scenario: User can change the number of events displayed.
    Given the user has opened the app
    When the user specifies the number of events as 10
    Then the user should see a list of 10 upcoming events
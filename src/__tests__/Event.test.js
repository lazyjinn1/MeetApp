/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
// Event.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('Event Component', () => {
  let EventComponent;
  let mockEvents;

  beforeEach(async () => {
    mockEvents = await getEvents();
    EventComponent = render(<Event event={mockEvents[0]} />);
  });

  test('displays event title', () => {
    const eventTitleMatcher = (content, element) =>
      element.tagName.toLowerCase() === 'h3' && content.includes('Title:');
    expect(EventComponent.getByText((content, element) => eventTitleMatcher(content, element))).toBeInTheDocument();
  });

  test('displays event description', () => {
    fireEvent.click(EventComponent.getByText('Expand Details'));
    const descriptionMatcher = (content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('Description:');
    expect(EventComponent.getByText((content, element) => descriptionMatcher(content, element))).toBeInTheDocument();
  });

  test('displays event start time', () => {
    fireEvent.click(EventComponent.getByText('Expand Details'));
    const startTimeMatcher = (content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('Event Date:');
    expect(EventComponent.getByText((content, element) => startTimeMatcher(content, element))).toBeInTheDocument();
  });

  test('displays event location', () => {
    const locationMatcher = (content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('Location:');
    expect(EventComponent.getByText((content, element) => locationMatcher(content, element))).toBeInTheDocument();
  });

  test('displays Expand Details button', () => {
    expect(EventComponent.getByText('Expand Details')).toBeInTheDocument();
  });

  test('collapses an event by default', () => {
    expect(EventComponent.getByTestId('event-element')).toHaveClass('collapsed');
  });

  test('expands details on Expand Details button click', () => {
    fireEvent.click(EventComponent.getByText('Expand Details'));
    expect(EventComponent.getByTestId('event-element')).toHaveClass('expanded');
  });

  test('collapses details on Collapse Details button click', () => {
    fireEvent.click(EventComponent.getByText('Expand Details'));
    fireEvent.click(EventComponent.getByText('Collapse Details'));
    expect(EventComponent.getByTestId('event-element')).toHaveClass('collapsed');
  });
});

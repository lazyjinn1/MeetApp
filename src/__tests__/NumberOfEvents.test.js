/* eslint-disable testing-library/no-render-in-setup */
// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

    beforeEach(() => {
        // Mock function for onNumberOfEventsChange
        const mockNumberOfEventsChange = jest.fn();
        render(<NumberOfEvents onNumberOfEventsChange={mockNumberOfEventsChange} />);
    });
    
    test('NumberOfEvents component contains an element with role "textbox"', () => {
        const textBoxElement = screen.getByRole('textbox');
        expect(textBoxElement).toBeInTheDocument();
    });

    test('Default value of the input field is 32', () => {
        const textBoxElement = screen.getByRole('textbox');
        expect(Number(textBoxElement.value)).toBe(32);
    });

    test('Value of NumberOfEvents component textbox changes accordingly when a user types in it', async () => {
        const user = userEvent.setup();
        const textBoxElement = screen.getByRole('textbox');
        await user.type(textBoxElement, '{backspace}{backspace}');
        expect(Number(textBoxElement.value)).toBe(0);
    });
});
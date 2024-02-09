import { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChange, setErrorAlert }) => {
    const [eventNumber, setEventNumber] = useState(32);
    var [errorText, setErrorText] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.trim() === "") {
            // Set the value to 0 for an empty string
            setEventNumber(0);
            onNumberOfEventsChange(0);
            clearError();
        } else {
            const intValue = parseInt(value);
            if (!isNaN(intValue)) {
                setEventNumber(intValue);
                onNumberOfEventsChange(intValue);
                clearError();
            } else {
                errorText = "Please enter a valid number";
                setEventNumber(0);
                setErrorAlert(errorText);
                setErrorText(errorText);
            }
        }
    }
    const clearError = () => {
        setErrorAlert('');
        setErrorText('');
    }

    return (
        <div id="numberOfEvents">
            <input
                id="numberOfEventsInput"
                type="text"
                value={eventNumber}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default NumberOfEvents;

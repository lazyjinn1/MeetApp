import { useState } from "react";

const NumberOfEvents = ({ onNumberOfEventsChange }) => {
    const [eventNumber, setEventNumber] = useState(32);

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.trim() === "") {
            // Set the value to 0 for an empty string
            setEventNumber(0);
            onNumberOfEventsChange(0);
        } else {
            const intValue = parseInt(value, 10);
            if (!isNaN(intValue)) {
                setEventNumber(intValue);
                onNumberOfEventsChange(intValue);
            } else {
                // Set the value to 0 if it would otherwise become NaN
                setEventNumber(0);
            }
        }
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

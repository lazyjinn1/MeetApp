import { useState } from "react";

const NumberOfEvents = () => {
    const [eventNumber, setEventNumber] = useState(32);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setEventNumber(value);
    }
    return (
        <div id="numberOfEvents"> 
            <input 
                id="numberOfEvents"
                type="text"
                value={eventNumber}
                onChange={handleInputChange}
            />
        </div>
    )
}

export default NumberOfEvents;
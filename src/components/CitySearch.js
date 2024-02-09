/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    const suggestionBoxRef = useRef(null);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [JSON.stringify(allLocations)]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                handleHideSuggestions();
            }
        };
        const handleClickOutside = (e) => {
            if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
                handleHideSuggestions();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
        setShowSuggestions(true);

        let infoText;
        if (filteredLocations.length === 0) {
            infoText = "We cannot find the city that you're looking for. Please check your spelling or try another city."
        } else {
            infoText = "";
        }
        setInfoAlert(infoText);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    const handleHideSuggestions = () => {
        setShowSuggestions(false);
    }

    return (
        <div id="city-search" ref={suggestionBoxRef}>
            <input
                type="text"
                id='city-search'
                className='city'
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />

            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => (
                        <li onClick={handleItemClicked} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                    <li key="See all cities" onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
            )}

        </div>
    )
};

export default CitySearch;

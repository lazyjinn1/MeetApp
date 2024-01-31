/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isValidCity, setIsValidCity] = useState(true);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [JSON.stringify(allLocations)]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
        setShowSuggestions(true);

        setIsValidCity(filteredLocations.length > 0 || value === "");
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className={`city ${isValidCity ? "" : "invalid-city"}`}
                id = 'city-search'
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
            {!isValidCity && (
                <div className="error-message" data-testid="invalid-city-message">Invalid city. Please enter a valid city.</div>
            )}
        </div>
    )
};
export default CitySearch;
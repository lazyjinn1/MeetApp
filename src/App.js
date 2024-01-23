/* eslint-disable react-hooks/exhaustive-deps */
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react'
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  const handleNumberOfEventsChange = (newNOE) => {
    setCurrentNOE(newNOE);
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents onNumberOfEventsChange={handleNumberOfEventsChange}/>
      <EventList events={events}/>
    </div>
  );
}

export default App;
/* eslint-disable react-hooks/exhaustive-deps */
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react'
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';
import CityEventsChart from './components/CityEventsChart';

const App = () => {
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('You are currently offline. The Events shown may not be accurate.');
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities' ?
        allEvents :
        allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  const handleNumberOfEventsChange = (newNOE) => {
    setCurrentNOE(newNOE);
  }

  return (
    <div className='App'>
      <div className='alerts-container'>
        {infoAlert.length ?
          <InfoAlert text={infoAlert} />
          : null}
        {errorAlert.length ?
          <ErrorAlert text={errorAlert} />
          : null}
        {warningAlert.length ?
          <WarningAlert text={warningAlert} />
          : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        onNumberOfEventsChange={handleNumberOfEventsChange}
        setErrorAlert={setErrorAlert}
      />
      <CityEventsChart
        allLocations={allLocations}
        events={events}
      />
      <EventList events={events} />
    </div>
  );
}

export default App;
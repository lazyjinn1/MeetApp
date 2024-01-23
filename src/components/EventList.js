import Event from './Event';

const EventList = ({ events }) => {
    // console.log(events);
    return (
        <ul id="event-list">
            {events? 
                events.map(events => <Event key={events.id} event={events}/>)
            : null}
        </ul>
    );
}

export default EventList;
// Event.js

import { useState } from 'react';

const Event = ({ event } ) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleDetails = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li data-testid="event-element" className={isExpanded ? 'expanded' : 'collapsed'}>
      <div>
        <h3>Title: {event.summary}</h3>
        <p>Location: {event.location}</p>
      </div>
      <button className = 'details-btn' onClick={handleToggleDetails}>
        {isExpanded ? 'Collapse Details' : 'Expand Details'}
      </button>
      {isExpanded ? (
        <div>
          <p>Description: {event.description}</p>
          <p>Event Date: {(new Date(event.created)).toUTCString()}</p>
          
        </div>
      ) : null}
    </li>
  );
};

export default Event;

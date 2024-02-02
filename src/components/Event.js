// Event.js

import { useState } from 'react';

const Event = ({ event }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleDetails = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li data-testid='event-element' className={isExpanded ? 'expanded' : 'collapsed'}>
      <div className='event-element'>
        <div>
          <h3 className = 'event-title'>Title: {event.summary}</h3>
          <p className = 'event-location'>Location: {event.location}</p>
        </div>
        <button className='details-btn' onClick={handleToggleDetails}>
          {isExpanded ? 'Collapse Details' : 'Expand Details'}
        </button>
        {isExpanded ? (
          <div className='details'>
            <p className = 'event-description'>{event.description}</p>
            <p className = 'event-date'>Event Date: {(new Date(event.created)).toUTCString()}</p>
          </div>
        ) : null}
      </div>

    </li>
  );
};

export default Event;

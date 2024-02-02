// Event.js

import { useState } from 'react';

const Event = ({ event }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleDetails = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li data-testid='event-element' id = 'event-element' className={isExpanded ? 'expanded' : 'collapsed'}>
      <div className='event-element'>
        <div>
          <h3 className = 'event-title'>{event.summary}</h3>
          
        </div>
        <button className='details-btn' onClick={handleToggleDetails}>
          {isExpanded ? 'Collapse Details' : 'Expand Details'}
        </button>
        {isExpanded ? (
          <div className='details'>
            <p className = 'event-location'>{event.location}</p>
            <p className = 'event-description'>{event.description}</p>
            <p className = 'event-date'>{(new Date(event.created)).toUTCString()}</p>
          </div>
        ) : null}
      </div>

    </li>
  );
};

export default Event;

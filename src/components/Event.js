// Event.js

import { useState } from 'react';

const Event = (event) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleDetails = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li data-testid="event-element" className={isExpanded ? 'expanded' : 'collapsed'}>
      <div>
        <h3>Title: {event.summary}</h3>
      </div>
      <button onClick={handleToggleDetails}>
        {isExpanded ? 'Collapse Details' : 'Expand Details'}
        <p>Description: {event.description}</p>
        <p>Event Date: {event.created}</p>
        <p>Location: {event.location}</p>
        
      </button>
    </li>
  );
};

export default Event;

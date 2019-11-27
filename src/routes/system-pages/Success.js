import React, { useEffect, useState } from 'react';

import './SystemPages.scss';
import { Link } from 'react-router-dom';
import{ getClient } from '../../api';

export default function Success(props) {

  const clientId = props.match.params.clientId;
  const [clientPin, setClientPin] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('user'));
      const result = await getClient(clientId, user);
      if(!result.ok) {
        console.log('Villa vid ad saekja pin.');
      } else {
        setClientPin(result.data[0].pin);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="system-page">
      <div className="system-page__row">
        <div className="system-page__col">
          <h2 className="system-page__heading">Aðgerð tókst! Pin númer skjólstæðings er: {clientPin}</h2>
          <p><Link to="/">Aftur á forsíðu.</Link></p>
        </div>
      </div>
    </div>
  )
}

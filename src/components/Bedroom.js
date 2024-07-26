import React, { useState, useEffect } from 'react';
import Shelf from './Shelf';
import TV from './TV';
import Chores from './Chores';
import axios from 'axios';

const Bedroom = () => {
  const [games, setGames] = useState([]);
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    // Fetch games and consoles data from GiantBomb API
    const fetchData = async () => {
      const gamesResponse = await axios.get('API_ENDPOINT_FOR_GAMES');
      const consolesResponse = await axios.get('API_ENDPOINT_FOR_CONSOLES');
      setGames(gamesResponse.data.results);
      setConsoles(consolesResponse.data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="bedroom">
      <Shelf items={games} />
      <TV items={consoles} />
      <Chores />
    </div>
  );
};

export default Bedroom;

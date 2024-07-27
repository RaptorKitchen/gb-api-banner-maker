import React, { useState, useEffect } from 'react';
import Shelf from './Shelf';
import TV from './TV';
import Chores from './Chores';
import axios from 'axios';

const Bedroom = () => {
    const [money, setMoney] = useState(0);
    const [games, setGames] = useState([]);
    const [consoles, setConsoles] = useState([]);
    const [purchasedGames, setPurchasedGames] = useState([]);
    const [purchasedConsoles, setPurchasedConsoles] = useState([]);
    const [energy, setEnergy] = useState(100); // Initialize energy

    const GAMES_API_ENDPOINT = 'https://raptorkitchen.github.io/gb-api-idle/api/games';
    const CONSOLES_API_ENDPOINT = 'https://raptorkitchen.github.io/gb-api-idle/api/consoles';

    useEffect(() => {
        const fetchData = async () => {
        try {
            const gamesResponse = await axios.get(GAMES_API_ENDPOINT);
            const consolesResponse = await axios.get(CONSOLES_API_ENDPOINT);
            setGames(gamesResponse.data.results);
            setConsoles(consolesResponse.data.results);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const allowanceInterval = setInterval(() => {
        setMoney(money => money + 1); // Increment money by 1 every minute
        }, 60000);

        return () => clearInterval(allowanceInterval); // Clear interval on component unmount
    }, []);

    const handlePurchase = (item, type) => {
        if (money >= item.price) {
        setMoney(money - item.price);
        if (type === 'game') {
            setPurchasedGames([...purchasedGames, item]);
        } else if (type === 'console') {
            setPurchasedConsoles([...purchasedConsoles, item]);
        }
        }
    };

    const calculateMultiplier = () => {
        let multiplier = 1;
        purchasedGames.forEach(game => (multiplier += game.multiplier || 0));
        purchasedConsoles.forEach(console => (multiplier += console.multiplier || 0));
        return multiplier;
    };

    const handleChore = (amount) => {
        if (energy > 0) { // Only allow chores if there is energy
        const multiplier = calculateMultiplier();
        setMoney(money + amount * multiplier);
        setEnergy(energy - 10); // Reduce energy by 10 for each chore
        } else {
        alert('You need to sleep to regain energy!');
        }
    };

    const handleSleep = () => {
        setEnergy(100); // Refill energy to 100
    };

    return (
        <div className="bedroom">
        <div className="money-display">Money: ${money.toFixed(2)}</div>
        <div className="energy-display">Energy: {energy}</div>
        <Chores handleChore={handleChore} />
        <button onClick={handleSleep}>Sleep</button>
        <Shelf items={purchasedGames} />
        <TV items={purchasedConsoles} />
        <div className="store">
            <h2>Store</h2>
            <div className="games">
            <h3>Games</h3>
            {games.map(game => (
                <div key={game.id}>
                <img src={game.image.original_url} alt={game.name} />
                <button onClick={() => handlePurchase(game, 'game')}>
                    Buy for ${game.price}
                </button>
                </div>
            ))}
            </div>
            <div className="consoles">
            <h3>Consoles</h3>
            {consoles.map(console => (
                <div key={console.id}>
                <img src={console.image.original_url} alt={console.name} />
                <button onClick={() => handlePurchase(console, 'console')}>
                    Buy for ${console.price}
                </button>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default Bedroom;

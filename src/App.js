import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';

function App() {
    const [logoSrc, setLogoSrc] = useState('/gb-api-idle/logos/logo-1.png');

    const handleMouseEnter = () => {
        const currentLogoNumber = parseInt(logoSrc.match(/\d+/)[0], 10);
        let newLogoNumber;

        do {
            newLogoNumber = Math.floor(Math.random() * 3) + 1;
        } while (newLogoNumber === currentLogoNumber);

        setLogoSrc(`/gb-api-idle/logos/logo-${newLogoNumber}.png`);
    };

    return (
        <div className="App">
            <div className="header">
                <div className="titles">
                    <h2>Top Five Banner Maker</h2>
                    <h3 className="subtitle">Powered by GiantBomb API</h3>
                </div>
                <img
                    src={logoSrc}
                    alt="Top Five Banner Generator"
                    onMouseEnter={handleMouseEnter}
                    className="logo"
                />
            </div>
            <Banner />
            <footer>
                <h6>A class project by <a href="https://github.com/raptorkitchen" target="_blank" rel="noopener noreferrer">Andrew Lerma</a>.</h6>
                <h6>Powered by <a href="https://giantbomb.com/" target="_blank" rel="noopener noreferrer">Giant Bomb API</a>. Background elements created by <a href="https://coolbackgrounds.io/" target="_blank" rel="noopener noreferrer">coolbackgrounds.io</a></h6>
            </footer>
        </div>
    );
}

export default App;

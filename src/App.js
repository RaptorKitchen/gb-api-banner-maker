import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import BackgroundSelector from './components/BackgroundSelector';
import FrameSelector from './components/FrameSelector';
import Modal from './components/Modal';

const baseURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/gb-api-idle`
    : window.location.origin;

const backgroundImages = [
    `${baseURL}/backgrounds/cool-background-2.png`,
    `${baseURL}/backgrounds/cool-background-3.png`,
    `${baseURL}/backgrounds/cool-background-4.png`,
    `${baseURL}/backgrounds/cool-background-5.png`,
    `${baseURL}/backgrounds/cool-background-6.png`,
    `${baseURL}/backgrounds/cool-background-7.png`,
    `${baseURL}/backgrounds/cool-background-8.png`,
    `${baseURL}/backgrounds/cool-background-9.png`,
    `${baseURL}/backgrounds/cool-background-10.png`,
    `${baseURL}/backgrounds/cool-background-11.png`,
    `${baseURL}/backgrounds/cool-background-12.png`,
    `${baseURL}/backgrounds/cool-background-13.png`,
    `${baseURL}/backgrounds/cool-background-14.png`,
    `${baseURL}/backgrounds/cool-background-15.png`,
    `${baseURL}/backgrounds/cool-background-16.png`,
    `${baseURL}/backgrounds/cool-background-17.png`,
    `${baseURL}/backgrounds/cool-background-18.png`,
    `${baseURL}/backgrounds/cool-background-19.png`,
    `${baseURL}/backgrounds/cool-background-20.png`,
    `${baseURL}/backgrounds/cool-background-21.png`,
    `${baseURL}/backgrounds/cool-background-22.png`,
    `${baseURL}/backgrounds/cool-background-23.png`,
    `${baseURL}/backgrounds/cool-background-24.png`,
    `${baseURL}/backgrounds/cool-background-25.png`,
    `${baseURL}/backgrounds/cool-background-26.png`,
    `${baseURL}/backgrounds/cool-background-27.png`,
    `${baseURL}/backgrounds/cool-background-28.png`,
    `${baseURL}/backgrounds/cool-background-29.png`,
    `${baseURL}/backgrounds/cool-background-30.png`,
    `${baseURL}/backgrounds/cool-background-31.png`,
    `${baseURL}/backgrounds/cool-background-32.png`,
    `${baseURL}/backgrounds/cool-background-33.png`,
    `${baseURL}/backgrounds/cool-background-34.png`,
    `${baseURL}/backgrounds/cool-background-35.png`,
    `${baseURL}/backgrounds/cool-background-36.png`,
];

const frameImages = [
    `${baseURL}/frames/realistic-wood.png`,
    `${baseURL}/frames/pixellated-wood.png`,
    `${baseURL}/frames/brushed-metal.png`
];

function App() {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
    const [frameImage, setFrameImage] = useState(frameImages[0]);
    const [showInstructions, setShowInstructions] = useState(false);
    const [logoSrc, setLogoSrc] = useState(`${baseURL}/logos/logo-1.png`);

    useEffect(() => {
        const activeBannerElement = document.getElementById('activeBanner');
        if (activeBannerElement) {
            console.log('Applying background image:', backgroundImage);
            activeBannerElement.style.backgroundImage = `url(${backgroundImage})`;
        } else {
            console.error('Element with id "activeBanner" not found');
        }
    }, [backgroundImage]);

    useEffect(() => {
        const frames = document.getElementsByClassName('frame');
        if (frames.length > 0) {
            console.log('Applying frame image to', frames.length, 'elements:', frameImage);
            for (let i = 0; i < frames.length; i++) {
                frames[i].style.backgroundImage = `url(${frameImage})`;
            }
        } else {
            console.error('No elements with class "frame" found');
        }
    }, [frameImage]);

    const handleMouseEnter = () => {
        const currentLogoNumber = parseInt(logoSrc.match(/\d+/)[0], 10);
        let newLogoNumber;

        do {
            newLogoNumber = Math.floor(Math.random() * 3) + 1;
        } while (newLogoNumber === currentLogoNumber);

        setLogoSrc(`${baseURL}/logos/logo-${newLogoNumber}.png`);
    };

    const handleBackgroundSelect = (newImage) => {
        console.log(`Selected background image URL: ${newImage}`);
        setBackgroundImage(newImage);
    };

    const handleFrameSelect = (newImage) => {
        console.log(`Selected frame image URL: ${newImage}`);
        setFrameImage(newImage);
    };

    const handleShowInstructions = () => {
        setShowInstructions(true);
    };

    const handleCloseInstructions = () => {
        setShowInstructions(false);
    };

    return (
        <div className="App">
            <div className="header">
                <div id="controls">
                    <h4>Background and Frame Selection:</h4>
                    <button onClick={handleShowInstructions} id="instructions">Instructions</button>
                    <Modal show={showInstructions} handleClose={handleCloseInstructions}>
                        <h2>This app is intended to be used to build a banner image - for best results, please use a browser with a minimum resolution of 1600x787.</h2>
                        <p>Start by clicking an empty picture frame, then type the name of a person, place, object, or thing. If the Enter key is pressed or if the user stops typing for two seconds or more, the application will try fetching results available from the <a href="https://giantbomb.com">Giant Bomb API</a> (It's a website about video games).</p>
                        <p>Try finding a background and frame combination you like. If so inclined, feel free to take a screenshot.</p>
                        <h2>How to Take a Screenshot</h2>
                        <p>To capture the screen, follow these instructions:</p>
                        <h3>Windows</h3>
                        <ul>
                            <li>Press the "PrtScn" key to capture the entire screen.</li>
                            <li>Press "Alt + PrtScn" to capture the active window.</li>
                            <li>Use the "Snipping Tool" for more options.</li>
                        </ul>
                        <h3>Mac</h3>
                        <ul>
                            <li>Press "Shift + Command (⌘) + 3" to capture the entire screen.</li>
                            <li>Press "Shift + Command (⌘) + 4" to capture a selected portion of the screen.</li>
                        </ul>
                        <h3>Linux</h3>
                        <ul>
                            <li>Press "PrtScn" to capture the entire screen.</li>
                            <li>Press "Alt + PrtScn" to capture the active window.</li>
                            <li>Use "Shift + PrtScn" to capture a selected area.</li>
                        </ul>
                        <p>Note: My API token is limited to 200 API calls per hour - once exceeded, no additional search results will be returned for up to one hour. If the search box stops working, try coming back later.</p>
                        <p>ALSO: This is a free site made for a class project - it may not be used to make money. Any use in violation of Giant Bomb's terms is prohibited.</p>
                    </Modal>
                    <BackgroundSelector images={backgroundImages} onSelect={handleBackgroundSelect} />
                    <FrameSelector images={frameImages} onSelect={handleFrameSelect} />
                </div>
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
                <h6>Powered by <a href="https://giantbomb.com/" target="_blank" rel="noopener noreferrer">Giant Bomb API</a>. Background elements created by <a href="https://coolbackgrounds.io/" target="_blank" rel="noopener noreferrer">coolbackgrounds.io</a>. Pure CSS Blueprint background by <a href="https://codepen.io/matteodesanti" target="_blank">Matteo DeSanti</a>.</h6>
            </footer>
        </div>
    );
}

export default App;

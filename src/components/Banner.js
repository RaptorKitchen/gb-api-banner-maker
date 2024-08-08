import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import BackgroundSelector from './BackgroundSelector';
import FrameSelector from './FrameSelector';
import Modal from './Modal'; // Import the Modal component

const baseURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/gb-api-idle`
    : window.location.origin;

const proxyServerEndpoint = process.env.NODE_ENV === 'development'
    ? `http://localhost:5000`
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

const Banner = () => {
    const [placeholders, setPlaceholders] = useState(Array(5).fill(null));
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
    const [frameImage, setFrameImage] = useState(frameImages[0]);
    const [showInstructions, setShowInstructions] = useState(false);
    const inputRef = useRef(null);
    const resultsRef = useRef(null); // Reference to the search results container

    useEffect(() => {
        if (selectedPlaceholder !== null) {
            inputRef.current.focus();
        }
    }, [selectedPlaceholder]);

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

    const handlePlaceholderClick = (index) => {
        setSelectedPlaceholder(index);
        setSearchResults([]);
        setSearchQuery('');
    };

    const performSearch = (query) => {
        if (query.length > 2) {
            const SEARCH_API_ENDPOINT = `${proxyServerEndpoint}/api/search?query=${query}`;
            //const SEARCH_API_ENDPOINT = `http://localhost:5000/api/search?query=${query}`;

            console.log(`Searching for: ${query}`);
            axios.get(SEARCH_API_ENDPOINT)
                .then(response => {
                    console.log('Search results:', response.data.results);
                    setSearchResults(response.data.results);
                    if (resultsRef.current) {
                        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        }
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => performSearch(query), 2000));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            performSearch(searchQuery);
        }
    };

    const handleSelectResult = (result) => {
        const selectedImage = result.image.original_url;
        const newPlaceholders = [...placeholders];
        newPlaceholders[selectedPlaceholder] = selectedImage;
        setPlaceholders(newPlaceholders);
        setSearchResults([]);
        setSelectedPlaceholder(null);
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
        <div>
            <div id="controls">
                <button onClick={handleShowInstructions} id="instructions">Instructions</button>
                <Modal show={showInstructions} handleClose={handleCloseInstructions}>
                    <h2>This app is intended to be used to build a banner image</h2>
                    <p>Start by clicking an empty picture frame, then type the name of a person, place, object, or thing. This will fetch any results available from the <a href="https://giantbomb.com">Giant Bomb API</a> (It's a website about video games).</p>
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
                    <p>Note: My api token is limited to 200 API calls per hour - once exceeded, no additional search results will be returned for up to one hour. If the search box stops working, try coming back later.</p>
                    <p>ALSO: This is a free site made for a class project - it may not be used to make money. Any use in violation of Giant Bomb's terms is prohibited.</p>
                </Modal>
                <BackgroundSelector images={backgroundImages} onSelect={handleBackgroundSelect} />
                <FrameSelector images={frameImages} onSelect={handleFrameSelect} />
            </div>
            <div id="imageTarget">
                <div className="banner" id="activeBanner">
                    <div className="frame-container">
                        <div className="placeholders">
                            {placeholders.map((placeholder, index) => (
                                <div className="frame" data-frame-art="default" key={index}>
                                    <div key={index} className="placeholder" onClick={() => handlePlaceholderClick(index)}>
                                        {placeholder ? <img src={placeholder} alt="Selected" /> : 'Click to Add'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedPlaceholder !== null && (
                        <div className="search-section" ref={resultsRef}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for a game or character"
                                ref={inputRef}
                            />
                            <div className="search-results">
                                {searchResults.map(result => (
                                    <div key={result.id} className="search-result" onClick={() => handleSelectResult(result)}>
                                        <img src={result.image.icon_url} alt={result.name} />
                                        <span>{result.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;

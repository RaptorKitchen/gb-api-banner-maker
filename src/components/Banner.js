import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

//const proxyServerEndpoint = window.location.origin.replace(':3000', ':5000'); used during development
const proxyServerEndpoint = window.location.origin;

const Banner = () => {
    const [placeholders, setPlaceholders] = useState(Array(5).fill(null));
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');
    const inputRef = useRef(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        if (selectedPlaceholder !== null) {
            inputRef.current.focus();
        }
    }, [selectedPlaceholder]);

    const handlePlaceholderClick = (index) => {
        setSelectedPlaceholder(index);
        setSearchResults([]);
        setSearchQuery('');
        setSearchStatus(''); // Reset search status
    };

    const performSearch = (query) => {
        if (query.length > 2) {
            setSearchStatus('Searching...');
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = `https://www.giantbomb.com/api/search/?api_key=24ded5f5870d9f15b4af9faf26e282f8edd770ad&format=json&query=${query}&resources=game,franchise,character,object,location,person`;
            const SEARCH_API_ENDPOINT = proxyUrl + apiUrl;
    
            axios.get(SEARCH_API_ENDPOINT)
                .then(response => {
                    console.log('Search results:', response.data.results);
                    setSearchResults(response.data.results);
                    setSearchStatus(response.data.results.length > 0 ? 'Click to add to frame' : 'No results');
                    if (resultsRef.current) {
                        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setSearchStatus('Error fetching results');
                });
        } else {
            setSearchResults([]);
            setSearchStatus('');
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
        setSearchStatus(''); // Reset search status after selection
    };

    return (
        <div>
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
                                <h6 id="resultText">{searchStatus}</h6>
                                {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                    searchResults.map(result => (
                                        <div key={result.id} className="search-result" onClick={() => handleSelectResult(result)}>
                                            <img src={result.image.icon_url} alt={result.name} />
                                            <span>{result.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No results found</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;

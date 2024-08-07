import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';

const Banner = () => {
    const [placeholders, setPlaceholders] = useState(Array(5).fill(null));
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (selectedPlaceholder !== null) {
            inputRef.current.focus();
        }
    }, [selectedPlaceholder]);

    const handlePlaceholderClick = (index) => {
        setSelectedPlaceholder(index);
        setSearchResults([]);
        setSearchQuery('');
    };

    const performSearch = (query) => {
        if (query.length > 2) {
            const SEARCH_API_ENDPOINT = `http://localhost:5000/api/search?query=${query}`;
            console.log(`Searching for: ${query}`); // Debug log
            axios.get(SEARCH_API_ENDPOINT)
                .then(response => {
                    console.log('Search results:', response.data.results); // Debug log
                    setSearchResults(response.data.results);
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

    return (
        <div id="imageTarget">
            <div className="banner">
                <div className="frame-container">
                    <div className="placeholders">
                        {placeholders.map((placeholder, index) => (
                            <div class="frame" data-frame-art="default">
                                <div key={index} className="placeholder" onClick={() => handlePlaceholderClick(index)}>
                                    {placeholder ? <img src={placeholder} alt="Selected" /> : 'Click to Add'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedPlaceholder !== null && (
                    <div className="search-section">
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
    );
};

export default Banner;

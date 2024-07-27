import React from 'react';

const TV = ({ items }) => {
    return (
        <div className="tvShelf">
        {items.map(item => (
            <img key={item.id} src={item.image.original_url} alt={item.name} />
        ))}
        </div>
    );
};

export default TV;

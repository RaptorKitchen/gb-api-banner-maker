import React from 'react';

const Shelf = ({ items }) => {
  return (
    <div className="shelf">
      {items.map(item => (
        <img key={item.id} src={item.image.original_url} alt={item.name} />
      ))}
    </div>
  );
};

export default Shelf;

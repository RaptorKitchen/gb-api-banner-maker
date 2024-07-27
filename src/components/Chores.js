import React from 'react';

const Chores = ({ handleChore }) => {
    return (
        <div className="chores">
        <button onClick={() => handleChore(10)}>Mow Lawn</button>
        <button onClick={() => handleChore(15)}>Babysit</button>
        </div>
    );
};

export default Chores;

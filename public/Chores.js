import React, { useState, useEffect } from 'react';

const Chores = () => {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoney(prevMoney => prevMoney + 5); // Daily allowance
    }, 86400000); // 24 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chores">
      <p>Money: ${money}</p>
      <button onClick={() => setMoney(prevMoney => prevMoney + 10)}>Mow Lawn</button>
      <button onClick={() => setMoney(prevMoney => prevMoney + 15)}>Babysit</button>
    </div>
  );
};

export default Chores;

import React, { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "orange", "green", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);

  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangment(randomColorArrangment);
  };
  useEffect(() => {
    createBoard();
  }, []);

  console.log(currentColorArrangment);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index: number) => (
          <img
            key={index}
            alt={candyColor}
            style={{ backgroundColor: candyColor }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

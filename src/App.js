import React from "react";

const width = 8;
const candyColors = ["blue", "orange", "green", "purple", "red", "yellow"];

const App = () => {
  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }
    console.log(randomColorArrangment);
  };
  createBoard();

  return <div>selam</div>;
};

export default App;

import React, { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import BlueCandy from "./images/blue-candy.png";
import GreenCandy from "./images/green-candy.png";
import OrangeCandy from "./images/orange-candy.png";
import PurpleCandy from "./images/purple-candy.png";
import RedCandy from "./images/red-candy.png";
import YellowCandy from "./images/yellow-candy.png";
import Blank from "./images/blank.png";

const width = 8;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingRepcaled] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangment[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangment[square] = Blank)
        );
      }
      return true;
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangment[i];

      if (
        rowOfFour.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        rowOfFour.forEach((square) => (currentColorArrangment[square] = Blank));
      }
      return true;
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangment[i];

      if (
        columnOfThree.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangment[square] = Blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        rowOfThree.forEach(
          (square) => (currentColorArrangment[square] = Blank)
        );
      }
      return true;
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangment[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangment[i] = candyColors[randomNumber];
      }

      if (currentColorArrangment[i + width] === Blank) {
        currentColorArrangment[i + width] = currentColorArrangment[i];
        currentColorArrangment[i] = Blank;
      }
      return true;
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingRepcaled(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangment[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangment[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingRepcaled(null);
    } else {
      currentColorArrangment[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangment[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangment([...currentColorArrangment]);
    }
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangment,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index: number) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragEnter={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragLeave={(e: DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";

import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import Button from "../components/UI/Button";
import HoverableText from "../components/UI/HoverableText";

const Game = () => {
  const [isXActive, setIsXActive] = useState(true);

  const initalGameBoard = ["", "", "", "", "", "", "", "", ""];
  const [gameBoard, setGameBoard] = useState(initalGameBoard);

  const initialResult = {
    winner: "",
    winningCombination: [],
  };
  const [result, setResult] = useState(initialResult);

  const initialScore = {
    x: 0,
    o: 0,
  };
  const [score, setScore] = useState(initialScore);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const checkWinner = (player) => {
      if (
        winningCombinations
          .map((innerArr) => innerArr.every((el) => gameBoard[el] === player))
          .some((elem) => elem === true)
      ) {
        setResult({
          winner: player,
          winningCombination:
            winningCombinations[
              winningCombinations
                .map((innerArr) =>
                  innerArr.every((el) => gameBoard[el] === player)
                )
                .indexOf(true)
            ],
        });
      }
    };

    const checkIsGameOver = () => {
      if (result.winner || gameBoard.every((el) => el !== "")) {
        setGameOver(true);
      }
    };

    const checkScore = () => {
      if (result.winner === "x") {
        setScore((prevState) => {
          return {
            ...prevState,
            x: prevState.x + 1,
          };
        });
      } else if (result.winner === "o") {
        setScore((prevState) => {
          return {
            ...prevState,
            o: prevState.o + 1,
          };
        });
      }
    };

    checkWinner("x");
    checkWinner("o");
    checkScore();
    checkIsGameOver();
  }, [gameBoard, result.winner]);

  const handleClick = (e) => {
    const id = e.target.id;

    if (isXActive && gameBoard[id] === "" && !gameOver) {
      setGameBoard(gameBoard.map((el, i) => (i === Number(id) ? "x" : el)));
      setIsXActive(false);
    } else if (!isXActive && gameBoard[id] === "" && !gameOver) {
      setGameBoard(gameBoard.map((el, i) => (i === Number(id) ? "o" : el)));
      setIsXActive(true);
    }
  };

  const handleResetSingleGame = () => {
    setIsXActive(true);
    setGameBoard(initalGameBoard);
    setResult(initialResult);
    setGameOver(false);
  };

  const handleResetWholeGame = () => {
    handleResetSingleGame();
    setScore(initialScore);
  };

  return (
    <div className="App" style={styles.container}>
      <div style={styles.resultBoard}>
        <div style={styles.resultMessage}>
          <div> {gameOver ? `GAME OVER` : null}</div>
          <div>
            {" "}
            {result.winner ? `${result.winner} player is a WINNNER` : null}
          </div>
        </div>
        {gameOver ? (
          <Button onClickHandler={handleResetSingleGame}>Play again</Button>
        ) : null}
      </div>

      <div style={styles.game}>
        <Player active={isXActive && !gameOver} score={score.x}>
          X
        </Player>
        <GameBoard
          gameBoard={gameBoard}
          handleClick={handleClick}
          winningCombination={result.winningCombination}
        />
        <Player active={!isXActive && !gameOver} score={score.o}>
          O
        </Player>
      </div>
      <HoverableText onClickHandler={handleResetWholeGame}>
        Start a completely new game? Restart score to 0.
      </HoverableText>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  game: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  resultBoard: {
    height: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "46px",
  },
  resultMessage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

export default Game;

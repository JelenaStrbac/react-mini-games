import { useEffect, useMemo, useState } from "react";

import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import Button from "../components/UI/Button";
import HoverableText from "../components/UI/HoverableText";

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

const initialGameBoard = ["", "", "", "", "", "", "", "", ""];

const initialScore = {
  x: 0,
  o: 0,
};

const checkWinner = (gameBoard) => {
  const winner = winningCombinations
    .map((innerArr) =>
      innerArr.every((el) => gameBoard[el] === "x")
        ? { winner: "x", combination: [...innerArr] }
        : innerArr.every((el) => gameBoard[el] === "o")
        ? { winner: "o", combination: [...innerArr] }
        : null
    )
    .find((elem) => elem && elem.winner);

  return winner;
};

const Game = () => {
  const [isXActive, setIsXActive] = useState(true);

  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const winnerWithCombination = useMemo(() => checkWinner(gameBoard), [
    gameBoard,
  ]);
  const gameOver = winnerWithCombination || gameBoard.every((el) => el !== "");

  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    const checkedBoard = checkWinner(gameBoard);
    if (checkedBoard)
      setScore((prevState) => ({
        ...prevState,
        [checkedBoard.winner]: prevState[checkedBoard.winner] + 1,
      }));
  }, [gameBoard]);

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
    setGameBoard(initialGameBoard);
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
            {winnerWithCombination?.winner
              ? `${winnerWithCombination.winner} player is a WINNNER`
              : null}
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
          winningCombination={winnerWithCombination?.combination}
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

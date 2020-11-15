import { useReducer } from "react";
import { Fade } from "react-awesome-reveal";

import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import Button from "../components/UI/Button";
import HoverableText from "../components/UI/HoverableText";

const initialState = {
  isXActive: true,
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  winner: "",
  winningCombination: [],
  score: {
    x: 0,
    o: 0,
  },
  gameOver: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "playGame":
      return {
        ...state,
        isXActive: action.isXActive,
        gameBoard: action.gameBoard,
        winner: action.winner,
        winningCombination: action.winningCombination,
        score: action.score,
        gameOver: action.gameOver,
      };
    case "resetSingleGame":
      return {
        ...state,
        isXActive: true,
        gameBoard: ["", "", "", "", "", "", "", "", ""],
        winner: "",
        winningCombination: [],
        gameOver: false,
      };
    case "resetAll":
      return initialState;
    default:
      return state;
  }
};

/////utility functions
/// 1.
const checkBoardAndActivePlayer = (activ, gb, id, go) => {
  let isXActive, gameBoard;
  if (activ && gb[id] === "" && !go) {
    gameBoard = gb.map((el, i) => (i === Number(id) ? "x" : el));
    isXActive = false;
  } else if (!activ && gb[id] === "" && !go) {
    gameBoard = gb.map((el, i) => (i === Number(id) ? "o" : el));
    isXActive = true;
  }
  return { isXActive, gameBoard };
};

/// 2.
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

const checkWinner = (gb) => {
  let winner, winningCombination;
  if (
    winningCombinations
      .map((innerArr) => innerArr.every((el) => gb[el] === "x"))
      .some((elem) => elem === true)
  ) {
    winner = "x";
    winningCombination =
      winningCombinations[
        winningCombinations
          .map((innerArr) => innerArr.every((el) => gb[el] === "x"))
          .indexOf(true)
      ];
  }
  if (
    winningCombinations
      .map((innerArr) => innerArr.every((el) => gb[el] === "o"))
      .some((elem) => elem === true)
  ) {
    winner = "o";
    winningCombination =
      winningCombinations[
        winningCombinations
          .map((innerArr) => innerArr.every((el) => gb[el] === "o"))
          .indexOf(true)
      ];
  }
  return { winner, winningCombination };
};

/// 3.
const checkScore = (win, sc) => {
  let score = { x: 0, o: 0 };
  if (win === "x") {
    score = { ...sc, x: sc.x + 1 };
  } else if (win === "o") {
    score = { ...sc, o: sc.o + 1 };
  }
  return score;
};

/// 4.
const checkIsGameOver = (win, gb) => {
  let gameOver = false;
  if (win || gb.every((el) => el !== "")) {
    gameOver = true;
  }
  return gameOver;
};

///// * Component */////
const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const handleClick = (e) => {
    const id = e.target.id;

    dispatch({
      type: "playGame",
      isXActive: checkBoardAndActivePlayer(
        state.isXActive,
        state.gameBoard,
        id,
        state.gameOver
      ).isXActive,
      gameBoard: checkBoardAndActivePlayer(
        state.isXActive,
        state.gameBoard,
        id,
        state.gameOver
      ).gameBoard,
      winner: checkWinner(state.gameBoard).winner,
      winningCombination: checkWinner(state.gameBoard).winningCombination,
      score: checkScore(state.winner, state.score),
      gameOver: checkIsGameOver(state.winner, state.gameBoard),
    });
  };

  const handleResetSingleGame = () => {
    dispatch({ type: "resetSingleGame" });
  };

  const handleResetWholeGame = () => {
    dispatch({ type: "resetAll" });
  };

  return (
    <div className="App" style={styles.container}>
      <Fade>
        <div style={styles.resultBoard}>
          <div style={styles.resultMessage}>
            <div> {state.gameOver ? `GAME OVER` : null}</div>
            <div>
              {" "}
              {state.winner ? `${state.winner} player is a WINNNER` : null}
            </div>
          </div>
          {state.gameOver ? (
            <Button onClickHandler={handleResetSingleGame}>Play again</Button>
          ) : null}
        </div>
      </Fade>
      <div style={styles.game}>
        <Player
          active={state.isXActive && !state.gameOver}
          score={state.score.x}
        >
          X
        </Player>
        <GameBoard
          gameBoard={state.gameBoard}
          handleClick={handleClick}
          winningCombination={state.winningCombination}
        />
        <Player
          active={!state.isXActive && !state.gameOver}
          score={state.score.o}
        >
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

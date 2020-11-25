import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import background from "../../assets/images/background.jpg";

import Player from "../components/Player";
import GameBoard from "../components/GameBoard";
import Button from "../../shared/UI/Button";
import HoverableText from "../../shared/UI/HoverableText";

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
    <Container>
      <ResultBoardStyled>
        <ResultMessageStyled>
          <div> {gameOver ? `GAME OVER` : null}</div>
          <div>
            {winnerWithCombination?.winner
              ? `${winnerWithCombination.winner} player is a WINNNER`
              : null}
          </div>
        </ResultMessageStyled>
        {gameOver ? (
          <Button onClickHandler={handleResetSingleGame}>Play again</Button>
        ) : null}
      </ResultBoardStyled>

      <GameStyled>
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
      </GameStyled>

      <GameStyledMobile>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <Player active={isXActive && !gameOver} score={score.x}>
            X
          </Player>
          <Player active={!isXActive && !gameOver} score={score.o}>
            O
          </Player>
        </div>
        <GameBoard
          gameBoard={gameBoard}
          handleClick={handleClick}
          winningCombination={winnerWithCombination?.combination}
        />
      </GameStyledMobile>
      <HoverableText onClickHandler={handleResetWholeGame}>
        Start a completely new game? Restart score to 0.
      </HoverableText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("${background}");
`;

const GameStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const GameStyledMobile = styled.div`
  display: none;

  @media only screen and (max-width: 480px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const ResultBoardStyled = styled.div`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 36px;
`;

const ResultMessageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

export default Game;

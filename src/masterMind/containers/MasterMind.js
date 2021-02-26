import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UIfx from "uifx";
import { ImArrowRight } from "react-icons/im";
import { Link } from "react-router-dom";

import successSound from "../../assets/sounds/success.wav";
import failureSound from "../../assets/sounds/failure.wav";
import Square from "../components/Square";
import {
  smiles,
  clubs,
  spades,
  hearts,
  diamonds,
  stars,
} from "../../shared/UI/Icons";
import { back } from "../../shared/UI/Icons";
import Button from "../../shared/UI/Button";
import Navbar from "./Navbar";
import SideController from "../components/SideController";
import Modal from "../components/Modal/Modal";
import useModal from "../hooks/useModal";
import InputModal from "./InputModal";
import {
  chunk,
  pushElementsFromBeginingToRight,
  checkIfCombinationIsMatching,
} from "../utils/helperFunctions";
import BurgerMenu from "../components/BurgerMenu";
import { getWinnigCombination } from "../utils/helperFunctions";

const allIcons = [smiles, clubs, spades, hearts, diamonds, stars];

const success = new UIfx(successSound);
const failure = new UIfx(failureSound);

const points = new Map();
points.set(1, 60).set(2, 50).set(3, 40).set(4, 30).set(5, 20).set(6, 10);

///// *** COMPONENT *** /////
const MasterMind = (props) => {
  // determine winning combination once when component mounts
  const [winningCombination, setWinningCombination] = useState([]);

  useEffect(() => {
    setWinningCombination(getWinnigCombination());
  }, []);

  // determine guessing combination and what icons to show
  const [guessingCombination, setGuessingCombination] = useState(
    Array(24).fill(null)
  );
  const guessingIconsToShow = guessingCombination.map((el) => allIcons[el]);

  // check if winning and guessing combination matches
  const chunkedGuessingCombinationArr = chunk([...guessingCombination], 4);
  const matchingResultsArr = checkIfCombinationIsMatching(
    chunkedGuessingCombinationArr,
    winningCombination
  );
  const whenToCallLength = chunk(matchingResultsArr, 4).length;
  const whenToCallLengthRef = useRef(whenToCallLength);
  const length = matchingResultsArr.length;
  let resultsArr = [
    ...matchingResultsArr,
    ...Array(24 - (length > 24 ? 24 : length)).fill(null),
  ];

  // check if particular game is over and on which way
  const isGameOverByLosing = guessingCombination.every((el) => el !== null);
  const isGameOverByWinning = chunk(resultsArr, 4).some((el) =>
    el.every((elem) => elem === "red")
  );
  const isGameOver = isGameOverByLosing || isGameOverByWinning;

  const winningCombinationIcons = isGameOver
    ? winningCombination.map((el) => allIcons[el])
    : Array(4).fill(null);

  // moment to present "red-yellow" guesses on screen => after four clicks
  if (whenToCallLength > whenToCallLengthRef.current) {
    const length = matchingResultsArr.length;
    resultsArr = [
      ...matchingResultsArr,
      ...Array(24 - (length > 24 ? 24 : length)).fill(null),
    ];
    isGameOverByWinning ? success.play() : failure.play();
  }

  const onClickHandler = (e) => {
    const id = Number(
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id
    );
    if (!isGameOver && shouldStart) {
      setGuessingCombination(
        pushElementsFromBeginingToRight(guessingCombination, id)
      );
      whenToCallLengthRef.current = whenToCallLength;
    }
  };

  // setting score when particular game is over
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isGameOver) {
      setScore((prevScore) =>
        isGameOverByWinning
          ? prevScore + points.get(whenToCallLength)
          : prevScore - 10
      );
    }
  }, [isGameOverByWinning, isGameOverByLosing, isGameOver, whenToCallLength]);

  /////// GAME FLOW
  const [shouldStart, setShouldStart] = useState(false);
  const { isShowing, toggle } = useModal();

  //--> called on btn click NEXT and below from start challenge
  const handleResetAllFieldsOnBoard = () => {
    setWinningCombination(getWinnigCombination());
    setGuessingCombination(Array(24).fill(null));
    resultsArr = Array(24).fill(null);
    whenToCallLengthRef.current = 0;
  };

  //--> called on btn click START
  const startChallenge = () => {
    setShouldStart(true);
    handleResetAllFieldsOnBoard();
  };

  //--> called from Timer component, when time lapses
  const stopStartHandler = () => {
    toggle();
    setShouldStart(false);
    handleResetAllFieldsOnBoard();
  };

  //--> called from InputModal component when user clicks SUBMIT button
  const resetScore = () => {
    setScore(0);
  };

  return (
    <MasterMindContainer id="burger">
      <Navbar />
      <BurgerMenu pageWrapId={"page-wrap"} outerContainexrId={"burger"} />

      <SideController
        startChallenge={startChallenge}
        score={score}
        shouldStart={shouldStart}
        stopStartHandler={stopStartHandler}
      />

      <div id="page-wrap">
        <WrapperTop>
          <MasterMindBoard>
            {guessingIconsToShow.map((el, i) => (
              <Square id={i} key={i} testB>
                {el}
              </Square>
            ))}
          </MasterMindBoard>

          <MasterMindBoardRounded>
            {resultsArr.map((el, i) => (
              <Square id={i} key={i} rounded testR color={el}></Square>
            ))}
          </MasterMindBoardRounded>
        </WrapperTop>

        <Wrapper>
          <MasterMindBoard>
            {winningCombinationIcons.map((el, i) => (
              <Square key={i}>{el}</Square>
            ))}
          </MasterMindBoard>

          <MasterMindGuessingCombinationsBoard
            isDisabled={isGameOver || !shouldStart}
          >
            {allIcons.map((el, i) => (
              <Square key={i} id={i} testG handleClick={onClickHandler}>
                {el}
              </Square>
            ))}
          </MasterMindGuessingCombinationsBoard>
        </Wrapper>

        {shouldStart && isGameOver ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClickHandler={handleResetAllFieldsOnBoard}
              isDisabled={!isGameOver}
            >
              Next
              <ImArrowRight />
            </Button>
          </div>
        ) : null}
      </div>
      <LinkStyled to="/">{back}</LinkStyled>
      {/* <Link to="/" style={{ position: "absolute", left: 10, bottom: 10 }}>
        {back}
      </Link> */}
      <Modal isShowing={isShowing} hide={toggle} resetScore={resetScore}>
        <InputModal score={score} resetScore={resetScore} />
      </Modal>
    </MasterMindContainer>
  );
};

const MasterMindContainer = styled.div`
  background-image: radial-gradient(circle, #427e60, #35654d, #2a513e);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MasterMindBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;

  @media only screen and (max-width: 480px) {
    width: 232px;
    margin: 0;
    padding: 10px;
  }
`;

const MasterMindBoardRounded = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;

  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    padding: 10px;
  }
`;

const MasterMindGuessingCombinationsBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  @media only screen and (max-width: 360px) {
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 0px;
  }

  @media only screen and (min-width: 361px) and (max-width: 481px) {
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0;
    padding: 10px;
  }
`;

const WrapperTop = styled.div`
  display: flex;
  margin-top: 100px;

  @media only screen and (max-width: 480px) {
    justify-content: space-between;
    margin-top: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const LinkStyled = styled(Link)`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

export default MasterMind;

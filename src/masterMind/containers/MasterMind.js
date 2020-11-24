import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UIfx from "uifx";
import { ImArrowRight } from "react-icons/im";

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
} from "../components/Icons";
import Button from "../../shared/UI/Button";
import Navbar from "./Navbar";
import SideController from "../components/SideController";
import Modal from "../components/Modal/Modal";
import useModal from "../hooks/useModal";
import useModalTwo from "../hooks/useModalTwo";
import InputModal from "./InputModal";
import ModalResults from "../components/Modal/ModalResults";
import ScoreModal from "./ScoreModal";
import {
  chunk,
  pushElementsFromBeginingToRight,
  checkIfCombinationIsMatching,
} from "../utils/helperFunctions";

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
    setWinningCombination(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 6))
    );
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
  const [userId, setUserId] = useState("");

  const { isShowing, toggle } = useModal();
  const { isShowingResultsModal, toggleTwo } = useModalTwo();

  //--> called on btn click NEXT and below from start challenge
  const handleResetAllFieldsOnBoard = () => {
    setWinningCombination(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 6))
    );
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
  const resetScore = (userid) => {
    setUserId(userid);
    setScore(0);
    toggle();

    setTimeout(toggleTwo, 2000);
    // toggleTwo();
  };

  return (
    <MasterMindContainer>
      <Navbar />

      <SideController
        startChallenge={startChallenge}
        score={score}
        shouldStart={shouldStart}
        stopStartHandler={stopStartHandler}
      />

      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "100px" }}
        >
          <MasterMindBoard>
            {guessingIconsToShow.map((el, i) => (
              <Square id={i} key={i}>
                {el}
              </Square>
            ))}
          </MasterMindBoard>

          <MasterMindBoard>
            {resultsArr.map((el, i) => (
              <Square id={i} key={i} rounded color={el}></Square>
            ))}
          </MasterMindBoard>
        </div>

        <div style={{ display: "flex" }}>
          <MasterMindBoard>
            {winningCombinationIcons.map((el, i) => (
              <Square key={i}>{el}</Square>
            ))}
          </MasterMindBoard>

          <MasterMindGuessingCombinationsBoard
            isDisabled={isGameOver || !shouldStart}
          >
            {allIcons.map((el, i) => (
              <Square key={i} id={i} handleClick={onClickHandler}>
                {el}
              </Square>
            ))}
          </MasterMindGuessingCombinationsBoard>
        </div>
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

      <Modal isShowing={isShowing} hide={toggle}>
        <InputModal score={score} resetScore={resetScore} />
      </Modal>

      <ModalResults
        isShowingResultsModal={isShowingResultsModal}
        toggleTwo={toggleTwo}
      >
        <ScoreModal id={userId} />
      </ModalResults>
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
`;

const MasterMindGuessingCombinationsBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
`;

export default MasterMind;

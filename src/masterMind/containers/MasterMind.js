import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UIfx from "uifx";
import successSound from "../../sounds/success.wav";
import failureSound from "../../sounds/failure.wav";
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

const allIcons = [smiles, clubs, spades, hearts, diamonds, stars];

const success = new UIfx(successSound);
const failure = new UIfx(failureSound);

/// Chunking array
const chunk = (array, size) => {
  const chunkedArr = [];
  let i = 0;
  while (i < array.length) {
    chunkedArr.push(array.slice(i, size + i));
    i += size;
  }
  return chunkedArr;
};

/// Push to the beginning of array instead of nulls
const pushElementsFromBeginingToRight = (array, element) => {
  let tempArr = [...array];
  let index = tempArr.findIndex((el) => el === null);
  tempArr[index] = element;
  return tempArr;
};

/// Check if winning and guessing arrays are matching
const compareArrays = (arr1, arr2) => {
  const result = [];
  const copyArr1 = [...arr1];
  const copyArr2 = [...arr2];

  arr2.forEach((el, i) => {
    if (
      typeof el !== "string" &&
      copyArr1.includes(el) &&
      copyArr1.findIndex((elem, ind) => elem === el && ind === i) !== -1
    ) {
      result.push("red");
      copyArr1[i] = "red";
      copyArr2[i] = "red";
    }
  });
  copyArr2.forEach((el, i) => {
    if (typeof el !== "string" && copyArr1.includes(el)) {
      result.push("yellow");
      copyArr1[copyArr1.indexOf(el)] = "yellow";
      copyArr2[i] = "yellow";
    }
  });
  copyArr2.forEach((el, i) => {
    if (typeof el !== "string" && !copyArr1.includes(el)) {
      result.push("black");
      copyArr2[i] = "black";
    }
  });
  return result;
};

const checkIfCombinationIsMatching = (array, winning) => {
  let matchingResultsArray = [];

  array.forEach((arrElem) => {
    if (arrElem.every((one) => one !== null)) {
      matchingResultsArray.push(...compareArrays(arrElem, winning));
    }
  });

  return matchingResultsArray;
};

///// *** COMPONENT *** /////
const MasterMind = (props) => {
  const [winningCombination, setWinningCombination] = useState([]);

  const [guessingCombination, setGuessingCombination] = useState(
    Array(24).fill(null)
  );
  const guessingIconsToShow = guessingCombination.map((el) => allIcons[el]);

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

  const isGameOverByWinning = chunk(resultsArr, 4).some((el) =>
    el.every((elem) => elem === "red")
  );
  const isGameOver =
    guessingCombination.every((el) => el !== null) || isGameOverByWinning;

  const winningCombinationIcons = isGameOver
    ? winningCombination.map((el) => allIcons[el])
    : Array(4).fill(null);

  if (whenToCallLength > whenToCallLengthRef.current) {
    const length = matchingResultsArr.length;
    resultsArr = [
      ...matchingResultsArr,
      ...Array(24 - (length > 24 ? 24 : length)).fill(null),
    ];
    isGameOverByWinning ? success.play() : failure.play();
  }

  useEffect(() => {
    setWinningCombination(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 6))
    );
  }, []);

  const onClickHandler = (e) => {
    const id = Number(
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id
    );
    setGuessingCombination(
      pushElementsFromBeginingToRight(guessingCombination, id)
    );
    whenToCallLengthRef.current = whenToCallLength;
    // success.play();
  };

  const handleReset = () => {
    setWinningCombination(
      Array.from({ length: 4 }, () => Math.floor(Math.random() * 6))
    );
    setGuessingCombination(Array(24).fill(null));
    resultsArr = Array(24).fill(null);
    whenToCallLengthRef.current = 0;
  };

  return (
    <MasterMindContainer>
      <h1>MASTERMIND</h1>
      <Button onClickHandler={handleReset}>New game</Button>
      <div>
        <div style={{ display: "flex" }}>
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

          <MasterMindGuessingCombinationsBoard>
            {allIcons.map((el, i) => (
              <Square key={i} id={i} handleClick={onClickHandler}>
                {el}
              </Square>
            ))}
          </MasterMindGuessingCombinationsBoard>
        </div>
      </div>
    </MasterMindContainer>
  );
};

const MasterMindContainer = styled.div`
  background-image: radial-gradient(circle, #427e60, #35654d, #2a513e);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
`;

export default MasterMind;

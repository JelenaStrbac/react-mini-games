import styled from "styled-components";
import Square from "../components/Square";
import {
  smiles,
  clubs,
  spades,
  hearts,
  diamonds,
  stars,
} from "../components/Icons";
import { useEffect, useRef, useState } from "react";

const allIcons = [smiles, clubs, spades, hearts, diamonds, stars];

/// 1. Determining winning combination
const randomNumberFromZeroToFive = () => Math.floor(Math.random() * 6);

const determineWinningCombination = () => {
  const winningCombination = [];

  let i = 0;
  while (i < 4) {
    winningCombination.push(randomNumberFromZeroToFive());
    i++;
  }
  return winningCombination;
};

/// 2. Chunking array with guesses
const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

/// 3. Check if winning and guessing arrays are matching
const checkIfCombinationIsMatching = (array, winning) => {
  // const colors = ["red", "yellow", "black"];
  let matchingResultsArray = [];

  array.forEach((el) => {
    if (el.every((elem) => elem !== null)) {
      el.forEach((element, index) => {
        if (winning.includes(element)) {
          if (
            index === winning.findIndex((e, i) => e === element && i >= index)
          ) {
            matchingResultsArray.push("red");
          } else {
            matchingResultsArray.push("yellow");
          }
        } else {
          matchingResultsArray.push("black");
        }
      });
    }
  });

  // matchingResultsArray.sort((a, b) => colors.indexOf(a) - colors.indexOf(b));
  // chunk(matchingResultsArray, 4).map((el) =>
  //   el.sort((a, b) => colors.indexOf(a) - colors.indexOf(b))
  // );
  return matchingResultsArray;
};

/// 4. Push to the end of array
const replaceElementsOfArray = (array, element) => {
  let tempArr = [...array];
  let index = tempArr.findIndex((el) => el === null);
  tempArr[index] = element;
  return tempArr;
};

///// *** COMPONENT *** /////
const MasterMind = (props) => {
  const [winningCombination, setWinningCombination] = useState([]);

  const [guessingData, setGuessingData] = useState({
    guessingCombination: Array(24).fill(null),
    guessingIconsToShow: Array(24).fill(null),
    resultsArr: Array(24).fill(null),
  });

  ////////////////////////////////////
  const [isTimeToCall, setIsTimeToCall] = useState(false);

  let chunkedArr = chunk([...guessingData.guessingCombination].flat(), 4);

  let whenToCall = chunk(
    checkIfCombinationIsMatching(chunkedArr, winningCombination),
    4
  );
  const whenToCallRef = useRef(whenToCall.length);
  console.log(whenToCallRef);
  if (whenToCall.length !== whenToCallRef.current) {
  }

  ////////////////////////////////////////
  const isGameOver =
    guessingData.guessingCombination.every((el) => el !== null) ||
    chunk(guessingData.resultsArr, 4).some((el) =>
      el.every((elem) => elem === "red")
    );

  const winningCombinationIcons = isGameOver
    ? winningCombination.map((el) => allIcons[el])
    : Array(4).fill(null);

  useEffect(() => {
    setWinningCombination(determineWinningCombination());
  }, []);

  useEffect(() => {
    if (whenToCall) {
      setIsTimeToCall(true);
    }
  }, [whenToCall.length]);

  const onClickHandler = (e) => {
    const id = Number(
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id
    );

    let chunkedArr = chunk([...guessingData.guessingCombination].flat(), 4);

    setGuessingData({
      guessingIconsToShow: replaceElementsOfArray(
        guessingData.guessingIconsToShow,
        allIcons[id]
      ),
      guessingCombination: replaceElementsOfArray(
        guessingData.guessingCombination,
        id
      ),
      resultsArr: [
        ...checkIfCombinationIsMatching(chunkedArr, winningCombination),
        ...Array(
          24 -
            [...checkIfCombinationIsMatching(chunkedArr, winningCombination)]
              .length
        ).fill(null),
      ],
    });
  };
  console.log("winningCombination", winningCombination);
  console.log("guessingData", guessingData);
  console.log("whenToCall", whenToCall);
  console.log("isTimeToCall", isTimeToCall);

  return (
    <MasterMindContainer>
      <div>
        <div style={{ display: "flex" }}>
          <MasterMindBoard>
            {guessingData.guessingIconsToShow.map((el, i) => (
              <Square id={i} key={i}>
                {el}
              </Square>
            ))}
          </MasterMindBoard>

          <MasterMindBoard>
            {guessingData.resultsArr.map((el, i) => (
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

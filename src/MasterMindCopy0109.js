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
  let winningArray = [...winning];
  // winning = [0, 5, 2, 5]
  // my = [0, 0, 5, 5]
  //// red, yellow, black, red

  array.forEach((el) => {
    if (el.every((elem) => elem !== null)) {
      el.forEach((element, index) => {
        if (!winningArray.includes(element)) {
          matchingResultsArray.push("black");
        }
        if (winningArray.includes(element)) {
          if (
            winningArray.findIndex((e, i) => e === element && i === index) !==
            -1
          ) {
            matchingResultsArray.push("red");
            winningArray[index] = "red";
          }
        }
      });
      el.forEach((yelement, yindex) => {
        if (winningArray.includes(yelement)) {
          matchingResultsArray.push("yellow");
          winningArray[winningArray.indexOf(yelement)] = "yellow";
        }
      });
    }
    console.log("testirammmmm", winningArray);
    winningArray = [...winning];
    console.log("testirammmmm2222222", winningArray);
  });
  console.log("testirammmmm", winningArray);
  // winningArray = [...winning];

  // array.forEach((el) => {
  //   if (el.every((elem) => elem !== null)) {
  //     el.forEach((element, index) => {
  //       if (winningArray.includes(element)) {
  //         if (
  //           winningArray.findIndex((e, i) => e === element && i === index) !==
  //           -1
  //         ) {
  //           matchingResultsArray.push("red");
  //           winningArray[index] = "red";
  //         } else {
  //           matchingResultsArray.push("yellow");
  //           winningArray[winningArray.indexOf(element)] = "yellow";
  //         }
  //       } else {
  //         matchingResultsArray.push("black");
  //       }
  //     });
  //   }
  //   winningArray = [...winning];
  // });
  // array.forEach((el) => {
  //   if (el.every((elem) => elem !== null)) {
  //     el.forEach((element, index) => {
  //       if (winning.includes(element)) {
  //         if (
  //           index === winning.findIndex((e, i) => e === element && i === index)
  //         ) {
  //           matchingResultsArray.push("red");
  //         } else if (
  //           index === winning.findIndex((e, i) => e === element && i < index)
  //         ) {
  //           matchingResultsArray.push("black");
  //         } else {
  //           matchingResultsArray.push("yellow");
  //         }
  //       } else {
  //         matchingResultsArray.push("black");
  //       }
  //     });
  //   }
  // });

  // matchingResultsArray.sort((a, b) => colors.indexOf(a) - colors.indexOf(b));
  // chunk(matchingResultsArray, 4).map((el) =>
  //   el.sort((a, b) => colors.indexOf(a) - colors.indexOf(b))
  // );
  console.log("matchingArr", matchingResultsArray);
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
  });

  const [resultsArr, setResultsArr] = useState(Array(24).fill(null));

  ////////////////////////////////////
  const chunkedArr = chunk([...guessingData.guessingCombination].flat(), 4);
  const chunkedArrRef = useRef(chunkedArr);
  const whenToCall = chunk(
    checkIfCombinationIsMatching(chunkedArr, winningCombination),
    4
  );

  ////////////////////////////////////////
  const isGameOver =
    guessingData.guessingCombination.every((el) => el !== null) ||
    chunk(resultsArr, 4).some((el) => el.every((elem) => elem === "red"));

  const winningCombinationIcons = isGameOver
    ? winningCombination.map((el) => allIcons[el])
    : Array(4).fill(null);

  useEffect(() => {
    setWinningCombination(determineWinningCombination());
  }, []);

  useEffect(() => {
    setResultsArr([
      ...checkIfCombinationIsMatching(chunkedArr, winningCombination),
      ...Array(
        24 -
          [...checkIfCombinationIsMatching(chunkedArr, winningCombination)]
            .length
      ).fill(null),
    ]);
  }, [whenToCall.length, winningCombination]);

  const onClickHandler = (e) => {
    const id = Number(
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id
    );

    setGuessingData({
      guessingCombination: replaceElementsOfArray(
        guessingData.guessingCombination,
        id
      ),
      guessingIconsToShow: replaceElementsOfArray(
        guessingData.guessingIconsToShow,
        allIcons[id]
      ),
    });
  };
  console.log("winningCombination", winningCombination);
  console.log("guessingData", guessingData);
  // console.log("whenToCall", whenToCall);
  // console.log("chunkedArr", chunkedArr);
  console.log("resultsArr", resultsArr);

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

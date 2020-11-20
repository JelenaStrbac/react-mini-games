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
import { useEffect, useState } from "react";

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
  let matchingResultsArray = [];
  let guessingArray = JSON.parse(JSON.stringify(array));
  let winningArray = [...winning];

  array.forEach((el, ind) => {
    if (el.every((elem) => elem !== null)) {
      el.forEach((element, index) => {
        if (!winningArray.includes(element)) {
          matchingResultsArray.push("black");
          guessingArray[ind][guessingArray[ind].indexOf(element)] = "black";
        } else if (
          typeof element !== "string" &&
          winningArray.includes(element)
        ) {
          if (
            winningArray.findIndex((e, i) => e === element && i === index) !==
            -1
          ) {
            matchingResultsArray.push("red");
            winningArray[index] = "red";
            guessingArray[ind][index] = "red";
            // winningArray.filter((e, i) => e === element && i === index)
          }
        }
      });
      debugger;
      el.forEach((yelement) => {
        if (typeof yelement !== "string" && winningArray.includes(yelement)) {
          matchingResultsArray.push("yellow");
          // winningArray[winningArray.indexOf(yelement)] = "yellow";
          // guessingArray[ind][guessingArray[ind].indexOf(yelement)] = "yellow";
        }
      });
      // el.forEach((belement) => {
      //   if (!winningArray.includes(belement)) {
      //     matchingResultsArray.push("black");
      //     winningArray[winningArray.indexOf(belement)] = "black";
      //   }
      // });
    }
    console.log("testirammmmm", winningArray);
    console.log("guessingArray", guessingArray);
    winningArray = [...winning];
    guessingArray = [...array];
  });

  // const checkIfCombinationIsMatching = (array, winning) => {
  //   let matchingResultsArray = [];
  //   let guessingArray = JSON.parse(JSON.stringify(array));
  //   let winningArray = [...winning];

  //   guessingArray.forEach((el, ind) => {
  //     if (el.every((elem) => elem !== null)) {
  //       el.forEach((element, index) => {
  //         if (winningArray.includes(element)) {
  //           if (
  //             winningArray.findIndex((e, i) => e === element && i === index) !==
  //             -1
  //           ) {
  //             matchingResultsArray.push("red");
  //             winningArray[index] = "red";
  //             guessingArray[ind][index] = "red";
  //           }
  //         }
  //       });
  //       el.forEach((yelement) => {
  //         if (typeof yelement !== "string" && winningArray.includes(yelement)) {
  //           matchingResultsArray.push("yellow");
  //           winningArray[winningArray.indexOf(yelement)] = "yellow";
  //           guessingArray[ind][guessingArray.indexOf(yelement)] = "yellow";
  //         } else if (
  //           typeof yelement !== "string" &&
  //           !winningArray.includes(yelement)
  //         ) {
  //           matchingResultsArray.push("black");
  //           winningArray[winningArray.indexOf(yelement)] = "black";
  //           guessingArray[ind][guessingArray.indexOf(yelement)] = "black";
  //         }
  //       });
  //       // el.forEach((belement) => {
  //       //   if (!winningArray.includes(belement)) {
  //       //     matchingResultsArray.push("black");
  //       //     winningArray[winningArray.indexOf(belement)] = "black";
  //       //   }
  //       // });
  //     }
  //     console.log("testirammmmm", winningArray);
  //     console.log("guessingArray", guessingArray);
  //     winningArray = [...winning];
  //     guessingArray = [...array];
  //   });

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
  console.log("guessingData", guessingData.guessingCombination);
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

import styled from "styled-components";
import Square from "../components/Square";
import { $1, $2, $3, $4, $5, $6 } from "../components/Icons";

const allCombinations = [$1, $2, $3, $4, $5, $6];

const MasterMind = (props) => {
  const randomNumberFromZeroToFive = () => Math.floor(Math.random() * 6);

  console.log(
    randomNumberFromZeroToFive(),
    randomNumberFromZeroToFive(),
    randomNumberFromZeroToFive(),
    randomNumberFromZeroToFive()
  );

  const onClickHandler = (e) => {
    console.log(e.target.id);
  };

  return (
    <MasterMindContainer>
      <div>
        <div style={{ display: "flex" }}>
          <MasterMindBoard>
            {Array(24)
              .fill(null)
              .map((el, i) => (
                <Square id={i}></Square>
              ))}
          </MasterMindBoard>
          <MasterMindBoard>
            {Array(24)
              .fill(null)
              .map((el, i) => (
                <Square id={i} rounded></Square>
              ))}
          </MasterMindBoard>
        </div>

        <div style={{ display: "flex" }}>
          <MasterMindBoard>
            {Array(4)
              .fill(null)
              .map((el, i) => (
                <Square></Square>
              ))}
          </MasterMindBoard>

          <MasterMindGuessingCombinationsBoard>
            {allCombinations.map((el, i) => (
              <Square id={i} handleClick={onClickHandler}>
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

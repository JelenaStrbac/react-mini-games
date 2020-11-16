import React from "react";
import styled, { keyframes } from "styled-components";

const GameBoard = (props) => {
  return (
    <div style={styles.gameBoard}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((el, i) => (
        <Cell
          key={el}
          id={el}
          onClick={props.handleClick}
          winningCombination={
            props.winningCombination && props.winningCombination.includes(i)
              ? true
              : false
          }
        >
          {props.gameBoard[el]}
        </Cell>
      ))}
    </div>
  );
};

const pulse = keyframes`{
    0%   {color: ##282829;}
    50%  {color: #FF416C;}
    100% {color: #FF4B2B;}
}`;

const styles = {
  gameBoard: {
    width: "510px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "spaceBetween",
  },
};

const Cell = styled.div`
  background-image: linear-gradient(to right, #eef2f3, #c0c0c0);
  font-size: 72px;
  font-weight: bold;
  color: #282829;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation-name: ${(props) => (props.winningCombination ? pulse : null)};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export default GameBoard;

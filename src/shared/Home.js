import { Link } from "react-router-dom";
import styled from "styled-components";

import background from "../images/app-background.jpg";
import ticTacToeImg from "../images/background.jpg";
import masterMindImg from "../images/cards.png";
import HomeCard from "./HomeCard";
import Button from "./UI/Button";

const Home = (props) => {
  return (
    <HomeStyled>
      <HomeCard
        image={ticTacToeImg}
        path={"/tic-tac-toe"}
        gameName={"TIC TAC TOE"}
      />
      <HomeCard
        image={masterMindImg}
        path={"/mastermind"}
        gameName={"MASTERMIND"}
      />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  //   background-image: linear-gradient(to right, #414345, #232526);
  background-image: url("${background}");
  background-size: cover;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default Home;

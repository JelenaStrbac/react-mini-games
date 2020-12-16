import styled from "styled-components";

import background from "../assets/images/anatomy.png";
// import background from "../assets/images/app-background.jpg";
import ticTacToeImg from "../assets/images/background.jpg";
import masterMindImg from "../assets/images/cards.png";
import HomeCard from "./HomeCard";

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
  background-image: linear-gradient(
      to right,
      rgba(65, 67, 69, 0.95),
      rgba(35, 37, 38, 0.9)
    ),
    url("${background}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;

import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./UI/Button";

const HomeCard = (props) => {
  return (
    <Card>
      <Image>
        <Img src={props.image} alt="tic-tac-toe" />
      </Image>
      <Title>{props.gameName}</Title>
      <Link to={props.path} style={{ textDecoration: "none" }}>
        <Button>PLAY</Button>
      </Link>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 350px;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, .2);

  @media only screen and (max-width: 480px) {
    width: 200px;
    height: 250px;
  }
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: bold;
  color: #282829;

  @media only screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

const Image = styled.div`
  font-size: 46px;
  font-weight: bold;
  color: #282829;
  background-color: #35654d;
  width: 300px;
  height: 200px;

  @media only screen and (max-width: 480px) {
    width: 200px;
    height: 134px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;

  @media only screen and (max-width: 480px) {
    width: 200px;
    height: 134px;
  }
`;

export default HomeCard;

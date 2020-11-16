import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./UI/Button";

const HomeCard = (props) => {
  return (
    <Card>
      <Image>
        <img
          src={props.image}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
          alt="tic-tac-toe"
        />
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
  // border: 1px solid #282829;
  // border: 10px solid #ce2039;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, .2);
  // background-image: linear-gradient(to right, #414345, #232526);
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: bold;
  color: #282829;
`;

const Image = styled.div`
  font-size: 46px;
  font-weight: bold;
  color: #282829;
  background-color: #35654d;
  width: 300px;
  height: 200px;
  // object-fit: contain;
`;

export default HomeCard;

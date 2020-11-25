import styled from "styled-components";

import { ImPlay3 } from "react-icons/im";
import Button from "../../shared/UI/Button";
import Timer from "../containers/Timer";

const SideController = (props) => {
  return (
    <Controler>
      <ScoreTimeContainer>
        <Button onClickHandler={props.startChallenge} isChallenge>
          Start <ImPlay3 />
        </Button>
      </ScoreTimeContainer>
      <ScoreTimeContainer>
        <div>Score: {props.score}</div>
        <Timer
          shouldStart={props.shouldStart}
          stopStartHandler={props.stopStartHandler}
        />
      </ScoreTimeContainer>
    </Controler>
  );
};

const Controler = styled.div`
  background-color: #193025;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  margin-left: 160px;
  position: absolute;
  right: 0;
  top: 85px;
  height: 80%;

  @media only screen and (max-width: 480px) {
    margin-left: 0;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px 0 0 0;
    position: static;
    height: auto;
    width: 100%;
  }
`;
const ScoreTimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 480px) {
    align-items: flex-end;
    min-width: 94px;
    padding: 10px;
  }
`;

export default SideController;

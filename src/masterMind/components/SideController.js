import styled from "styled-components";

import { ImPlay3 } from "react-icons/im";
import Button from "../../shared/UI/Button";
import Timer from "../containers/Timer";

const SideController = (props) => {
  return (
    <Controler>
      <Button onClickHandler={props.startChallenge} isChallenge>
        Start <ImPlay3 />
      </Button>
      <div>Score: {props.score}</div>
      <Timer
        shouldStart={props.shouldStart}
        stopStartHandler={props.stopStartHandler}
      />
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
`;

export default SideController;

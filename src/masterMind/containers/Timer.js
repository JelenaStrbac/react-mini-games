import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

let totalSec = 180; // 3min
let width = 200;

const Timer = ({ shouldStart, stopStartHandler }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  width = 200 - (totalSec / 180) * 200;
  totalSec = minutes * 60 + seconds;

  const minutesRef = useRef(minutes);
  const secondsRef = useRef(seconds);
  const stopStartHandlerRef = useRef(stopStartHandler);

  useEffect(() => {
    minutesRef.current = minutes;
    secondsRef.current = seconds;
    stopStartHandlerRef.current = stopStartHandler;
  });

  useEffect(() => {
    if (shouldStart) {
      let myInterval = setInterval(() => {
        if (secondsRef.current > 0) {
          setSeconds(secondsRef.current - 1);
        }
        if (secondsRef.current === 0) {
          if (minutesRef.current === 0) {
            clearInterval(myInterval);
            stopStartHandlerRef.current(); // when time lapses, reset all
            setMinutes(3);
            setSeconds(0);
          } else {
            setMinutes(minutesRef.current - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [shouldStart]);

  return (
    <Container>
      <div>
        Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <ProgressBar>
        <ProgressBarTime width={width}></ProgressBarTime>
      </ProgressBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  margin-top: 40px;

  @media only screen and (max-width: 480px) {
    margin-top: 0;
    width: auto;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 20px;
  background-color: black;
  margin-top: 20px;
  border: 1px solid white;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const ProgressBarTime = styled.div`
  height: 100%;
  width: ${(props) => props.width}px;
  background-image: linear-gradient(to bottom, #02aab0, #00cdac);
`;

export default Timer;

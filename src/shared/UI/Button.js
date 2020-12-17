import styled, { keyframes } from "styled-components";

const Button = (props) => {
  return (
    <ButtonStyled
      onClick={props.onClickHandler}
      isDisabled={props.isDisabled}
      isChallenge={props.isChallenge}
      shouldStart={props.shouldStart}
      type={props.type}
    >
      {props.children}
    </ButtonStyled>
  );
};

const pulse = keyframes`{
  0%   {color: ##282829;}
  50%  {color: #FF416C;}
  100% {color: #FF4B2B;}
}`;

const ButtonStyled = styled.div`
  background-image: ${(props) =>
    props.isChallenge
      ? "linear-gradient(to right, #FF416C, #FF4B2B)"
      : "linear-gradient(to right, #00cdac, #02aab0)"};
  color: white;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  border: none;
  width: 92px;
  height: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  outline: none;
  margin: 40px;
  &:hover {
    box-shadow: ${(props) =>
      props.isDisabled
        ? "none"
        : props.isChallenge
        ? "0px 15px 20px rgba(255,75,43, 0.4)"
        : "0px 15px 20px rgba(2, 170, 176, 0.4)"};
    transform: ${(props) => (props.isDisabled ? "none" : "translateY(3px)")};
  }
  animation-name: ${(props) => (props.shouldStart ? pulse : null)};
  animation-duration: 1s;
  animation-iteration-count: 5;
  animation-timing-function: ease-in-out;

  @media only screen and (max-width: 480px) {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export default Button;

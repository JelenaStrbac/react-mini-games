import styled from "styled-components";

const Button = (props) => {
  return (
    <ButtonStyled
      onClick={props.onClickHandler}
      isDisabled={props.isDisabled}
      isChallenge={props.isChallenge}
      type={props.type}
    >
      {props.children}
    </ButtonStyled>
  );
};

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
`;

export default Button;

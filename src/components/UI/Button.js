import styled from "styled-components";

const Button = (props) => {
  return (
    <ButtonStyled onClick={props.onClickHandler}>{props.children}</ButtonStyled>
  );
};

const ButtonStyled = styled.div`
  background-image: linear-gradient(to right, #00cdac, #02aab0);
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  margin: 40px;
  &:hover {
    box-shadow: 0px 15px 20px rgba(2, 170, 176, 0.4);
    transform: translateY(3px);
  }
`;

export default Button;

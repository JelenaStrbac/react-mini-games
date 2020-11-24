import styled from "styled-components";

const Square = (props) => {
  return (
    <SquareStyled
      id={props.id}
      rounded={props.rounded}
      onClick={props.handleClick}
      color={props.color}
    >
      {props.children}
    </SquareStyled>
  );
};

const SquareStyled = styled.div`
  background-color: ${(props) =>
    props.rounded
      ? props.color === "red"
        ? "red"
        : props.color === "yellow"
        ? "yellow"
        : "#000"
      : "#75b796"};
  width: 50px;
  height: 50px;
  margin: 4px;
  border-radius: ${(props) => (props.rounded ? "50%" : "0%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Square;

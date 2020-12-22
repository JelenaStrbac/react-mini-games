import styled from "styled-components";

const Square = (props) => {
  return (
    <SquareStyled
      id={props.id}
      rounded={props.rounded}
      onClick={props.handleClick}
      color={props.color}
      data-testid={
        props.testG
          ? `g${props.id}`
          : props.testB
          ? `b${props.id}`
          : props.testR
          ? `r${props.id}`
          : null
      }
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

  @media only screen and (max-width: 480px) {
    width: ${(props) => (props.rounded ? "21px" : "50px")};
    height: ${(props) => (props.rounded ? "21px" : "50px")};
  }
`;

export default Square;

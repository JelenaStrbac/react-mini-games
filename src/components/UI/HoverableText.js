import styled from "styled-components";

const HoverableText = (props) => {
  return (
    <HoverableTextStyled onClick={props.onClickHandler}>
      {props.children}
    </HoverableTextStyled>
  );
};

const HoverableTextStyled = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default HoverableText;

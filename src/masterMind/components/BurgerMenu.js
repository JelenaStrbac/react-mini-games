import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import { ImQuestion } from "react-icons/im";
import { RiFileList3Line } from "react-icons/ri";

import Modal from "./Modal/Modal";
import useModal from "../hooks/useModal";
import Rules from "./Rules";
import Leaderboard from "./Leaderboard";

const BurgerMenu = (props) => {
  const { isShowing, toggle } = useModal();
  const [whatIsClicked, setWhatIsClicked] = useState("");

  const onClickHandler = (e) => {
    const id =
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id;
    setWhatIsClicked(id);
    toggle();
  };

  return (
    <Container>
      <Menu {...props} styles={styles} right>
        <Title>MASTERMIND</Title>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <StyledContainer id="board" onClick={onClickHandler}>
            <RiFileList3Line id="board" />{" "}
            <span id="board" style={{ marginLeft: "3px" }}>
              Scoreboard
            </span>
          </StyledContainer>
          <StyledContainer id="rules" onClick={onClickHandler}>
            <ImQuestion id="rules" />
            <span id="rules" style={{ marginLeft: "3px" }}>
              Rules
            </span>
          </StyledContainer>
        </div>
        <Modal isShowing={isShowing} hide={toggle}>
          {whatIsClicked === "rules" ? <Rules /> : <Leaderboard />}
        </Modal>
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media only screen and (max-width: 480px) {
    display: block;
  }
`;

const Title = styled.div`
  font-family: Monoton;
  font-size: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
`;

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#bdc3c7",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export default BurgerMenu;

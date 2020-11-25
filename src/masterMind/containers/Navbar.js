import { useState } from "react";
import styled from "styled-components";
import { ImQuestion } from "react-icons/im";
import { RiFileList3Line } from "react-icons/ri";

import Modal from "../components/Modal/Modal";
import useModal from "../hooks/useModal";
import Rules from "../components/Rules";
import Leaderboard from "../components/Leaderboard";

const Navbar = () => {
  const { isShowing, toggle } = useModal();
  const [whatIsClicked, setWhatIsClicked] = useState("");

  const onClickHandler = (e) => {
    const id =
      e.target.nodeName === "path" ? e.target.parentNode.id : e.target.id;
    setWhatIsClicked(id);
    toggle();
  };

  return (
    <Navigation>
      <Title>MASTERMIND</Title>

      <div style={{ display: "flex", alignItems: "center" }}>
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
    </Navigation>
  );
};

const Navigation = styled.div`
  background-color: #193025;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Title = styled.div`
  font-family: Monoton;
  font-size: 30px;
  margin-left: 40px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  cursor: pointer;
`;

export default Navbar;

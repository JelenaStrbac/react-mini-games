import styled from "styled-components";
import { cup } from "../../shared/UI/Icons";

const ScoreModal = ({ user }) => {
  return (
    <ScoreModalContainer>
      {cup}
      <div style={{ marginTop: "30px" }}>
        {user
          ? `Congratulations! ${user[0]?.userName}, your position is ${user[0]?.position}.`
          : null}
      </div>
    </ScoreModalContainer>
  );
};

const ScoreModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ScoreModal;

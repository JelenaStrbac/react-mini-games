import styled from "styled-components";
import useResources from "../hooks/useResources";
import { cup } from "../components/Icons";

const ScoreModal = (props) => {
  const users = useResources();
  const user = users.filter((el) => el.id === props.id);

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

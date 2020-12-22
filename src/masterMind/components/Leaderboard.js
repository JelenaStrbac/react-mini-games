import styled from "styled-components";
import useResources from "../hooks/useResources";
import RowLeaderboard from "../../shared/UI/RowLeaderboard";

const Leaderboard = () => {
  const fetchedUsers = useResources();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Score list</h1>
      <div style={{ maxHeight: "420px", overflow: "scroll" }}>
        <table>
          <thead>
            <tr>
              <Th>No.</Th>
              <Th>Name</Th>
              <Th>Points</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody data-testid="tbody">
            {fetchedUsers
              ? fetchedUsers.map((el, i) => (
                  <RowLeaderboard
                    key={i}
                    no={el.position}
                    name={el.userName}
                    points={el.score}
                    date={el.date}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  border-collapse: collapse;
  background-color: #dddddd;
  font-weight: bold;
  position: sticky;
  top: 0;
`;

export default Leaderboard;

import styled from "styled-components";

const RowLeaderboard = ({ no, name, points, date }) => {
  return (
    <tr>
      <Td isCentered>{no}</Td>
      <Td>{name}</Td>
      <Td isCentered>{points}</Td>
      <Td>{date}</Td>
    </tr>
  );
};

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  text-align: ${(props) => (props.isCentered ? "center" : "left")};
  padding: 8px;
  border-collapse: collapse;
`;

export default RowLeaderboard;

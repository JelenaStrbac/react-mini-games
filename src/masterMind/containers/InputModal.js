import axios from "../../axios";
import { useState } from "react";
import styled from "styled-components";
import { coins } from "../../shared/UI/Icons";
import ScoreModal from "../components/ScoreModal";
import { getPositionOfUsers } from "../utils/helperFunctions";
import Spinner from "../../shared/UI/Spinner";

const InputModal = (props) => {
  const [inputName, setInputName] = useState("");
  const [hide, setHide] = useState(false);
  const [whatToRender, setWhatToRender] = useState("");

  const userData = {
    userName: inputName,
    score: props.score,
    date: new Date().toLocaleString(),
  };

  const handleChange = (event) => {
    setInputName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request after particular user finishes game
      const responsePostOneUser = await axios.post("/users.json", userData);
      const userId = responsePostOneUser.data.name;
      setHide(true);
      setWhatToRender(<Spinner />);

      // GET request => fetching all users, incl. the last one who played
      const responseGetAllUsers = await axios.get(`/users.json`);
      const allUsersSorted = getPositionOfUsers(responseGetAllUsers.data);

      // filtering last user to see the position
      const user = allUsersSorted.filter((el) => el.id === userId);
      setWhatToRender(<ScoreModal user={user} />);

      // reseting score to 0 when POST particular user & GET particular user requests finish
      props.resetScore();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <InputModalContainer hide={hide}>
        {coins}
        <div>
          Your score is{" "}
          <span style={{ fontWeight: "bold" }}>{props.score}</span>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            value={inputName}
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
            required
          />
          <ButtonStyle type="submit">Submit</ButtonStyle>
        </form>
      </InputModalContainer>
      {whatToRender}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InputModalContainer = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-top: 40px;
`;

const ButtonStyle = styled.button`
  background-image: linear-gradient(to right, #00cdac, #02aab0);
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
  border: none;
  width: 92px;
  height: 40px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  margin: 40px;
`;

export default InputModal;

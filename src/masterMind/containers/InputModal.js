import axios from "../../axios";
import { useState } from "react";
import styled from "styled-components";
import { coins } from "../components/Icons";

const InputModal = (props) => {
  const [inputName, setInputName] = useState("");

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
      const response = await axios.post("/users.json", userData);
      let userId = response.data.name;
      if (response) {
        props.resetScore(userId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InputModalContainer>
      {coins}
      <div>
        Your score is <span style={{ fontWeight: "bold" }}>{props.score}</span>
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
  );
};

const InputModalContainer = styled.div`
  display: flex;
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

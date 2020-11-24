import axios from "axios";

const instance = axios.create({
  baseURL: "https://mastermind-d1089.firebaseio.com/",
});

export default instance;

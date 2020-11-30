import { useState, useEffect } from "react";
import axios from "../../axios";
import { getPositionOfUsers } from "../utils/helperFunctions";

const useResources = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/users.json`);
        const allUsersSorted = getPositionOfUsers(response.data);
        setFetchedUsers(allUsersSorted);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return fetchedUsers;
};

export default useResources;

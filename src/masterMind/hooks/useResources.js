import { useState, useEffect } from "react";
import axios from "../../axios";

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const useResources = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/users.json`);

        if (response) {
          const fetchedUsersInArray = [];
          for (let key in response.data) {
            fetchedUsersInArray.push({
              ...response.data[key],
              id: key,
            });
          }
          fetchedUsersInArray.sort((a, b) => b.score - a.score);

          const groupedUsersByScore = groupBy(fetchedUsersInArray, "score");
          const keys = Object.keys(groupedUsersByScore)
            .map((el) => Number(el))
            .sort((a, b) => b - a);

          fetchedUsersInArray.forEach((el) => {
            keys.forEach((elem) => {
              if (el.score === elem) {
                el.position = keys.indexOf(elem) + 1;
              }
            });
          });
          setFetchedUsers(fetchedUsersInArray);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return fetchedUsers;
};

export default useResources;

// const myArr = [
//   {
//     date: "23/11/2020, 16:38:57",
//     id: "-MMpkWRKGvWi2LtT5vOp",
//     score: 90,
//     timeInMs: 1606145937352,
//     userName: "Zoran",
//   },
//   {
//     date: "23/11/2020, 16:50:39",
//     id: "-MMpnBt6yfqM1SjO58aI",
//     score: 160,
//     timeInMs: 1606146639646,
//     userName: "Petar",
//   },
//   {
//     date: "23/11/2020, 20:43:14",
//     id: "-MMqcRBQLh_wYzuNrH5l",
//     score: 220,
//     timeInMs: 1606160594460,
//     userName: "Iris",
//   },
//   {
//     date: "23/11/2020, 20:48:21",
//     id: "-MMqdb7ocGfE9f0LVV1z",
//     score: 190,
//     timeInMs: 1606160901662,
//     userName: "Ptica Trkacica",
//   },
//   {
//     date: "23/11/2020, 16:21:03",
//     id: "-MMpgQupkYay_qFEXLRO",
//     score: 90,
//     timeInMs: 1606144863244,
//     userName: "Jelena ",
//   },
//   {
//     date: "23/11/2020, 17:17:07",
//     id: "-MMptFaIW2q6HQTTuK4H",
//     score: 160,
//     timeInMs: 1606148227145,
//     userName: "Fiki",
//   },
// ];

// myArr.sort((a, b) => b.score - a.score);

// const groupBy = (objectArray, property) => {
//   return objectArray.reduce((acc, obj) => {
//     let key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, {});
// };

// const groupedUsersByScore = groupBy(myArr, "score");
// const keys = Object.keys(groupedUsersByScore)
//   .map((el) => Number(el))
//   .sort((a, b) => b - a);
// myArr.forEach((el) => {
//   keys.forEach((elem) => {
//     if (el.score === elem) {
//       el.position = keys.indexOf(elem) + 1;
//     }
//   });
// });

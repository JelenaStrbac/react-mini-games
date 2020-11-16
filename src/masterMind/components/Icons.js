import {
  ImSpades,
  ImClubs,
  ImDiamonds,
  ImHeart,
  ImStarFull,
  ImSmile2,
} from "react-icons/im";
import { IconContext } from "react-icons";

const changeIcon = (icon, color, size) => {
  return (
    <IconContext.Provider value={{ color, size: "40px" }}>
      <div>{icon}</div>
    </IconContext.Provider>
  );
};

export const $1 = changeIcon(<ImSmile2 />, "yellow");
export const $2 = changeIcon(<ImClubs />, "black");
export const $3 = changeIcon(<ImSpades />, "black");
export const $4 = changeIcon(<ImHeart />, "red");
export const $5 = changeIcon(<ImDiamonds />, "red");
export const $6 = changeIcon(<ImStarFull />, "yellow");

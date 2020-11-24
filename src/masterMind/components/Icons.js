import {
  ImSpades,
  ImClubs,
  ImDiamonds,
  ImHeart,
  ImStarFull,
  ImSmile2,
} from "react-icons/im";
import { GiCoins, GiTrophyCup } from "react-icons/gi";
import { IconContext } from "react-icons";

const changeIcon = (icon, color, size = "40px") => {
  return (
    <IconContext.Provider value={{ color, size }}>{icon}</IconContext.Provider>
  );
};

export const smiles = changeIcon(<ImSmile2 id={0} />, "yellow");
export const clubs = changeIcon(<ImClubs id={1} />, "black");
export const spades = changeIcon(<ImSpades id={2} />, "black");
export const hearts = changeIcon(<ImHeart id={3} />, "red");
export const diamonds = changeIcon(<ImDiamonds id={4} />, "red");
export const stars = changeIcon(<ImStarFull id={5} />, "yellow");
export const coins = changeIcon(<GiCoins />, "#e7d641");
export const cup = changeIcon(<GiTrophyCup />, "#e7d641", "100px");

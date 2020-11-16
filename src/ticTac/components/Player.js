import React from "react";

const Player = (props) => {
  const active = props.active ? styles.active : null;
  return (
    <div>
      <div className="Player" style={{ ...styles.player, ...active }}>
        {props.children} player
      </div>
      <div>Score: {props.score}</div>
    </div>
  );
};

const styles = {
  player: {
    backgroundImage: "linear-gradient(to right, #ffa7bb, #ffa291)",
    color: "white",
    fontWeight: "bold",
    width: "100px",
    height: "30px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient(to right, #FF416C, #FF4B2B)",
  },
};

export default Player;

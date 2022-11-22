import React from "react";

import "./gameItems.css";
import rockItem from "../../../../assets/rock_red.png";
import paperItem from "../../../../assets/paper_red.png";
import scissorsItem from "../../../../assets/scissors_red.png";

const GameItems = (props) => {
  return (
    <div
      className={`game-item ${props.playing ? "clickable" : ""} ${props.name}`}
    >
      <img
        className={props.code === 1 ? "img-animate" : ""}
        src={
          props.name === "rock"
            ? rockItem
            : props.name === "paper"
            ? paperItem
            : scissorsItem
        }
        {...props}
        onClick={props.onClick}
        alt={props.name}
      />
    </div>
  );
};

export default GameItems;

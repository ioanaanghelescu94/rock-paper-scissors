import React from "react";

const LeaerboardUser = (props) => {
  const isCurrentUser = props.id === props.currentUserId;

  return (
    <div
      className={`leaderboard-user ${isCurrentUser ? "current" : ""}`}
      user-id={props.id}
    >
      <div className="ranking">{props.index + 1}</div>
      <div className="user-score">
        <div className="username">
          {props.name + `${isCurrentUser ? " (YOU)" : ""}`}
        </div>
        <div className="total-score">{props.score ? props.score : 0} pts</div>
      </div>
    </div>
  );
};

export default LeaerboardUser;

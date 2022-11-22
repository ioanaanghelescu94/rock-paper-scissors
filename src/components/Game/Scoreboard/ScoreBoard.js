import React from "react";
import LeaderboardUser from "./LeaderboardUser";

const ScoreBoard = (props) => {
  //sorting users to display on leaderboard
  const leaderboard = props.users.sort((a,b) => b.totalScore() - a.totalScore());

  return (
    <div className="scoreboard-wrapper">
      <div className="scoreboard">
        <h2 className="scoreboard--your-score-title">Your Score</h2>
        <h3 className="scoreboard--current-user">({props.currentUserName})</h3>
        <p>Wins: {props.wins}</p>
        <p>Draws: {props.draws}</p>
        <p>Losses: {props.losses}</p>
        <p>
          <b>Total Score:</b> {props.totalScore()}
        </p>
      </div>
      <div className="leaderboard">
        <h2>LEADERBOARD</h2>
        {leaderboard.map((user, index) => {
          const score = user.totalScore();
          return (
            <LeaderboardUser
              key={user.id}
              id={user.id}
              name={user.name}
              score={score}
              index={index}
              currentUserId={props.currentUserId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ScoreBoard);

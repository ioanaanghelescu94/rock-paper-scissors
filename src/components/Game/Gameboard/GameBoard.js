import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";
import GameItems from "./GameItems/GameItems";

const GameBoard = (props) => {
  if (props.playing) {
    return (
      <Fragment>
        <div className="items-wrapper">
          {props.items.map((item) => {
            const itemName = item["name"];
            const itemRelations = item["relations"];
            return (
              <GameItems
                key={Math.random()}
                name={itemName}
                playing={props.playing}
                {...itemRelations}
                onClick={props.onClick}
              />
            );
          })}
        </div>
      </Fragment>
    );
  } else {
    if (props.noChoice) {
      return (
        <Fragment>
          <div className="no-choice">
            <h2>YOU DID NOT CHOOSE ANYTHING!</h2>
          </div>
          <Button
            wrapper="big-margin-top"
            button="play-again--button"
            onClick={props.onClickStart}
          >
            PLAY AGAIN
          </Button>
          <Button
            wrapper="small-margin-top"
            button="change-user--button"
            onClick={props.onChangeUser}
          >
            Change User
          </Button>
        </Fragment>
      );
    } else {
      const botCode = props.message.code === 1 
                      ? -1 
                      : props.message.code === 0
                      ? 0 
                      : 1;
      return (
        <Fragment>
          <div className="results-message">
            <h2>{props.message.message}</h2>
          </div>
          <div className="items-wrapper">
            <div className="item-result">
              <h3>Your Choice</h3>
              <GameItems
                key={Math.random()}
                name={props.choices.user}
                playing={props.playing}
                code={props.message.code}
              />
            </div>
            <div className="item-result">
              <h3>Bot's choice</h3>
              <GameItems
                key={Math.random()}
                name={props.choices.bot}
                playing={props.playing}
                code={botCode}
              />
            </div>
          </div>
          <Button
            wrapper="big-margin-top"
            button="play-again--button"
            onClick={props.onClickStart}
          >
            PLAY AGAIN
          </Button>
          <Button
            wrapper="small-margin-top"
            button="change-user--button"
            onClick={props.onChangeUser}
          >
            Change User
          </Button>
        </Fragment>
      );
    }
  }
};

export default React.memo(GameBoard);

import React, { useEffect, useState, useReducer, useCallback } from "react";
import GameBoard from "./Gameboard/GameBoard";
import ScoreBoard from "./Scoreboard/ScoreBoard";
import Countdown from "./Gameboard/Countdown";

import "./game.css";

const GAME_ITEMS = [
  {
    name: "rock",
    relations: {
      paper: 0,
      scissors: 1,
    },
  },
  {
    name: "paper",
    relations: {
      rock: 1,
      scissors: 0,
    },
  },
  {
    name: "scissors",
    relations: {
      paper: 1,
      rock: 0,
    },
  },
];

class User {
  constructor(id, name, wins, draws, losses) {
    this.id = id;
    this.name = name;
    this.wins = wins;
    this.draws = draws;
    this.losses = losses;
    this.totalScore = function() {
      return this.wins - this.losses;
    }
  }
}

const bot_user = new User(9999, 'BOTTY the BOT', 0, 0, 0)

const GAME_STATE = {
  currentUser: bot_user,
  isGamePlaying: 1,
  noChoice: true,
  currentChoices: {
    user: null,
    bot: null,
  },
  resultMessageAndCode: "",
  users: [
    bot_user
  ],
};

const COUNTDOWN_INITIAL = 3;

const gameReducer = (state, action) => {
  if (action.type === "STOP_GAME") {
    //adding results
    const users = state.users;
    const currentUserIndex = users.findIndex((user) => user.id === action.id);
    const botIndex = users.findIndex((bot) => bot.id === 9999);

    //updating choices
    state.currentChoices = action.choices;

    users[currentUserIndex][action.result]++; //adding result to user

    //adding result to bot
    if (action.result === "draws") {

      users[botIndex][action.result]++

    } else if (action.result === "wins") {

      users[botIndex]['losses']++

    } else if (action.result === "losses") {
      users[botIndex]['wins']++
    }
      // ? users[botIndex][action.result]++
      // : action.result === "wins"
      // ? users[botIndex]["losses"]++
      // : users[botIndex]["wins"]++;

    //updating current user's stats
    state.currentUser = users[currentUserIndex];

    //putting game on STOP MODE
    state.isGamePlaying = 0;

    //choice has been made
    state.noChoice = false;

    //displaying message
    state.resultMessageAndCode =
      action.result === "draws"
        ? {message: "It's a DRAW!", code: 0}
        : action.result === "wins"
        ? {message: "You WIN!", code: 1}
        : {message: "You LOSE!", code: -1};

    return { ...state };
  } else if (action.type === "NO_CHOICE") {
    //no choice has been made
    state.isGamePlaying = 0;
    state.noChoice = true;

    return { ...state };
  } else if (action.type === "START_GAME") {
    //starting game
    state.isGamePlaying = 1;

    return { ...state };
  } else if (action.type === "EXISTING_USER") {
    //if an existing user name has been entered, this action sets the user as current user
    const currentUser = state.users.find(user => user.name === action.name);
    state.currentUser = currentUser;

    return {...state}

  } else if (action.type === "ADD_USER") {
    //if a new user name has been entered, this action sets the new user as current user and pushes it into users' array
    const newId = Math.random().toFixed(10);
    const newUser = new User(newId, action.name, 0, 0, 0);
    state.users.push(newUser)
    state.currentUser = newUser;

    return {...state}
  }

  return GAME_STATE;
};

const Game = (props) => {
  const [gameItems, setGameItems] = useState(GAME_ITEMS);
  const [gameState, setGameDispatcher] = useReducer(gameReducer, GAME_STATE);
  const [countdown, setCountDown] = useState(COUNTDOWN_INITIAL);

  const currentUserName = props.currentUserName;
  const isUserExistent = gameState.users.find(
    (user) => user.name === currentUserName
  );

  const botChooses = () =>
    gameItems[Math.floor(Math.random() * gameItems.length)];

  useEffect(() => {

    isUserExistent 
    ? setGameDispatcher({
        type: "EXISTING_USER",
        name: currentUserName,
      })
    : setGameDispatcher({
        type: "ADD_USER",
        name: currentUserName,
      });

  }, [currentUserName])

  useEffect(() => {
    let countdownInterval;
    
    if (gameState.isGamePlaying) {
      countdown === 0
        ? setGameDispatcher({
            type: "NO_CHOICE",
          })
        : (countdownInterval = setTimeout(() => {
            setCountDown((prevCount) => prevCount - 1);
          }, 1000));
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  const handlerClickItem = useCallback(function ({ target }) {
    const choiceName = target.getAttribute("name");
    const choice = gameItems.find((item) => item.name === choiceName);
    const botChoice = botChooses();
    const botChoiceName = botChoice.name;
    const result =
      choiceName === botChoice.name
        ? "draws"
        : choice["relations"][botChoiceName]
        ? "wins"
        : "losses";
    setGameDispatcher({
      type: "STOP_GAME",
      id: gameState.currentUser.id,
      result: result,
      choices: {
        user: choiceName,
        bot: botChoiceName,
      },
    });
  }, []);

  const handlerStartGame = useCallback(() => {
    setCountDown(COUNTDOWN_INITIAL);

    setGameDispatcher({
      type: "START_GAME",
    });
  }, []);

  const yourTotalScore = gameState.currentUser.totalScore;

  return (
    <div className="game-wrapper">
      <div className="game-board">
        {gameState.isGamePlaying ? <Countdown seconds={countdown} /> : ""}
        <GameBoard
          playing={gameState.isGamePlaying}
          noChoice={gameState.noChoice}
          items={gameItems}
          choices={gameState.currentChoices}
          message={gameState.resultMessageAndCode}
          onClick={handlerClickItem}
          onClickStart={handlerStartGame}
          onChangeUser={props.onChangeUser}
        />
      </div>
      <ScoreBoard
        wins={gameState.currentUser.wins}
        losses={gameState.currentUser.losses}
        draws={gameState.currentUser.draws}
        totalScore={yourTotalScore}
        users={gameState.users}
        currentUserId={gameState.currentUser.id}
        currentUserName={gameState.currentUser.name}
      />
    </div>
  );
};

export default Game;

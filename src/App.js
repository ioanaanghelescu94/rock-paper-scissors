import { useRef, useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Modal from "./components/UI/Modal/Modal";
import Input from "./components/UI/Input/Input";
import Form from "./components/UI/Form/Form";

const INITIAL_STATE = {
  enteringUser: true,
  currentUserName: "",
};

function App() {
  const [state, setState] = useState(INITIAL_STATE);

  const nameInputRef = useRef("");

  const submitName = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const updatedState = {
      ...state,
      enteringUser: false,
      currentUserName: name,
    };
    setState(updatedState);
  };

  const handlerChangeUser = () => {
    const updatedState = {
      ...state,
      enteringUser: true,
    };

    setState(updatedState);
  };

  return (
    <div className="app">
      <header>
        <h1>Rock, papers, scrissors</h1>
      </header>
      {state.enteringUser && (
        <Modal>
          <h3>Enter your name below</h3>
          <Form onSubmit={submitName}>
            <Input type="text" placeholder="Enter name" ref={nameInputRef} />
            <div className="button-wrapper">
              <Input type="submit" value="SUBMIT" />
            </div>
          </Form>
        </Modal>
      )}
      {!state.enteringUser && (
        <Game
          currentUserName={state.currentUserName}
          onChangeUser={handlerChangeUser}
        />
      )}
    </div>
  );
}

export default App;

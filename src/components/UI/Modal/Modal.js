import React from "react";
import ReactDOM from "react-dom";

import classes from './modal.module.css';

const Backdrop = (props) => {
  return <div className={classes["modal-backdrop"]} />;
};

const Overlay = (props) => {
  return <div className={classes["modal-overlay"]}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay {...props} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;

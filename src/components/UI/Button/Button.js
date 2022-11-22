import React from "react";

import classes from './button.module.css';

const Button = props => {
    return (
        <div className={classes[props.wrapper]}>
            <button className={classes[props.button]} {...props}>{props.children}</button>
        </div>
    );
}

export default Button;
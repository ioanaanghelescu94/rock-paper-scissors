import React from "react";

import classes from './input.module.css';

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes["input-wrapper"]}>
          <input className={`${classes.input} ${props.type === 'submit' ? classes.submit : ''}`} {...props} ref={ref}/>
        </div>
    )
})

export default Input;
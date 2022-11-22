import React from "react";

const Countdown = props => {
    return (
        <div className="count-down">
          <h2>Pick an item!</h2>
          <h1 className="countdown-seconds">{props.seconds}</h1>
        </div>
    )
}

export default Countdown;
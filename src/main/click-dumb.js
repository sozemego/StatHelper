import React from "react";

const Counter = (props) => {
  return(
      <div>
          clicked {props.clicks} many times
          <button onClick={() => props.onCounterClick(props.clicks)}>Click!</button>
      </div>
  )
};

export default Counter;
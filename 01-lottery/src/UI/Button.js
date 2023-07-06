import React from "react";

import classes from "./Button.module.css";

const Button = (probs) => {
  return (
    <React.Fragment>
      <button
        className={`${classes["clasic-btn"]} ${probs.className}`}
        type={probs.type || "button"}
        onClick={probs.onClick}
      >
        {probs.children}
      </button>
    </React.Fragment>
  );
};

export default Button;

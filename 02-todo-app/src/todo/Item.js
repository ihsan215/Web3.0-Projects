import React from "react";

import classes from "./Item.module.css";

const Item = (props) => {
  return (
    <li key={props.key} className={classes["list-item"]}>
      <input className={classes["item-check"]} type="checkbox" />
      {props.children}
    </li>
  );
};

export default Item;

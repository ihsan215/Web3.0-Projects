import React from "react";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <React.Fragment>
      <nav className={classes["header"]}>
        <section className={classes["logo-area"]}>
          <h1 className={classes["title"]}>Todo App</h1>
        </section>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;

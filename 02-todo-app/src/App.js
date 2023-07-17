import React from "react";
import Web3Provider from "./web3/Web3Provider.js";
import Header from "./header/header.js";
import Todo from "./todo/Todo.js";

function App() {
  return (
    <Web3Provider>
      <Header />
      <Todo />
    </Web3Provider>
  );
}

export default App;

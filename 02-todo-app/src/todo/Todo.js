import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Web3Context from "../web3/Web3-context.js";
import Item from "./Item.js";
import classes from "./Todo.module.css";

const Todo = () => {
  let idCounter = 0;
  let cnt = 0;
  const formRef = useRef();
  const web3Ctx = useContext(Web3Context);
  const [Todos, setTodos] = useState([]);

  const fectInitialData = async () => {
    cnt++;
    if (cnt <= 1) {
      console.log(cnt);
      setTimeout(async () => {
        if (web3Ctx.Contract) {
          const todo = await web3Ctx.Contract?.methods
            .getTodo(web3Ctx.WalletAccounts[0], idCounter)
            .call({
              from: web3Ctx.WalletAccounts[0],
            });

          setTodos((curr) => {
            return [
              ...curr,
              {
                msg: todo?.ListText,
                id: idCounter,
              },
            ];
          });
          idCounter++;
        }
      }, 600);
    }
  };

  useEffect(() => {
    fectInitialData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const msg = formRef.current[0].value;
    if (msg.length <= 3) {
      return;
    }

    await web3Ctx.Contract.methods.addItemtoList(msg, idCounter).send({
      from: web3Ctx.WalletAccounts[0],
      gas: "1500000",
    });

    const todo = await web3Ctx.Contract.methods
      .getTodo(web3Ctx.WalletAccounts[0], idCounter)
      .call({
        from: web3Ctx.WalletAccounts[0],
      });

    setTodos((curr) => {
      return [
        ...curr,
        {
          msg: todo?.ListText,
          id: idCounter,
        },
      ];
    });
    idCounter++;
  };

  return (
    <React.Fragment>
      <section className={classes["main-area"]}>
        <form
          onSubmit={submitHandler}
          className={classes["item-input"]}
          ref={formRef}
        >
          <input
            className={classes["item-input__txt"]}
            type="text"
            placeholder="To Do List"
          ></input>
          <input
            className={classes["item-input__submit"]}
            type="submit"
            id="submit"
            value="+"
          ></input>
        </form>

        <ul className={classes["todo-list"]}>
          {Todos.map((item) => {
            return <Item key={item.id}>{item.msg}</Item>;
          })}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default Todo;

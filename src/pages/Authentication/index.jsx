import React, { useState, useEffect } from "react";
import style from "./style.module.css";

function Authentication() {
  return (
    <>
      <div className={style.page}>
        <div className={style.main}>
          <div className={style.row}>
            <label htmlFor="username">Username:</label>
            <input type="text" className={style.input} name="username"></input>
          </div>
          <div className={style.row}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className={style.input}
              name="password"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;

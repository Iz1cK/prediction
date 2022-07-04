import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    if (!username) setError("Please enter a username!");
    else if (!password) setError("Please enter a password!");
    else {
      axios
        .post("http://localhost:4000/api/login", {
          username,
          password,
        })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          navigate("/");
        })
        .catch(({ response }) => setError(response.data.message));
    }
  };
  return (
    <>
      <div className={style.page}>
        <div className={style.main}>
          <div className={style.row}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className={style.input}
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className={style.row}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className={style.input}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <span className={style.error}>{error}</span>
          <button onClick={submitLogin}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Authentication;

import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  if (props.isLoggedIn) {
    history.push("/");
  }

  const submitLogin = () => {
    Axios.post("/user/log-in", {
      username: username,
      password: password,
    })
      .then((res) => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          setErrorMessage("");
          setUsername("");
          setPassword("");
          window.localStorage.setItem("token", JSON.stringify(res.data.token));
          props.setTokenRefresh(!props.tokenRefresh);
          history.go(-1);
          props.setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="login-cont">
      <div
        className="login-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="title-login"> Log In: </div>
        <input
          id="username"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="error-message-login">{errorMessage}</div>
        <div
          id="submit-login"
          onClick={() => {
            submitLogin();
          }}
        >
          Log In
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

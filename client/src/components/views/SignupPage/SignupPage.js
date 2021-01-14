import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./SignupPage.css";

import badWords from "bad-words";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const filter = new badWords();

function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  if (props.isLoggedIn) {
    history.push("/forum-app/");
  }

  useEffect(() => {
    if (props.isLoggedIn) {
      history.push("/forum-app/");
    }
  }, []);

  const submitSignUp = () => {
    if (filter.isProfane(username)) {
      alert("Username contains a word that is not allowed.");
      setUsername("");
      return;
    }

    if (username.length < 3 || username.length > 15) {
      setErrorMessage("Please enter a Username between 2 and 15 characters.");
      return;
    }

    if (password.length < 3 || password.length > 15) {
      setErrorMessage("Please enter a Password between 2 and 15 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    Axios.post("/user/new", {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    })
      .then((res) => {
        if (res.data.message) {
          setErrorMessage(res.data.message);
        } else {
          setErrorMessage("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");

          Axios.post("/user/log-in", {
            username: username,
            password: password,
          }).then((res) => {
            if (res.data.message) {
              setErrorMessage(res.data.message);
            } else {
              window.localStorage.setItem(
                "token",
                JSON.stringify(res.data.token)
              );
              props.setTokenRefresh(!props.tokenRefresh);
              props.setIsLoggedIn(true);
              props.fetchUsers();
              history.go(-1);
            }
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="signup-cont">
      <div
        className="signup-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="title-signup"> Sign Up: </div>
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
        <input
          id="confirmPassword"
          className="input"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="error-message-signup">{errorMessage}</div>
        <div
          id="submit-signup"
          onClick={() => {
            submitSignUp();
          }}
        >
          Sign Up
        </div>
        <div id="bottom">
          Already registered?{" "}
          <Link className="link-blue" to="/forum-app/log-in">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

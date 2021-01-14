import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function logOut() {
    props.setIsLoggedIn(false);
    props.setCurrentUser("");
    localStorage.setItem("token", JSON.stringify("No token"));
    history.go(0);
  }

  return (
    <div id="header">
      <div id="header-container">
        <Link className="link" to={`/forum-app/`}>
          <div id="title">Justin's Forum App</div>
        </Link>
        {props.isLoggedIn ? (
          <div id="btn-cont-auth" className="header-btn-cont">
            {!props.isViewingProfile ? (
              <Link
                id="profile-btn"
                className="link header-btn"
                to={`/forum-app/user/${props.currentUser._id}`}
              >
                Profile
              </Link>
            ) : (
              <Link
                id="home-btn"
                className="link header-btn"
                to={"/forum-app/"}
              >
                Home
              </Link>
            )}
            <Link
              id="new-post-btn"
              className="link header-btn"
              to={"/forum-app/post/new"}
            >
              New Post
            </Link>
            <div
              id="log-out-btn"
              className="header-btn"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </div>
          </div>
        ) : (
          <div id="btn-cont-unauth" className="header-btn-cont">
            <Link
              id="sign-up-btn"
              className="link header-btn"
              to={`/forum-app/sign-up`}
            >
              Sign Up
            </Link>
            <Link
              id="log-in-btn"
              className="link header-btn"
              to={`/forum-app/log-in`}
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

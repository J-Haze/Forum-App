import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./NewPostPage.css";

import badWords from "bad-words";
import { useHistory } from "react-router-dom";

import Editor from "../HelperComponents/Editor";

const filter = new badWords();

function SignupPage(props) {
  const [title, setTitle] = useState("");
  const [mainText, setMainText] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  if (!props.isLoggedIn) {
    history.push("/");
  }

  const submitNewPost = () => {
    if (filter.isProfane(title)) {
      alert("Title contains a word that is not allowed.");
      setTitle("");
      return;
    }

    if (title.length < 1) {
      setErrorMessage("Title field must not be blank");
      return;
    }

    if (title.length > 100) {
      setErrorMessage("Title field must less than 100 characters");
      return;
    }

    if (mainText.length < 1) {
      setErrorMessage("Post body must not be empty");
      return;
    }

    if (mainText.length > 10000) {
      setErrorMessage("Post body must be less than 10,000 characters");
      return;
    }

    Axios.post(
      "/post/new",
      {
        title: title,
        text: mainText,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            window.localStorage.getItem("token")
          )}`,
        },
      }
    )
      .then((res, err) => {
        let postid = res.data.post._id;
        setErrorMessage("");
        setTitle("");
        setMainText("");
        props.fetchBlogs();
        history.push(`/post/${postid}`);
      })
      .catch((error) => console.log("error", error));
  };

  let handleEditorChange = (content, editor) => {
    setMainText(content);
  };

  return (
    <div className="new-post-cont">
      <div
        className="new-post-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="title-new-post"> Create a new post: </div>
        <input
          id="new-post-title"
          className="input-new-post-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          id="mainText"
          placeholder="Main Text"
          initilaValue={mainText}
          handleEditorChange={handleEditorChange}
        />

        <div className="error-message-new-post">{errorMessage}</div>
        <div
          id="submit-new-post"
          onClick={() => {
            submitNewPost();
          }}
        >
          Create Post
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../NewPostPage/NewPostPage.css";

import badWords from "bad-words";
import { useHistory } from "react-router-dom";

import Editor from "../../HelperComponents/Editor";

const filter = new badWords();

function SignupPage(props) {
  const [title, setTitle] = useState(props.initialTitle);
  const [mainText, setMainText] = useState(props.initialMainText);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return function cleanup() {
      props.hideEditModal();
    };
  }, []);

  const history = useHistory();

  const submitEditPost = () => {
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

    Axios.put(
      `/post/${props.postid}`,
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
        setErrorMessage("");
        props.fetchBlogs();
        props.whitePencil();
        props.hideEditModal();
        history.push(`/forum-app/post/${props.postid}`);
      })
      .catch((error) => console.log("error", error));
  };

  let handleEditorChange = (content, editor) => {
    setMainText(content);
  };

  let goBack = () => {
    props.whitePencil();
    props.hideEditModal();
  };

  return (
    <div className="edit-post-cont">
      <div
        className="edit-post-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div id="title-edit-post">
          {" "}
          Edit post:
          <div id="edit-post-back" onClick={goBack}>
            Cancel
          </div>
        </div>
        <input
          id="edit-post-title"
          className="input-edit-post-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          id="mainText"
          placeholder="Main Text"
          initialValue={props.initialMainText}
          handleEditorChange={handleEditorChange}
        />

        <div className="error-message">{errorMessage}</div>
        <div
          id="submit-edit-post"
          onClick={() => {
            submitEditPost();
          }}
        >
          Update Post
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

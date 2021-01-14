import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./PostPage.css";
import Comments from "./Sections/Comments";
import ConfirmModal from "./Sections/ConfirmModal";
import EditModal from "./Sections/EditModal";
import DeleteCommentModal from "./Sections/DeleteCommentModal";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import pencil from "../../../assets/pencil-24.png";
import pencilBlack from "../../../assets/pencil-24-black.png";
import trash from "../../../assets/delete-24.png";
import trashRed from "../../../assets/delete-24-red.png";

function PostPage(props) {
  const [displayedComments, setDisplayedComments] = useState([]);

  const [isUserPost, setIsUserPost] = useState(false);
  const [isPostEditted, setIsPostEditted] = useState(
    props.createdAt !== props.updatedAt
  );
  const [updateMessage, setUpdateMessage] = useState("");

  const [hoverTrash, setHoverTrash] = useState(false);
  const [hoverPencil, setHoverPencil] = useState(false);

  const [deleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState("");

  const history = useHistory();

  const fetchComments = () => {
    Axios.get(`/post/${props._id}/comments`).then((res) => {
      setDisplayedComments(res.data);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (props.currentUser) {
      if (props.currentUser.username === props.author) {
        setIsUserPost(true);
      } else {
        setIsUserPost(false);
      }
    }
  }, [props.currentUser, props.isLoggedIn, props.author]);

  useEffect(() => {
    if (props.createdAt !== props.updatedAt) {
      setIsPostEditted(true);
    }
  }, [props.createdAt, props.updatedAt]);

  useEffect(() => {
    if (isPostEditted) {
      setUpdateMessage(`- Last edit: ${moment(props.updatedAt).format("LLL")}`);
    } else {
      setUpdateMessage("");
    }
  }, [props.createdAt, props.updatedAt, isPostEditted]);

  const redTrash = () => {
    setHoverTrash(true);
  };

  const noRedTrash = () => {
    setHoverTrash(false);
  };

  const blackPencil = () => {
    setHoverPencil(true);
  };

  const whitePencil = () => {
    setHoverPencil(false);
  };

  function deleteComment() {
    Axios.put(
      `/post/${props._id}/${commentToDelete}/unpublish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            window.localStorage.getItem("token")
          )}`,
        },
      }
    )
      .then((res) => {
        fetchComments();
        hideDeleteCommentModal();
        history.push(`/forum-app/post/${props._id}`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const openDeleteCommentModal = (commentid) => {
    setCommentToDelete(commentid);
    setDeleteCommentModalOpen(true);
  };

  const hideDeleteCommentModal = () => {
    setCommentToDelete("");
    setDeleteCommentModalOpen(false);
  };

  return (
    <>
      {props.editModalOpen ? (
        <EditModal
          hideEditModal={props.hideEditModal}
          postid={props._id}
          initialTitle={props.title}
          initialMainText={props.text}
          fetchBlogs={props.fetchBlogs}
          whitePencil={whitePencil}
        />
      ) : (
        <div id="post-page">
          {props.confirmModalOpen && (
            <ConfirmModal
              actionMessage={props.actionMessage}
              hideConfirmModal={props.hideConfirmModal}
              deletePost={props.deletePost}
              postid={props._id}
            />
          )}
          {deleteCommentModalOpen && (
            <DeleteCommentModal
              hideDeleteCommentModal={hideDeleteCommentModal}
              deleteComment={deleteComment}
            />
          )}
          <div className="post-page-cont">
            <div className="post-page-head">
              <div className="post-title">
                <Link className="link" to={`/forum-app/post/${props._id}`}>
                  {props.title}
                </Link>
              </div>
              {isUserPost ? (
                <div className="post-subtitle-flex">
                  Posted by you{" ("}
                  <Link
                    className="link"
                    to={`/forum-app/user/${props.author_id}`}
                  >
                    <strong>{props.author}</strong>
                  </Link>
                  {") "}
                  on {moment(props.createdAt).format("LLL")}
                  <div className="message-editted">
                    <em>{updateMessage}</em>
                  </div>
                  <div className="edit-box">
                    <div
                      id="edit-btn"
                      className="user-btn"
                      onClick={() => {
                        props.openEditPost();
                      }}
                      onMouseEnter={() => {
                        blackPencil();
                      }}
                      onMouseLeave={() => {
                        whitePencil();
                      }}
                    >
                      {hoverPencil ? (
                        <img
                          className="icon"
                          src={pencilBlack}
                          alt="black pencil icon"
                        />
                      ) : (
                        <img
                          className="icon"
                          src={pencil}
                          alt="white pencil icon"
                        />
                      )}
                    </div>
                    <div
                      id="delete-btn"
                      className="user-btn"
                      onClick={() => {
                        props.openDeletePost();
                      }}
                      onMouseEnter={() => {
                        redTrash();
                      }}
                      onMouseLeave={() => {
                        noRedTrash();
                      }}
                    >
                      {hoverTrash ? (
                        <img
                          className="icon"
                          src={trashRed}
                          alt="red trashcan icon"
                        />
                      ) : (
                        <img
                          className="icon"
                          src={trash}
                          alt="white trashcan icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="post-subtitle-flex">
                  Posted by{" "}
                  <Link
                    className="link space"
                    to={`/forum-app/user/${props.author_id}`}
                  >
                    <strong>{props.author}</strong>
                  </Link>{" "}
                  on {moment(props.createdAt).format("LLL")}
                  <div className="message-editted">
                    <em>{updateMessage}</em>
                  </div>
                </div>
              )}
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: props.text }}
            />

            <Comments
              comments={displayedComments}
              currentUser={props.currentUser}
              isLoggedIn={props.isLoggedIn}
              fetchComments={fetchComments}
              postid={props._id}
              openDeleteCommentModal={openDeleteCommentModal}
              setCommentToDelete={setCommentToDelete}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PostPage;

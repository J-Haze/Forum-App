import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "./views/Header/Header";

import HomePage from "./views/HomePage/HomePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import SignupPage from "./views/SignupPage/SignupPage.js";
import PostPage from "./views/PostPage/PostPage.js";
import UserPage from "./views/UserPage/UserPage.js";
import NewPostPage from "./views/NewPostPage/NewPostPage.js";
import NotFound from "./views/NotFound/NotFound.js";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewingProfile, setIsViewingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenRefresh, setTokenRefresh] = useState(true);

  const history = useHistory();

  const fetchBlogs = () => {
    setLoading(true);
    Axios.get("/").then((res) => {
      let allBlogsArray = res.data;
      let reversedArray = allBlogsArray.reverse();
      setAllBlogs(allBlogsArray.reverse());
      setDisplayedBlogs(allBlogsArray.reverse());
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchUsers = () => {
    Axios.get("/user/users").then((res) => {
      setAllUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    Axios.get("/user/", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("token")
        )}`,
      },
    })
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log("error", error));
  }, [tokenRefresh]);

  //Edit and Delete Posts:
  const [actionMessage, setActionMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function openDeletePost() {
    setActionMessage("delete");
    setConfirmModalOpen(true);
  }

  function hideConfirmModal() {
    setConfirmModalOpen(false);
  }

  function deletePost(postid) {
    Axios.put(
      `/post/${postid}/unpublish`,
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
        fetchBlogs();
        hideConfirmModal();
        history.push(`/user/${currentUser._id}`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function openEditPost() {
    setActionMessage("edit");
    setEditModalOpen(true);
  }

  function hideEditModal() {
    setEditModalOpen(false);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        isViewingProfile={isViewingProfile}
        setIsViewingProfile={setIsViewingProfile}
      />

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              fetchBlogs={fetchBlogs}
              displayedBlogs={displayedBlogs}
              loading={loading}
            />
          )}
        ></Route>

        <Route
          exact
          path="/log-in"
          render={() => (
            <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              setTokenRefresh={setTokenRefresh}
              tokenRefresh={tokenRefresh}
            />
          )}
        ></Route>

        <Route
          exact
          path="/sign-up"
          render={() => (
            <SignupPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
              setTokenRefresh={setTokenRefresh}
              tokenRefresh={tokenRefresh}
              fetchUsers={fetchUsers}
            />
          )}
        ></Route>

        <Route
          exact
          path="/post/new"
          render={() => (
            <NewPostPage fetchBlogs={fetchBlogs} isLoggedIn={isLoggedIn} />
          )}
        ></Route>

        {allBlogs.map((post) => (
          <Route
            exact
            key={post._id}
            path={`/post/${post._id}`}
            render={() => (
              <PostPage
                {...post}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                deletePost={deletePost}
                actionMessage={actionMessage}
                setActionMessage={setActionMessage}
                confirmModalOpen={confirmModalOpen}
                setConfirmModalOpen={setConfirmModalOpen}
                openEditPost={openEditPost}
                openDeletePost={openDeletePost}
                hideConfirmModal={hideConfirmModal}
                fetchBlogs={fetchBlogs}
                hideEditModal={hideEditModal}
                editModalOpen={editModalOpen}
              />
            )}
          ></Route>
        ))}

        {allUsers.map((user) => (
          <Route
            exact
            key={user._id}
            path={`/user/${user._id}`}
            render={() => (
              <UserPage
                {...user}
                currentUser={currentUser}
                setIsViewingProfile={setIsViewingProfile}
              />
            )}
          ></Route>
        ))}

        <Route render={() => <NotFound />} />
      </Switch>
    </Suspense>
  );
}

export default App;

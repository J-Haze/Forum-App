import React from "react";
import Card from "../HomePage/Sections/Card.js";

import { useState, useEffect } from "react";
import Axios from "axios";

function UserPage(props) {
  const [userBlogs, setUserBlogs] = useState([]);
  const [isUserPage, setIsUserPage] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUserBlogs = () => {
    Axios.get(`/user/${props._id}/posts`).then((res) => {
      let userBlogsArray = res.data;
      let reversedArray = userBlogsArray.reverse();
      setUserBlogs(reversedArray);

      let blogCountVar = 0;
      if (reversedArray.length > 0) {
        reversedArray.forEach(function (blog) {
          if (blog.isPublished) {
            blogCountVar++;
          }
        });
      }
      setBlogCount(blogCountVar);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  useEffect(() => {
    if (props.currentUser) {
      if (props.currentUser.username === props.username) {
        setIsUserPage(true);
        props.setIsViewingProfile(true);
      } else {
        setIsUserPage(false);
      }
    }
    return function cleanup() {
      props.setIsViewingProfile(false);
    };
  }, [props.currentUser, props.username]);

  return (
    <>
      <div id="home">
        {loading ? (
          <div>Loading... </div>
        ) : (
          <div id="home-blog-cont">
            {isUserPage ? (
              <div className="main-subtitle">Your Posts:</div>
            ) : (
              <div className="main-subtitle">
                Posts from <em>{props.username}</em> :
              </div>
            )}
            {blogCount === 0 ? (
              <div className="black-text no-blogs">
                User has no blogs posted yet.
              </div>
            ) : (
              userBlogs.map((post) =>
                post.isPublished ? (
                  <Card
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    text={post.text}
                    author={post.author}
                    author_id={post.author_id}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                  />
                ) : (
                  ""
                )
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;

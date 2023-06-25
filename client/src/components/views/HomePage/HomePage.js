import React, { useState, useEffect } from "react";
import "./HomePage.css";

import Card from "./Sections/Card.js";

function HomePage(props) {
  const [blogCount, setBlogCount] = useState(0);
  
  let blogCountVar;
  useEffect(() => {
    let blogCountVar = 0;
    if (props.displayedBlogs.length > 0) {
      props.displayedBlogs.forEach(function (blog) {
        if (blog.isPublished) {
          blogCountVar++;
        }
      });
      setBlogCount(blogCountVar);
    }
  }, [props.displayedBlogs]);

  return (
    <>
      <div id="home">
        {props.loading ? (
          <div>Loading... I am not paying for Heroku premium so this will take 15 seconds to wake up when you first open</div>
        ) : blogCount === 0 ? (
          <div className="black-text no-blogs">No blogs have been posted yet.</div>
        ) : (
          <div id="home-blog-cont">
            <div className="main-subtitle">All Posts:</div>
            {props.displayedBlogs.map((post) =>
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
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;

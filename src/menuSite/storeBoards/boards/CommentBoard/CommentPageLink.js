import "./CommentPageLink.css";
import React from "react";

const CommentPageLink = ({ page, handlepage }) => {
  return (
    <div className="page">
      <a id={page} onClick={handlepage}>
        [{page}]
      </a>
      &nbsp;
    </div>
  );
};

export default CommentPageLink;

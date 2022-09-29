import "./PageLink.css";
import React from "react";

const PageLink = ({ page, handlepage }) => {
  return (
    <div align="center" className="center-page1">
      <div className="page">
        <a id={page} onClick={handlepage}>
          [{page}]
        </a>
        &nbsp;
      </div>
    </div>
  );
};

export default PageLink;

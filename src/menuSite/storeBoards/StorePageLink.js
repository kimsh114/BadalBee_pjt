import "./StorePageLink.css";
import React from "react";

const StorePageLink = ({ page, handlepage }) => {
  return (
    <div className="page">
      [
      <a id={page} onClick={handlepage}>
        {page}
      </a>
      ] &nbsp;
    </div>
  );
};

export default StorePageLink;

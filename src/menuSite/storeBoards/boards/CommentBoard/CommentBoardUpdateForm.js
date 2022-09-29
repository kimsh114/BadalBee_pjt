import React from "react";
import "./CommentBoardUpdateForm.css";

const CommentBoardUpdateForm = ({ article, setarticle, handleupdate }) => {
  const onChange = (e) => {
    setarticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  // const onChange = (e) => {
  //   setarticle({
  //     ...article,
  //     [e.target.name]: e.target.value
  //   });
  // }
  return (
    <div>
      <div className="mini_update_in">주문자</div>
      <div className="mini_update_name">{article.comment_name}</div>

      <div className="mini_update_in">주문내역</div>

      <input
        type="text"
        name="comment_content"
        className="mini_update_content"
        defaultValue={article.comment_content}
        onChange={onChange}
      />

      <div className="mini_update_in">가격</div>

      <input
        type="text"
        name="comment_price"
        className="mini_update_price"
        defaultValue={article.comment_price}
        onChange={onChange}
      />
      <div align="center">
        <input
          type="button"
          className="mini_update_btn"
          value="글수정"
          onClick={handleupdate}
        />
      </div>
    </div>
  );
};

export default CommentBoardUpdateForm;

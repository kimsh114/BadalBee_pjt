import React from "react";
import { useNavigate } from "react-router-dom";
import "./BoardUpdateForm.css";
import Swal from "sweetalert2";

const BoardUpdateForm = ({
  article,
  setarticle,
  handleupdate,
  setactionmodemain,
  actionmodemain,
}) => {
  const navigate = useNavigate();

  const onChange = (e) => {
    if (article.board_writer === window.sessionStorage.getItem("id")) {
      setarticle({
        ...article,
        [e.target.name]: e.target.value,
      });
    } else {
      Swal.fire({
        title: "작성자만 해당 글을 수정할 수 있습니다..",
        width: "370px",
      });
      return false;
    }
  };

  const onClick = () => {
    setactionmodemain({
      ...actionmodemain,
      mode: 0,
    });
  };

  return (
    <div>
      <div className="update_in" id="update_id">
        제목
      </div>

      <input
        type="text"
        name="board_title"
        className="update_title"
        onChange={onChange}
      />

      <div className="update_in">작성자</div>
      <div className="update_writer">{article.board_writer}</div>

      <div className="update_in">글내용</div>

      <textarea
        rows="5"
        cols="70"
        name="board_content"
        className="update_content"
        defaultValue={article.board_content}
        onChange={onChange}
      />

      <div className="update_in">픽업 장소</div>

      <input
        type="text"
        name="board_location"
        className="update_location"
        defaultValue={article.board_location}
        onChange={onChange}
      />
      <div align="center">
        <input
          type="button"
          value="글수정"
          className="update_btn"
          onClick={handleupdate}
        />
        <input
          type="button"
          value="그룹 창으로"
          className="update_btn"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default BoardUpdateForm;

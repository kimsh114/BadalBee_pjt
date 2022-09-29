import React, { useState } from "react";
import MiniMain from "./CommentBoard/CommentMain";
import "./BoardDetail.css";

const BoardDetail = ({
  article,
  handlelist,
  articleId,
  actionmodemain,
  setactionmodemain,
}) => {
  const [number, setNumber] = useState(article.board_num);

  const boardNum = article.board_num;

  return (
    <div>
      <div className="totla2">
        <table className="tbl_detail">
          {/* <tr>
            <td width="70px">글번호 : </td>
            <td>{article.board_num}</td>
          </tr> */}
          <tr>
            <td width="70px">제목 : </td>
            <td>{article.board_title}</td>
          </tr>
          <tr>
            <td>작성자 : </td>
            <td>{article.board_writer}</td>
          </tr>
          <tr>
            <td>픽업 장소 : </td>
            <td>{article.board_location}</td>
          </tr>
          {/* <tr>
            <td>작성 날짜 : </td>
            <td>{article.board_date}</td>
          </tr> */}
          <tr>
            <td className="innner_context">내용 : </td>
            <td>{article.board_content}</td>
          </tr>
          {/* <tr>
            <td>모집 시간 : </td>
            <td>{article.BOARD_TIME}</td>
          </tr> */}
        </table>
      </div>
      <div align="center">
        <input
          type="button"
          value="전체 글목록"
          onClick={handlelist}
          className="mokrok"
        />
      </div>

      <div>
        <div className="Detail_scroll">
          <MiniMain
            articles={article}
            number={number}
            articleId={articleId}
            boardnum={boardNum}
            actionmodemain={actionmodemain}
            setactionmodemain={setactionmodemain}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;

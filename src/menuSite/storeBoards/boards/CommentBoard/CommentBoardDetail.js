import React from "react";

const CommentBoardDetail = ({ article, handlelist }) => {

  return (
    <div>
      <form>
        <table border="1" width="700px" align="center">
          <thead>
            <tr>
              <td width="100px">글번호</td>
              <td align="left" width="600px">
                {article.board_num}
              </td>
            </tr>
            <tr>
              <td width="100px">제목</td>
              <td align="left" width="600px">
                {article.board_title}
              </td>
            </tr>
            <tr>
              <td width="100px">작성자</td>
              <td align="left" width="600px">
                {article.board_writer}
              </td>
            </tr>
            <tr>
              <td width="100px">픽업 장소</td>
              <td align="left" width="600px">
                {article.board_location}
              </td>
            </tr>
            <tr>
              <td width="100px">작성날짜</td>
              <td align="left" width="600px">
                {article.board_date}
              </td>
            </tr>
            <tr>
              <td width="100px">글내용</td>
              <td align="left" width="600px">
                {article.board_content}
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <input type="button" value="글목록" onClick={handlelist} />
              </td>
            </tr>
          </thead>
        </table>
      </form>
    </div>
  );
};

export default CommentBoardDetail;

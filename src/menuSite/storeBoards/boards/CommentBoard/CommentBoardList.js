import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardArticle from "./CommentBoardArticle";
import CommentPageLink from "./CommentPageLink";
import "./CommentBoardList.css";

const CommentBoardList = ({
  boardlist,
  handlelist,
  handledetail,
  handleupdateform,
  handlepage,
  pagelink,
  fee,
  count,
}) => {
  useEffect(() => {
    handlelist();
  }, []);

  if (boardlist.boardList.length === 0) {
    return (
      <div>
        <table className="miniboardList" align="center">
          <thead>
            <tr>
              <th className="order_tbl">
                <u>주문자</u>
              </th>
              <th className="order_tbl">
                <u>주문내역</u>
              </th>
              <th className="order_tbl">
                <u>가격</u>
              </th>
              <th className="order_del"></th>
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <table className="miniboardList" align="center">
            <thead>
              <tr>
                <th className="order_tbl">주문자</th>
                <th className="order_tbl">주문내역</th>
                <th className="order_tbl">가격</th>
                <th className="order_del"></th>
              </tr>
            </thead>
            <tbody>
              {boardlist.boardList.map((article) => {
                console.log("who are you",article);
                return (
                  <BoardArticle
                    article={article}
                    key={article.comment_num} //물어보기
                    handlelist={handlelist}
                    handledetail={handledetail}
                    handleupdateform={handleupdateform}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <table align="center">
          <tfoot>
            <br />
            <tr>
              <td className="miniboardList_fee" align="center">
                {pagelink.map((page) => {
                  return (
                    <CommentPageLink page={page} key={page} handlepage={handlepage} />
                  );
                })}
                <br />
                <br />
                <tr className="deli_fee">
                  <td width="80px">가게 배달비 :</td>
                  <td>{fee} 원</td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td width="100px">지불할 배달비 :</td>
                  <td>{Math.floor(fee / count)} 원 </td>
                </tr>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
};

export default CommentBoardList;

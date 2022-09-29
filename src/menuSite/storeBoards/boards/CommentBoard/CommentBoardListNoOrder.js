import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardArticle from "./CommentBoardArticle";
import PageLink from "./CommentPageLink";
import "./CommentBoardList.css";

const CommentBoardListNoOrder = ({
  boardlist,
  handlelist,
  handledetail,
  handleupdateform,
  handlepage,
  pagelink,
  handlelistnoorder,
}) => {
  useEffect(() => {
    handlelistnoorder();
  }, []);

  if (boardlist.boardList.length === 0) {
    return (
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
        </table>
      </div>
    );
  } else {
    return (
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
              return (
                <BoardArticle
                  article={article}
                  key={article.comment_name} //물어보기
                  handlelist={handlelist}
                  handledetail={handledetail}
                  handleupdateform={handleupdateform}
                />
              );
            })}
          </tbody>
        </table>
        {/* <table align="center">
          <tfoot>
            <br />
            <tr>
              <td align="center">
                {pagelink.map((page) => {
                  return (
                    <PageLink page={page} key={page} handlepage={handlepage} />
                  );
                })}
              </td>
            </tr>
          </tfoot>
        </table> */}
      </div>
    );
  }
};

export default CommentBoardListNoOrder;

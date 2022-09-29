import { useEffect, useState } from "react";
import BoardArticle from "./UserOrderBoardArticle";
import PageLink from "./UserOrderPageLink";
import "./UserOrderBoardList.css";

const UserOrderBoardList = ({
  boardlist,
  handlelist,
  handlepage,
  pagelink,
  actionmode,
  setactionmode,
  number,
  fee,
  actionmodemini,
  setactionmodemini,
  actionmodestore,
  setactionmodestore,
}) => {
  const onClick = () => {
    setactionmodemini({
      ...actionmodemini,
      mode: 1, // 상세보기
    });
  };

  useEffect(() => {
    handlelist();
  }, []);

  if (boardlist.boardList.length === 0) {
    return (
      <div className="userboard_div">
        <table align="center">
          <thead>
            <tr>
              <th className="userboard_th">메뉴명</th>
              <th className="userboard_th">메뉴 가격</th>
              <th className="userboard_del">삭제</th>
            </tr>
            <tr>
              <td colSpan={3} align="center">
                <input
                  type="button"
                  className="orderboard_btn"
                  value="메뉴 선택 창으로"
                  onClick={onClick}
                />
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return (
      <div className="userboard_div">
        <table align="center">
          <thead>
            <tr>
              <th className="userboard_th">메뉴명</th>
              <th className="userboard_th">메뉴 가격</th>
              <th className="userboard_del">삭제</th>
            </tr>
          </thead>
          <tbody className="orderboard_article">
            {boardlist.boardList.map((article) => {
              return (
                <BoardArticle
                  number={number}
                  actionmode={actionmode}
                  article={article}
                  key={article.menu_storeId}
                  handlelist={handlelist}
                />
              );
            })}
          </tbody>
        </table>
        <table align="center">
          <tr>
            <td align="center">
              <br />
              {pagelink.map((page) => {
                return (
                  <PageLink page={page} key={page} handlepage={handlepage} />
                );
              })}
            </td>
          </tr>
          <tr>
            <td colSpan={3} align="center">
              <input
                type="button"
                className="orderboard_btn"
                value="메뉴 선택 창으로"
                onClick={onClick}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
};

export default UserOrderBoardList;

import { useEffect, useState } from "react";
import BoardArticle from "./UserMenuBoardArticle";
import UserOrderMain from "./UserOrderMenu/UserOrderMain";
import PageLink from "./UserMenuPageLink";
import "./UserMenuBoardList.css";

const UserMenuBoardList = ({
  boardlist,
  handlelist,
  handledetail,
  handleupdateform,
  handlepage,
  pagelink,
  actionmodemini,
  setactionmodemini,
  number,
  fee,
  totalprice,
  actionmodestore,
  setactionmodestore,
  actionmodemain,
  setactionmodemain,
  orderlist,
}) => {
  const onClick = () => {
    setactionmodemini({
      ...actionmodemini,
      mode: 0,
    });
  };

  const onClick_k = () => {
    setactionmodestore({
      ...actionmodestore,
      mode: 1,
    });
  };

  useEffect(() => {
    handlelist();
  }, []);

  const onClick_b = () => {
    setactionmodemini({
      ...actionmodemini,
      mode: 4,
    });
  };

  if (boardlist.boardList.length === 0) {
    return (
      <div className="UserStoreBoardList_info">
        <table align="center">
          <thead>
            <tr>
              <th className="order_desc">메뉴 사진</th>
              <th className="order_desc">메뉴명</th>
              <th className="order_desc">메뉴 가격</th>
              <th className="order_desc">선택</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <div className="UserStoreBoardList_info">
          <table align="center">
            <thead>
              <tr>
                <th width="70px">메뉴 사진</th>
                <th width="70px">메뉴명</th>
                <th width="80px">메뉴 가격</th>
                <th width="70px">선택</th>
              </tr>
            </thead>
            <tbody>
              {boardlist.boardList.map((article) => {
                return (
                  <BoardArticle
                    orderlist={orderlist}
                    number={number}
                    setactionmodemini={setactionmodemini}
                    actionmodemini={actionmodemini}
                    article={article}
                    key={article.menu_storeId}
                    handlelist={handlelist}
                    handledetail={handledetail}
                    handleupdateform={handleupdateform}
                  />
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
        <table align="center">
          <tr>
            <td align="center">
              {pagelink.map((page) => {
                return (
                  <PageLink page={page} key={page} handlepage={handlepage} />
                );
              })}
            </td>
          </tr>
          <tr>
            <td align="center">
              {/* <UserOrderMain
                number={number}
              /> */}
            </td>
          </tr>
          <tr>
            <td align="center">
              <input
                className="list_btn"
                type="button"
                value="주문 내역으로"
                onClick={onClick}
              />
              <input
                className="list_btn"
                type="button"
                value="장바구니로"
                onClick={onClick_b}
              />
              <input
                className="list_btn"
                type="button"
                value="결제하기"
                onClick={onClick_k}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
};

export default UserMenuBoardList;

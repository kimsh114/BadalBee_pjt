import React from "react";
import { useEffect } from "react";

const MypageBoardArticle = ({ article, getlist }) => {
  useEffect(() => {
    getlist();
  }, []);

  console.log("asdasdas", article);

  return (
    <div className="inner_info">
      <table>
        <tr>
          <td>주문날짜 : </td>
          <td>{article.MYPAGE_DATE}</td>
        </tr>
        <tr>
          <td>닉네임 : </td>
          <td>{article.mypage_nickname}</td>
        </tr>
        <tr>
          <td>메뉴이름 : </td>
          <td>{article.mypage_menuname}</td>
        </tr>
        <tr>
          <td>메뉴가격 : </td>
          <td>{article.mypage_price}</td>
        </tr>
      </table>
    </div>
  );
};

export default MypageBoardArticle;

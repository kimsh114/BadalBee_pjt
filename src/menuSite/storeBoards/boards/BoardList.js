import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import BoardArticle from "./BoardArticle";
import PageLink from "./PageLink";
import "./BoardList.css";

const BoardList = ({
  boardlist,
  handlelist,
  handledetail,
  handleadd,
  handleupdateform,
  handlepage,
  pagelink,
  articleId,
  handleupdate,
  url,
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (url === "chicken") {
      navigate("/main/chicken");
    } else if (url === "burger") {
      navigate("/main/burger");
    } else if (url === "korean") {
      navigate("/main/korean");
    } else if (url === "pizza") {
      navigate("/main/pizza");
    } else if (url === "sandwitch") {
      navigate("/main/sandwitch");
    } else if (url === "chinese") {
      navigate("/main/chinese");
    } else if (url === "japanese") {
      navigate("/main/japanese");
    } else if (url === "dessert") {
      navigate("/main/dessert");
    } else if (url === "cafe") {
      navigate("/main/cafe");
    } else if (url === "porkfood") {
      navigate("/main/porkfood");
    }
  };

  useEffect(() => {
    handlelist();
  }, []);

  const handleLogout = () => {
    window.sessionStorage.clear();
    // 세션에 저장된 로그인 정보를 지우며 로그아웃
    navigate("/login"); // 로그아웃을 할 경우 로그인 페이지로 이동
  };

  if (boardlist.boardList.length === 0) {
    return (
      
      <div>

        {/* <input
          className="G_logoutBtn"
          type="button"
          value="로그아웃"
          onClick={handleLogout}
        /> */}
        <div className="BoardList_buttons">
          <input
            id="G_Btn"
            type="button"
            value="그룹 생성"
            onClick={handleadd}
          />
          <input
            type="button"
            id="G_Btnstore"
            value="가게 메뉴"
            onClick={onClick}
          />
        </div>
        <div className="none_G">
          <div className="font_div">
            현재 <br /> 생성된 <br />
            그룹이 <br />
            없습니다..😓
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="BoardList_scroll">
          {/* <input
          className="G_logoutBtn"
          type="button"
          value="로그아웃"
          onClick={handleLogout}
        /> */}

          {boardlist.boardList.map((article) => {
            // state -1 구문
            return (
              <BoardArticle
                article={article}
                key={article.BOARD_NUM}
                handlelist={handlelist}
                handledetail={handledetail}
                handleupdateform={handleupdateform}
                handleupdate={handleupdate}
              />
            );
          })}
          <br />

          <table align="center">
            <tfoot>
              <br />
              <tr>
                <td align="center">
                  {pagelink.map((page) => {
                    return (
                      <PageLink
                        page={page}
                        key={page}
                        handlepage={handlepage}
                      />
                    );
                  })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <br />
        <div className="BoardList_buttons">
          <input
            type="button"
            value="그룹 생성"
            id="G_Btn"
            // onClick={handleadd}
            onClick={handleadd}
          />
          <input
            type="button"
            id="G_Btnstore"
            value="가게 메뉴로"
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
};

export default BoardList;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategorySlide from "../CategorySlide/CategorySlide";
// import axios from '/axios';
import BoardArticle from "./StoreBoardArticle";
import PageLink from "./StorePageLink";
import "./StoreBoardArticle.scss";

const StoreBoardList = ({
  boardlist,
  handlelist,
  handlepage,
  pagelink,
  url,
}) => {
  var title = url;

  if (url === "chicken") {
    title = "치킨";
  } else if (url === "burger") {
    title = "햄버거";
  } else if (url === "korean") {
    title = "한식";
  } else if (url === "pizza") {
    title = "피자";
  } else if (url === "sandwitch") {
    title = "샌드위치";
  } else if (url === "chinese") {
    title = "중식";
  } else if (url === "japanese") {
    title = "일식";
  } else if (url === "dessert") {
    title = "디저트";
  } else if (url === "cafe") {
    title = "카페";
  } else if (url === "porkfood") {
    title = "족발";
  }

  const navigate = useNavigate();

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
        <div className="headers">
          <input
            type="button"
            value="로그아웃"
            onClick={handleLogout}
            className="logout_1"
          />
          <h1 className="header" align="center">
            {title}
          </h1>
          <input
            type="button"
            value="카테고리"
            onClick={() => navigate("/main")}
            className="categoryGo"
          />
        </div>
        <div className="categoryslide">
          <CategorySlide />
        </div>
        <div className="no_store">
          <div className="font_style">
            등록된
            <br /> 가맹점이
            <br /> 없어요..😓
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="headers">
          <input
            className="logout_1"
            type="button"
            value="로그아웃"
            onClick={handleLogout}
          />
          <h1 className="header" align="center">
            {title}
          </h1>
          <input
            type="button"
            value="카테고리"
            className="categoryGo"
            onClick={() => navigate("/main")}
          />
        </div>
        <div className="categoryslide">
          <CategorySlide />
        </div>
        <div className="scroll3">
          {boardlist.boardList.map((article) => {
            // state -1 구문
            return (
              <div className="chicken_tbl">
                <BoardArticle
                  url={url}
                  article={article}
                  key={article.store_id}
                  handlelist={handlelist}
                />
              </div>
            );
          })}
        </div>

        {/* <div>
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
        </div> */}
      </div>
    );
  }
};

export default StoreBoardList;

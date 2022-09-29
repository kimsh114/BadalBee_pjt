import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import MypageBoardArticle from "./MypageBoardArticle";
import MypagePageLink from "./MypagePageLink";
import { useNavigate } from "react-router-dom";
import "./MypageBoardList.css";
import { Link } from "../../../node_modules/react-router-dom/index";
import MypageUpdateForm from "./MypageUpdateForm";
const MypageBoardList = () => {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const [pagelink, setPageLink] = useState([]);

  const navigate = useNavigate();
  const memberInfo = (e) => {
    navigate("/mypageuserinfo");
  };

  var page_num = 1;
  const page_size = 5;
  var page_count = 1;
  var article_count = 0;

  const onClick = (e) => {
    navigate("/main");
  };

  async function getList() {
    await axios
      .post("http://localhost:8008/mypagecount", {
        mypage_userId: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        const { data } = res;
        article_count = data[0].COUNT;
        // 별칭을 COUNT로 대문자로 지정했기 때문에 값을 불러올 때도 대문자로
        page_count = Math.ceil(article_count / page_size);
        // 글이 하나일 경우에도 하나의 페이지가 나오도록 올림 처리
        var page_link = [];
        for (let i = 1; i <= page_count; i++) {
          page_link.push(i);
          setPageLink(page_link);
        }
      })
      .catch((e) => {
        console.error(e);
      });

    await axios
      .post("http://localhost:8008/mypagelist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        mypage_userId: window.sessionStorage.getItem("id"),
      })

      .then((res) => {
        const { data } = res;
        setBoardlist({
          boardList: data,
        });
        console.log("sssss");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    getList();
  }, []);

  const handleDelete = (e) => {
    axios
      .post("http://localhost:8008/mypagedelete", {
        user_id: window.sessionStorage.getItem("id"),
      })
      .then(() => {
        // getList();
        window.sessionStorage.clear();
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handlePage = (e) => {
    page_num = e.target.id;
    getList();
  };

  if (boardlist.boardList.length === 0) {
    return (
      <div className="form">
        <h1 className="header1">나의 주문내역</h1>

        <div className="none_G">
          현재 <br /> 생성된 <br />
          주문내역이 <br />
          없습니다..😓
        </div>

        <input
          type="button"
          value="회원탈퇴"
          //   id={window.sessionStorage.getItem("id").user_id}
          onClick={handleDelete}
          className="outmember"
        ></input>

        <input
          type="button"
          value="내정보"
          onClick={memberInfo}
          id="mypage_btn1"
        ></input>
        <input
          type="button"
          value="뒤로가기"
          onClick={onClick}
          className="mypage_back"
          id="mypage_back1"
        />
      </div>
    );
  } else {
    return (
      <div className="form">
        <div>
          <div className="headers">
            <input
              type="button"
              value="뒤로가기"
              onClick={onClick}
              className="mypage_back"
            />

            <h1 className="header">나의 주문내역</h1>
            <input
              type="button"
              value="회원탈퇴"
              //   id={window.sessionStorage.getItem("id").user_id}
              onClick={handleDelete}
              className="go_myinfo"
            ></input>
          </div>
          <div className="scroll_List">
            <div className="myinfoAll">
              {boardlist.boardList.map((article) => {
                console.log(article);
                return (
                  <div className="myinfo_G">
                    <MypageBoardArticle
                      article={article}
                      key={article.mypage_num}
                      getlist={getList}
                    />
                  </div>
                );
              })}
            </div>
            <table align="center">
              <tfoot>
                <br />
                <tr>
                  <td align="center">
                    {pagelink.map((page) => {
                      return (
                        <MypagePageLink
                          page={page}
                          key={page}
                          handlepage={handlePage}
                        />
                      );
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <input
            type="button"
            value="내 정보"
            onClick={memberInfo}
            className="mypage_btn"
            id="mypage_btn"
          ></input>
        </div>
      </div>
    );
  }
};
export default MypageBoardList;

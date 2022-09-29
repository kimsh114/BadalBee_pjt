import React from "react";
import axios from "axios";
import MypagePageLink from "./MypagePageLink";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MypageUpdateForm from "./MypageUpdateForm";
import MypageUserInfoArticle from "./MypageUserInfoArticle";
const MypageUserInfo = () =>
  // {
  //   article,
  //   handleupdate,
  //   setArticle,
  //   actionModeinfo,
  //   setActionModeinfo,
  // }
  {
    const [boardlist, setBoardlist] = useState({
      boardList: [],
    });

    const [pagelink, setPageLink] = useState([]);

    const navigate = useNavigate();

    const [actionModeinfo, setActionModeinfo] = useState({ mode: 0 });
    const [article, setArticle] = useState({
      user_id: window.sessionStorage.getItem("id"),
      user_pw: "",
      user_name: "",
      user_email: "",
      user_address: "",
      user_phone: "",
    });

    const onChange = (e) => {
      setArticle({
        ...article,
        [e.target.name]: e.target.value,
      });
    };

    const handleUpdateForm = (e) => {
      axios
        .post("http://localhost:8008/mypagedetail", { num: e.target.id })
        .then((res) => {
          const { data } = res;
          if (res.data.length > 0) {
            setArticle({
              ...article,
              user_id: data[0].USER_ID,
              user_pw: data[0].USER_PW,
              user_name: data[0].USER_NAME,
              user_email: data[0].USER_EMAIL,
              user_address: data[0].USER_ADDRESS,
              user_phone: data[0].USER_PHONE,
            });

            setActionModeinfo({
              ...actionModeinfo,
              mode: 1, // 글 수정하기
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const handleUpdate = () => {
      axios
        .post("http://localhost:8008/mypageupdate", {
          article: article,
        })
        .then(() => {
          getList();
          setActionModeinfo({
            ...actionModeinfo,
            mode: 1, // 글 수정하기
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    var page_num = 1;
    const page_size = 5;
    var page_count = 1;
    var article_count = 0;

    async function getList() {
      await axios
        .post("http://localhost:8008/mypageinfocount", {
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
        .post("http://localhost:8008/mypageinfolist", {
          page_num: page_num,
          page_size: page_size,
          article_count: article_count,
          mypage_userId: window.sessionStorage.getItem("id"),
          // user_pw: article.user_pw,
        })
        .then((res) => {
          const { data } = res;
          setBoardlist({
            boardList: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }

    useEffect(() => {
      getList();
    }, []);

    // 상세보기
    // const handleDetail = (e) => {
    //   // alert('handleDetail(actionMode) : ' + actionMode.mode);
    //   axios
    //     .post("http://localhost:8008/mypageuserinfodetail", {
    //       user_id: window.sessionStorage.getItem("id"),
    //     })
    //     // post : url의 데이터 전달 방식을 지정한 것
    //     // (url에 요청 정보를 숨김)
    //     .then((res) => {
    //       const { data } = res;

    //       setArticle({
    //         ...article,
    //         user_id: data[0].USER_ID,
    //         user_pw: data[0].USER_PW,
    //         user_name: data[0].USER_NAME,
    //         user_email: data[0].USER_EMAIL,
    //         user_address: data[0].USER_ADDRESS,
    //         user_phone: data[0].USER_PHONE,
    //       });
    //       console.log("sssss");
    //       //   setActionModeMini({
    //       //     ...actionModeMini,
    //       //     mode: 1, // 상세보기
    //       //   });

    //       console.log("sssasdss", data);
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //     });
    // };
    if (actionModeinfo.mode === 1) {
      return (
        // 상세보기
        <div className="form">
          <MypageUpdateForm
            article={article}
            handleupdate={handleUpdate}
            setArticle={setArticle}
            actionModeinfo={actionModeinfo}
            setActionModeinfo={setActionModeinfo}
            handleUpdateForm={handleUpdateForm}
          />
          <br />
        </div>
      );
    } else
      return (
        <div className="form">
          {boardlist.boardList.map((article) => {
            console.log(article);
            return (
              <MypageUserInfoArticle
                article={article}
                setArticle={setArticle}
                key={article.mypage_num}
                getlist={getList}
              />
            );
          })}
          {/* <input type="button" value="글수정1" onClick={handleUpdate} /> */}
        </div>
      );
  };

export default MypageUserInfo;

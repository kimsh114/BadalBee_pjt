import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const MypageUserInfoArticle = ({ article, getlist, setArticle }) => {
  useEffect(() => {
    getlist();
  }, []);
  const navigate = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const onChange = (e) => {
    setArticle({
      article: article,
    });
    console.log(pwRef.current.value);
  };

  // const [article1, setArticle1] = useState({
  //   user_id: window.sessionStorage.getItem("id"),
  //   user_pw: "",
  //   user_name: "",
  //   user_email: "",
  //   user_address: "",
  //   user_phone: "",
  // });

  // const onChange = (e) => {
  //   setArticle1({
  //     ...article1,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const onClick = (e) => {
    navigate("/main/mypage");
  };
  const handleUpdate = () => {
    axios
      .post("http://localhost:8008/mypageupdate", {
        user_id: idRef.current.value,
        user_pw: pwRef.current.value,
        user_name: nameRef.current.value,
        user_email: emailRef.current.value,
        user_address: addressRef.current.value,
        user_phone: phoneRef.current.value,
        test: article.user_pw,
      })
      .then(() => {
        getlist();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="headers">
        <input
          type="button"
          value="뒤로가기"
          className="mypageinfo_btn"
          onClick={onClick}
        />
        <h1 className="header" id="myinfo_head">
          내 정보
        </h1>
        <input
          className="mypage_btn"
          type="button"
          value="글수정"
          onClick={handleUpdate}
        />
      </div>
      <div className="scroll_mypage">
        <table className="mypage_dd">
          <tr>
            <td>아이디 : </td>
            <td>{article.user_id}</td>
          </tr>
          <tr>
            <td>비밀번호 : </td>
            <td>{article.user_pw}</td>
          </tr>
          <tr>
            <td>닉네임 : </td>
            <td>{article.user_name}</td>
          </tr>
          <tr>
            <td>번호 : </td>
            <td>{article.user_phone}</td>
          </tr>
          <tr>
            <td>주소 : </td>
            <td>{article.user_address}</td>
          </tr>
          <tr>
            <td>이메일 : </td>
            <td>{article.user_email}</td>
          </tr>
        </table>
        <div className="G_mypageinput" id="fst_input">
          <div className="ex_info">아이디</div>
          <input
            className="mypage_input"
            type="text"
            name="user_id"
            value={window.sessionStorage.getItem("id")}
            onChange={onChange}
            ref={idRef}
          ></input>
          <div className="ex_info">비밀번호</div>
          <input
            className="mypage_input"
            type="text"
            name="user_pw"
            defaultValue={article.user_pw}
            onChange={onChange}
            ref={pwRef}
          ></input>
          <div className="ex_info">닉네임</div>
          <input
            className="mypage_input"
            type="text"
            name="user_name"
            defaultValue={article.user_name}
            onChange={onChange}
            ref={nameRef}
          ></input>
          <div className="ex_info">이메일</div>
          <input
            className="mypage_input"
            type="text"
            name="user_email"
            defaultValue={article.user_email}
            onChange={onChange}
            ref={emailRef}
          ></input>
          <div className="ex_info">주소</div>
          <input
            className="mypage_input"
            type="text"
            name="user_address"
            defaultValue={article.user_address}
            onChange={onChange}
            ref={addressRef}
          ></input>
          <div className="ex_info">전화번호</div>
          <input
            className="mypage_input"
            type="text"
            name="user_phone"
            defaultValue={article.user_phone}
            onChange={onChange}
            ref={phoneRef}
          ></input>
        </div>
      </div>

      {/* <input type="text" defaultValue={article.user_id}></input>
      <input defaultValue={article.user_pw}></input>
      <input defaultValue={article.user_name}></input>
      <input defaultValue={article.user_email}></input>
      <input defaultValue={article.user_address}></input>
      <input defaultValue={article.user_phone}></input>

      <input type="button" onClick={handleUpdate} value="글수정" /> */}
    </div>
  );
};

export default MypageUserInfoArticle;

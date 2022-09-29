import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Swal from "sweetalert2";

const LoginForm = () => {
  const idRef = useRef();
  const pwRef = useRef();

  console.log(idRef);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      Swal.fire({
        title: "아이디를 입력해주세요.",
        width: "370px",
      });
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      Swal.fire({
        title: "비밀번호를 입력해주세요.",
        width: "370px",
      });
      pwRef.current.focus();
      return false;
    }

    axios
      .post("http://localhost:8008/login", {
        user_id: idRef.current.value,
        user_pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("id", idRef.current.value);
          navigate("/main");
        } else {
          Swal.fire({
            title: "등록된 회원이 아닙니다.",
            width: "370px",
          });
          navigate("/login");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleMemberForm = () => {
    navigate("/member");
    // useNavigate를 이용해서 /member로 이동하도록 지정
  };

  return (
    <div className="form">
      <input
        type="button"
        value="기업 로그인"
        className="gostore"
        onClick={() => {
          navigate("/storelogin");
        }}
      />
      <br />
      <form className="login_form">
        <p className="logo">개인 로그인</p>
        <input
          type="text"
          name="id"
          size="20"
          defaultValue=""
          ref={idRef}
          className="ID"
          autoComplete="off"
          required
          placeholder="아이디를 입력해주세요."
        />
        <input
          type="password"
          name="pw"
          size="20"
          defaultValue=""
          ref={pwRef}
          className="password"
          autoComplete="off"
          required
          placeholder="비밀번호를 입력해주세요."
        />
        <br />
        <br />
        <br />
        <input
          type="button"
          value="회원가입"
          className="signup"
          onClick={handleMemberForm}
        />
        <br />
        <br />
        <br />
        <input
          type="button"
          value="로그인"
          className="login"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
};

export default LoginForm;

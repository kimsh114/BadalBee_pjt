import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StoreLoginForm.css";
import Swal from "sweetalert2";

const StoreLoginForm = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      Swal.fire({
        title: "사업자 등록 번호를 입력해주세요.",
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
      .post("http://localhost:8008/storelogin", {
        store_id: idRef.current.value,
        store_pw: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem("id", idRef.current.value);
          navigate("/storeboard");
        } else {
          Swal.fire({
            title: "등록된 회원이 아닙니다..",
            width: "370px",
          });
          navigate("/storelogin");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleMemberForm = () => {
    navigate("/storemember");
    // useNavigate를 이용해서 /member로 이동하도록 지정
  };

  return (
    <div className="form">
      <input
        type="button"
        value="개인 로그인"
        onClick={() => {
          navigate("/login");
        }}
        className="back_login"
      />
      <p align="center" className="logo2">
        기업 로그인
      </p>
      <form className="store_loginform">
        <input
          type="text"
          name="id"
          size="20"
          defaultValue=""
          ref={idRef}
          placeholder="사업자 등록 번호를 입력해주세요."
          maxLength="10"
          autoComplete="off"
          className="storeL_id"
        />
        {/* <td width="100px">비밀번호</td> */}
        <input
          type="password"
          name="pw"
          size="20"
          defaultValue=""
          ref={pwRef}
          autoComplete="off"
          placeholder="비밀번호를 입력해주세요."
          className="storeL_pw"
        />
        <br />
        <br />
        <br />
        <input
          type="button"
          value="회원가입"
          onClick={handleMemberForm}
          className="storeGaip_btn"
        />
        <br />
        <br />
        <br />
        <input
          type="button"
          value="로그인"
          onClick={handleLogin}
          className="storeL_btn"
        />

        {/* <input
                  type="button"
                  value="개인 로그인"
                  onClick={() => {
                    navigate("/login");
                  }}
                /> */}
      </form>
    </div>
  );
};

export default StoreLoginForm;

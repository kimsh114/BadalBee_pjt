import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddressPopup from "./storeAddress/AddressPopup";
import DaumPostcode from "react-daum-postcode";
import "./MemberForm.css";
import Swal from "sweetalert2";

const MemberForm = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pwchRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    addressRef.current.value = fullAddress;
    closePostCode();
  };

  const handleMember = () => {
    var str,
      i,
      ch = "";
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      Swal.fire({
        title: "아이디를 입력해주세요.",
        width: "370px",
      });
      idRef.current.focus();
      return false;
    } else {
      str = idRef.current.value;
      if (str.length < 8 || str.length > 15) {
        Swal.fire({
          title: "아이디 길이를 확인해주세요.(8자리~15자리).",
          width: "370px",
        });
        idRef.current.focus();
        return false;
      }
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      Swal.fire({
        title: "비밀번호를 입력해주세요.",
        width: "370px",
      });

      pwRef.current.focus();
      return false;
    } else {
      str = pwRef.current.value;
      if (str.length < 8) {
        Swal.fire({
          title: "비밀번호 길이를 확인해주세요(8자리).",
          width: "370px",
        });
        pwRef.current.focus();
        return false;
      }
    }
    if (pwchRef.current.value === "" || pwchRef.current.value === undefined) {
      Swal.fire({
        title: "비밀번호를 확인해주세요.",
        width: "370px",
      });
      pwchRef.current.focus();
      return false;
    } else if (!(pwchRef.current.value === pwRef.current.value)) {
      Swal.fire({
        title: "비밀번호와 비밀번호 확인이 다릅니다.",
        width: "370px",
      });
      pwchRef.current.focus();
      return false;
    }

    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      Swal.fire({
        title: "이름을 입력해주세요.",
        width: "370px",
      });
      nameRef.current.focus();
      return false;
    }
    if (emailRef.current.value === "" || emailRef.current.value === undefined) {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        width: "370px",
      });
      emailRef.current.focus();
      return false;
    }
    //  else {
    //   const str = emailRef.current.value;
    //   for (var i = 0; i < str.length; i++) {
    //     const ch = str.substring(i, i + 1);
    //     if (ch !== /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/) {
    //       alert('이메일을 정확히 입력해주세요.');
    //       emailRef.current.focus();
    //       return false;
    //     }
    //   }
    // }

    if (
      addressRef.current.value === "" ||
      addressRef.current.value === undefined
    ) {
      Swal.fire({
        title: "주소를 입력해주세요.",
        width: "370px",
      });
      addressRef.current.focus();
      return false;
    }
    if (phoneRef.current.value === "" || phoneRef.current.value === undefined) {
      Swal.fire({
        title: "전화번호를 입력해주세요.",
        width: "370px",
      });
      phoneRef.current.focus();
      return false;
    } else {
      const str = phoneRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          Swal.fire({
            title: "전화번호는 숫자로만 입력해주세요.",
            width: "370px",
          });
          phoneRef.current.focus();
          return false;
        }
      }
    }

    axios
      .post("http://localhost:8008/member", {
        user_id: idRef.current.value,
        user_pw: pwRef.current.value,
        user_name: nameRef.current.value,
        user_email: emailRef.current.value,
        user_address: addressRef.current.value,
        user_phone: phoneRef.current.value,
      })
      .then((res) => {
        console.log("handleMember : ", res);
        if (res.data.affectedRows === 1) {
          Swal.fire({
            title: "회원등록에 성공했습니다.",
            width: "370px",
          });
        } else {
          Swal.fire({
            title: "아이디가 중복됩니다.",
            width: "370px",
          });
        }
        navigate("/login");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="form">
      <h1 align="center" className="logo1">
        개인 회원가입
      </h1>

      <div className="scroll2">
        <div className="div111">아이디</div>
        <div>
          <input
            type="text"
            name="id"
            size="20"
            autoComplete="off"
            defaultValue=""
            ref={idRef}
            // placeholder="아이디를 입력해주세요."
            className="gaip_id"
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="div111">비밀번호</div>
        <div>
          <input
            type="password"
            name="pw"
            size="20"
            autoComplete="off"
            defaultValue=""
            ref={pwRef}
            // placeholder="비밀번호를 입력해주세요."
            className="gaip_pw"
            placeholder="비밀번호 12자리를 입력해주세요"
          />
        </div>
        <div className="div111">비밀번호 확인</div>
        <div>
          <input
            type="password"
            name="pw"
            size="20"
            defaultValue=""
            autoComplete="off"
            ref={pwchRef}
            placeholder="비밀번호를 입력해주세요."
            className="gaip_pwch"
          />
        </div>
        <div className="div111">이름</div>
        <div>
          <input
            type="text"
            name="name"
            size="20"
            autoComplete="off"
            defaultValue=""
            ref={nameRef}
            className="gaip_name"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="div111">이메일</div>
        <div>
          <input
            type="text"
            name="email"
            size="20"
            autoComplete="off"
            defaultValue=""
            ref={emailRef}
            placeholder="aischool@example.com"
            className="gaip_email"
          />
        </div>
        <div className="div111">휴대전화번호</div>
        <div>
          <input
            type="text"
            name="phone"
            size="20"
            autoComplete="off"
            placeholder="휴대전화번호를 입력해주세요"
            defaultValue=""
            ref={phoneRef}
            className="gaip_phone"
          />
        </div>
        <div>
          <div className="div111" id="juso">
            주소
            {/* 버튼 클릭 시 팝업 생성 */}
            <button
              type="button"
              onClick={openPostCode}
              className="address_search1"
            >
              우편번호 검색
            </button>
          </div>
          {/* 팝업 생성 기준 div */}
          <div id="popupDom">
            {isPopupOpen && (
              <AddressPopup>
                <div>
                  <DaumPostcode onComplete={handlePostCode} />
                  {/* 닫기 버튼 생성 */}
                  <button
                    type="button"
                    onClick={() => {
                      closePostCode();
                    }}
                    className="close"
                  >
                    닫기
                  </button>
                </div>
              </AddressPopup>
            )}
          </div>

          <input
            type="text"
            name="address"
            size="20"
            defaultValue=""
            autoComplete="off"
            ref={addressRef}
            className="gaip_address"
            onClick={() => {
              Swal.fire({
                title: "우편번호 검색을 이용해주세요.",
                width: "370px",
              });
              return false;
            }}
            onChange={() => {
              Swal.fire({
                title: "우편번호 검색을 이용해주세요.",
                width: "370px",
              });
              addressRef.current.value = "";
              return false;
            }}
            placeholder="우편번호 검색을 이용해주세요."
          />
        </div>
      </div>
      <div className="member_btn">
        <input
          type="button"
          value="뒤로 가기"
          className="gologin"
          onClick={() => {
            navigate("/login");
          }}
        />
        <input
          type="button"
          value="회원 등록"
          onClick={handleMember}
          className="gaip_button"
        />
      </div>
    </div>
  );
};

export default MemberForm;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import "./MiniBoardWrite.scss";
import { useNavigate } from "react-router-dom";
import "./CommentBoardWriteNoOrder.css";
import Swal from "sweetalert2";

const CommentBoardWriteNoOrder = ({ handlelist, number, articleId }) => {
  const nameRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const numRef = useRef();
  const userIdRef = useRef();

  

  const navigate = useNavigate();

  const [fee, setFee] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const login_id = window.sessionStorage.getItem("id");

    if (login_id === null) {
      Swal.fire({
        title: "로그인 후 사용이 가능합니다.",
        width: "370px",
      });
      navigate("/");
    }

    axios
      .post("http://localhost:8008/deliveryfee", {
        store_id: articleId,
      })
      .then((res) => {
        const { data } = res;
        setFee(data[0].store_deliveryFee);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  axios
    .post("http://localhost:8008/totalprice", {
      order_userId: window.sessionStorage.getItem("id"),
      order_boardNum: number,
    })
    .then((res) => {
      const { data } = res;
      setTotalPrice(data[0].totalPrice);
    })
    .catch((e) => {
      console.error(e);
    });

  const handleInsert = () => {
    // if (article.comment_userId === window.sessionStorage.getItem('id')) {
    //   alert('주문내역은 하나만 등록이 가능합니다.');
    //   return false;
    // }

    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      Swal.fire({
        title: "주문자를 입력해주세요.",
        width: "370px",
      });
      nameRef.current.focus();
      return false;
    }

    if (
      contentRef.current.value === "" ||
      contentRef.current.value === undefined
    ) {
      Swal.fire({
        title: "주문내역을 입력해주세요.",
        width: "370px",
      });
      contentRef.current.focus();
      return false;
    }

    // if (priceRef.current.value === '' || priceRef.current.value === undefined) {
    //   alert('음식의 가격을 입력해주세요.');
    //   priceRef.current.focus();
    //   return false;
    // } else {
    //   const str = priceRef.current.value;
    //   for (var i = 0; i < str.length; i++) {
    //     const ch = str.substring(i, i + 1);
    //     if (!(ch >= "0" && ch <= "9") || ((ch >= "a" && ch <= "z")
    //       || (ch >= "A" && ch <= "Z"))) {
    //       alert('음식의 가격은 숫자로만 입력해주세요.');
    //       priceRef.current.focus();
    //       return false;
    //     }
    //   }
    // }

    axios
      .post("http://localhost:8008/mypageinsert", {
        mypage_userid: userIdRef.current.value,
        mypage_nickname: nameRef.current.value,
        mypage_menuname: contentRef.current.value,
        mypage_price: priceRef.current.value,
      })
      .then((res) => {
        handlelist();
        // mypage_idRef.current.value = "";
        // mypage_menunameRef.current.value = "";
        // mypage_priceRef.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });


    axios
      .post("http://localhost:8008/miniinsert", {
        comment_name: nameRef.current.value,
        comment_content: contentRef.current.value,
        comment_price: priceRef.current.value,
        comment_boardNum: numRef.current.value,
        comment_userId: userIdRef.current.value,
      })
      .then((res) => {
        handlelist();
        nameRef.current.value = "";
        contentRef.current.value = "";
        priceRef.current.value = "";
        numRef.current.value = 0;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="write">
      <h2>주문 내역</h2>
      <form>
        <table align="center">
          <thead>
            <tr>
              <td className="order_tb" height="30px">
                주문자
              </td>

              <input
                maxLength={12}
                className="order_info"
                type="text"
                name="writer"
                // size="68"
                ref={nameRef}
                placeholder="작성자를 입력하세요."
              />
              <input
                maxLength={12}
                className="order_info"
                type="hidden"
                name="userId"
                // size="68"
                ref={userIdRef}
                value={window.sessionStorage.getItem("id")}
              />
              {/* <b>
                  <input
                    type='text'
                    name='number'
                    size='68'
                    ref={nameRef}
                    value={window.sessionStorage.getItem('id')}
                  />
                </b> */}
              {/* <div ref={nameRef}>
                  <b>{window.sessionStorage.getItem('id')}</b>
                </div> */}
              <input
                type="hidden"
                name="number"
                // size="68"
                ref={numRef}
                value={number}
              />
              {/* <div ref={comment_nameRef}>
                  &nbsp;&nbsp;&nbsp;<b>{window.sessionStorage.getItem('id')}</b>
                </div> */}
            </tr>
            <tr>
              <td className="order_tb">주문내역</td>
              <td align="left">
                {/* <textarea
                  rows='5'
                  cols='70'
                  name='content'
                  ref={contentRef}
                  placeholder='내용을 입력하세요.'
                /> */}
                <input
                  maxLength={12}
                  className="order_info"
                  type="text"
                  name="title"
                  // size="68"
                  ref={contentRef}
                  placeholder="주문내역을 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <td className="order_tb" height="30px">
                가격
              </td>
              <td className="order_tb" height="30px" align="left">
                <input
                  className="in_info"
                  type="hidden"
                  name="price"
                  // size="68"
                  ref={priceRef}
                  value={fee + totalPrice}
                  placeholder="주문하신 음식의 가격을 입력하세요."
                />
                <div>
                  <b>{fee + totalPrice}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                {/* <input
                  type='button'
                  value='주문하기'
                  onClick={onClick}
                />
                &nbsp; */}
                <input
                  type="button"
                  className="info_btn"
                  value="글쓰기"
                  onClick={handleInsert}
                />
                &nbsp;
                {/* <input type='reset' value='초기화' /> */}
              </td>
            </tr>
          </thead>
        </table>
      </form>
    </div>
  );
};

export default CommentBoardWriteNoOrder;

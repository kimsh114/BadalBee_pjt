import React, { useRef } from "react";
import axios from "axios";
import "./CommentBoardWrite.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CommentBoardWrite = ({
  handlelist,
  number,
  article,
  actionmodemini,
  setactionmodemini,
  setactionmodemain,
  actionmodemain,
}) => {
  const nameRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const numRef = useRef();
  const userIdRef = useRef();

  const navigate = useNavigate();

  const onClick = (e) => {
    // setactionmodemain({
    //   ...actionmodemain,
    //   mode: 4,
    // });
    setactionmodemini({
      ...actionmodemini,
      mode: 1,
    });
  };

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

    if (priceRef.current.value === "" || priceRef.current.value === undefined) {
      Swal.fire({
        title: "음식가격을 입력해주세요.",
        width: "370px",
      });
      priceRef.current.focus();
      return false;
    } else {
      const str = priceRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          Swal.fire({
            title: "음식가격은 숫자로만 입력해주세요",
            width: "370px",
          });
          priceRef.current.focus();
          return false;
        }
      }
    }

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
      <h2>주문을 먼저 해주세요.</h2>
      {/* <tr>
              <td width='100px'>유저네임</td>
              <td align='left' width='550px'>
                <input
                  type='text'
                  name='title'
                  size='68'
                  ref={titleRef}
                  placeholder='제목을 입력하세요.'
                />
              </td>
            </tr> */}
      {/* <tr>
              <td width='100px' height='30px'>주문자</td>
              <td align='left' width='550px'>
                <input
                  type='text'
                  name='writer'
                  size='68'
                  ref={nameRef}
                  placeholder='작성자를 입력하세요.'
                />
                <input
                  type='hidden'
                  name='userId'
                  size='68'
                  ref={userIdRef}
                  value={window.sessionStorage.getItem('id')}
                /> */}
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
      {/* <input
                  type='hidden'
                  name='number'
                  size='68'
                  ref={numRef}
                  value={number}
                /> */}
      {/* <div ref={comment_nameRef}>
                  &nbsp;&nbsp;&nbsp;<b>{window.sessionStorage.getItem('id')}</b>
                </div> */}
      {/* </td>
            </tr> */}
      {/* <tr>
              <td>주문내역</td>
              <td align='left'> */}
      {/* <textarea
                  rows='5'
                  cols='70'
                  name='content'
                  ref={contentRef}
                  placeholder='내용을 입력하세요.'
                /> */}
      {/* <input
                  type='text'
                  name='title'
                  size='68'
                  ref={contentRef}
                  placeholder='주문내역을 입력하세요.'
                /> */}
      {/* </td>
            </tr>
            <tr>
              <td width='100px'>가격</td>
              <td align='left' width='550px'>
                <input
                  type='text'
                  name='location'
                  size='68'
                  ref={priceRef}
                  placeholder='주문하신 음식의 가격을 입력하세요.'
                />
              </td>
            </tr> */}
      <input
        type="button"
        className="opper"
        value="주문하기"
        onClick={onClick}
      />
      &nbsp;
      {/* <input
                  type='button'
                  value='글쓰기'
                  onClick={handleInsert}
                />
                &nbsp; */}
      {/* <input type='reset' value='초기화' /> */}
    </div>
  );
};

export default CommentBoardWrite;

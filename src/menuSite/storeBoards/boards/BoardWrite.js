import React, { useRef } from "react";
import axios from "axios";
import "./BoardWrite.scss";
import { useNavigate } from "../../../../node_modules/react-router-dom/index";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const BoardWrite = ({
  handlelist,
  articleId,
  setactionmodemain,
  actionmodemain,
  title,
}) => {
  const titleRef = useRef();
  const writerRef = useRef();
  const contentRef = useRef();
  const locationRef = useRef();
  const storeIdRef = useRef();
  const timeRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const Article = location.state.articles;

  const handleInsert = () => {

    if (titleRef.current.value === "" || titleRef.current.value === undefined) {
      Swal.fire({
        title: "게시글 제목을 입력해주세요.",
        width: "370px",
      });
      titleRef.current.focus();
      return false;
    }

    // if (writerRef.current.value === '' || writerRef.current.value === undefined) {
    //   alert('게시글의 작성자을 입력해주세요.');
    //   writerRef.current.focus();
    //   return false;
    // }

    if (
      contentRef.current.value === "" ||
      contentRef.current.value === undefined
    ) {
      Swal.fire({
        title: "게시글 내용을 입력해주세요.",
        width: "370px",
      });
      contentRef.current.focus();
      return false;
    }

    if (
      locationRef.current.value === "" ||
      locationRef.current.value === undefined
    ) {
      Swal.fire({
        title: "게시글 픽업장소를 입력해주세요.",
        width: "370px",
      });
      locationRef.current.focus();
      return false;
    }

    if (timeRef.current.value === "" || timeRef.current.value === undefined) {
      Swal.fire({
        title: "그룹 모집시간을 지정해주세요.",
        width: "370px",
      });
      timeRef.current.focus();
      return false;
    } else {
      const str = timeRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          Swal.fire({
            title: "그룹 모집시간을 숫자로만 입력해주세요.(분 단위)",
            width: "370px",
          });
          timeRef.current.focus();
          return false;
        }
      }
    }

    axios
      .post("http://localhost:8008/insert", {
        title: titleRef.current.value,
        writer: window.sessionStorage.getItem("id"),
        content: contentRef.current.value,
        location: locationRef.current.value,
        storeId: storeIdRef.current.value,
        time: timeRef.current.value,
      })
      .then((res) => {
        handlelist();
        titleRef.current.value = "";
        writerRef.current.value = "";
        contentRef.current.value = "";
        locationRef.current.value = "";
        timeRef.current.value = "";

        setactionmodemain({
          ...actionmodemain,
          mode: 0, // 글 수정하기
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onClick = () => {
    setactionmodemain({
      ...actionmodemain,
      mode: 0, // 글 수정하기
    });
  };

  return (
    <div>
      <div className="write_head">
        {title} <br />
        그룹 생성
      </div>
      <div className="write_in">제목</div>
      <input
        maxLength={11}
        type="text"
        name="title"
        className="write_title"
        ref={titleRef}
        placeholder="제목을 입력하세요."
      />
      <input
        type="hidden"
        name="storeId"
        ref={storeIdRef}
        value={articleId}
        hidden
      />
      <div className="write_in">작성자</div>
      {/* <input
                  type='text'
                  name='writer'
                  size='68'
                  ref={writerRef}
                  placeholder='작성자를 입력하세요.'
                /> */}
      <div ref={writerRef} className="write_writer">
        <p className="call_id">&nbsp;{window.sessionStorage.getItem("id")}</p>
      </div>
      <div className="write_in">내용</div>
      <textarea
        maxLength="60"
        name="content"
        className="write_content"
        ref={contentRef}
        size="50"
        placeholder="내용을 입력하세요."
      />
      <div className="write_in">픽업 장소</div>
      <input
        maxLength={13}
        type="text"
        className="write_location"
        name="location"
        ref={locationRef}
        placeholder="픽업 장소를 입력하세요."
      />
      <div className="write_in">그룹 모집시간</div>
      <input
        maxLength={4}
        type="text"
        name="location"
        ref={timeRef}
        className="write_time"
        placeholder="그룹 모집시간을 입력하세요."
      />
      <div className="G_button">
        <input
          type="button"
          className="write_Btn"
          // id="write_done"
          value="글쓰기"
          onClick={handleInsert}
        />
        <input
          type="button"
          className="wrG_Btn"
          id="write_mokloc"
          value="그룹 목록"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default BoardWrite;

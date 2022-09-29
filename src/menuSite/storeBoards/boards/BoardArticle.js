import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BoardArticle.css";
import Swal from "sweetalert2";

const BoardArticle = ({
  article,
  handlelist,
  handledetail,
  handleupdateform,
  handleupdate,
}) => {
  var now = new Date();
  var h = now.getHours() * 3600;
  var m = now.getMinutes() * 60;
  var s = now.getSeconds();

  var total_time = h + m + s;

  var [time, setTime] = useState();

  var cal_time = parseInt(article.BOARD_TIME - total_time);

  var minute = Math.floor((cal_time % 3600) / 60);
  var second = cal_time % 60;

  useEffect(() => {
    var timer = setInterval(() => {
      if (cal_time > 0) {
        setTime(cal_time);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }, [cal_time]);

  const handleConfirm = (e) => {
    const swalWithBootstrapButtons1 = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "주문을 확정하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네!",
      cancelButtonText: "아니요!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("주문이 확정 되었습니다.");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("주문확정이 취소되었습니다.");
        return false;
      }
      axios
        .post("http://localhost:8008/delete", {
          num: e.target.id,
        })
        .then(() => {
          handlelist();
        })
        .catch((e) => {
          console.error(e);
        });
    });
    //     if (article.BOARD_WRITER === window.sessionStorage.getItem("id")) {
    //       if (
    //         window.confirm(`주문을 확정하시겠습니까?
    // 주문 확정이 되면 환불이 불가능합니다.`)
    //       ) {
    //         Swal.fire({
    //           title: "주문이 확정되었습니다.",
    //           width: "370px",
    //         });
    //       } else {
    //         Swal.fire({
    //           title: "주문확정을 취소했습니다.",
    //           width: "370px",
    //         });
    //         return false;
    //       }
    //       axios
    //         .post("http://localhost:8008/delete", {
    //           num: e.target.id,
    //         })
    //         .then(() => {
    //           handlelist();
    //         })
    //         .catch((e) => {
    //           console.error(e);
    //         });
    //     } else {
    //       Swal.fire({
    //         title: "작성자만 주문 확정을 할 수 있습니다.",
    //         width: "370px",
    //       });
    //       return false;
    //     }
  };

  const handleDelete = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: "그룹을 삭제 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네! 삭제하겠습니다.",
      cancelButtonText: "아니요! 삭제하지 않겠습니다.",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제 되었습니다.");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("그룹삭제가 취소되었습니다.");
        return false;
      }
      axios
        .post("http://localhost:8008/delete", {
          num: e.target.id,
        })
        .then(() => {
          handlelist();
        })
        .catch((e) => {
          console.error(e);
        });
    });

    // if (article.BOARD_WRITER === window.sessionStorage.getItem("id")) {
    //   if (window.confirm("그룹을 삭제하시겠습니까?")) {
    //     Swal.fire({
    //       title: "그룹이 삭제되었습니다.",
    //       width: "370px",
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "그룹삭제를 취소했습니다.",
    //       width: "370px",
    //     });
    //     return false;
    //   }
    //   axios
    //     .post("http://localhost:8008/delete", {
    //       num: e.target.id,
    //     })
    //     .then(() => {
    //       handlelist();
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //     });
    // } else {
    //   Swal.fire({
    //     title: "작성자만 해당 글을 삭제할 수 있습니다.",
    //     width: "370px",
    //   });
    //   return false;
    // }
  };

  if (cal_time < 0) {
    return (
      <div className="hugge">
        <div className="G_div" id={article.BOARD_NUM} onClick={handledetail}>
          <b className="num_cnt">{article.BOARD_NUM}</b> &nbsp;
          <a id={article.BOARD_NUM} className="btitle">
            {article.BOARD_TITLE}
          </a>
          <br />
          <span className="group_timer">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>모집 완료!! 곧 배달됩니다!!</u>
          </span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성자 :{" "}
          {article.BOARD_WRITER}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;픽업장소 :
          {article.BOARD_LOCATION}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 :{" "}
          {article.BOARD_DATE}
          <br />
        </div>
        <div>
          {/* <input
            className="btx_fix"
            type="button"
            value="주문 확정"
            id={article.BOARD_NUM}
            onClick={handleDelete}
          /> */}
          <button
            className="btx_fix"
            id={article.BOARD_NUM}
            onClick={handleConfirm}
          >
            주<br />문
            <br />
            확<br />정
          </button>
        </div>
      </div>
    );
  } else
    return (
      <>
        <div className="hugge">
          <div className="G_div" id={article.BOARD_NUM} onClick={handledetail}>
            <b className="num_cnt">{article.BOARD_NUM}</b> &nbsp;
            <a id={article.BOARD_NUM} className="btitle">
              {article.BOARD_TITLE}
            </a>
            <br />
            <span className="group_timer">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <u>
                그룹 모집시간 :&nbsp;
                {minute < 10 ? `0${minute}` : minute}:
                {second < 10 ? `0${second}` : second}
              </u>
            </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성자 :{" "}
            {article.BOARD_WRITER}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;픽업장소 :
            &nbsp;
            {article.BOARD_LOCATION}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일 :{" "}
            {article.BOARD_DATE}
            <br />
          </div>
          <div className="article_btns">
            <input
              className="article_btn1"
              type="button"
              value="수정"
              id={article.BOARD_NUM}
              onClick={handleupdateform}
            />
            <input
              className="article_btn2"
              type="button"
              value="삭제"
              id={article.BOARD_NUM}
              onClick={handleDelete}
            />
          </div>
        </div>
      </>
    );
};

export default BoardArticle;

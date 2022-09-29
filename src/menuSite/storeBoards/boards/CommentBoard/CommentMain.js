/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from "react";
import "../../../../App.css";
import CommentBoardList from "./CommentBoardList";
import CommentBoardUpdateForm from "./CommentBoardUpdateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserStoreMain from "../../../../userMenu/UserMenuMain";
import CommentBoardWrite from "./CommentBoardWrite";
import CommentBoardWriteNoOrder from "./CommentBoardWriteNoOrder";
import CommentBoardListNoOrder from "./CommentBoardListNoOrder";
import UserOrderMain from "../../../../userMenu/UserOrderMenu/UserOrderMain";
import Swal from "sweetalert2";

function CommentMain({
  number,
  articleId,
  boardnum,
  articles,
  actionmodemain,
  setactionmodemain,
}) {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const [fee, setFee] = useState(0);

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    comment_userId: window.sessionStorage.getItem("id"),
    comment_name: "",
    comment_content: "",
    comment_price: "",
  });

  // 0 : 글쓰기 / 1 : 상세보기 / 2: 글수정
  const [actionModeMini, setActionModeMini] = useState({ mode: 0 });
  const [pageLink, setPageLink] = useState([]);

  var page_num = 1;
  const page_size = 5;
  var page_count = 1;
  var article_count = 0;
  // 일반 변수의 경우, props의 형태로 자식 컴포넌트에게 변수 전달이 불가능
  // useState의 경우, props의 형태로 자식 컴포넌트에게 변수 전달이 가능

  useEffect(() => {
    const login_id = window.sessionStorage.getItem("id");
    if (login_id === null) {
      Swal.fire({
        title: "게시판 사용을 위해서는 로그인이 필요합니다.",
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

  // axios
  //   .post("http://localhost:8008/feedivide", {
  //     order_userId: window.sessionStorage.getItem("id"),
  //     order_boardNum: number
  //   })
  //   .then((res) => {
  //     const { data } = res;
  //     console.log("feefeeefee ==>", data[0].setFeeDivide);
  //     setFeeDivide(
  //       data[0].feeDivide
  //     );
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });

  const handlePage = (e) => {
    page_num = e.target.id;
    getList();
  };

  // 글쓰기
  async function getList() {
    // alert('getList(actionMode) : ' + actionMode.mode);
    await axios
      .post("http://localhost:8008/minicount", { number: number })
      // get : url의 데이터 전달 방식을 지정한 것
      // (url에 요청 정보가 노출되는 위험이 있음)
      .then((res) => {
        const { data } = res;
        article_count = data[0].COUNT;
        setCount({
          count: article_count,
        });
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
      .post("http://localhost:8008/minilist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        number: number,
      })
      .then((res) => {
        const { data } = res;
        setBoardlist({
          boardList: data,
        });
        setActionModeMini({
          ...actionModeMini,
          mode: 0,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async function getListNoOrder() {
    // alert('getList(actionMode) : ' + actionMode.mode);
    await axios
      .post("http://localhost:8008/minicount", { number: number })
      // get : url의 데이터 전달 방식을 지정한 것
      // (url에 요청 정보가 노출되는 위험이 있음)
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
      .post("http://localhost:8008/minilist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        number: number,
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

  // 상세보기
  const handleDetail = (e) => {
    // alert('handleDetail(actionMode) : ' + actionMode.mode);
    axios
      .post("http://localhost:8008/detail", { num: e.target.id })
      // post : url의 데이터 전달 방식을 지정한 것
      // (url에 요청 정보를 숨김)
      .then((res) => {
        const { data } = res;
        if (res.data.length > 0) {
          setArticle({
            ...article,
            board_num: data[0].BOARD_NUM,
            board_title: data[0].BOARD_TITLE,
            board_writer: data[0].BOARD_WRITER,
            board_content: data[0].BOARD_CONTENT,
            board_location: data[0].BOARD_LOCATION,
            board_date: data[0].BOARD_DATE,
          });

          setActionModeMini({
            ...actionModeMini,
            mode: 1, // 상세보기
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 수정폼 보기
  const handleUpdateForm = (e) => {
    // alert('handleUpdateForm(actionMode) : ' + actionMode.mode + ', ' + e.target.id);
    axios
      .post("http://localhost:8008/minidetail", { comment_num: e.target.id })
      .then((res) => {
        const { data } = res;
        if (res.data.length > 0) {
          setArticle({
            ...article,
            comment_num: data[0].comment_num,
            comment_boardNum: data[0].comment_boardNum,
            comment_name: data[0].comment_name,
            comment_content: data[0].comment_content,
            comment_price: data[0].comment_price,
          });

          setActionModeMini({
            ...actionModeMini,
            mode: 2, // 글 수정하기
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = () => {
    axios
      .post("http://localhost:8008/miniupdate", {
        article: article,
      })
      .then(() => {
        getList();
      })
      .catch((e) => {
      });
  };

  if (actionModeMini.mode === 0) {
    // alert('글쓰기');
    // 글쓰기
    return (
      <div className="MiniBoardMain">
        <CommentBoardWrite
          number={number}
          handlelist={getList}
          actionmodemini={actionModeMini}
          setactionmodemini={setActionModeMini}
          actionmodemain={actionmodemain}
          setactionmodemain={setactionmodemain}
        />
        <br />
        <CommentBoardList
          fee={fee}
          count={count.count}
          boardlist={boardlist}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        />
        <br />
      </div>
    );
  } else if (actionModeMini.mode === 1) {
    // 기본
    return (
      <div className="MiniBoardMain">
        <UserStoreMain
          actionmodemini={actionModeMini}
          setactionmodemini={setActionModeMini}
          actionmodemain={actionmodemain}
          setactionmodemain={setactionmodemain}
          number={number}
          boardnum={boardnum}
          articleId={articleId}
        />
      </div>
    );
  } else if (actionModeMini.mode === 2) {
    // 수정하기
    return (
      <div>
        <CommentBoardWrite
          boardlist={boardlist}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        />
        <br />
        <CommentBoardUpdateForm
          article={article}
          setarticle={setArticle}
          handleupdate={handleUpdate}
        />
        <br />
      </div>
    );
  } else if (actionModeMini.mode === 3) {
    // 글쓰기만
    return (
      <div>
        <CommentBoardWriteNoOrder
          number={number}
          handlelist={getList}
          actionmodemini={actionModeMini}
          setactionmodemini={setActionModeMini}
          actionmodemain={actionmodemain}
          setactionmodemain={setactionmodemain}
          articleId={articleId}
        />
        <br />
        <CommentBoardListNoOrder
          boardlist={boardlist}
          handlelist={getList}
          handlelistnoorder={getListNoOrder}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        />
        <br />
      </div>
    );
  } else if (actionModeMini.mode === 4) {
    // 글쓰기만
    return (
      <div>
        <UserOrderMain
          actionmodemini={actionModeMini}
          setactionmodemini={setActionModeMini}
          number={number}
        />
      </div>
    );
  }
}

export default CommentMain;

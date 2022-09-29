/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from "react";
import "../../../App.css";
import BoardList from "./BoardList";
import BoardWrite from "./BoardWrite";
import BoardDetail from "./BoardDetail";
import BoardUpdateForm from "./BoardUpdateForm";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BoardDetailNoDesc from "./BoardDetailNoDesc";
import "./BoardMain.css";
import Swal from "sweetalert2";

function Main() {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const navigate = useNavigate();

  const location = useLocation();

  const Article = location.state.articles.store_id;

  const [title, setTitle] = useState(location.state.articles.store_name);

  const [url, setUrl] = useState(location.state.url);

  const [articleId, setArticleId] = useState(Article);

  const [article, setArticle] = useState({
    board_num: "",
    board_title: "",
    board_writer: "",
    board_content: "",
    board_location: "",
    board_date: "",
    board_storeId: "",
    BOARD_TIME: "",
  });

  // 0 : 글쓰기 / 1 : 상세보기 / 2: 글수정
  const [actionModeMain, setActionModeMain] = useState({ mode: 0 });
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
      navigate("/login");
    }
  }, []);

  const handlePage = (e) => {
    page_num = e.target.id;
    getList();
  };

  // 글쓰기
  async function getList() {
    // alert('getList(actionMode) : ' + actionMode.mode);
    await axios
      .post("http://localhost:8008/count", { store_id: Article })
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
      .post("http://localhost:8008/list", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        store_id: Article,
      })
      .then((res) => {
        const { data } = res;
        setBoardlist({
          boardList: data,
        });
        setActionModeMain({
          ...actionModeMain,
          mode: 0,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  // await는 비동기 함수를 동기적으로 바꿔주는 역할
  // (호출한 결과가 완료될 때 까지 다음의 await는 대기 중인 상태)
  // 첫 번째의 await가 계산되기 전에 두 번째의 await가 호출되서 실행되면 계산이 안된 값이 출력되며 오류가 뜨기 때문에
  // 첫 번째 await의 then 구문이 실행이 완료되기 전까지 두 번째의 await를 대기시킴

  // 상세보기
  const handleDetail = (e) => {
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
            board_storeId: data[0].BOARD_STOREID,
            BOARD_TIME: data[0].BOARD_TIME,
          });

          setActionModeMain({
            ...actionModeMain,
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
    axios
      .post("http://localhost:8008/detail", { num: e.target.id })
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
            board_storeId: data[0].BOARD_STOREID,
            BOARD_TIME: data[0].BOARD_TIME,
          });

          setActionModeMain({
            ...actionModeMain,
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
      .post("http://localhost:8008/update", {
        article: article,
      })
      .then(() => {
        getList();
        setActionModeMain({
          ...actionModeMain,
          mode: 0, // 글 수정하기
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAdd = () => {
    setActionModeMain({
      ...actionModeMain,
      mode: 3, // 글 수정하기
    });
  };

  if (actionModeMain.mode === 0) {
    return (
      // 기본
      <div className="form">
        <h1 align="center" className="BoardMain_title">
          {title}
        </h1>
        <br />
        <BoardList
          url={url}
          boardlist={boardlist}
          handlelist={getList}
          articleId={articleId}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
          handleadd={handleAdd}
        />
        <br />
      </div>
    );
  } else if (actionModeMain.mode === 1) {
    return (
      // 상세보기
      <div className="form">
        <BoardDetail
          article={article}
          handlelist={getList}
          articleId={articleId}
          actionmodemain={actionModeMain}
          setactionmodemain={setActionModeMain}
        />
        <br />
      </div>
    );
  } else if (actionModeMain.mode === 2) {
    return (
      // 수정하기
      <div className="form">
        <BoardUpdateForm
          article={article}
          actionmodemain={actionModeMain}
          setactionmodemain={setActionModeMain}
          setarticle={setArticle}
          handleupdate={handleUpdate}
        />
        <br />
      </div>
    );
  } else if (actionModeMain.mode === 3) {
    return (
      // 글 생성하기
      <div className="form">
        <BoardWrite
          handlelist={getList}
          articleId={articleId}
          actionmodemain={actionModeMain}
          setactionmodemain={setActionModeMain}
          title={title}
        />
        <br />
      </div>
    );
  } else if (actionModeMain.mode === 4) {
    return (
      // 내용없는 디테일
      <div className="form">
        <BoardDetailNoDesc
          article={article}
          handlelist={getList}
          articleId={articleId}
          actionmodemain={actionModeMain}
          setactionmodemain={setActionModeMain}
        />
        <br />
      </div>
    );
  }
}

export default Main;

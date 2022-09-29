import { useState, useEffect } from "react";
import BoardList from "./StoreBoardList";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function StoreMain() {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname;

  const url = path.substring(6, 50);


  const [article, setArticle] = useState({
    store_name: "",
    store_deliveryFee: "",
    store_phone: "",
    store_pw: "",
    store_miniPrice:""
  });

  // 0 : 글쓰기 / 1 : 상세보기 / 2: 글수정
  // const [actionMode, setActionMode] = useState({ mode: 0 });
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
      .post("http://localhost:8008/storecount", { url: url })
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
      .post("http://localhost:8008/storelist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        url: url,
      })
      .then((res) => {
        const { data } = res;
        setBoardlist({
          boardList: data,
        });
        // setActionMode({
        //   ...actionMode,
        //   mode: 0
        // });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="form">
      {/* <h1 align='center'>Chicken</h1> */}
      <br />
      <BoardList
        url={url}
        boardlist={boardlist}
        handlelist={getList}
        handlepage={handlePage}
        pagelink={pageLink}
      />
      <br />
    </div>
  );
}

export default StoreMain;

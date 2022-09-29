import BoardList from "./UserOrderBoardList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserOrderMain({
  articleId,
  actionmode,
  setactionmode,
  number,
  actionmodemini,
  setactionmodemini,
}) {
  // 게시글 저장
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const [fee, setFee] = useState(0);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    //하나의 글을 저장하기위한 스테이트 보드 이미지를 저장할거기 때문에 보드 이미지를 추가했다. 보드테이블에서 한 줄을 저장하기 때문에 배열로 사용해서 저장한다.
    menu_storeId: "",
    menu_name: "",
    menu_price: "",
    menu_pictureUrl: "",
  });

  // 0:글쓰기, 1:상세보기, 2:글수정
  const [actionMode, setActionMode] = useState({ mode: 0 });
  const [pageLink, setPageLink] = useState([]);

  var page_num = 1;
  const page_size = 5;
  var page_count = 1;
  var article_count = 0;

  // class형 컴포넌트에는 componentDidMount
  useEffect(() => {
    const login_id = window.sessionStorage.getItem("id");

    if (login_id === null) {
      Swal.fire({
        title: "로그인 후 사용이 가능합니다..",
        width: "370px",
      });
      navigate("/");
    }
  }, []);

  const handlePage = (e) => {
    page_num = e.target.id;
    getList();
  };

  // 성공 (배달비)

  // 글목록
  async function getList() {
    // alert("getList(actionMode) =>" + actionMode.mode);
    await axios
      .post("http://localhost:8008/ordercount", {
        board_num: number,
        user_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        const { data } = res;
        article_count = data[0].COUNT;
        page_count = Math.ceil(article_count / page_size);
        var page_link = [];
        for (let i = 1; i <= page_count; i++) page_link.push(i);
        setPageLink(page_link);
      })
      .catch((e) => {
        console.error(e);
      });

    await axios
      .post("http://localhost:8008/orderlist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        store_id: articleId,
        board_num: number,
        user_id: window.sessionStorage.getItem("id"),
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
  if (actionMode.mode === 0) {
    return (
      <div>
        <br />
        <BoardList
          actionmodemini={actionmodemini}
          setactionmodemini={setactionmodemini}
          fee={fee}
          number={number}
          boardlist={boardlist}
          handlelist={getList}
          handlepage={handlePage}
          pagelink={pageLink}
          actionmode={actionmode}
          setactionmode={setactionmode}
        ></BoardList>
      </div>
    );
  } else if (actionMode.mode === 1) {
    return (
      <div>
        <br />
        <BoardList
          boardlist={boardlist}
          handlelist={getList}
          handlepage={handlePage}
          pagelink={pageLink}
        ></BoardList>
      </div>
    );
  } else if (actionMode.mode === 2) {
    return (
      <div>
        <BoardList
          boardlist={boardlist}
          handlelist={getList}
          handlepage={handlePage}
          pagelink={pageLink}
        ></BoardList>
      </div>
    );
  }
}

export default UserOrderMain;

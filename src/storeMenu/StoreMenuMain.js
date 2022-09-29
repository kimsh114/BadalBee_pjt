import BoardList from "./StoreMenuBoardList";
import BoardWrite from "./StoreMenuBoardWrite";
import BoardDetail from "./StoreMenuBoardDetail";
import StoreMenuBoardUpdateForm from "./StoreMenuBoardUpdateForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function StoreMenuMain() {
  // 게시글 저장
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    //하나의 글을 저장하기위한 스테이트 보드 이미지를 저장할거기 때문에 보드 이미지를 추가했다. 보드테이블에서 한 줄을 저장하기 때문에 배열로 사용해서 저장한다.
    menu_storeId: window.sessionStorage.getItem("id"),
    menu_name: "",
    menu_price: "",
    menu_pictureUrl: "",
  });

  // 0:글쓰기, 1:상세보기, 2:글수정
  const [actionMode, setActionMode] = useState({ mode: 0 });
  const [pageLink, setPageLink] = useState([]);

  var page_num = 1;
  const page_size = 3;
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

  // 글목록
  async function getList() {
    // alert("getList(actionMode) =>" + actionMode.mode);
    await axios
      .post("http://localhost:8008/menucount", {
        menu_storeId: article.menu_storeId,
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
      .post("http://localhost:8008/menulist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        menu_storeId: article.menu_storeId,
      })
      .then((res) => {
        const { data } = res;
        setBoardlist({
          boardList: data,
        });
        setActionMode({
          ...actionMode,
          mode: 0,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // 상세보기
  const handleDetail = (e) => {
    // 보드이미지 데이터를 상세보기에서 확인하기 위해서 보드이미지문장을 추가 해줘야한다.
    // alert("handleDetail(actionMode) =>" + actionMode.mode);
    axios
      .post("http://localhost:8008/menudetail", {
        menu_name: e.target.id,
      })
      .then((res) => {
        const { data } = res;
        if (res.data.length > 0) {
          setArticle({
            ...article,
            menu_id: data[0].menu_id,
            menu_storeId: data[0].menu_storeId,
            menu_name: data[0].menu_name,
            menu_price: data[0].menu_price,
            menu_pictureUrl: data[0].menu_pictureUrl,
          });

          setActionMode({
            ...actionMode,
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
    //수정할 때 이미지는 수정가능 사항에서 ㅈ제외 시켰다.
    // alert(
    //   "handleUpdateForm(actionMode) =>" + actionMode.mode + ", " + e.target.id
    // );
    axios
      .post("http://localhost:8008/menudetail", {
        menu_num: e.target.id,
      })
      .then((res) => {
        const { data } = res;
        if (res.data.length > 0) {
          setArticle({
            ...article,
            menu_id: data[0].menu_id,
            menu_storeId: data[0].menu_storeId,
            menu_name: data[0].menu_name,
            menu_price: data[0].menu_price,
            menu_pictureUrl: data[0].menu_pictureUrl,
          });

          setActionMode({
            ...actionMode,
            mode: 2, // 글수정하기
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleUpdate = () => {
    axios
      .post("http://localhost:8008/menuupdate", {
        article: article,
      })
      .then(() => {
        getList();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (actionMode.mode === 0) {
    // alert("글쓰기");
    // 글쓰기
    return (
      <div className="form">
        <BoardWrite handlelist={getList}></BoardWrite>
        <br />
        <BoardList
          boardlist={boardlist}
          actionmode={actionMode}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        ></BoardList>
      </div>
    );
  } else if (actionMode.mode === 1) {
    // alert("상세정보");
    // 상세보기
    return (
      <div className="form">
        <BoardDetail article={article} handlelist={getList}></BoardDetail>
        <br />
        <BoardList
          boardlist={boardlist}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        ></BoardList>
      </div>
    );
  } else if (actionMode.mode === 2) {
    // alert("글수정");
    // 글수정
    return (
      <div className="form">
        <StoreMenuBoardUpdateForm
          article={article}
          setarticle={setArticle}
          handleupdate={handleUpdate}
        ></StoreMenuBoardUpdateForm>
        <br />
        <BoardList
          boardlist={boardlist}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
        ></BoardList>
      </div>
    );
  }
}

export default StoreMenuMain;

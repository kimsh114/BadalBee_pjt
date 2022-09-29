import UserStoreBoardList from "./UserMenuBoardList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Kakao from "./Kakao";
import Swal from "sweetalert2";

function UserMenuMain({
  articleId,
  actionmodemini,
  setactionmodemini,
  actionmodemain,
  setactionmodemain,
  number,
}) {
  // 게시글 저장
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });
  const [fee, setFee] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    //하나의 글을 저장하기위한 스테이트 보드 이미지를 저장할거기 때문에 보드 이미지를 추가했다. 보드테이블에서 한 줄을 저장하기 때문에 배열로 사용해서 저장한다.
    menu_storeId: "",
    menu_name: "",
    menu_price: "",
    menu_pictureUrl: "",
  });

  // 0:글쓰기, 1:상세보기, 2:글수정
  const [actionModeStore, setActionModeStore] = useState({ mode: 0 });
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

  const handlePage = (e) => {
    page_num = e.target.id;
    getList();
  };

  // 글목록
  async function getList() {
    // alert("getList(actionMode) =>" + actionMode.mode);
    await axios
      .post("http://localhost:8008/usermenucount", { store_id: articleId })
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
      .post("http://localhost:8008/usermenulist", {
        page_num: page_num,
        page_size: page_size,
        article_count: article_count,
        store_id: articleId,
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

  async function getOrderList() {
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

          setActionModeStore({
            ...actionModeStore,
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

          setActionModeStore({
            ...actionModeStore,
            mode: 2, // 글수정하기
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (actionModeStore.mode === 0) {
    // 메인
    return (
      <div>
        <br />
        <UserStoreBoardList
          fee={fee}
          totalprice={totalPrice}
          number={number}
          boardlist={boardlist}
          orderlist={getOrderList}
          handlelist={getList}
          handledetail={handleDetail}
          handleupdateform={handleUpdateForm}
          handlepage={handlePage}
          pagelink={pageLink}
          actionmodemini={actionmodemini}
          setactionmodemini={setactionmodemini}
          actionmodestore={actionModeStore}
          setactionmodestore={setActionModeStore}
          actionmodemain={actionmodemain}
          setactionmodemain={setactionmodemain}
        />
      </div>
    );
  } else if (actionModeStore.mode === 1) {
    // 결제하기
    return (
      <div>
        <br />
        <Kakao
          articleId={articleId}
          fee={fee}
          totalprice={totalPrice}
          actionmodestore={actionModeStore}
          setactionmodestore={setActionModeStore}
          actionmodemini={actionmodemini}
          setactionmodemini={setactionmodemini}
        />
        <br />
      </div>
    );
  }
}

export default UserMenuMain;

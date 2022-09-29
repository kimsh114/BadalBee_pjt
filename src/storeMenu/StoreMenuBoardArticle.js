/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "./StoreMenuBoardArticle.css";

const StoreMenuBoardArticle = ({
  article,
  handlelist,
  handledetail,
  handleupdateform,
}) => {
  const image = "http://localhost:8008/uploads/" + article.menu_pictureUrl;

  const handleDelete = (e) => {
    axios
      .post("http://localhost:8008/menudelete", {
        menu_name: e.target.id,
      })
      .then(() => {
        handlelist();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="menuall">
      <div>
        <img width="80px" src={image} className="menu_img1" />
        <input type="hidden" value={article.menu_storeId} />
        <ul className="menu_content1">
          <ol>메뉴 : {article.menu_name}</ol>
          <ol>가격 : {article.menu_price}원</ol>
        </ul>
      </div>

      <input
        type="button"
        value="삭제"
        id={article.menu_name}
        onClick={handleDelete}
        className="menudelete"
      ></input>
    </div>
  );
};

export default StoreMenuBoardArticle;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import "./StoreBoardArticle.scss";
import { useNavigate } from "react-router-dom";
import MapContainer from "../../kakaoMap/MapContainer";
import "./StoreBoardArticle.css";

const StoreBoardArticle = ({ article, url }) => {
  const nameRef = useRef();

  const navigate = useNavigate();

  // var name = article.store_name;

  const onClick = () => {
    navigate("/boardmain", {
      state: {
        articles: article,
        url: url,
      },
    });
  };

  return (
    // <Link to="/boardlistbbq?bbq">
    <div className="chicken_div">
      <form>
        <table width="300px" align="center" className="chicken_tbl">
          <tr>
            <td width="70px" className="store_content3">
              상호명
            </td>
            <td className="store_content2">
              {article.store_name}
              <input type="hidden" value={article.store_id} />
              <input type="hidden" value={article.store_address} />
            </td>
            <td rowSpan="3" width="40px">
              <input
                className="storearticle_btn"
                type="button"
                value="입장"
                onClick={onClick}
              />
            </td>
          </tr>
          <tr>
            <td width="70px" className="store_content3">
              전화번호
            </td>
            <td className="store_content2">{article.store_phone}</td>
          </tr>
          <tr>
            <td width="70px" className="store_content3">
              배달비
            </td>
            <td className="store_content2">{article.store_deliveryFee}</td>
          </tr>
          <tr>
            <td width="90px" className="store_content3">
              최소주문금액
            </td>
            <td className="store_content2">{article.store_miniPrice}</td>
          </tr>
          <tr>
            <td colSpan={3} className="asdasd">
              <MapContainer
                store_address={article.store_address}
                store_id={article.store_id}
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
    // </Link >
  );
};

export default StoreBoardArticle;

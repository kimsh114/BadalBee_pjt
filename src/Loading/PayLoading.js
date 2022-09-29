import React from "react";
// import { Background, LoadingText } from "./Styles";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import loadingIcon from "./loading.svg";
import "./PayLoading.css";
import "./Bee.css";

export const PayLoading = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    // navigate("/login");
  }, Infinity);

  return (
    <div className="form1">
      <div className="save">배달비 아낄 땐 역시</div>

      <div className="baedalbee1">배달BEE</div>
      <div className="baedalbee2">
        결제가 완료되었습니다. <br /> &nbsp; 현재창을 닫아주세요.
      </div>

      <div class="wrap">
        <div class="wrap2">
          <div class="body"></div>
          <div class="wing1"></div>
          <div class="wing2"></div>
          <div class="stinger"></div>
          <div class="hat"></div>
          <div class="eyes">
            <div class="pupil"></div>
          </div>
        </div>
        <div class="cloud1"></div>
        <div class="cloud2"></div>
        <div class="cloud3"></div>

        <div class="debri1"></div>
        <div class="debri2"></div>
        <div class="debri3"></div>
        <div class="debri4"></div>
        <div class="debri5"></div>
        <div class="debri6"></div>
      </div>
    </div>
  );
};

export default PayLoading;

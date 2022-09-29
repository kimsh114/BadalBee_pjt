import React from "react";
// import { Background, LoadingText } from "./Styles";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import loadingIcon from "./loading.svg";
import "./Loading.css";
import "./Bee.css";
// import bee1 from "./bee1.svg";
// import summerbee from "./summerbee.svg";

export const Loading = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 4000);
  return (
    <div className="form1">
      <div className="save">배달비 아낄 땐 역시</div>

      <div className="baedalbee1">배달BEE</div>
      {/* <img className="summerbee" src={summerbee} alt={summerbee} />
      <div className="bee12">
        <img className="bee1" src={bee1} alt={bee1} />
      </div> */}
      <div></div>
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

      <div class="wrap11">
        <div class="wrap22">
          <div class="body1"></div>
          <div class="wing11"></div>
          <div class="wing22"></div>
          <div class="stinger1"></div>
          <div class="hat1"></div>
          <div class="eyes1">
            <div class="pupil1"></div>
          </div>
        </div>

        <div class="debri11"></div>
        <div class="debri22"></div>
        <div class="debri33"></div>
        <div class="debri44"></div>
        <div class="debri5"></div>
        <div class="debri6"></div>
      </div>
    </div>
  );
};

export default Loading;

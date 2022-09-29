import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="siform">
      <span className="silogo">SIGN UP</span>
      <span className="sihan">회원가입</span>
      <input className="siid" placeholder="ID" />
      <input className="sipassword" type="password" placeholder="PassWord" />
      <input className="siemail" type="email" placeholder="email" />
      <input
        className="siCheckpassword"
        type="password"
        placeholder="Check PassWord"
      />
      <button id="sihakin">확인</button>
    </div>
  );
}

export default Signup;

import "./FoodCategory.css";
import porkfood from "./buttonicon/porkfood.svg";
import cafe from "./buttonicon/cafe.svg";
import pizza from "./buttonicon/pizza.svg";
import china from "./buttonicon/china.svg";
import korean from "./buttonicon/kfood.svg";
import japan from "./buttonicon/japan.svg";
import chicken from "./buttonicon/chicken.svg";
import dessert from "./buttonicon/dessert.svg";
import burger from "./buttonicon/burger.svg";
import sandwich from "./buttonicon/sandwich.svg";
import { Link } from "react-router-dom";

function FoodCategory() {
  return (
    <div className="FoodCategory">
      <div>
        {/* <img className="bee11" src={bee11} alt={bee11} /> */}

        <p className="baedalbee">배달 BEE</p>
        <Link to="/main/cafe">
          <img
            className="category_img"
            id="imcafe"
            src={cafe}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/porkfood">
          <img
            className="category_img"
            id="imporkfood"
            src={porkfood}
            alt="porkfood"
          ></img>
        </Link>
        <Link to="/main/pizza">
          <img
            className="category_img"
            id="impizza"
            src={pizza}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/chinese">
          <img
            className="category_img"
            id="imchina"
            src={china}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/japanese">
          <img
            className="category_img"
            id="imjapan"
            src={japan}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/korean">
          <img
            className="category_img"
            id="imkfood"
            src={korean}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/chicken">
          <img
            className="category_img"
            id="imchicken"
            src={chicken}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/dessert">
          <img
            className="category_img"
            id="imdessert"
            src={dessert}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/burger">
          <img
            className="category_img"
            id="imburger"
            src={burger}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/sandwich">
          <img
            className="category_img"
            id="imsandwich"
            src={sandwich}
            alt="porkfoot"
          ></img>
        </Link>
        <Link to="/main/mypage" >MyPage</Link>
      </div>
    </div>
  );
}

export default FoodCategory;

import { Swiper, SwiperSlide, swiper } from "swiper/react";
import "swiper/css";
import "./CatagorySlide.css";
import chicken from "./img/chicken.svg";
import burger from "./img/burger.svg";
import pizza from "./img/pizza.svg";
import korean from "./img/kfood.svg";
import sandwich from "./img/sandwich.svg";
import chinese from "./img/china.svg";
import japan from "./img/japan.svg";
import dessert from "./img/dessert.svg";
import cafe from "./img/cafe.svg";
import porkfood from "./img/porkfoot.svg";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Autoplay } from "swiper";

import "swiper/css/navigation";

export default function CategorySlide() {
  return (
    <div className="categoryslide1">
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        modules={[Autoplay]}
        loop={true}
        slidesPerGroup={2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2500}
        className="mySwiper"
      >
        <SwiperSlide>
          <a href="http://localhost:3000/main/chicken">
            <img src={chicken} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/burger">
            <img src={burger} alt="pizza"></img>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/pizza">
            <img src={pizza} alt="pizza"></img>
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/korean">
            <img src={korean} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/sandwitch">
            <img src={sandwich} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/chinese">
            <img src={chinese} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/japanese">
            <img src={japan} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/dessert">
            <img src={dessert} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/cafe">
            <img src={cafe} alt="#" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="http://localhost:3000/main/porkfood">
            <img src={porkfood} alt="#" />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

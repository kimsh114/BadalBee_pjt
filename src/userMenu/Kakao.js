/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import "./kakao.css";
import axios from "axios";
const Kakao = ({
  articleId,
  fee,
  totalprice,
  actionmodemini,
  setactionmodemini,
  actionmodestore,
  setactionmodestore,
}) => {
  const sum = fee + totalprice;

  const [urldata, setUrldata] = useState({
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "총 주문 금액 + 배달 수수료",
      quantity: 1,
      total_amount: sum,
      var_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/payloading",
      fail_url: "http://localhost:3000/payloading",
      cancel_url: "http://localhost:3000/payloading",
    },
  });

  useEffect(() => {
    const { params } = urldata;
    axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK b3091e5e79d8151eb11aeb7379c0d920",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid },
      } = response;
      
      setUrldata({ next_redirect_pc_url, tid, params });
    });
  }, []);

  const { next_redirect_pc_url } = urldata;

  const onClick = () => {
    setactionmodemini({
      ...actionmodemini,
      mode: 3,
    });
  };

  const onClick_m = () => {
    setactionmodestore({
      ...actionmodestore,
      mode: 0,
    });
  };

  return (
    <div align="center" className="kakao_div">
      <table align="center" className="kakap_tbl">
        <tr>
          <th className="kakao_th">메뉴 총 가격</th>
          <th className="kakao_th1">{totalprice} 원</th>
        </tr>
        <tr>
          <th className="kakao_th">배달 수수료</th>
          <th className="kakao_th1">{fee} 원</th>
        </tr>
        <tr>
          <th className="kakao_th">총 결제 금액</th>
          <th className="kakao_th1">{fee + totalprice} 원</th>
        </tr>
      </table>

      <input
        type="button"
        className="kakao_btn"
        value="메뉴 선택 창으로"
        onClick={onClick_m}
      />
      <a href={next_redirect_pc_url} target="_blank">
        <input
          type="button"
          className="kakao_btn"
          value="카카오페이로 결제하기"
          onClick={onClick}
        />
      </a>
    </div>
  );
};

export default Kakao;

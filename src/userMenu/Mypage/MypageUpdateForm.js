import React, { useRef } from "react";
import { useEffect } from "react";
const MypageUpdateForm = ({
  article,
  handleupdate,
  setArticle,
  actionModeinfo,
  setActionModeinfo,
  handleUpdateForm,
}) => {
  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const onChange = (e) => {
    setArticle({
      article: article,
    });
    console.log(idRef.current.value);
  };

  return (
    <div>
      <input
        type="text"
        name="user_id"
        defaultValue={article.user_id}
        onChange={onChange}
        ref={idRef}
      ></input>
      <input
        type="text"
        name="user_pw"
        defaultValue={article.user_pw}
        onChange={onChange}
        ref={pwRef}
      ></input>
      <input
        type="text"
        name="user_name"
        defaultValue={article.user_name}
        onChange={onChange}
        ref={nameRef}
      ></input>
      <input
        type="text"
        name="user_email"
        defaultValue={article.user_email}
        onChange={onChange}
        ref={emailRef}
      ></input>
      <input
        type="text"
        name="user_address"
        defaultValue={article.user_address}
        onChange={onChange}
        ref={addressRef}
      ></input>
      <input
        type="text"
        name="user_phone"
        defaultValue={article.user_phone}
        onChange={onChange}
        ref={phoneRef}
      ></input>
      <input type="button" value="글수정" onClick={handleUpdateForm} />
    </div>
  );
};

export default MypageUpdateForm;

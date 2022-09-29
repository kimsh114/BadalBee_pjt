import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserMenuBoardWrite = ({ handlelist }) => {
  // 이미지 파일이름을 읽어오기 위해서 보드이미지 레프값을 추가했다.
  const imageRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  // const idRef = useRef();
  // const storeIdRef = useRef();

  const [image_name, setImage_name] = useState(""); //업로드할 파일 정보를 저장하기위한 문장이다.

  function onImage(e) {
    // 파일업로드를 하기 위해서는 이벤트가 발생한 타겟의 파일을 읽어와야한다. 이벤트로 저장한 파일을 한번에 1개니까 배열순서 0번째가 되어야한다.
    setImage_name(e.target.files[0]); // 단순하게 파일이름만 입력시켜서는 업로드가 안된다 .
  }

  const handleInsert = (e) => {
    // 이미지를 선택했는지 확인하는if문장이 추가 되었다. 이미지가 필수가 아니면 이프문장을 제외해도 되겠다.
    e.preventDefault();
    if (imageRef.current.value === "" || imageRef.current.value === undefined) {
      Swal.fire({
        title: "이미지를 추가해주세요.",
        width: "370px",
      });
      imageRef.current.focus();
      return false;
    }
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      Swal.fire({
        title: "메뉴명을 입력해주세요.",
        width: "370px",
      });
      nameRef.current.focus();
      return false;
    }
    if (priceRef.current.value === "" || priceRef.current.value === undefined) {
      Swal.fire({
        title: "가격을 입력해주세요.",
        width: "370px",
      });
      priceRef.current.focus();
      return false;
    }

    const config = {
      //이미지를 첨부할때 아래의 콘텐트 타임 멀티파트 폼데이터를 적어줘야한다. 지금은 콘피그 객체로 전달을 한다.
      headers: { "Content-Type": "multipart/form-data" },
    };
    // const formData = new FormData();
    // formData.append("image", imageRef.current.value); 이미지 어팬드
    // formData.append("title", titleRef.current.value); 타이틀 어팬드  아무튼 아래와 같은 내용이다.
    // alert(formData);
    axios
      .post(
        // 파일 첨부할 떄 배열로 첨부한 이미지 파일을  이.타겟.파일이름을 가져오기로 설정해야 가져온다.
        "http://localhost:8008/menuinsert",
        {
          menu_storeId: 0,
          menu_pictureUrl: image_name,
          menu_name: nameRef.current.value,
          menu_price: priceRef.current.value,
        },
        config // 옵션정보가 된다. 옵션정보에는 헤더에 담긴 정보가 전달된다. 아무튼 헤더에 멀티파트~~가 들어가는게 매우 중요하다.
      )
      // axios({ // 위의 호출 문장처럼 호출할 수 있는 다른문장이 있다. 객체를 사용해서 보내는 메서드에 포스트를 쓰면 엑시오스 포스트와 같은 방식으로 전달이 된다. 담아서 보내주 덷이터도 보내면 된다. axios,method,url,data는 변경하면 안된다. 이건 약속이다. key는 바꾸면 안된다.
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   url: "http://localhost:8008/insert", // 파일 업로드 요청 URL
      //   method: "POST",
      //   data: { //어팬드를 사용해서 이렇게 사용하는 방식도 존재한다. Line 52~54
      //     title: titleRef.current.value,
      //     writer: writerRef.current.value,
      //     content: contentRef.current.value,
      //     image: image_name,
      //   },
      // })
      .then((res) => {
        handlelist();
        // storeIdRef.current.value = '';
        nameRef.current.value = "";
        priceRef.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      {/* 아래 줄은 빼도 된다. 이게 필요하지만 위에서 미리 설정했기 때문에 삭제 가능 */}
      <form encType="multipart/form-data">
        <table border="1" width="700px" align="center">
          <tr>
            <td width="100px">메뉴 사진</td>
            <td align="left">
              <input
                type="file"
                name="image"
                ref={imageRef}
                accept="image/*"
                onChange={onImage}
              />
              {/* <input
                type="hidden"
                name="storeId"
                ref={storeIdRef}
              /> */}
            </td>
          </tr>
          <tr>
            <td width="100px">메뉴명</td>
            <td align="left" width="550px">
              <input
                type="text"
                name="writer"
                size="68"
                ref={nameRef}
                placeholder="메뉴명을 입력하세요"
              ></input>
            </td>
          </tr>
          {/* <tr>
            <td>내용</td>
            <td align="left">
              <textarea
                rows="5"
                cols="70"
                name="content"
                ref={contentRef}
                placeholder="내용을 입력하세요"
              ></textarea>
            </td>
          </tr> */}
          <tr>
            {/* 추가된 구문이다. 엑셉트느 빼도 ㄱㅊ 온체인지가 중요하다. 온체인지 클릭하면 선택하고 바뀌면 이미지 파일 정보를 읽어와서 맨위에 있는 이.타겟.파일[0]을 서버로 이미지 이름을 전송하는것이다.  */}
            {/* 파일을 하나만 선택해서 전송했으니까 배열헝식의 0번째 파일로 존재한다.  */}
            <td>메뉴 가격</td>
            <td>
              <input
                type="text"
                name="title"
                size="68"
                ref={priceRef}
                placeholder="메뉴 가격을 입력하세요"
              ></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input
                type="submit"
                value="글쓰기"
                onClick={handleInsert}
              ></input>
              &nbsp;
              <input type="reset" value="취소"></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default UserMenuBoardWrite;

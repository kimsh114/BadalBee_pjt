const StoreMenuBoardDetail = ({ article, handlelist }) => {
  const image = "http://localhost:8008/uploads/" + article.menu_pictureUrl; //실제 업로드 된 파일의 위치를 확인할 수 있다.
  // 이미지 경로를 설정한다. 서버에 8008번인데 업로드스폴드
  return (
    <div>
      <form>
        <table border="1" width="700px" align="center">
          <tr>
            <td width="100px">글번호</td>
            <td align="left" width="600px">
              {article.board_num}
            </td>
          </tr>
          <tr>
            <td width="100px">제목</td>
            <td align="left" width="600px">
              {article.board_title}
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴이</td>
            <td align="left" width="600px">
              {article.board_writer}
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴날짜</td>
            <td align="left" width="600px">
              {article.board_date}
            </td>
          </tr>
          <tr>
            <td width="100px">글내용</td>
            <td align="left" width="600px">
              {article.board_content}
            </td>
          </tr>
          <tr>
            {/* 행단위로 하나더 추가 해줌 이미지 에스알지 {이미지}로 브라우저에 뿌려준다. 별거 없데요 질문있으면 질문해주세요*/}
            {/* 정리가 안되서 못한다. 정리를 했어야지 */}
            <td width="100px">이미지</td>
            <td align="left" width="600px">
              <img src={image} />
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <input type="button" value="글목록" onClick={handlelist}></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default StoreMenuBoardDetail;

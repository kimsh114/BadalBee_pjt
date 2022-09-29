const UserMenuBoardUpdateForm = ({ article, setarticle, handleupdate }) => {
  const onChange = (e) => {
    setarticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form>
        <table border="1" width="700px" align="center">
          <tr>
            <td width="100px">메뉴 사진</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="menu_pictureUrl"
                defaultValue={article.menu_pictureUrl}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">메뉴명</td>
            <td align="left" width="600px">
              {article.menu_name}
            </td>
          </tr>
          <tr>
            <td width="100px">메뉴 가격</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="menu_price"
                defaultValue={article.menu_price}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <input
                type="button"
                value="글수정"
                onClick={handleupdate}
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default UserMenuBoardUpdateForm;

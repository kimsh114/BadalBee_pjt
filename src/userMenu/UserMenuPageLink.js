import "./UserMenuPageLink.css";

const UserMenuPageLink = ({ page, handlepage }) => {
  return (
    <div class="page">
      <a id={page} onClick={handlepage}>
        [{page}]
      </a>
      &nbsp;
    </div>
  );
};

export default UserMenuPageLink;

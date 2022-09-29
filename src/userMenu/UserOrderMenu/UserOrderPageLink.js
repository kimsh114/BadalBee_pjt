import "./UserOrderPageLink.css";

const UserOrderPageLink = ({ page, handlepage }) => {
  return (
    <div class="page">
      <a id={page} onClick={handlepage}>
        [{page}]
      </a>
      &nbsp;
    </div>
  );
};

export default UserOrderPageLink;

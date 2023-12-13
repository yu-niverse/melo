import { Link } from "react-router-dom";
import AvatarItem from "../../commonComponents/AvatarItem";

const MenuItem = (props) => {
  const { title, avatar, subTitle, link, handleClickRoom } = props;

  return (
    <Link className="link" to={link} onClick={handleClickRoom}>
      <AvatarItem
        title={<span className="item-name">{title}</span>}
        avatar={avatar}
        subTitle={subTitle}
      />
    </Link>
  );
};

export default MenuItem;

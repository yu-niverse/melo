import "./AvatarItem.css";

const AvatarItem = (props) => {
  const { title, avatar, subTitle, endItem } = props;

  return (
    <div className="avatar-item-box">
      <div className="front-box">
        {avatar}
        <div className="item-info">
          {title}
          {subTitle}
        </div>
      </div>
      {endItem}
    </div>
  );
};

export default AvatarItem;

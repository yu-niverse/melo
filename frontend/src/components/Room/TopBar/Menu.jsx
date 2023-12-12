import MenuItem from "./MenuItem";
import Drawer from "@mui/material/Drawer";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Menu = (props) => {
  const { openMenu, setOpenMenu } = props;

  const roomList = [
    {
      id: 1,
      title: "Default Room",
      member: 1,
    },
    {
      id: 2,
      title: "PopTogether",
      member: 5,
    },
    {
      id: 3,
      title: "Pop Love",
      member: 2,
    },
  ];

  return (
    <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
      <div id="menu-drawer">
        <div className="title">Your Rooms</div>
        <div className="room-container">
          {roomList.map((room) => (
            <MenuItem
              key={room.id}
              title={room.title}
              avatar={
                <div className="avatar-box menu-avatar">
                  <span>{room.title[0]}</span>
                </div>
              }
              subTitle={
                <span className="menu-subtitle">{`${room.member} member`}</span>
              }
              link={`/room/${room.id}`}
              setOpenMenu={setOpenMenu}
            />
          ))}
          <MenuItem
            title="New Room"
            avatar={
              <div className="avatar-box menu-avatar">
                <AddRoundedIcon style={{ color: "#FDD18E" }} />
              </div>
            }
            subTitle={
              <span className="menu-subtitle">Create a new room</span>
            }
            link={`/newRoom`}
            setOpenMenu={setOpenMenu}
          />
        </div>
        <div className="invitation">
          <QrCode2RoundedIcon className="qrcode-icon" />
          <span className="text">Scan Invitation</span>
        </div>
      </div>
    </Drawer>
  );
};

export default Menu;

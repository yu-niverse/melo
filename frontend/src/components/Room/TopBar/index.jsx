import { useState } from "react";
import Menu from "./Menu";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./TopBar.css";

const TopBar = (props) => {
  const { title, roomList, canSearch, setPage } = props;

  const [openMenu, setOpenMenu] = useState(false);
  const handleClickRoom = () => {
    setOpenMenu(false);
    setPage("room");
  };

  return (
    <div id="top-bar">
      <IconButton
        className="menu-icon-btn"
        aria-label="menu"
        onClick={() => setOpenMenu(true)}
      >
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
      <Menu
        openMenu={openMenu}
        handleClickRoom={handleClickRoom}
        roomList={roomList}
        setOpenMenu={setOpenMenu}
      />
      <div className="room-name">{title}</div>
      {canSearch && (
        <IconButton className="search-icon-btn" aria-label="search">
          <SearchRoundedIcon fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};

export default TopBar;

import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import AvatarItem from "../commonComponents/AvatarItem";
import AddSongPanel from "../commonComponents/AddSongPanel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetSongs } from "../../hooks/useSong";

const SearchContent = (props) => {
  const { userRooms, playlists } = props;
  const { data: initSongList, isLoading, error } = useGetSongs();
  const [songList, setSongList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openAddSongPanel, setOpenAddSongPanel] = useState(false);

  useEffect(() => {
    if (initSongList) {
      setSongList(initSongList);
    }
  }, [initSongList]);

  if (error) {
    console.log(error);
    return <p>Error when fetching data</p>;
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    const filteredSongList = initSongList.filter((song) =>
      song.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSongList(filteredSongList);
  };

  return (
    <>
      {
        isLoading ? (
          <div className="loading-container">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
          <TopBar title="Search" roomList={userRooms} />
          <SearchBar
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
          <div className="song-container">
            <div className="song-container-title">Songs For You</div>
            <Stack spacing={2} className="song-container-content">
              {songList.map((song, index) => (
                <AvatarItem
                  key={index}
                  title={<span className="item-name">{song.name}</span>}
                  avatar={
                    <div className="avatar-box playlist-avatar">
                      <span>{song.name[0]}</span>
                    </div>
                  }
                  subTitle={<div className="playlist-subtitle">{song.artist}</div>}
                  endItem={
                    <IconButton onClick={() => setOpenAddSongPanel(true)}>
                      <MoreHorizRoundedIcon sx={{ color: "#F8F8EB" }} />
                    </IconButton>
                  }
                />
              ))}
            </Stack>
          </div>
          <AddSongPanel
            openPanel={openAddSongPanel}
            setOpenPanel={setOpenAddSongPanel}
            playlists={playlists}
          />
          </>
        )
      }
    </>
  );
};

export default SearchContent;

const SearchBar = (props) => {
  const { searchText, handleSearchChange } = props;

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "92%",
        borderRadius: "10px",
        marginTop: "1rem",
      }}
    >
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={searchText}
        onChange={handleSearchChange}
        sx={{ flex: 1 }}
        placeholder="Search for songs"
        inputProps={{
          "aria-label": "Search for songs",
          sx: {
            color: "#333840",
            letterSpacing: "0.5px",

            "&::placeholder": {
              opacity: 0.8,
              color: "#333840",
              fontSize: "12px",
              letterSpacing: "1.5px",
            },
            "&:focus::placeholder": {
              color: "#333840",
              opacity: 0.3,
            },
          },
        }}
      />
    </Paper>
  );
};
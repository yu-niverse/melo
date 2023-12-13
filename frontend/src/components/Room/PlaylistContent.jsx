import React, { useState } from "react";
import AvatarItem from "../commonComponents/AvatarItem";
import Avatar from "@mui/material/Avatar";
import TopBar from "./TopBar";
import Stack from "@mui/material/Stack";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddSongPanel from "../commonComponents/AddSongPanel";
import { useGetPlaylistSongs } from "../../hooks/usePlaylist";

const PlaylistContent = (props) => {
  const { roomInfo, userRooms, playlist, handleClickSong } = props;
  const [openAddSongPanel, setOpenAddSongPanel] = useState(false);
  const {
    data: playlistInfo,
    isLoading,
    error,
  } = useGetPlaylistSongs(roomInfo._id, playlist._id);
  const songs = playlistInfo?.songs;
  console.log(songs);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error when fetching data</p>;
  }

  return (
    <>
      <TopBar title={playlist.name} roomList={userRooms} />
      <div className="add-song-avatar-container">
        <AvatarItem
          title={
            <span className="add-song-item-name">
              Add song to this playlist
            </span>
          }
          avatar={
            <div className="avatar-box add-song-avatar">
              <AddRoundedIcon style={{ color: "#FDD18E" }} />
            </div>
          }
        />
      </div>
      {songs.length > 0 && (
        <>
          <div className="song-container">
            <div className="song-container-title">Playlist Songs</div>
            <Stack spacing={2} className="song-container-content">
              {songs.map((song, index) => (
                <div
                  className="song-item"
                  key={index}
                  onClick={() => handleClickSong(song)}
                >
                  <AvatarItem
                    avatar={
                      <div className="avatar-box playlist-avatar">
                        <span>{song.name[0]}</span>
                      </div>
                    }
                    title={
                      <span className="item-name menu-title-name">
                        {song.name}
                      </span>
                    }
                    subTitle={
                      <span className="playlist-subtitle">{song.artist}</span>
                    }
                    endItem={
                      <div className="end-item-container">
                        <Avatar className="end-avatar">
                          {song.added_by[0]}
                        </Avatar>
                        <IconButton onClick={() => setOpenAddSongPanel(true)}>
                          <MoreHorizRoundedIcon sx={{ color: "#F8F8EB" }} />
                        </IconButton>
                      </div>
                    }
                  />
                </div>
              ))}
            </Stack>
          </div>
          <AddSongPanel
            openPanel={openAddSongPanel}
            setOpenPanel={setOpenAddSongPanel}
            playlists={roomInfo.playlists}
          />
        </>
      )}
    </>
  );
};

export default PlaylistContent;

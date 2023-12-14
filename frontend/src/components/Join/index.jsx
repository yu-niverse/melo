import { useParams, useNavigate } from "react-router-dom";
import { useGetRoomInfo, useJoinRoom } from "../../hooks/useRoom";
import CircularProgress from "@mui/material/CircularProgress";
import "./Join.css";

const Join = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mutation = useJoinRoom(id);

  const {
    data: roomInfo,
    isLoading: roomLoading,
    error: roomError,
  } = useGetRoomInfo(id);

  const handleJoin = () => {
    mutation.mutate(
      { id },
      {
        onSuccess: () => {
          navigate(`/room/${id}`);
        },
      }
    );
  };

  return (
    <div id="join-room-page">
      {roomLoading ? (
        <CircularProgress color="inherit" />
      ) : roomError ? (
        <div>{roomError}</div>
      ) : (
        <>
          <div className="join-room-page-title">Join Room</div>
          <div className="join-room-page-room-name">{roomInfo.name}</div>
          <button className="join-room-btn" onClick={handleJoin}>
            Join
          </button>
        </>
      )}
    </div>
  );
};

export default Join;

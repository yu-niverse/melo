import { useParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import QRCode from "react-qr-code";

const Invite = (props) => {
  const { openPanel, setOpenPanel } = props;
  const { id } = useParams();

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join Room",
          url: "https://melo-in-sync.vercel.app/" + id,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported in your browser");
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={openPanel}
      onClose={() => setOpenPanel(false)}
      sx={{
        "& .MuiBackdrop-root ": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <div id="invite-panel">
        <IconButton className="close-btn" onClick={() => setOpenPanel(false)}>
          <CloseRoundedIcon />
        </IconButton>
        <div className="invite-title">Invite Friends</div>
        <div className="QR-code">
          <QRCode
            xlinkTitle="Join Room"
            value={"https://melo-in-sync.vercel.app/" + id}
            bgColor="rgba(248, 248, 235, 0.08)"
            fgColor="#f8f8eb"
            size={192}
          />
        </div>

        <button className="share-link" onClick={handleShareLink}>
          Share Link
        </button>
      </div>
    </Drawer>
  );
};

export default Invite;

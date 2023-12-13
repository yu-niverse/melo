import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Invite = (props) => {
  const { openPanel, setOpenPanel } = props;

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
        <div className="QR-code"></div>
        <button className="share-link">Share Link</button>
      </div>
    </Drawer>
  );
};

export default Invite;

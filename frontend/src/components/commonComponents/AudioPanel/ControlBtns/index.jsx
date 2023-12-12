import IconButton from "@mui/material/IconButton";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import { ReactComponent as ShuffleBtn } from "../../../../assets/shuffle.svg";
import { ReactComponent as PlayBtn } from "../../../../assets/play.svg";
import { ReactComponent as QueueBtn } from "../../../../assets/queue.svg";
import { ReactComponent as RepeatBtn } from "../../../../assets/repeat.svg";
import "./ControlBtns.css";

const ControlBtns = (props) => {
  const { queuePanel, setOpenControlPanel, setOpenQueuePanel } = props;

  return (
    <div id="control-btns">
      <IconButton>
        <ShuffleBtn />
      </IconButton>
      <IconButton>
        <FastRewindRounded className="control-btn" />
      </IconButton>
      <IconButton>
        <PlayBtn />
      </IconButton>
      <IconButton>
        <FastForwardRounded className="control-btn" />
      </IconButton>
      {queuePanel ? (
        <IconButton>
          <RepeatBtn />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            setOpenControlPanel(false);
            setOpenQueuePanel(true);
          }}
        >
          <QueueBtn />
        </IconButton>
      )}
    </div>
  );
};

export default ControlBtns;

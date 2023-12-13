import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReactComponent as MainIcon } from "../../../assets/grid.svg";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";
import { ReactComponent as AnalysisIcon } from "../../../assets/analysis.svg";
import { ReactComponent as InviteIcon } from "../../../assets/invite.svg";
import "./AppBar.css";

const AppBar = (props) => {
  const { setPage } = props;
  //   const navigate = useNavigate();

  const [value, setValue] = useState("room");

  const handleChange = (_e, newValue) => {
    // if (newValue === 0) navigate("/main");
    setPage(newValue);
    setValue(newValue);
  };

  return (
    <Tabs
      id="app-bar"
      value={value}
      onChange={handleChange}
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "transparent",
        },
        "& .MuiTabs-flexContainer": {
          justifyContent: "space-evenly",
        },
      }}
    >
      <Tab
        value={"room"}
        icon={<MainIcon />}
        className={value === "room" ? "tab-selected" : "tab"}
        label="Main"
      />
      <Tab
        value={"search"}
        icon={<SearchIcon />}
        className={value === "search" ? "tab-selected" : "tab"}
        label="Search"
      />
      <Tab
        value={"analysis"}
        icon={<AnalysisIcon />}
        className={value === "analysis" ? "tab-selected" : "tab"}
        label="Analysis"
      />
      <Tab
        value={"invite"}
        icon={<InviteIcon />}
        className={value === "invite" ? "tab-selected" : "tab"}
        label="Invite"
      />
    </Tabs>
  );
};

export default AppBar;

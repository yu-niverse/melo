import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReactComponent as MainIcon } from "../../../assets/grid.svg";
import { ReactComponent as SearchIcon } from "../../../assets/search.svg";
import { ReactComponent as AnalysisIcon } from "../../../assets/analysis.svg";
import { ReactComponent as InviteIcon } from "../../../assets/invite.svg";
import "./AppBar.css";

const AppBar = () => {
//   const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    // if (newValue === 0) navigate("/main");

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
        icon={<MainIcon />}
        className={value === 0 ? "tab-selected" : "tab"}
        label="Main"
      />
      <Tab
        icon={<SearchIcon />}
        className={value === 1 ? "tab-selected" : "tab"}
        label="Search"
      />
      <Tab
        icon={<AnalysisIcon />}
        className={value === 2 ? "tab-selected" : "tab"}
        label="Analysis"
      />
      <Tab
        icon={<InviteIcon />}
        className={value === 3 ? "tab-selected" : "tab"}
        label="Invite"
      />
    </Tabs>
  );
};

export default AppBar;

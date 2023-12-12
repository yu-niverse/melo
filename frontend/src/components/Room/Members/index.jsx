import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import "./Members.css";

const Members = (props) => {
  const { memberList } = props;

  const avatarColor = ["#F8F8EB", "#FDD18E", "#F8F8EB", "#D3CBAE"];

  return (
    <div id="members">
      <div className="current-user">
        <AvatarGroup
          sx={{ "& .MuiAvatar-root": { borderColor: "transparent" } }}
        >
          <Avatar className="avatar">C</Avatar>
        </AvatarGroup>
        <span className="user-name">Chieh Yu</span>
      </div>
      <AvatarGroup
        max={4}
        componentsProps={{
          additionalAvatar: {
            sx: {
              width: "20px",
              height: "20px",
              marginRight: "0.3rem",
              color: "#333840",
              fontSize: "0.9rem",
            },
          },
        }}
        sx={{ "& .MuiAvatar-root": { borderColor: "transparent" } }}
      >
        {memberList.map((member, index) => (
          <Avatar
            key={index}
            alt={member}
            className="avatar"
            sx={{
              bgcolor: avatarColor[index],
              borderColor: avatarColor[index],
            }}
          >
            {member[0]}
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default Members;

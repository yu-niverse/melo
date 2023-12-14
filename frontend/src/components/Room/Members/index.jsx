import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import "./Members.css";

const Members = (props) => {
  const { memberList, user, avatarColor } = props;

  return (
    <div id="members">
      <div className="current-user">
        <AvatarGroup
          sx={{ "& .MuiAvatar-root": { borderColor: "transparent" } }}
        >
          <Avatar className="avatar" sx={{ bgcolor: "#F8F8EB" }}>
            {user.username[0]}
          </Avatar>
        </AvatarGroup>
        <span className="user-name">{user.username}</span>
      </div>
      {
        memberList.length > 0 && (
          <AvatarGroup
          max={4}
          componentsProps={{
            additionalAvatar: {
              sx: {
                width: "20px",
                height: "20px",
                marginRight: "0.3rem",
                color: "#333840",
                fontSize: "1rem",
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
                bgcolor: avatarColor[member[0].charCodeAt(0) % 4],
                borderColor: avatarColor[member[0].charCodeAt(0) % 4],
              }}
            >
              {member[0]}
            </Avatar>
          ))}
        </AvatarGroup>
        )
      }
    </div>
  );
};

export default Members;

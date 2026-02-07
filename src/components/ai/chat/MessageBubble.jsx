import { Avatar } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import robotAvatar from "../../../assets/robot.png";
import "./MessageBubble.scss";
const formatTime = (time) => {
  if (!time) return "";

  const date = new Date(time);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timePart = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return timePart;

  const datePart = date.toLocaleDateString("vi-VN");
  return `${timePart} ${datePart}`;
};
const avatarUrl = `http://localhost:8080${localStorage.getItem("data_avatar")}`;
console.log("avatarUrl", avatarUrl);
const MessageBubble = ({ role, text, time }) => {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
        alignItems: "flex-end",
      }}
    >
      {!isUser && (
        <Avatar
          size={40}
          src={robotAvatar}
          alt="Robot Avatar"
          style={{
            backgroundColor: "#1890ff",
            padding: 4,
          }}
        />
      )}

      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: 16,
          background: isUser ? "#1890ff" : "#f0f0f0",
          color: isUser ? "#fff" : "#000",
          marginLeft: isUser ? 0 : 8,
          marginRight: isUser ? 8 : 0,
          display: "flex",
          flexDirection: "column", // 👈 QUAN TRỌNG
        }}
      >
        <div>{text}</div>

        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginTop: 4,
            textAlign: "right",
          }}
        >
          {formatTime(time)}
        </div>
      </div>

      {isUser && <Avatar size={40} src={avatarUrl} alt="User Avatar" />}
    </div>
  );
};

export default MessageBubble;

import { Avatar } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
      }}
    >
      {!isUser && <Avatar icon={<RobotOutlined />} />}
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: 16,
          background: isUser ? "#1890ff" : "#f0f0f0",
          color: isUser ? "#fff" : "#000",
          marginLeft: isUser ? 0 : 8,
          marginRight: isUser ? 8 : 0,
        }}
      >
        {text}
      </div>
      {isUser && <Avatar icon={<UserOutlined />} />}
    </div>
  );
};

export default MessageBubble;

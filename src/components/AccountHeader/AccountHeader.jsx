import "./AccountHeader.css";
import { useState } from "react";
import React from "react";

import { Space, Avatar } from "antd";
const UserList = ["Đ", "L", "T", "E"];
const GapList = [4, 3, 2, 1];

const AccountHeader = () => {
  const [gap] = useState(GapList[0]);
  const [user, setUser] = useState(UserList[0]);
  //   const token = Cookies.get("jwt_token");
  return (
    <Space className="account-header">
      <Avatar
        style={{
          backgroundColor: "#008cff",
          verticalAlign: "middle",
        }}
        size={50}
        gap={gap}
      >
        {user}
      </Avatar>
    </Space>
  );
};

export default AccountHeader;

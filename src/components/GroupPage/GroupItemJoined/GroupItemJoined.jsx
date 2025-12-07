import { Space } from "antd";
import React from "react";
import "./GroupItemJoined.css";
function GroupItemJoined() {
  return (
    <a href="#">
      <Space className="group-item-joined">
        <div style={{ width: "60px", height: "60px" }}>
          <img
            className="img-group-item-joined"
            src="https://wisfeed.com/api/v1/files/streaming/images/3fcfa9b334e94e0bbb17720bb1665066_1673686177399_default.jpeg"
            alt="image"
          />
        </div>
        <div className="group-item-joined-content">
          <div className="joined-content-title">Miss Deadline 2023</div>
          <Space className="joined-content-body">
            <div className="joined-content-newcomment">0 New Posts</div>
            <span>.</span>
            <div className="joined-content-time-active">1 ngày trước</div>
          </Space>
        </div>
      </Space>
    </a>
  );
}

export default GroupItemJoined;

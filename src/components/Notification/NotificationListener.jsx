import { useEffect } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../utils/connectWebSocket";
import { notification } from "antd";

const NotificationListener = ({ userId, token }) => {
  useEffect(() => {
    if (!userId || !token) return;

    connectWebSocket(userId, token, (noti) => {
      notification.open({
        message: noti.title || "Thông báo",
        description: noti.content,
        placement: "topRight",
      });
    });

    return () => {
      disconnectWebSocket();
    };
  }, [userId, token]);

  return null; // component chỉ lắng nghe
};

export default NotificationListener;

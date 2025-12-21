// import { useEffect } from "react";
// import {
//   connectWebSocket,
//   disconnectWebSocket,
// } from "../utils/connectWebSocket";
// import { notification } from "antd";

// const NotificationListener = ({ userId, token }) => {
//   useEffect(() => {
//     if (!userId || !token) return;

//     connectWebSocket(userId, token, (noti) => {
//       notification.open({
//         message: noti.title || "Thông báo",
//         description: noti.content,
//         placement: "topRight",
//       });
//     });

//     return () => {
//       disconnectWebSocket();
//     };
//   }, [userId, token]);

//   return null; // component chỉ lắng nghe
// };

// export default NotificationListener;

import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../utils/connectWebSocket";
import { useNotifications } from "../contexts/NotificationContext";
import { notification } from "antd";

const NotificationListener = ({ userId }) => {
  const { addNotification } = useNotifications();
  const token = Cookies.get("jwt_token");
  const showToast = (noti) => {
    notification.open({
      message: noti.title,
      description: noti.content,
      placement: "topRight",
      duration: noti.priority === "HIGHEST" ? 0 : 4,
    });
  };
  useEffect(() => {
    if (!userId) return;

    // connectWebSocket(userId, token, addNotification);
    connectWebSocket(userId, token, (noti) => {
      showToast(noti);
      addNotification(noti); // lưu vào panel
    });

    return () => {
      disconnectWebSocket();
    };
  }, [userId]);

  return null;
};

export default NotificationListener;

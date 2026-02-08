import { Client } from "@stomp/stompjs";
const getDefaultTitleByType = (type) => {
  switch (type) {
    case "N002_NEW_DEVICE_LOGIN":
      return "Đăng nhập từ thiết bị lạ";
    case "N001_NEW_FOLLOWER":
      return "Bạn có người theo dõi mới";
    case "N003_POST_LIKED":
      return "Bài viết được yêu thích";
    default:
      return "Thông báo";
  }
};

export const mapNotification = (noti) => {
  // 🔹 resolve device info nếu có
  const deviceInfo =
    noti?.metadata?.request?.deviceInfo ||
    noti?.metadata?.deviceInfo ||
    "thiết bị không xác định";

  // 🔹 replace placeholder
  const content = (noti.content || "Bạn có thông báo mới").replace(
    "{deviceInfo}",
    deviceInfo,
  );

  return {
    id: noti.notificationId,
    userId: noti.userId,

    // hiển thị
    title: noti.title || getDefaultTitleByType(noti.type),

    content: content,

    // trạng thái
    type: noti.type,
    priority: noti.priority,
    read: noti.read ?? false,

    // thời gian
    createdAt: noti.createdAt,
    createdAtText: noti.createdAt
      ? new Date(noti.createdAt).toLocaleString()
      : "",
  };
};

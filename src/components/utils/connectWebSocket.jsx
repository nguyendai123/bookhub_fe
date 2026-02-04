// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

// let stompClient = null;

// export const connectWebSocket = (userId, token, onNotification) => {
//   stompClient = new Client({
//     webSocketFactory: () => new SockJS("https://bookhub-postgress.onrender.com/ws"),

//     connectHeaders: {
//       Authorization: `Bearer ${token}`, // nếu backend có check JWT
//     },
//     reconnectDelay: 5000,

//     onConnect: () => {
//       console.log("✅ WebSocket connected");

//       // 🔥 SUBSCRIBE ĐÚNG VỚI BACKEND
//       stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
//         const notification = JSON.parse(message.body);
//         console.log("Received notification: ", notification);
//         onNotification(notification);
//       });
//     },

//     onStompError: (frame) => {
//       console.error("❌ STOMP error:", frame);
//     },
//   });

//   stompClient.activate();
// };

// export const disconnectWebSocket = () => {
//   if (stompClient) {
//     stompClient.deactivate();
//     stompClient = null;
//   }
// };
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { mapNotification } from "../utils/mapNotification";
let stompClient = null;

/**
 * Kết nối WebSocket
 * @param {number} userId
 * @param {string} token
 * @param {(notification: object) => void} onMessage
 */
export const connectWebSocket = (userId, token, onMessage) => {
  if (!userId || !token) {
    console.warn("⚠️ Missing userId or token, skip websocket connect");
    return;
  }

  // ❌ Tránh connect nhiều lần
  if (stompClient && stompClient.active) {
    console.log("⚠️ WebSocket already connected");
    return;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("https://bookhub-postgress.onrender.com/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`, // nếu backend check JWT
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    debug: () => {}, // bật log nếu cần debug

    onConnect: () => {
      console.log("✅ WebSocket connected");

      stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        if (!message?.body) return;

        try {
          const raw = JSON.parse(message.body);
          console.log("📩 Notification received:", raw);

          const notification = mapNotification(raw);

          onMessage?.(notification);

          console.log("✅ Notification processed:", notification);
        } catch (e) {
          console.error("❌ Parse notification error", e);
        }
      });
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error:", frame);
    },

    onWebSocketClose: () => {
      console.warn("🔌 WebSocket disconnected");
    },
  });

  stompClient.activate();
};

/**
 * Ngắt WebSocket
 */
export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 WebSocket deactivated");
  }
};

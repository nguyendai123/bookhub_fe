import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (userId, token, onNotification) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`, // nếu backend có check JWT
    },
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket connected");

      // 🔥 SUBSCRIBE ĐÚNG VỚI BACKEND
      stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        const notification = JSON.parse(message.body);
        console.log("Received notification: ", notification);
        onNotification(notification);
      });
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error:", frame);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};

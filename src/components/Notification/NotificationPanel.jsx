import { Badge, Drawer, List, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const { Text } = Typography;

const NotificationPanel = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    console.log("Setting up notification socket");
    // if (!currentUser?.userId) return;
    console.log("Setting up notification socket11 ");
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(
          `/topic/notifications/${currentUser.userId}`,
          (message) => {
            const noti = JSON.parse(message.body);
            console.log("Received notification: ", noti);
            setNotifications((prev) => [noti, ...prev]);
          }
        );
      },
      debug: () => {},
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [currentUser?.userId]);

  return (
    <>
      <Badge count={notifications.length} offset={[0, 6]}>
        <BellOutlined
          style={{ fontSize: 22, cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
      </Badge>

      <Drawer
        title="Notifications"
        placement="right"
        width={360}
        onClose={() => setOpen(false)}
        open={open}
      >
        <List
          dataSource={notifications}
          locale={{ emptyText: "Chưa có thông báo" }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{item.title}</Text>}
                description={
                  <>
                    <Text>{item.message}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default NotificationPanel;

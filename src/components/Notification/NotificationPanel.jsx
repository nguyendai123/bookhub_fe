import { Badge, Drawer, List, Typography, Tag, Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
const { Text } = Typography;

const NotificationPanel = () => {
  const { notifications, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Badge count={unread} offset={[2, 2]}>
        <Avatar
          className="fb-icon-avatar"
          icon={<BellOutlined />}
          onClick={() => {
            setOpen(true);
            markAllRead();
          }}
        />
      </Badge>

      <Drawer
        title="Notifications"
        placement="right"
        width={360}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List
          dataSource={notifications}
          locale={{ emptyText: "Chưa có thông báo" }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    <Text strong>{item.title}</Text>
                    {item.priority === "HIGHEST" && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        Quan trọng
                      </Tag>
                    )}
                  </>
                }
                description={
                  <>
                    <Text>{item.content}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.createdAtText}
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

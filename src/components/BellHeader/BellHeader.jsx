import { Dropdown, Space, Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import BellNotification from "./BellNotification/BellNotification";
const items = [
  {
    label: <BellNotification icon="mail" />,
    key: "mail",
  },
  {
    label: <BellNotification icon="job" />,
    key: "job",
  },
  {
    label: <BellNotification icon="add" />,
    key: "add",
  },
  {
    label: <BellNotification icon="star" />,
    key: "star",
  },
  {
    label: <BellNotification icon="mail" />,
    key: "mail1",
  },
  {
    label: <BellNotification icon="mail" />,
    key: "mail2",
  },
  {
    type: "divider",
  },

  {
    label: (
      <div
        style={{
          padding: 5,
          marginTop: "-6px",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{
            borderRadius: 0,
            height: "30px",
            width: "150px",
            border: "none",
            padding: 0,
          }}
        >
          Click me!
        </Button>
        <Button
          style={{
            borderRadius: 0,
            height: "30px",
            width: "150px",
            border: "none",
            padding: 0,
          }}
        >
          Click me!
        </Button>
      </div>
    ),
    key: "7",
  },
];
const BellHeader = () => {
  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <Space className="bell-header">
        <Badge
          style={{
            padding: "0px 4px  0 4px ",
            color: "white",
          }}
          count={5}
        >
          <BellOutlined
            style={{
              color: "white",
              fontSize: "20px",
            }}
          />
        </Badge>
      </Space>
    </Dropdown>
  );
};

export default BellHeader;

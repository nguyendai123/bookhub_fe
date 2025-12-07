import { useEffect, useState } from "react";
import { Space, Typography, Avatar } from "antd";
import moment from "moment/moment";
import {
  MailOutlined,
  DingdingOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
const { Paragraph } = Typography;
const ColorList = [
  "#008cff",
  "#7265e6",
  "#ffbf00",
  "#00a2ae",
  "red",
  "pink",
  "purple",
  "orange",
];
const Notification = {
  mail: {
    icon: (
      <MailOutlined
        style={{
          fontSize: "17px",
          textAlign: "center",
        }}
      />
    ),
    label: "You received new weekly newspapers",
  },
  job: {
    icon: (
      <DingdingOutlined
        style={{
          fontSize: "17px",
          textAlign: "center",
        }}
      />
    ),
    label: "Qu Nini you recommended has passed the third round of interview",
  },
  add: {
    icon: (
      <PlusOutlined
        style={{
          fontSize: "17px",
          textAlign: "center",
        }}
      />
    ),
    label: "This template can distinguish between multiple notification types",
  },
  star: {
    icon: (
      <StarOutlined
        style={{
          fontSize: "17px",
          textAlign: "center",
        }}
      />
    ),
    label: "Icons on the left are used to distinguish between different types",
  },
};
// eslint-disable-next-line react/prop-types
const BellNotification = ({ icon }) => {
  let object = {
    time: new Date(),
  };
  const [time1, setTime1] = useState("");
  useEffect(() => {
    let producList = localStorage.getItem("TimeList");

    if (producList) {
      let arr = JSON.parse(producList);
      arr.push(object);
      console.log(
        moment(JSON.stringify(arr[0]), "HH:mm:ss").format("HH:mm:ss")
      );
      localStorage.setItem("TimeList", JSON.stringify(arr));
      setTime1(
        moment(new Date(), "HH:mm:ss")
          .subtract(
            moment(JSON.stringify(arr[0]), "HH:mm:ss").format("HH:mm:ss"),
            "HH:mm:ss"
          )
          .format("HH:mm:ss")
      );
    } else {
      localStorage.setItem("TimeList", JSON.stringify([object]));
    }
  }, []);

  return (
    <Space align="start" style={{ width: "300px" }}>
      <Avatar
        style={{
          backgroundColor: ColorList[Math.floor(Math.random() * 8)],
        }}
        size="large"
      >
        {Notification[icon].icon}
      </Avatar>

      <Paragraph ellipsis={true} style={{ width: "250px" }} strong>
        {Notification[icon].label}
        <div>{time1}</div>
      </Paragraph>
    </Space>
  );
};

export default BellNotification;

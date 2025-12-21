import { Descriptions } from "antd";

const UserAbout = ({ profileUser }) => (
  <Descriptions column={1}>
    <Descriptions.Item label="Username">
      {profileUser.username}
    </Descriptions.Item>
    <Descriptions.Item label="Bio">{profileUser.bio || "—"}</Descriptions.Item>
  </Descriptions>
);

export default UserAbout;

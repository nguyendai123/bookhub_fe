import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import FollowButton from "../Follow/FollowButton";
import UserAbout from "./UserAbout";
import UserPosts from "./UserPosts";
import UserBooks from "./UserBooks";

const { Title, Text, Paragraph } = Typography;

const UserProfilePage = ({ currentUser }) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      })
      .then((res) => setProfileUser(res.data));
  }, [userId]);

  if (!profileUser) return null;

  return (
    <Row justify="center">
      <Col span={16}>
        {/* ===== HEADER ===== */}
        <Card style={{ marginTop: 24 }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar
                size={96}
                src={`http://localhost:8080${profileUser.avatar}`}
                icon={<UserOutlined />}
              />
            </Col>

            <Col flex="auto">
              <Title level={3} style={{ marginBottom: 0 }}>
                {profileUser.username}
              </Title>

              <Space size="large">
                <Text>
                  <b>{profileUser.followersCount}</b> Followers
                </Text>
                <Text>
                  <b>{profileUser.followingCount}</b> Following
                </Text>
              </Space>

              <Paragraph style={{ marginTop: 8 }}>
                {profileUser.bio || "Chưa có giới thiệu"}
              </Paragraph>
            </Col>

            <Col>
              {currentUser.userId !== profileUser.userId && (
                <FollowButton
                  profileUser={profileUser}
                  setProfileUser={setProfileUser}
                  currentUserId={currentUser.userId}
                  targetUserId={profileUser.userId}
                />
              )}
            </Col>
          </Row>
        </Card>

        <Divider />

        {/* ===== TABS ===== */}
        <Card>
          <Tabs
            defaultActiveKey="posts"
            items={[
              {
                key: "posts",
                label: "Bài viết",
                children: <UserPosts userId={userId} />,
              },
              {
                key: "books",
                label: "Sách đang đọc",
                children: <UserBooks userId={userId} />,
              },
              {
                key: "about",
                label: "Giới thiệu",
                children: <UserAbout profileUser={profileUser} />,
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfilePage;

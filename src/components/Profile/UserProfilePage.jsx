import {
  Avatar,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tabs,
  Typography,
  List,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import FollowButton from "../Follow/FollowButton";
import UserAbout from "./UserAbout";
import UserPosts from "./UserPosts";
import UserBooks from "./UserBooks";
import AppHeader from "../Header/Header";

const { Title, Text, Paragraph } = Typography;

const UserProfilePage = ({ currentUser }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
  };

  useEffect(() => {
    axios
      .get(`/api/users/${userId}/profile`, authHeader)
      .then((res) => setProfileUser(res.data));

    axios
      .get(`/api/follow/${userId}/followers`, authHeader)
      .then((res) => setFollowers(res.data));

    axios
      .get(`/api/follow/${userId}/following`, authHeader)
      .then((res) => setFollowing(res.data));
  }, [userId]);

  if (!profileUser) return null;

  const renderUserItem = (user) => (
    <List.Item
      key={user.userId} // ⭐ thêm key tránh warning
      onClick={() => navigate(`/profile/${user.userId}`)}
      style={{ cursor: "pointer" }}
    >
      <List.Item.Meta
        avatar={<Avatar src={`${user.avatarUrl}`} icon={<UserOutlined />} />}
        title={user.username}
        description={user.bio || "Chưa có giới thiệu"}
      />
    </List.Item>
  );

  return (
    <>
      <AppHeader />

      <Row justify="center">
        <Col span={16}>
          {/* ===== PROFILE HEADER ===== */}
          <Card style={{ marginTop: 24 }}>
            <Row align="middle" gutter={16}>
              <Col>
                <Avatar
                  size={96}
                  src={`${profileUser.avatar}`}
                  icon={<UserOutlined />}
                />
              </Col>

              <Col flex="auto">
                <Title level={3} style={{ marginBottom: 0 }}>
                  {profileUser.username}
                </Title>

                <Space size="large">
                  <Text>
                    <b>{followers.length}</b> Followers
                  </Text>
                  <Text>
                    <b>{following.length}</b> Following
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

          {/* ===== MAIN CONTENT TABS ===== */}
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
                {
                  key: "followers",
                  label: `Followers (${followers.length})`,
                  children: (
                    <List
                      itemLayout="horizontal"
                      dataSource={followers} // ✅ BỎ .map
                      renderItem={renderUserItem}
                    />
                  ),
                },
                {
                  key: "following",
                  label: `Following (${following.length})`,
                  children: (
                    <List
                      itemLayout="horizontal"
                      dataSource={following} // ✅ BỎ .map
                      renderItem={renderUserItem}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserProfilePage;

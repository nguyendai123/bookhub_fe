import { List, Avatar, Tabs } from "antd";
import { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "../../services/followApi";

const FollowersListPage = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getFollowers(userId).then((res) => setFollowers(res.data));
    getFollowing(userId).then((res) => setFollowing(res.data));
  }, [userId]);

  const renderUser = (item, type) => {
    const user = type === "followers" ? item.user : item.followUser;

    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={user.avatarUrl} />}
          title={user.username}
          description={user.bio}
        />
      </List.Item>
    );
  };

  return (
    <Tabs
      items={[
        {
          key: "followers",
          label: `Followers (${followers.length})`,
          children: (
            <List
              dataSource={followers}
              renderItem={(i) => renderUser(i, "followers")}
            />
          ),
        },
        {
          key: "following",
          label: `Following (${following.length})`,
          children: (
            <List
              dataSource={following}
              renderItem={(i) => renderUser(i, "following")}
            />
          ),
        },
      ]}
    />
  );
};

export default FollowersListPage;

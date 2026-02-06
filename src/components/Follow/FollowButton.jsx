import { Button, message } from "antd";
import { useEffect, useState } from "react";
import {
  followUser,
  unfollowUser,
  checkFollowing,
} from "../../services/followApi";
import axios from "axios";
import Cookies from "js-cookie";

const FollowButton = ({
  profileUser,
  setProfileUser,
  currentUserId,
  targetUserId,
}) => {
  console.log("FollowButton profileUser", profileUser);

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const handleFollowToggle = async () => {
    if (profileUser.following) {
      await axios.delete(
        `https://bookhub-postgress.onrender.com/api/follow/${profileUser.userId}`,
        { headers },
      );
      message.info(`Bạn đã bỏ theo dõi ${profileUser.username}`);
    } else {
      await axios.post(
        `https://bookhub-postgress.onrender.com/api/follow/${profileUser.userId}`,
        {},
        { headers },
      );
      message.success(`Bạn đã theo dõi ${profileUser.username}`);
    }

    setProfileUser((prev) => ({
      ...prev,
      following: !prev.following,
      followersCount: prev.following
        ? prev.followersCount - 1
        : prev.followersCount + 1,
    }));
  };

  if (currentUserId === targetUserId) return null;

  return (
    <Button
      type={profileUser.following ? "default" : "primary"}
      danger={profileUser.following}
      onClick={handleFollowToggle}
    >
      {profileUser.following ? "Bỏ theo dõi" : "Theo dõi"}
    </Button>
  );
};

export default FollowButton;

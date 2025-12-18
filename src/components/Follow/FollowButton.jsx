import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { followUser, unfollowUser, checkFollowing } from "@/api/followApi";

const FollowButton = ({ currentUserId, targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUserId || !targetUserId) return;

    checkFollowing(currentUserId, targetUserId).then((res) => {
      setIsFollowing(res.data);
    });
  }, [currentUserId, targetUserId]);

  const toggleFollow = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowUser(targetUserId);
        message.success("Đã bỏ theo dõi");
      } else {
        await followUser(targetUserId);
        message.success("Đã theo dõi");
      }
      setIsFollowing(!isFollowing);
    } catch {
      message.error("Thao tác thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (currentUserId === targetUserId) return null;

  return (
    <Button
      type={isFollowing ? "default" : "primary"}
      loading={loading}
      onClick={toggleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;

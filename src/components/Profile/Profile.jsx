import { Typography, Space, Flex } from "antd";
import { useMemo, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Avatar from "../Avatar/Avatar";
const { Text } = Typography;

// eslint-disable-next-line react/prop-types
function Profile({ token, setUser, userImage, username }) {
  const profile = useMemo(() => jwtDecode(token), [token]);
  console.log("profile", profile);
  useEffect(() => {
    setUser(profile.sub.slice(0, 1).toUpperCase());
  }, [profile.sub, setUser, username]);
  console.log("username111", userImage);
  return (
    <>
      <Space>
        <Flex justify="center" align="center" style={{ height: "40px" }}>
          <Avatar size={40} srcImage={userImage} alt="User Avatar" />
          <Text
            style={{
              marginLeft: "8px",
              color: "#333",
              maxHeight: "32px",
              minWidth: "80px",
            }}
          >
            {username}
          </Text>
        </Flex>
      </Space>
    </>
  );
}
export default Profile;

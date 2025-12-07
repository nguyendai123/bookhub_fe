import { Typography, Space } from "antd";
import { useMemo, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Avatar from "../Avatar/Avatar";
const { Text } = Typography;

// eslint-disable-next-line react/prop-types
function Profile({ token, setUser, userImage }) {
  const profile = useMemo(() => jwtDecode(token), [token]);
  console.log("profile", profile);
  useEffect(() => {
    setUser(profile.sub.slice(0, 1).toUpperCase());
  }, [profile.sub, setUser]);

  return (
    <>
      <Space>
        <Avatar srcImage={userImage} />
        <Text style={{ color: "#333", textAlign: "center" }}>
          {profile.sub.toUpperCase()}
        </Text>
      </Space>
    </>
  );
}
export default Profile;

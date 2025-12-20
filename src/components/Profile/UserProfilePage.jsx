import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FollowButton from "../Follow/FollowButton";
import Cookies from "js-cookie";

const UserProfilePage = ({ currentUser }) => {
    const { userId } = useParams(); // 👈 từ URL
    console.log("UserProfilePage userId từ URL:", userId);
    const [profileUser, setProfileUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}/profile`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            }
        },
        ).then((res) => {
            setProfileUser(res.data);
        });
    }, [userId]);

    if (!profileUser) return null;

    return (
        <>
            <h2>{profileUser.username}</h2>

            {/* FOLLOW BUTTON */}
            {currentUser.userId !== profileUser.userId && (
                <FollowButton
                    profileUser={profileUser}
                    setProfileUser={setProfileUser}
                    currentUserId={currentUser.userId}
                    targetUserId={profileUser.userId}
                />
            )}
        </>
    );
};

export default UserProfilePage;

import { useParams } from "react-router-dom";
import UserProfilePage from "../Profile/UserProfilePage";

const UserProfileWrapper = ({ currentUser }) => {
  const { userId } = useParams();
  return <UserProfilePage key={userId} currentUser={currentUser} />;
};

export default UserProfileWrapper;

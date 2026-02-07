import { useState } from "react";
import "./PostCard.css";
import { Progress } from "antd";
import Destination from "../../assets/Destination";
import { Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AccountHeader from "../AccountHeader/AccountHeader";
import { Input } from "antd";
import Cookies from "js-cookie";
import PostCardItem from "./PostCardItem/PostCardItem";

const { TextArea } = Input;
const items = [
  {
    label: <a href="#">Private</a>,
    key: "account",
    icon: <FontAwesomeIcon icon={faLock} />,
  },
];
function PostCard({ data, load, setLoad, isError, isLoading }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [currentValue, setCurrentValue] = useState(2);
  const [openComment, setOpenComment] = useState(false);
  const [post, setPost] = useState({});
  const [userLike, setUserLike] = useState(false);
  const handleClickComment = () => {
    setOpenComment(!openComment);
  };
  console.log("dât123", data);
  const jwtToken = Cookies.get("jwt_token");

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const handleClickEditSave = (postID) => {
    // Assuming the postID, updatedPost, and result are defined and available

    const url = `http://localhost:8080/api/posts/${postID}`;

    // Check for validation errors
    // The request payload and headers
    const updatedPost = {
      content: value,
      rating: currentValue,
    };
    const data = updatedPost;

    axios
      .put(url, data, { headers })
      .then((response) => {
        console.log(response.data); // Handle success response
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
    setLoad(!load);
  };
  const handleDeletePost = (postID) => {
    const url = `http://localhost:8080/api/posts/${postID}`;

    // DELETE request using axios with error handling
    axios
      .delete(url, { headers })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoad(!load);
  };

  return (
    <>
      {console.log("item123 ", data)}
      {data?.content?.map((item) => (
        <div key={"id" + item.postId}>
          {console.log("item1234* ", item)}
          <PostCardItem
            isError={isError}
            isLoading={isLoading}
            data={data?.content}
            item={item}
            load={load}
            setLoad={setLoad}
            setOpen={setOpen}
            setValue={setValue}
            setCurrentValue={setCurrentValue}
            setPost={setPost}
          />
        </div>
      ))}
    </>
  );
}

export default PostCard;

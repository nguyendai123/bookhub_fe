import { useState } from "react";
import Avatar from "../../../Avatar/Avatar";
import axios from "axios";
import Cookies from "js-cookie";

const CommentAddForm = ({ postId, avatarUrl, onCommentAdded }) => {
  const [content, setContent] = useState("");
  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting comment:", content);
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `http://localhost:8080/api/comments/post/${postId}`,
        {
          content: content,
          parentId: null,
        },
        {
          headers,
        },
      );

      // clear input
      setContent("");

      // gọi callback để reload comment list
      if (onCommentAdded) onCommentAdded(res.data);
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <form className="comment-author-add" onSubmit={handleSubmit}>
      {/* avatar */}
      <Avatar srcImage={avatarUrl} />

      {/* input */}
      <input
        type="text"
        className="comment-input-add"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
};

export default CommentAddForm;

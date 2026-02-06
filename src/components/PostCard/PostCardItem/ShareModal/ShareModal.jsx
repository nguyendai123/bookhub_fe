import { Modal, Input, Button, Image } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ShareModal = ({ open, onClose, post, onShared }) => {
  const [content, setContent] = useState("");
  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const handleShare = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/share",
        {
          postId: post.postId,
          content: content,
          translatedText: null,
          imageUrl: post?.imageUrl,
          hashtags: [],
        },
        {
          headers,
        },
      );

      onShared(res.data);
      onClose();
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={600} centered>
      <h3>Chia sẻ bài viết</h3>

      {/* Bài viết gốc */}
      <div style={{ padding: 10, background: "#f7f7f7", borderRadius: 8 }}>
        <p>
          <b>{post?.user?.username}</b>
        </p>
        <p>{post?.content}</p>

        {post?.imageUrl && (
          <Image
            src={`http://localhost:8080${post?.imageUrl}`}
            width={"100%"}
            style={{ borderRadius: 8 }}
          />
        )}
      </div>

      {/* Người dùng nhập nội dung */}
      <Input.TextArea
        rows={4}
        placeholder="Bạn đang nghĩ gì?"
        style={{ marginTop: 15 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Nút share */}
      <Button
        type="primary"
        block
        style={{ marginTop: 15 }}
        onClick={handleShare}
      >
        Share Post
      </Button>
    </Modal>
  );
};

export default ShareModal;

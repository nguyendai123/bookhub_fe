import { Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCardItem from "../PostCardItem";

export default function OriginalPostModal({
  open,
  onClose,
  post,
  data,
  setLoad,
}) {
  if (!post) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      destroyOnHidden
    >
      <PostCardItem
        isError={false}
        isModal={true}
        setLoad={setLoad}
        data={"data"}
        item={post}
      />
    </Modal>
  );
}

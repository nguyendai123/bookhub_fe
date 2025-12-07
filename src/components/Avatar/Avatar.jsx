import React from "react";
import moment from "moment";
const Avatar = ({ item, srcImage }) => {
  return (
    <div className="avatar">
      <img
        src={srcImage ?? "https://source.unsplash.com/collection/happy-people"}
        alt="avatar"
        className="avatar-images"
        style={{ width: 38, height: 38, objectFit: "cover" }}
      />

      <div className="author-des-post">
        <p className="author-name">{item?.user.username}</p>
        <span className="post-createat">
          {item &&
            moment(item?.createDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </span>
      </div>
    </div>
  );
};

export default Avatar;

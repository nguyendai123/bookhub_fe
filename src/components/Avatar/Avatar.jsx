import React from "react";
import moment from "moment";
import "moment/locale/vi"; // nạp tiếng Việt



const Avatar = ({ item, srcImage }) => {
  const time = moment(item?.updatedAt).fromNow();
  moment.locale("vi");
  return (
    <div className="avatar">
      {console.log("srcImage avatar", srcImage, " item", item)}
      <img
        src={srcImage ?? "https://source.unsplash.com/collection/happy-people"}
        alt="avatar"
        className="avatar-images"
        style={{ width: 38, height: 38, objectFit: "cover" }}
      />

      <div className="author-des-post">
        <p className="author-name">{item?.userName}</p>
        <span className="post-createat">
          {item &&
            <span>
              {moment(item?.updatedAt).fromNow().replace(/^\w/, c => c.toUpperCase())}
            </span>}
        </span>
      </div>
    </div>
  );
};

export default Avatar;

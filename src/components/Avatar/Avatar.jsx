import React from "react";
import moment from "moment";
import "moment/locale/vi"; // nạp tiếng Việt
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Avatar = ({ item, srcImage }) => {
  moment.locale("vi");
  const navigate = useNavigate();
  return (
    <div
      className="avatar"
      onClick={() =>
        navigate(`/profile/${item?.userId ?? Cookies.get("user_id")}`)
      }
    >
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
          {item && (
            <span>
              {item?.updatedAt &&
                moment(item?.updatedAt)
                  .fromNow()
                  .replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
export default Avatar;

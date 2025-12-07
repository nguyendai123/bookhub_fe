import React from "react";

const LikeCount = ({ item, userLike }) => {
  return (
    <div style={{ marginTop: "4px" }}>
      {" "}
      &nbsp;
      {item.likeCount > 0 ? (
        <>
          {userLike && <span>You and </span>}
          {item.likeCount} {userLike && <span> others </span>}
        </>
      ) : (
        <>{userLike && <span>You</span>}</>
      )}
    </div>
  );
};

export default LikeCount;

import React from "react";

const LikeCount = ({ item, userLike }) => {
  console.log("LikeCount item", item, " userLike", userLike);
  return (
    <div
      style={{
        paddingBottom: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      &nbsp;&nbsp;&nbsp;
      {(() => {
        const likes = item?.likesCount ?? 0;

        if (likes === 0 && !userLike) return null;
        if (likes === 0 && userLike) return "You";

        if (userLike) {
          return `You and ${likes} others`;
        }

        return `${likes}`;
      })()}
    </div>
  );
};

export default LikeCount;

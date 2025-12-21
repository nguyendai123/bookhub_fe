import React from "react";

const LikeCount = ({ item, userLike }) => {
  return (
    // <div style={{ marginTop: "4px" }}>
    //   {" "}
    //   &nbsp;
    //   {console.log("LikeCount item", item.likesCount, " userLike", userLike)}
    //   {item?.likesCount > 0 ? (
    //     <>
    //       {userLike && <span>You and </span>}
    //       {item?.likesCount} {userLike && <span> others </span>}
    //     </>
    //   ) : (
    //     <>{userLike && <span>You</span>}</>
    //   )}
    // </div>
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

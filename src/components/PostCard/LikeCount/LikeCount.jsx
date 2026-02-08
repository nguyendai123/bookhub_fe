const LikeCount = ({ likesCount, userLike }) => {
  if (likesCount === 0 && !userLike) return null;
  if (likesCount === 0 && userLike) return " You ";

  if (userLike) {
    const others = Math.max(likesCount - 1, 0);
    return others > 0 ? ` You and ${others} others` : " You ";
  }

  return ` ${likesCount}`;
};

export default LikeCount;

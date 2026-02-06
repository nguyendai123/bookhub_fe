import Avatar from "../../../Avatar/Avatar";
import moment from "moment";

const CommentPostItem = ({ comment }) => {
  return (
    <div className="commentitem my-1">
      {/* avatar */}
      {console.log("comment comment", comment)}
      <Avatar
        item={comment.user}
        srcImage={`http://localhost:8080${comment.user.avatarUrl}`}
        alt="avatar"
        className="comment-image"
        style={{
          width: 38,
          height: 38,
          objectFit: "cover",
        }}
      />
      {/* comment text */}
      <div className="comment-text comment__input">
        {/* comment menu of author */}
        <div className="comment-author"></div>

        <div className="comment-des-body">
          <p className="comment-author-name">{comment.user.username}</p>
          <div>
            <div className="comment-des-body">
              <div>{comment.content}</div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: 4,
            fontSize: 12,
            color: "#65676b",
          }}
        >
          {moment(comment.createdAt).fromNow(true).replace("một", "1")}
        </div>
      </div>
    </div>
  );
};

export default CommentPostItem;

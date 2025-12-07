const CommentPostItem = ({ comment }) => {
  return (
    <div className="commentitem my-1">
      {/* avatar */}
      <img
        src="https://source.unsplash.com/collection/happy-people"
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
        <div className="comment-author">
          {/* icon */}
          {/* <Dropdown
           menu={{
             items,
           }}
           trigger={["click"]}
           placement="bottomRight"
         >
           <Space>
             <svg
               xmlns="http://www.w3.org/2000/svg"
               height="1em"
               viewBox="0 0 512 512"
             >
               <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
             </svg>
           </Space>
         </Dropdown> */}
        </div>

        <div>
          <p className="comment-author-name">{comment.user.username}</p>
          <div>
            <div className="comment-des-body">
              <div>{comment.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPostItem;

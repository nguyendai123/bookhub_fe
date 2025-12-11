import React from "react";
import { useState, useEffect } from "react";
import { Progress, Collapse } from "antd";
import likeicon from "../../../assets/like.svg";
import iconlike from "../../../assets/iconlike.svg";
import commenticon from "../../../assets/iconcomment.svg";
import iconshare from "../../../assets/iconshare.svg";

import moment from "moment";
import { Rate, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faLock,
  faEarthAmericas,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AccountHeader from "../../AccountHeader/AccountHeader";
import { Button, Dropdown, Modal, Space, Popover, ConfigProvider } from "antd";
import { Input, Image } from "antd";
import LikeCount from "../LikeCount/LikeCount";
import PostCardItemBookProgress from "../PostCardItemBookProgress/PostCardItemBookProgress";
import CommentPostItem from "./CommentPostItem/CommentPostItem";
import PostContent from "../PostContent/PostContent";
import Avatar from "../../Avatar/Avatar";
import CommentAddForm from "./CommentAddForm/CommentAddForm";
import ShareModal from "./ShareModal/ShareModal";
import OriginalPostModal from "./OriginalPostModal/OriginalPostModal";
import "./PostCardItem.scss"
import Cookies from "js-cookie";

const { TextArea } = Input;

const breakPoints = [
  { width: 1, itemsToShow: 3 },
  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];
const PostCardItem = ({
  isModal = false,
  isError,
  isLoading,
  data,
  item,
  load,
  setLoad,
  setOpen,
  setValue,
  setCurrentValue,
  setPost,
}) => {
  const [currentValue] = useState(2);
  const [openComment, setOpenComment] = useState(false);
  const [userLike, setUserLike] = useState(item?.isLiked);
  const [progress, setProgress] = useState({});
  const [dataCommentPost, setDataCommentPost] = useState([]);
  const [openShare, setOpenShare] = useState(false);
  const [openOriginal, setOpenOriginal] = useState(false);


  const avatarUrl = `http://localhost:8080${localStorage.getItem(
    "data_avatar"
  )}`;
  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const handleClickComment = async (postId) => {
    const _opencomment = !openComment;
    if (_opencomment) {
      const urlComment = `http://localhost:8080/api/comments/post/${postId}`;
      // Get request using axios with error handling
      await axios
        .get(urlComment, { headers })
        .then((response) => {
          console.log("comment jjj", response.data);
          setDataCommentPost(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    setOpenComment(_opencomment);
  };
  console.log("dât111", data);
  console.log("item pót item", item);
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          setOpen(true);
          setPost(item);
          setValue(item.content);
        }}
      >
        Edit Post
      </Menu.Item>
      <Menu.Item key="1" onClick={() => handleDeletePost(item.postId)}>
        Delete Post
      </Menu.Item>
    </Menu>
  );
  const handleClickEditSave = (postId) => {
    // Assuming the postId, updatedPost, and result are defined and available

    const url = `http://localhost:8080/api/posts/${postId}`;

    // Check for validation errors
    // The request payload and headers
    const updatedPost = {
      content: value,
      rating: currentValue,
    };
    const data = updatedPost;

    axios
      .put(url, data, { headers })
      .then((response) => {
        console.log(response.data); // Handle success response
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
    setLoad(!load);
  };
  const handleDeletePost = (postId) => {
    const url = `http://localhost:8080/api/posts/${postId}`;

    // DELETE request using axios with error handling
    axios
      .delete(url, { headers })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoad(!load);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("book id", item);
      const url = `http://localhost:8080/api/reading/${item.userId}/${item.bookId}`;

      await axios
        .get(url, { headers })
        .then((response) => {
          console.log("trang sach", response.data);
          setProgress(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      setLoad(!load);
    }
    fetchData();
  }, []);
  const handleClickLikePost = async (postId) => {
    // UI update trước (tối ưu UX)
    setUserLike((prev) => !prev);

    const likeUrl = `http://localhost:8080/api/like`;
    const unlikeUrl = `http://localhost:8080/api/unlike`;
    const data = {
      targetType: "POST",
      targetId: postId,
    };
    // Quyết định API theo trạng thái hiện tại (trước khi toggle)
    const apiToCall = userLike ? unlikeUrl : likeUrl;

    try {
      const res = await axios.post(apiToCall, data, { headers });

      console.log("Server:", res.data); // Like thành công!
    } catch (error) {
      console.error("Error like/unlike:", error);

      // rollback UI nếu fail
      setUserLike((prev) => !prev);
    }
  };

  return (
    <>
      {console.log(
        "data post card",
        data,
        "dfjs",
        item,
        "progress",
        progress,
        isError,
        isLoading,
        data.length
      )}

      {!isError && !isLoading && data && data.length > 0 && (
        <div className={isModal ? "post-card-modal" : "post-card"}>
          {/* author */}
          <div className="author-des">
            {/* avatar */}

            {console.log("item avatar PostCardItem", item)}
            <Avatar
              item={item}
              srcImage={`http://localhost:8080${item.userAvatar}`}
            />
            {!isModal && (<Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
              </svg>
            </Dropdown>)}
          </div>
          {/* post content */}
          <div className="post-content">
            {/* content */}
            {item.shareOf && item.originalPost && (
              <div
                className="shared-original-post"
                onClick={() => setOpenOriginal(true)}
              >
                <div className="original-post-header">
                  <img
                    src={`http://localhost:8080${item.originalPost.userAvatar}`}
                    className="avatar"
                  />
                  <span>{item.originalPost.userName}</span>
                </div>

                <div className="original-post-content">
                  {item.originalPost.content}
                </div>

                {item.originalPost.imageUrl && (
                  <img
                    src={`http://localhost:8080${item.originalPost.imageUrl}`}
                    className="original-post-image"
                    alt="original post"
                  />
                )}

                <div className="original-post-disabled-info">
                  {item.originalPost.likesCount} likes • {item.originalPost.commentsCount} comments
                </div>
              </div>
            )}


            <div>
              {console.log("item PostCardItem", item)}
              <PostContent content={item.content} />
              <div className="post-content-image-user-add">
                <Image
                  src={`http://localhost:8080${item.imageUrl}`}
                  fallback="/no-image.png"
                  alt="post image"
                  className="post-content-image-user-add-1"
                />
              </div>
              <div className="post-content-body">
                <PostCardItemBookProgress item={item} progress={progress} />
              </div>
            </div>



            {/* likes & comments */}
            <div className="post_comment">
              {/* likes */}
              <div
                className="number-like-comment"
                style={{ height: 50, zIndex: 5 }}
              >
                <div className="like-post">
                  <div className="">
                    <img src={likeicon} alt="like" />
                  </div>

                  <LikeCount item={item} userLike={userLike} />
                </div>
                <div
                  className="comment-number"
                  onClick={() => handleClickComment(item.postId)}
                >
                  {item?.commentsCount} Comment
                </div>
              </div>
              {/* comments start*/}

              <div className="comment" id="accordionExample">
                <div className="comment-item">
                  {/* comment collapse */}

                  <hr style={{ marginTop: "15px" }} />
                  {/* comment & like bar */}
                  <div className="comment-bar d-flex justify-content-around">
                    <div
                      onClick={() => handleClickLikePost(item.postId)}
                      className="dropdown-item "
                    >
                      {userLike ? (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ fontSize: "38px", color: "blue" }}
                          />
                          <span style={{ color: "blue" }}>
                            {" "}
                            &nbsp; &nbsp;Like
                          </span>
                        </>
                      ) : (
                        <>
                          <img src={iconlike} alt="like" />
                          <span> &nbsp; &nbsp;Like</span>
                        </>
                      )}
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => handleClickComment(item.postId)}
                    >
                      <img src={commenticon} alt="commenticon" />
                      <span>&nbsp; &nbsp;Comment</span>
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => setOpenShare(true)}
                    >
                      <img src={iconshare} alt="share" />
                      <span>&nbsp; &nbsp;Share</span>
                    </div>
                  </div>
                  {/* comment expand */}
                  {openComment && (
                    <div className="comment-container">
                      <hr style={{ marginBottom: "15px" }} />
                      <div className="comment-body">
                        {console.log("data comment post", dataCommentPost)}
                        {dataCommentPost?.map((comment, idx) => (
                          <div key={`comment ${idx}`}>
                            <CommentPostItem comment={comment} />
                          </div>
                        ))}
                        {/* comment 2 */}

                        {/* create comment */}
                        <CommentAddForm
                          postId={item.postId}
                          avatarUrl={avatarUrl}
                          onCommentAdded={(newComment) => {
                            // bạn có thể push vào list comments
                            setDataCommentPost((prev) => [...prev, newComment]);
                          }}
                        />

                        {/* end */}
                      </div>
                    </div>
                  )}
                  <ShareModal
                    open={openShare}
                    onClose={() => setOpenShare(false)}
                    post={item}
                    onShared={(newShare) => {
                      console.log("Shared!", newShare);
                    }}
                  />
                </div>
              </div>
              {/* end */}
            </div>
          </div>
        </div>
      )}
      <OriginalPostModal

        data={data}
        setLoad={setLoad}
        open={openOriginal}
        onClose={() => setOpenOriginal(false)}
        post={item.originalPost}
      />

    </>
  );
};

export default PostCardItem;

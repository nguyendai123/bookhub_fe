import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import PostCardItem from "../PostCard/PostCardItem/PostCardItem";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);

  // ✅ cache function
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;

    try {
      const res = await axios.get(
        `https://bookhub-postgress.onrender.com/api/users/${userId}/posts?page=${page}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        },
      );

      const newPosts = res.data.content;

      setPosts((prev) => {
        // ❗ loại bỏ post trùng id
        const existingIds = new Set(prev.map((p) => p.postId));
        const filtered = newPosts.filter((p) => !existingIds.has(p.postId));
        return [...prev, ...filtered];
      });

      setPage((prev) => prev + 1);
      setHasMore(!res.data.last);
    } catch (err) {
      console.error("Load posts error", err);
    }

    loadingRef.current = false;
  }, [userId, page, hasMore]);

  // ✅ load lần đầu / khi đổi user
  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
    loadingRef.current = false;
  }, [userId]);

  // Gọi loadMore khi page thay đổi
  useEffect(() => {
    loadMore();
  }, [page, loadMore]);

  // ✅ useMemo cho render list
  const postList = useMemo(() => {
    return posts.map((post) => (
      <PostCardItem
        key={post.postId}
        data={posts}
        item={post}
        load={null}
        setLoad={() => {}}
      />
    ));
  }, [posts]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Spin style={{ display: "block", textAlign: "center" }} />}
    >
      {postList}
    </InfiniteScroll>
  );
};

export default UserPosts;

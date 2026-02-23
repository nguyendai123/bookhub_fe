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
  const [processedPosts, setProcessedPosts] = useState([]);

  const loadingRef = useRef(false);

  // ✅ cache function
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/${userId}/posts?page=${page}&size=5`,
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

  useEffect(() => {
    const fetchOriginalPosts = async () => {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          if (post.shareOf) {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/posts/${post.shareOf}`,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
                  },
                },
              );
              const data = await res.data;

              return {
                ...post,
                originalPost: data,
              };
            } catch (err) {
              console.error("Error fetching original post:", err);
              return post;
            }
          }
          return post;
        }),
      );

      setProcessedPosts(updatedPosts);
    };

    if (posts?.length) {
      fetchOriginalPosts();
    }
  }, [posts]);

  // ✅ useMemo cho render list
  const postList = useMemo(() => {
    return processedPosts.map((post) => (
      <PostCardItem
        key={post.postId}
        data={processedPosts}
        item={post}
        load={null}
        setLoad={() => {}}
      />
    ));
  }, [processedPosts]);

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

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Home.css";
import { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import RatingBookItem from "../RatingBookItem/RatingBookItem";
import AddPostHome from "./AddPostHome/AddPostHome";
import axios from "axios";

const topRatedApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Home = () => {
  const [, setTopRatedApiStatus] = useState(topRatedApiStatuses.initial);

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/api/posts/all-feeds"; // Replace with your API endpoint
        let res = await axios.get(url, { headers });

        let listPost = res && res.content ? res.content : [];
        setData(listPost);
        console.log("Fetched data 123:", listPost);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/api/posts/all-feeds"; // Replace with your API endpoint
        let res = await axios.get(url, { headers });

        let data1 = res && res.data ? res.data : [];
        setData(data1);
        console.log("Fetched data:", data1);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [load]);

  let navigate = useNavigate();
  useEffect(() => {
    const getTopRatedBooks = async () => {
      setTopRatedApiStatus(topRatedApiStatuses.inProgress);

      const topRatedBooksApi =
        "http://localhost:8080/api/books/search?keyword=";
      let response = await axios.get(topRatedBooksApi, { headers });
      if (response.ok === true) {
        setTopRatedApiStatus(topRatedApiStatuses.success);
      } else {
        setTopRatedApiStatus(topRatedApiStatuses.failure);
      }
    };
    getTopRatedBooks();
  }, []);

  if (
    document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("jwt_token="))
  ) {
    console.log("Tồn tại khóa jwt_token trong cookies.");
  } else {
    console.log("k Tồn tại khóa jwt_token trong cookies.");
    return navigate("/login");
  }

  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="home-page-left-container">
          <h1 className="home-heading" key="title">
            Find Your Next Favorite Books?
          </h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          {/* <Input
            style={{ margin: "10px 0" }}
            type="text"
            className="input-home"
            placeholder="Tạo bài viết của bạn"
            onClick={renderNewPost}
          /> */}
          <AddPostHome load={load} setLoad={setLoad} />
          {/* p 1 */}
          <div>
            <PostCard data={data} load={load} setLoad={setLoad} />
          </div>
        </div>
        <div className="home-page-right-container">
          <div className="home-top-rated-container">
            <div className="top-rated-heading-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
            </div>
            <div className="home-rating-book">
              <RatingBookItem />
            </div>
            {/* <div className="slick-container">{renderSlider()}</div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

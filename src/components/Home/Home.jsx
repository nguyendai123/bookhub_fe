import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Home.css";
import { useEffect, useState } from "react";
import { Layout, Row, Col, Card } from "antd";
const { Content } = Layout;
import PostCard from "../PostCard/PostCard";
import RatingBookItem from "../RatingBookItem/RatingBookItem";
import AddPostHome from "./AddPostHome/AddPostHome";
import axios from "axios";
import jwtDecode from "jwt-decode";

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
    const token = Cookies.get("jwt_token");

    // Không có token
    if (!token) {
      console.log("Không tồn tại jwt_token → redirect login");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("JWT token đã hết hạn");

        // Xóa token hết hạn
        Cookies.remove("jwt_token");
        Cookies.remove("user_id");
        Cookies.remove("user_roles");
        Cookies.remove("user_name");

        navigate("/login");
        return;
      }

      console.log("Token hợp lệ → vào trang Home");
    } catch (error) {
      console.log("JWT không hợp lệ → redirect login");
      Cookies.remove("jwt_token");
      navigate("/login");
    }
  }, []);
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
      console.log("response", response);
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
      <AppHeader />
      <Layout style={{ background: "#f5f5f5" }}>
        <Content
          style={{
            width: "90%",
            maxWidth: 1600,
            margin: "0 auto",
            padding: "24px 16px",
          }}
        >
          <Row gutter={[24, 24]}>
            {/* LEFT CONTENT */}
            <Col xs={24} md={16} lg={16}>
              <div className="home-left">
                <h1 className="home-heading">
                  Tìm cuốn sách yêu thích tiếp theo của bạn?
                </h1>

                <p className="home-paragraph">
                  Bạn đã đến đúng nơi rồi. Hãy cho chúng tôi biết những tựa sách
                  hoặc thể loại bạn yêu thích trước đây, và chúng tôi sẽ đưa ra
                  cho bạn những gợi ý sâu sắc đến bất ngờ.
                </p>

                <AddPostHome load={load} setLoad={setLoad} />

                <PostCard data={data} load={load} setLoad={setLoad} />
              </div>
            </Col>

            {/* RIGHT SIDEBAR */}
            <Col xs={24} md={8} lg={8}>
              <Card
                title="Top Rated Books"
                bordered={false}
                style={{
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <RatingBookItem />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <Footer />
    </>
  );
};

export default Home;

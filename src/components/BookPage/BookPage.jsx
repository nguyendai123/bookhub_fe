import Cookies from "js-cookie";
import Slider from "react-slick";
import { useNavigate, redirect } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";

import { TailSpin } from "react-loader-spinner";
import "./BookPage.scss";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Card, Rate, Typography, Space, Flex, Input, Row } from "antd";

const { Text, Title } = Typography;

const topRatedApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  vertical: false,
  verticalSwiping: false,

  swipeToSlide: true,
  draggable: true,
  responsive: [
    { breakpoint: 1800, settings: { slidesToShow: 3 } },
    { breakpoint: 1400, settings: { slidesToShow: 2 } },
    { breakpoint: 1000, settings: { slidesToShow: 1 } },
  ],
};
const BookPage = () => {
  let navigate = useNavigate();
  const [topRatedApiStatus, setTopRatedApiStatus] = useState(
    topRatedApiStatuses.initial,
  );
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    getTopRatedBooks();
  }, []);

  const jwtToken = Cookies.get("jwt_token");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const onClickBookItem = (id) => {
    navigate(`/books/${id}`);
  };

  const getTopRatedBooks = async () => {
    setTopRatedApiStatus(topRatedApiStatuses.inProgress);

    try {
      const { data } = await axios.get("/api/books/search?keyword=", {
        headers,
      });
      console.log("Top rated books data:", data?.content);

      const updatedData = data?.content.map((eachBook) => ({
        id: eachBook.bookId,
        authorName: eachBook?.authorName,
        coverPic: eachBook.coverUrl,
        title: eachBook.title,
        rate: eachBook.avgRating,
      }));

      setTopRatedBooks(updatedData);
      setTopRatedApiStatus(topRatedApiStatuses.success);
    } catch (error) {
      setTopRatedApiStatus(topRatedApiStatuses.failure);
    }
  };

  const onClickFindBooks = () => {
    console.log("to /shelf");
    return navigate("/shelf");
  };

  /* ===================== UI PARTS ===================== */

  const RenderSliderSuccessView = () => (
    <>
      {filteredBooks.length === 0 ? (
        <div className="no-result">❌ Không tìm thấy sách phù hợp</div>
      ) : (
        <Slider {...sliderSettings}>
          {filteredBooks?.map(({ id, title, coverPic, authorName, rate }) => (
            <div key={id} style={{ padding: "0 12px" }}>
              {" "}
              {/* khoảng cách ngang */}
              <Card
                className="book-card"
                hoverable
                onClick={() => onClickBookItem(id)}
                style={{
                  width: 240,
                  height: 430,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                bodyStyle={{
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
                cover={
                  <img
                    src={`${coverPic}`}
                    alt={title}
                    style={{
                      height: 300,
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <Flex vertical gap={4} style={{ flex: 1 }}>
                  <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                    {title}
                  </Title>

                  <Text type="secondary" style={{ fontSize: 14 }}>
                    {authorName}
                  </Text>

                  <Space size={6} align="center">
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={rate}
                      style={{ fontSize: 14 }}
                    />
                    <Text>{rate}</Text>
                  </Space>
                </Flex>
              </Card>
            </div>
          ))}
        </Slider>
      )}
    </>
  );

  const RenderSliderProgressView = () => (
    <div className="loader-container">
      <TailSpin height={50} width={50} color="#6b6fcf" />
    </div>
  );

  const RenderSliderViewFailure = () => {
    return (
      <div className="top-rated-books-failure-container">
        <img
          className="top-rated-books-failure-image"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="failure view"
        />

        <p>Something went wrong. Please try again.</p>
        <button onClick={getTopRatedBooks}>Retry</button>
      </div>
    );
  };

  const renderSlider = () => {
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return <RenderSliderSuccessView />;
      case topRatedApiStatuses.inProgress:
        return <RenderSliderProgressView />;
      case topRatedApiStatuses.failure:
        return <RenderSliderViewFailure />;
      default:
        return null;
    }
  };
  const removeVietnameseTones = (str = "") =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  const filteredBooks = topRatedBooks.filter((book) => {
    const keywordNormalized = removeVietnameseTones(searchKeyword);

    const title = removeVietnameseTones(book.title);
    const author = removeVietnameseTones(book.authorName);

    return (
      title.includes(keywordNormalized) || author.includes(keywordNormalized)
    );
  });

  return (
    <>
      <AppHeader />

      <div className="book-page-bg-container">
        {/* ===== HERO ===== */}
        <section className="book-hero">
          <h1>Tìm cuốn sách yêu thích tiếp theo của bạn 📚</h1>
          <p>Khám phá hàng ngàn cuốn sách phù hợp với sở thích đọc của bạn.</p>

          {/* ===== SEARCH BAR (UI only) ===== */}
        </section>

        {/* ===== TOP RATED ===== */}
        <section className="book-top-rated-container">
          <Space className="top-rated-heading-container">
            <h2>Sách nổi bật</h2>
            <div className="book-search-bar">
              <Input
                allowClear
                size="large"
                placeholder="Tìm kiếm sách, tác giả..."
                prefix={<SearchOutlined />}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </Space>

          <div className="slick-container" margin="20px 0">
            {renderSlider()}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BookPage;

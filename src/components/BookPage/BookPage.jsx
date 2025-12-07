import Cookies from "js-cookie";
import Slider from "react-slick";
import { useNavigate, redirect } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { TailSpin } from "react-loader-spinner";
import "./BookPage.scss";
import { useEffect, useState } from "react";
import { Rate, Space } from "antd";

const topRatedApiStatuses = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const BookPage = () => {
  let navigate = useNavigate();
  const [topRatedApiStatus, setTopRatedApiStatus] = useState(
    topRatedApiStatuses.initial
  );
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  useEffect(() => {
    getTopRatedBooks();
  }, []);

  const getTopRatedBooks = async () => {
    setTopRatedApiStatus(topRatedApiStatuses.inProgress);

    const topRatedBooksApi = "http://localhost:8080/api/books/search?keyword=";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(topRatedBooksApi, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      console.log("hello", fetchedData);
      const booksList = fetchedData;
      const updatedData = booksList?.map((eachBook) => ({
        id: eachBook.bookID,
        authorName: eachBook.author,
        coverPic: eachBook.image,
        title: eachBook.title,
        rate: eachBook.rate,
      }));
      setTopRatedApiStatus(topRatedApiStatuses.success);
      setTopRatedBooks(updatedData);
    } else {
      setTopRatedApiStatus(topRatedApiStatuses.failure);
    }
  };

  const onClickRetry = () => {
    getTopRatedBooks();
  };

  const onClickFindBooks = () => {
    console.log("lll");
    return navigate("/shelf");
  };

  const RenderSliderSuccessView = () => {
    return (
      <Slider Slider {...settings}>
        {topRatedBooks?.map((eachBook) => {
          const { id, title, coverPic, authorName, rate } = eachBook;
          // const onClickedTopRatedBook = () => {
          //   redirect(`/books/${id}`);
          // };

          return (
            <div className="top-rated-book-item-container" key={id}>
              <button
                // onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-book-name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
                <Space>
                  <Rate allowHalf defaultValue={rate} disabled />
                  <span>{10}</span>
                </Space>
              </button>
            </div>
          );
        })}
      </Slider>
    );
  };

  const RenderSliderProgressView = () => {
    return (
      <div className="loader-container">
        <TailSpin color="#8284C7" height={50} width={50} />;
      </div>
    );
  };

  const RenderSliderViewFailure = () => {
    return (
      <div className="top-rated-books-failure-container">
        <img
          className="top-rated-books-failure-image"
          src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
          alt="failure view"
        />

        <p className="top-rated-books-failure-heading">
          Something Went wrong. Please try again.
        </p>
        <button
          className="top-rated-books-failure-btn"
          onClick={() => onClickRetry()}
          type="button"
        >
          Try Again
        </button>
      </div>
    );
  };

  const renderSlider = () => {
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return (
          <>
            <RenderSliderSuccessView />
          </>
        );
      case topRatedApiStatuses.inProgress:
        return (
          <>
            <RenderSliderProgressView />
          </>
        );
      case topRatedApiStatuses.failure:
        return (
          <>
            <RenderSliderViewFailure />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="book-page-bg-container">
        <h1 className="book-heading" key="title">
          Find Your Next Favorite Books?
        </h1>
        <p className="book-paragraph">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button
          className="book-find-books-btn books-responsive-btn-sm"
          type="button"
          onClick={() => onClickFindBooks()}
        >
          Find Books
        </button>
        <div>
          <div className="book-top-rated-container">
            <div className="top-rated-heading-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button
                className="book-find-books-btn books-responsive-btn-lg"
                type="button"
                onClick={() => onClickFindBooks()}
              >
                Find Books
              </button>
            </div>
            <div className="slick-container">{renderSlider()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookPage;

import React from "react";
import useFetch from "../customize/fetch";
import { Rate, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import "./TrendingBooksSection.css";
function TrendingBooksSection() {
  const navigate = useNavigate();
  const {
    data: dataBooks,
    isLoadingBooks,
    isErrorBooks,
  } = useFetch("http://localhost:8080/api/books/trending?limit=8", false);
  const onClickBookItem = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <>
      {console.log("dataBooks111", dataBooks)}
      {dataBooks?.map((item, idx) => (
        <div key={item.bookId}>
          {
            <div className="rating-book-item" style={{ margin: "0 5px" }}>
              <div className="number-book-item">0{idx + 1}</div>
              <div>
                <img
                  style={{
                    width: "140px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  src={`http://localhost:8080${item?.coverUrl}`}
                  alt="imageBook"
                  onClick={() => onClickBookItem(item.bookId)}
                  className="home-book-image-rating"
                />
              </div>
              <div className="home-book-rating-content">
                <div className="home-book-rating-des">
                  <div className="home-book-rating-name">{item?.title}</div>
                  <div className="home-book-rating-author">
                    {item?.authorName}
                  </div>
                  {/* Genres */}
                  <Space
                    size={[4, 4]}
                    wrap
                    style={{
                      width: 180,
                      fontSize: "24px",
                      marginBottom: "5px",
                    }}
                  >
                    {item?.genres?.map((g) => (
                      <Tag
                        style={{
                          fontSize: "13px",
                        }}
                        color="blue"
                        key={g.genreId}
                      >
                        {g.name}
                      </Tag>
                    ))}
                  </Space>
                </div>
                <Rate allowHalf defaultValue={item?.avgRating} disabled />
              </div>
            </div>
          }
        </div>
      ))}
    </>
  );
}

export default TrendingBooksSection;

import React from "react";
import useFetch from "../customize/fetch";
import { Rate } from "antd";
import "./RatingBookItem.css";
function RatingBookItem() {
  const {
    data: dataBooks,
    isLoadingBooks,
    isErrorBooks,
  } = useFetch("http://localhost:8080/api/books/search?keyword=", false);
  return (
    <>
      {dataBooks?.content?.map((item, idx) => (
        <div key={item.bookId}>
          {idx <= 4 && (
            <div className="rating-book-item" style={{ margin: "0 5px" }}>
              <div className="number-book-item">0{idx + 1}</div>
              <img
                style={{
                  width: "140px",
                  height: "200px",
                  borderRadius: "10px",
                }}
                src={`http://localhost:8080${item?.coverUrl}`}
                alt="imageBook"
                className="home-book-image-rating"
              />
              <div className="home-book-rating-content">
                <div className="home-book-rating-des">
                  <div className="home-book-rating-name">{item?.title}</div>
                  <div className="home-book-rating-author">
                    {item?.author?.name}
                  </div>
                </div>
                <Rate allowHalf defaultValue={item?.avgRating} disabled />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default RatingBookItem;

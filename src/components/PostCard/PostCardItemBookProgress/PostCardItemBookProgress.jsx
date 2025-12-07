import { Space, Progress, Button, Rate } from "antd";
import { useState } from "react";
import Destination from "../../../assets/Destination";
const PostCardItemBookProgress = ({
  item,
  progress,
  setPageProgressStatus,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const handleChangeProgressPage = (e) => {
    setPageNumber(e.target.value);
    setPageProgressStatus(e.target.value);
  };
  return (
    <Space>
      <img
        src={progress?.book?.image ?? item.image}
        alt="book image"
        className="post-content-image"
      />
      <div>
        <p>{item?.title}</p>
        <p>{item?.author}</p>
        <Progress
          style={{ width: "280px" }}
          percent={100}
          strokeColor={{
            "0%": "#87d068",
            "100%": "#108ee9",
          }}
        />
        <div style={{ marginBottom: "30px" }}>
          <Space>
            <span>
              {console.log("haha", progress)}
              {progress?.readPage ?? (
                <input
                  type="number"
                  value={pageNumber}
                  onChange={(e) => handleChangeProgressPage(e)}
                />
              )}
              /{item.page}
            </span>
            <span>Trang sách đã đọc</span>
          </Space>
        </div>
        <Space>
          <Button className="btn-post-content-body">
            <div className="btn-post-content-body-des">
              <Destination />
            </div>
            <div style={{ margin: "0px 10px 0 0" }}>Muốn đọc</div>
            <div style={{ margin: "0px 10px 0 0" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  d="M7.5 12L0.571797 -1.30507e-06L14.4282 -9.36995e-08L7.5 12Z"
                  fill="#6D6D6D"
                />
              </svg>
            </div>
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Rate
              allowHalf
              // defaultValue={item.book.averageRating}
              defaultValue={4}
              disabled
            />
            <div
              style={{
                width: "120px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              (10 đánh giá)
            </div>
          </div>
        </Space>
      </div>
    </Space>
  );
};

export default PostCardItemBookProgress;

import { Space, Progress, Row, Col, Button, Image, Rate } from "antd";
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
  const translateReadingStatus = (status) => {
    switch (status) {
      case "WANT_TO_READ":
        return "Muốn đọc";
      case "READING":
        return "Đang đọc";
      case "FINISHED":
        return "Đã đọc";
      default:
        return "Chưa đọc";
    }
  };

  return (
    <>
      {console.log("progress PostCardItemBookProgress", progress, " item", item)}
      <Row style={{ width: "100%" }} gutter={16}>
        {/* LEFT = 35% */}
        <Col span={12} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "180px",
            height: "240px",
            maxHeight: "100%",
            overflow: "hidden",

          }}>
            <Image
              src={`http://localhost:8080${progress?.book?.image}`}
              fallback="/no-image.png"
              alt="book image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Col>

        {/* RIGHT = 65% */}
        <Col span={12}>

          <div>
            <p>{progress?.book?.title}</p>
            <p>{progress?.book?.authorName}</p>
            <Progress
              style={{ width: "280px" }}
              percent={item?.percentDone ?? 0}
              strokeColor={{
                "0%": "#87d068",
                "100%": "#108ee9",
              }}
            />
            <div style={{ marginBottom: "30px" }}>
              <Space>
                <span>
                  {console.log("haha", progress)}
                  {progress?.readPage ?? 0}
                  /{progress?.book?.totalPages}
                </span>
                <span>Trang sách đã đọc</span>
              </Space>
            </div>
            <Space>
              <Button className="btn-post-content-body">
                <div className="btn-post-content-body-des">
                  <Destination />
                </div>
                <div style={{ margin: "0px 10px 0 0" }}>{translateReadingStatus(item?.readingStatus)}</div>

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
                  value={progress?.book?.averageRating}
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
                  ({progress?.book?.numberOfReviews} đánh giá)
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PostCardItemBookProgress;

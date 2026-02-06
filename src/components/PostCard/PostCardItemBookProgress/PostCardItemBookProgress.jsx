import {
  Space,
  Progress,
  Row,
  Col,
  Button,
  Image,
  Rate,
  InputNumber,
  Slider,
} from "antd";
import { useState } from "react";
import Destination from "../../../assets/Destination";
import { useNavigate } from "react-router-dom";
const PostCardItemBookProgress = ({
  item,
  progress,
  mode = "VIEW", // CREATE | VIEW
  onChangePage,
}) => {
  const [pageNumber, setPageNumber] = useState(
    progress?.readPage ?? item?.currentPage ?? 0
  );
  const totalPages = progress?.book?.totalPages ?? item?.totalPages;
  const handleChangeProgressPage = (e) => {
    const value = Number(e.target.value);
    setPageNumber(value);
    onChangePage?.(value); // 👈 đẩy lên cha
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
  const maxPages = progress?.book?.totalPages ?? item?.totalPages;
  const widthCh = String(maxPages ?? "").length + 2.5;
  const navigate = useNavigate();
  const onClickBookItem = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <>
      {console.log(
        "progress PostCardItemBookProgress",
        progress,
        " item",
        item
      )}
      <Row style={{ width: "100%" }} gutter={16}>
        {/* LEFT = 35% */}
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "180px",
              height: "240px",
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={`http://localhost:8080${progress?.book?.image ?? item?.coverUrl
                }`}
              fallback="/no-image.png"
              alt="book image"
              onClick={() => onClickBookItem(item.bookId)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Col>

        {/* RIGHT = 65% */}
        <Col span={12}>
          <div>
            <p>{progress?.book?.title ?? item?.title}</p>
            <p>{progress?.book?.authorName ?? item?.author?.name}</p>
            <Progress
              style={{ width: "280px" }}
              percent={
                item?.percentDone ??
                Math.min(100, Math.round((pageNumber / totalPages) * 100))
              }
              strokeColor={{
                "0%": "#87d068",
                "100%": "#108ee9",
              }}
            />
            <div style={{ marginBottom: "30px" }}>
              <Space>
                {mode === "CREATE" ? (
                  <>
                    <InputNumber
                      min={0}
                      max={maxPages}
                      value={pageNumber}
                      onChange={handleChangeProgressPage}
                      size="small"
                      controls={false} // 👈 bỏ mũi tên ↑ ↓
                      style={{
                        width: `${widthCh}ch`,
                        textAlign: "center",
                      }}
                    />

                    <span>
                      /{progress?.book?.totalPages ?? item?.totalPages}
                    </span>
                  </>
                ) : (
                  <span>
                    {progress?.readPage ?? 0}/{progress?.book?.totalPages}
                  </span>
                )}

                <span>Trang sách đã đọc</span>
              </Space>
            </div>

            <Space>
              <Button className="btn-post-content-body">
                <div className="btn-post-content-body-des">
                  <Destination />
                </div>
                <div style={{ margin: "0px 10px 0 0" }}>
                  {translateReadingStatus(item?.readingStatus)}
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
                  value={progress?.book?.averageRating ?? item?.avgRating}
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
                  ({progress?.book?.numberOfReviews ?? item?.totalReviews} đánh
                  giá)
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

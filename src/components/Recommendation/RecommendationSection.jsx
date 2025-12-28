import { Card, List, Button, Space, message, Tag, Rate } from "antd";
import { updateReadingProgress } from "../../services/readingApi";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { recommendations } from "../../services/AskAI";
const RecommendationSection = ({ setLoad }) => {
  const [data, setData] = useState([]);
  const headers = () => ({
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  });
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoad(true);
        const res = await recommendations();
        setData(res.data);
      } catch (error) {
        console.error("Lỗi lấy gợi ý AI:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Card title="📚 Gợi ý cho bạn">
      {/* <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <h3>{item.title}</h3>
              <p>Độ phù hợp: {Math.round(item.confidenceScore * 100)}%</p>
            </Card>
          </List.Item>
        )}
      /> */}

      {console.log("datadainv123", data)}

      {data?.map((item, idx) => (
        <div key={item.bookId}>
          {
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
                  {/* Genres */}
                  <Space size={[4, 4]} wrap>
                    {item?.genres?.map((g) => (
                      <Tag color="blue" key={g.genreId}>
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
    </Card>
  );
};

export default RecommendationSection;

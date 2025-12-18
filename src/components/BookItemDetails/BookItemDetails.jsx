import {
  Layout,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Divider,
  List,
  Avatar,
  Progress,
  Empty,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToShelfButton from "../AddToShelfButton/AddToShelfButton";
import ReadingTracker from "../ReadingTracker/ReadingTracker";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });
      setBook(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!book && !loading) return <Empty />;

  return (
    <Layout>
      <Content style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
        {console.log("book detail", book)}
        {book && (
          <>
            <Card>
              {/* Add button */}
              <AddToShelfButton bookId={book.bookId} />

              {/* Nếu đã có trong shelf */}
              {book.readingProgresses.map(
                (p) =>
                  p.userId == Cookies.get("user_id") && (
                    <ReadingTracker
                      bookId={book.bookId}
                      currentPage={p.currentPage}
                      totalPages={p.totalPages}
                      percentDone={p.percentDone}
                    />
                  )
              )}
            </Card>
            {/* ===== HEADER ===== */}
            <Card loading={loading}>
              <Row gutter={[24, 24]} align="top">
                <Col xs={24} sm={8} md={6}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 180,
                      margin: "0 auto",
                    }}
                  >
                    <Avatar
                      shape="square"
                      src={`http://localhost:8080${book.coverUrl}`}
                      icon={<BookOutlined />}
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "3 / 4",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={16} md={18}>
                  <Title level={2} style={{ marginBottom: 4 }}>
                    {book.title}
                  </Title>

                  <Text>
                    <UserOutlined /> {book.author.name} ({book.author.country})
                  </Text>

                  <br />
                  <Rate disabled allowHalf value={book.avgRating} />

                  <br />
                  <Text type="secondary">
                    Ngày tạo: {new Date(book.createdAt).toLocaleDateString()}
                  </Text>

                  <Divider />

                  {book.genres.map((g) => (
                    <Tag color="blue" key={g.genreId}>
                      {g.name}
                    </Tag>
                  ))}
                </Col>
              </Row>
            </Card>

            {/* ===== DESCRIPTION ===== */}
            <Card title="Mô tả" style={{ marginTop: 24 }}>
              <Paragraph>{book.description}</Paragraph>
            </Card>

            {/* ===== AUTHOR ===== */}
            <Card title="Tác giả" style={{ marginTop: 24 }}>
              <Paragraph>{book.author.bio}</Paragraph>
            </Card>

            {/* ===== MEDIA ===== */}
            <Card title="Tài nguyên" style={{ marginTop: 24 }}>
              <List
                dataSource={book.mediaAssets}
                locale={{
                  emptyText: <Empty description="Không có tài nguyên" />,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        item.type === "image" ? (
                          <FileImageOutlined />
                        ) : (
                          <FilePdfOutlined />
                        )
                      }
                      title={
                        <a href={item.fileUrl} target="_blank" rel="noreferrer">
                          {item.type.toUpperCase()}
                        </a>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* ===== CHAPTERS ===== */}
            <Card title="Danh sách chương" style={{ marginTop: 24 }}>
              <List
                dataSource={book.chapters}
                locale={{ emptyText: <Empty description="Chưa có chương" /> }}
                renderItem={(c) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`${c.chapterOrder}. ${c.chapterTitle}`}
                      description={`⏱ ${c.duration} phút`}
                    />
                    {c.audioUrl && <audio controls src={c.audioUrl} />}
                  </List.Item>
                )}
              />
            </Card>

            {/* ===== READING PROGRESS ===== */}
            <Card title="Tiến độ đọc" style={{ marginTop: 24 }}>
              {book.readingProgresses.length === 0 ? (
                <Empty description="Chưa có tiến độ" />
              ) : (
                book.readingProgresses.map((p) => (
                  <div key={p.progressId} style={{ marginBottom: 16 }}>
                    <Text>
                      {p.userId == Cookies.get("user_id")
                        ? "Bạn"
                        : "User " + p.userName}
                    </Text>
                    <Progress percent={p.percentDone} />
                  </div>
                ))
              )}
            </Card>

            {/* ===== REVIEWS ===== */}
            <Card title="Đánh giá" style={{ marginTop: 24 }}>
              {book.bookReviews.length === 0 ? (
                <Empty description="Chưa có đánh giá" />
              ) : (
                "TODO"
              )}
            </Card>

            {/* ===== HIGHLIGHTS ===== */}
            <Card title="Highlights" style={{ marginTop: 24 }}>
              {book.highlights.length === 0 ? (
                <Empty description="Chưa có highlight" />
              ) : (
                "TODO"
              )}
            </Card>

            {/* ===== QUOTES ===== */}
            <Card title="Quotes" style={{ marginTop: 24 }}>
              {book.quotes.length === 0 ? (
                <Empty description="Chưa có quote" />
              ) : (
                "TODO"
              )}
            </Card>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default BookDetail;

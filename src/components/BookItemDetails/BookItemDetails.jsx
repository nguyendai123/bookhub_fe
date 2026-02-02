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
  Empty,
  Button,
  Space,
} from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddToShelfButton from "../AddToShelfButton/AddToShelfButton";
import ReadingTracker from "../ReadingTracker/ReadingTracker";
import BookPdfReader from "../BookItemDetails/BookPdfReader";
import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import AISummarySection from "../BookSummaryAI/AISummarySection";
import AIChatPage from "../AIChatPage/AIChatPage";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import "./BookItemDetails.css";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("jwt_token")}` },
      });
      setBook(res.data);
    } finally {
      setLoading(false);
    }
  };

  if (!book && !loading) return <Empty />;



  return (
    <>
      <AppHeader />

      <Content className="book-page">
        {book && (
          <>
            {/* ================= HEADER ================= */}


            {/* ================= MAIN READING AREA ================= */}
            <div className="reading-layout">

              {/* ===== LEFT: READER ===== */}
              <div className="reader-section">
                <Card className="book-header" loading={loading}>
                  <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} sm={6} md={5}>
                      <Avatar
                        shape="square"
                        src={`http://localhost:8080${book.coverUrl}`}
                        icon={<BookOutlined />}
                        className="book-cover"
                      />
                    </Col>

                    <Col xs={24} sm={18} md={19}>
                      <Title level={2}>{book.title}</Title>
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

                      <Space wrap>
                        {book.genres.map((g) => (
                          <Tag color="blue" key={g.genreId}>{g.name}</Tag>
                        ))}
                      </Space>

                      <Divider />

                      <Space>
                        <AddToShelfButton bookId={book.bookId} />
                        <Button type="primary" onClick={() => setChatOpen(true)}>
                          💬 Chat AI về sách
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <BookPdfReader bookId={book.bookId} chapterId={1} />
                {/* ⭐ ĐÁNH GIÁ */}
                <Card title="⭐ Đánh giá" className="info-card">
                  {book.bookReviews.length === 0 ? <Empty /> : "TODO"}
                </Card>

                {/* 💬 QUOTES */}
                <Card title="💬 Quotes" className="info-card">
                  {book.quotes.length === 0 ? <Empty /> : "TODO"}
                </Card>
              </div>

              {/* ===== RIGHT: INFO PANEL (CARD LAYOUT) ===== */}
              <div className="info-panel">
                {/* 👤 TÁC GIẢ */}
                <Card title="✍️ Tác giả" className="info-card">
                  <Paragraph>{book.author.bio}</Paragraph>
                </Card>

                {/* 📝 MÔ TẢ */}
                <Card title="📝 Mô tả" className="info-card">
                  <Paragraph>{book.description}</Paragraph>
                </Card>

                {/* 📘 TÓM TẮT */}
                <Card title="📘 Tóm tắt sách" className="info-card">
                  <AISummarySection bookId={book.bookId} />
                </Card>

                {/* 📑 TÓM TẮT TỪNG CHƯƠNG */}
                <Card title="📑 Tóm tắt từng chương" className="info-card">
                  {book.chapters?.map((c) => (
                    <div key={c.chapterId} className="chapter-summary">
                      <b>{c.chapterOrder}. {c.chapterTitle}</b>
                      <AISummarySection
                        bookId={book.bookId}
                        chapterId={c.chapterId}
                      />
                    </div>
                  ))}
                </Card>

                {/* 📊 TIẾN ĐỘ ĐỌC */}
                <Card title="📊 Tiến độ đọc" className="info-card">
                  <h4>Tiến độ của bạn</h4>
                  {book.readingProgresses
                    .filter(p => p.userId == Cookies.get("user_id"))
                    .map((p) => (
                      <ReadingTracker key={p.progressId} {...p} />
                    ))}

                  <Divider />

                  <h4>Tiến độ bạn bè theo dõi</h4>
                  {book.readingProgresses
                    .filter(p => p.userId != Cookies.get("user_id"))
                    .length === 0 ? (
                    <Empty description="Chưa có bạn bè đọc sách này" />
                  ) : (
                    book.readingProgresses
                      .filter(p => p.userId != Cookies.get("user_id"))
                      .map((p) => (
                        <ReadingTracker key={p.progressId} {...p} />
                      ))
                  )}
                </Card>
              </div>
            </div>
          </>
        )}
      </Content>

      {/* ================= AI CHAT SIDEBAR ================= */}
      {chatOpen && (
        <div className="ai-chat-sidebar">
          <div className="ai-chat-header">
            📚 Trợ lý đọc sách AI
            <Button type="text" onClick={() => setChatOpen(false)}>✖</Button>
          </div>
          <AIChatPage bookId={book.bookId} />
        </div>
      )}

      <Footer />
    </>
  );
}
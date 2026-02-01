import { Button, Card, Spin, Typography } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const { Paragraph } = Typography;
import { summarizeChapter } from "../../services/AskAI";
export default function AISummarySection({ bookId, chapterId }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const headers = () => ({
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  });
  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await summarizeChapter({
        bookId,
        chapterId,
        type: chapterId ? "CHAPTER" : "BOOK",
        lang: "vi",
      });

      setSummary(res.data);
    } finally {
      setLoading(false);
    }
  };
  const cleanText = (text) => {
    if (!text) return "";

    return text
      .replace(/\\"/g, '"') // \" -> "
      .replace(/\\n/g, " ") // xuống dòng escape -> space
      .replace(/\s+/g, " ") // nhiều khoảng trắng -> 1 khoảng trắng
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "") // bỏ ký tự lạ unicode
      .trim();
  };

  return (
    <Card title="📘 Tóm tắt AI">
      <Button type="primary" onClick={generateSummary}>
        Tạo tóm tắt
      </Button>

      {loading && <Spin />}

      {summary && (
        <Paragraph style={{ marginTop: 16 }}>
          {cleanText(summary.summaryText)}
        </Paragraph>
      )}
    </Card>
  );
}

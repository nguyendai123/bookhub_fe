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
      // const res = await axios.post(
      //   "http://localhost:8080/api/ai/summary",
      //   {
      //     bookId,
      //     chapterId,
      //     type: chapterId ? "CHAPTER" : "BOOK",
      //     lang: "vi",
      //   },
      //   { headers: headers() }
      // );
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

  return (
    <Card title="📘 Tóm tắt AI">
      <Button type="primary" onClick={generateSummary}>
        Tạo tóm tắt
      </Button>

      {loading && <Spin />}

      {summary && (
        <Paragraph style={{ marginTop: 16 }}>{summary.summaryText}</Paragraph>
      )}
    </Card>
  );
}

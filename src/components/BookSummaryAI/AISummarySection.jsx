import { Button, Card, Spin, Typography, Select } from "antd";
import { useState } from "react";
import { summarizeChapter } from "../../services/AskAI";

const { Paragraph } = Typography;
const { Option } = Select;

export default function AISummarySection({ bookId, chapterId }) {
  const [loading, setLoading] = useState(false);
  const [summaryMap, setSummaryMap] = useState({}); // 👈 cache theo ngôn ngữ
  const [lang, setLang] = useState("en");

  const fetchSummary = async (selectedLang) => {
    setLoading(true);
    try {
      const res = await summarizeChapter({
        bookId,
        chapterId,
        type: chapterId ? "CHAPTER" : "BOOK",
        lang: selectedLang,
      });

      setSummaryMap((prev) => ({
        ...prev,
        [selectedLang]: res.data, // lưu theo key ngôn ngữ
      }));
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = () => {
    if (!summaryMap[lang]) {
      fetchSummary(lang); // chỉ gọi nếu chưa có
    }
  };

  const handleLangChange = (value) => {
    setLang(value);

    // Nếu đã có summary ngôn ngữ này → không gọi API
    if (!summaryMap[value]) {
      fetchSummary(value);
    }
  };

  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/\\"/g, '"')
      .replace(/\\n/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "")
      .trim();
  };

  const currentSummary = summaryMap[lang];

  return (
    <Card
      title="📘 Tóm tắt AI"
      extra={
        <Select value={lang} onChange={handleLangChange} style={{ width: 128 }}>
          <Option value="en">English</Option>
          <Option value="vi">Tiếng Việt</Option>
        </Select>
      }
    >
      <Button type="primary" onClick={generateSummary}>
        Tạo tóm tắt
      </Button>

      {loading && <Spin style={{ marginLeft: 12 }} />}

      {currentSummary && (
        <Paragraph style={{ marginTop: 16 }}>
          {cleanText(currentSummary.summaryText)}
        </Paragraph>
      )}
    </Card>
  );
}

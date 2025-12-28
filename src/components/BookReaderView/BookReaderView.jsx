import { Card, Tooltip, Tag } from "antd";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { highlightText } from "../../services/AskAI";
const BookReaderView = ({ bookId, chapterId, content }) => {
  const [highlights, setHighlights] = useState([]);
  const headers = () => ({
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  });
  const handleMouseUp = async () => {
    const selection = window.getSelection();
    const text = selection.toString();
    if (!text) return;

    // const res = await axios.post(
    //   "http://localhost:8080/api/ai/highlight",
    //   {
    //     bookId,
    //     chapterId,
    //     text,
    //     position: selection.anchorOffset,
    //   },
    //   { headers: headers() }
    // );
    const res = await highlightText({
      bookId,
      chapterId,
      text,
      position: selection.anchorOffset,
    });

    setHighlights((prev) => [...prev, res.data]);
    selection.removeAllRanges();
  };

  return (
    <Card onMouseUp={handleMouseUp}>
      <p>{content}</p>

      <div style={{ marginTop: 24 }}>
        {highlights.map((h) => (
          <Card key={h.highlightId} size="small" style={{ marginBottom: 8 }}>
            <b>"{h.text}"</b>
            <div>
              <Tag color="blue">{h.sentiment}</Tag>
              {h.keywords.map((k) => (
                <Tag key={k}>{k}</Tag>
              ))}
            </div>
            <i>{h.aiSummary}</i>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default BookReaderView;

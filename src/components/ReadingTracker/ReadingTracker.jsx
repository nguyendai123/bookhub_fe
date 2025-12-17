import { Progress, InputNumber, Button, Space, message } from "antd";
import { updateReadingProgress } from "../../services/readingApi";
import { useState, useEffect } from "react";

const ReadingTracker = ({ bookId, currentPage, totalPages, percentDone }) => {
  const [page, setPage] = useState(currentPage || 0);
  const [percent, setPercent] = useState(percentDone || 0);
  const [loading, setLoading] = useState(false);

  // Sync khi prop thay đổi (ví dụ reload post)
  useEffect(() => {
    setPage(currentPage || 0);
    setPercent(percentDone || 0);
  }, [currentPage, percentDone]);

  const handleUpdate = async () => {
    if (page === currentPage) return; // không đổi thì thôi
    try {
      setLoading(true);

      await updateReadingProgress({
        bookId,
        currentPage: page,
        device: "WEB",
      });

      // 👉 UPDATE NGAY PROGRESS
      const newPercent = totalPages
        ? Math.min(100, Math.round((page / totalPages) * 100))
        : 0;

      setPercent(newPercent);

      message.success("Đã cập nhật tiến độ đọc");
    } catch (e) {
      message.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Progress percent={percent} />

      <Space>
        <span>Trang hiện tại:</span>
        <InputNumber
          min={0}
          max={totalPages}
          value={page}
          onChange={(v) => setPage(Math.min(v, totalPages))}
          onPressEnter={handleUpdate}
        />
        <span>/ {totalPages}</span>
        <Button loading={loading} onClick={handleUpdate}>
          Lưu
        </Button>
      </Space>
    </Space>
  );
};

export default ReadingTracker;

import { Button, Dropdown, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { addToShelf } from "../../services/readingApi";

const AddToShelfButton = ({ bookId, onSuccess }) => {
  const handleAdd = async (status) => {
    console.log("Adding book to shelf with status:", status, "bookId:", bookId);
    try {
      await addToShelf({
        bookId,
        status,
        currentPage: status === "READING" ? 1 : 0,
      });

      message.success("Đã thêm sách vào giá sách");
      onSuccess?.();
    } catch (e) {
      message.error("Không thể thêm sách");
    }
  };

  const items = [
    { key: "WANT_TO_READ", label: "📌 Muốn đọc" },
    { key: "READING", label: "📖 Đang đọc" },
    { key: "FINISHED", label: "✅ Đã đọc" },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => handleAdd(key),
      }}
    >
      <Button type="primary" icon={<BookOutlined />}>
        Thêm vào giá sách
      </Button>
    </Dropdown>
  );
};

export default AddToShelfButton;

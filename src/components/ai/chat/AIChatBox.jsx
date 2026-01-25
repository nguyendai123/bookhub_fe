import { Input, Button, Spin } from "antd";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

const AIChatBox = ({ messages, onSend, loading }) => {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* 🔽 Scroll ở đây */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          background: "#fafafa",
        }}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}
        {loading && <Spin />}
      </div>

      {/* 🔽 Input cố định */}
      <div
        style={{
          display: "flex",
          padding: 16,
          borderTop: "1px solid #f0f0f0",
          background: "#fff",
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={submit}
          placeholder="Hỏi AI về nội dung sách..."
        />
        <Button type="primary" onClick={submit} style={{ marginLeft: 8 }}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default AIChatBox;

import { Input, Button, Spin } from "antd";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import "./AIChatBox.scss";

const AIChatBox = ({ messages, onSend, loading }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const submit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  // 👉 Tự cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-wrapper">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} time={m.time} />
        ))}
        {loading && <Spin style={{ margin: "12px 0" }} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={submit}
          placeholder="Hỏi AI về nội dung sách..."
          size="large"
        />
        <Button type="primary" onClick={submit} size="large">
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default AIChatBox;

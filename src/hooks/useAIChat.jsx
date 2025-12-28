import { useState } from "react";
import { askAI } from "../services/AskAI";

export default function useAIChat(bookId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question, context) => {
    setLoading(true);
    try {
      const res = await askAI({ bookId, question, context });

      setMessages((prev) => [
        ...prev,
        { role: "user", text: question },
        { role: "ai", text: res.data.answer },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}

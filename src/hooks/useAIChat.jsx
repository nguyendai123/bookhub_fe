// import { useState } from "react";
// import { askAI } from "../services/AskAI";

// export default function useAIChat(bookId) {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (question, context) => {
//     setLoading(true);
//     try {
//       const res = await askAI({ bookId, question, context });

//       setMessages((prev) => [
//         ...prev,
//         { role: "user", text: question },
//         { role: "ai", text: res.data.answer },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { messages, sendMessage, loading };
// }
import { useEffect, useState } from "react";
import { askAI } from "../services/AskAI";
import { getChatHistory } from "../services/AskAI";

export default function useAIChat(bookId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load history khi mở trang
  useEffect(() => {
    if (!bookId) return;

    getChatHistory(bookId).then((res) => {
      const historyMessages = [];
      console.log("Chat history:", res.data);
      res.data.forEach((item) => {
        historyMessages.push(
          { role: "user", text: item.question, time: item.createdAt },
          { role: "ai", text: item.answer, time: item.createdAt },
        );
      });

      setMessages(historyMessages);
    });
  }, [bookId]);

  const sendMessage = async (question, context) => {
    setLoading(true);
    try {
      const res = await askAI({ bookId, question, context });

      setMessages((prev) => [
        ...prev,
        { role: "user", text: question, time: new Date().toISOString() },
        { role: "ai", text: res.data.answer, time: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}

import { Layout, Card } from "antd";
import { useParams } from "react-router-dom";
import useAIChat from "../../hooks/useAIChat";
import AIChatBox from "../../components/ai/chat/AIChatBox";
import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";

const { Content } = Layout;

const AIChatPage = ({ bookId }) => {
  console.log("bookId in AIChatPage:", bookId);
  const { messages, sendMessage, loading } = useAIChat(bookId);

  return (
    // <Layout style={{ minHeight: "100vh" }}>

    //   <Content
    //     style={{
    //       flex: 1,
    //       display: "flex",
    //       justifyContent: "center",
    //       padding: "24px 16px",
    //       overflow: "hidden",
    //     }}
    //   >
    //     <Card
    //       title="💬 Chat AI về sách"
    //       style={{
    //         width: "100%",
    //         maxWidth: 900,
    //         height: "100%",
    //         display: "flex",
    //         flexDirection: "column",
    //       }}
    //       bodyStyle={{
    //         flex: 1,
    //         padding: 0,
    //         overflow: "hidden",
    //       }}
    //     >
    //       <AIChatBox
    //         messages={messages}
    //         loading={loading}
    //         onSend={(q) =>
    //           sendMessage(q, {
    //             bookTitle: "Atomic Habits",
    //             summaries: [],
    //             highlights: [],
    //           })
    //         }
    //       />
    //     </Card>
    //   </Content>

    // </Layout>
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AIChatBox
        messages={messages}
        loading={loading}
        onSend={(q) =>
          sendMessage(q, {
            bookTitle: "Atomic Habits",
            summaries: [],
            highlights: [],
          })
        }
      />
    </div>
  );
};

export default AIChatPage;

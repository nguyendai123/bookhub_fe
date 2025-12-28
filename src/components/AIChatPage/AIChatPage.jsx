import { Layout, Card } from "antd";
import { useParams } from "react-router-dom";
import useAIChat from "../../hooks/useAIChat";
import AIChatBox from "../../components/ai/chat/AIChatBox";
import AppHeader from "../Header/Header";
import Footer from "../Footer/Footer";

const { Content } = Layout;

const AIChatPage = () => {
  const { bookId } = useParams();
  const { messages, sendMessage, loading } = useAIChat(bookId);

  return (
    <>
      <AppHeader />
      <Layout>
        <Content style={{ maxWidth: 900, margin: "24px auto" }}>
          <Card title="💬 Chat AI về sách" style={{ height: "80vh" }}>
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
          </Card>
        </Content>
      </Layout>
      <Footer />
    </>
  );
};

export default AIChatPage;

import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

import "./App.css";
import Register from "./components/Register/Register";
import BookItemDetails from "./components/BookItemDetails/BookItemDetails";
import BookPage from "./components/BookPage/BookPage";
import AdminPage from "./components/AdminPage/AdminPage";
import BookShelves from "./components/BookShelves/BookShelves";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import FollowButton from "./components/Follow/FollowButton";
import UserProfilePage from "./components/Profile/UserProfilePage";
import {
  Typography,
  Row,
  Col,
  Card,
  Avatar,
  Space,
  ConfigProvider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import NotificationListener from "./components/Notification/NotificationListener";
import { NotificationProvider } from "./components/contexts/NotificationContext";
import AIChatPage from "./components/AIChatPage/AIChatPage";
import UserProfileWrapper from "./components/UserProfileWrapper/UserProfileWrapper";

const App = () => {
  const token = Cookies.get("jwt_token");
  const currentUser = token ? jwtDecode(token) : null;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 18,
        },
      }}
      className="App"
    >
      <NotificationProvider>
        {currentUser && (
          <NotificationListener userId={Cookies.get("user_id")} token={token} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookItemDetails />} />
          <Route path="/ratings" element={<BookPage />} />
          <Route path="/shelf" element={<BookShelves />} />
          <Route path="/ai/chat/:bookId" element={<AIChatPage />} />
          <Route
            path="/profile/:userId"
            element={<UserProfileWrapper currentUser={currentUser} />}
          />
        </Routes>
      </NotificationProvider>
    </ConfigProvider>
  );
};

export default App;

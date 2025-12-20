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

const App = () => {
  const token = Cookies.get("jwt_token");
  const currentUser = token ? jwtDecode(token) : null;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/:id" element={<BookItemDetails />} />
        <Route path="/ratings" element={<BookPage />} />
        <Route path="/shelf" element={<BookShelves />} />

        {/* ✅ route động */}
        <Route
          path="/profile/:userId"
          element={<UserProfilePage currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;

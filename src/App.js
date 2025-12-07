import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

import "./App.css";
import Register from "./components/Register/Register";
import BookItemDetails from "./components/BookItemDetails/BookItemDetails";
import BookPage from "./components/BookPage/BookPage";
import GroupPage from "./components/GroupPage/GroupPage";
import AdminPage from "./components/AdminPage/AdminPage";
import BookShelves from "./components/BookShelves";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="login" exact element={<Login />} />
        <Route path="register" exact element={<Register />} />
        <Route path="/books/:id" exact element={<BookItemDetails />} />
        <Route path="/ratings" element={<BookPage />} />
        <Route path="/shelf" element={<BookShelves />} />
        <Route path="/genres" element={<BookPage />} />
        <Route path="/favorites" element={<BookPage />} />
        <Route path="/authors" element={<BookPage />} />
        <Route path="/books" exact element={<BookPage />} />
      </Routes>
    </div>
  );
};

export default App;

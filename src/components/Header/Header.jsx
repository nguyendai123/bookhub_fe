import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";
import { Input, Menu, Space, Button } from "antd";
const { Search } = Input;
import "./Header.css";
import { useState } from "react";
import Profile from "../Profile/Profile";
const items = [
  {
    label: (
      <Link className="link" to="/">
        Home
      </Link>
    ),
    key: "/",
  },
  {
    label: (
      <Link className="link" to="/ratings">
        Ratings
      </Link>
    ),
    key: "/ratings",
  },
  {
    label: (
      <Link className="link" to="/shelf">
        Bookshelves
      </Link>
    ),
    key: "/shelf",
  },
  {
    label: (
      <Link className="link" to="/genres">
        Genres
      </Link>
    ),
    key: "/genres",
  },

  {
    label: (
      <Link className="link" to="/authors">
        Authors
      </Link>
    ),
    key: "/authors",
  },
  {
    label: (
      <Link className="link" to="/groups">
        Group
      </Link>
    ),
    key: "/groups",
  },
];
// eslint-disable-next-line react/prop-types
const Header = () => {
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [, setCurrent] = useState("home");
  const [, setUser] = useState("");
  const location = useLocation();
  const currentKey = location.pathname;

  console.log("onClick ", currentKey);
  let navigate = useNavigate();
  const onClickMenu = () => {
    setDisplayNavbar(!displayNavbar);
  };

  const onClickCross = () => {
    setDisplayNavbar(false);
  };

  const onClickLogout = () => {
    console.log("logout");
    Cookies.remove("jwt_token");
    return navigate("/login");
  };

  const onClickWebSiteLogo = () => {
    return navigate("/");
  };

  // eslint-disable-next-line react/prop-types

  return (
    <div>
      <div
        className="header-container"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="header-website-logo1">
          <Link to="/">
            <>
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                alt="website logo"
                onClick={() => onClickWebSiteLogo()}
              />
            </>
          </Link>
        </div>
        <Space.Compact>
          <Input placeholder="Tìm kiếm..." allowClear style={{ width: 300 }} />
          <Button type="primary" onClick={() => console.log("Search clicked")}>
            Search
          </Button>
        </Space.Compact>

        <Menu
          style={{
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={(e) => setCurrent(e.key)}
          defaultSelectedKeys={["home"]}
          selectedKeys={[currentKey]}
          mode="horizontal"
          items={items}
        />
        <Profile
          token={Cookies.get("jwt_token")}
          setUser={setUser}
          userImage={localStorage.getItem("data_avatar")}
        />

        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
      </div>
      <div className="header-navbar-responsive-container">
        <div className="header-nav-container">
          <Link to="/">
            <img
              className="header-nav-bar-website-logo"
              src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
              alt="website logo"
              onClick={onClickWebSiteLogo}
            />
          </Link>
          <button
            onClick={onClickMenu}
            className="cross-icon-btn"
            type="button"
          >
            <FiMenu className="menu-icon" />
          </button>
        </div>
        {displayNavbar && (
          <>
            <div className="header-navbar-tabs-container">
              <Link className="link" to="/">
                <p className={`list-item home-tab`}>Home</p>
              </Link>
              <Link className="link" to="/shelf">
                <p className={`bookshelves-tab`}>BookShelves</p>
              </Link>
            </div>
            <div className="header-navbar-tabs-container">
              <button
                onClick={onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
              <button
                onClick={onClickCross}
                className="cross-icon-btn"
                type="button"
              >
                <RiCloseCircleFill className="cross-icon" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

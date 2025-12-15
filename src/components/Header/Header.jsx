import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout, Menu, Input, Button, Drawer, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Header } = Layout;
import "./Header.css";
import { useState } from "react";
import Profile from "../Profile/Profile";
import useIsMobile from "../customize/useIsMobile ";

// eslint-disable-next-line react/prop-types
const AppHeader = () => {
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
          My Bookshelf
        </Link>
      ),
      key: "/shelf",
    },
  ];
  const [, setCurrent] = useState("home");
  const [, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentKey = location.pathname;
  const avatarUrl = `http://localhost:8080${localStorage.getItem(
    "data_avatar"
  )}`;
  console.log("onClick ", currentKey);
  let navigate = useNavigate();
  const isMobile = useIsMobile();

  const onClickLogout = () => {
    console.log("logout");
    Cookies.remove("jwt_token");
    return navigate("/login");
  };

  // eslint-disable-next-line react/prop-types

  return (
    <>
      {/* DESKTOP HEADER */}
      <Header className="main-header">
        {/* LEFT LOGO */}
        <div className="header-left">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
              alt="logo"
              className="header-logo"
            />
          </Link>
        </div>

        {/* CENTER (ẩn trên mobile) */}
        {!isMobile && (
          <div
            className="header-center"
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Space.Compact
              // style={{ width: 400 }}
              size="large"
            >
              <Input
                placeholder="Tìm kiếm..."
                allowClear
                prefix={<SearchOutlined />}
                style={{ height: 40, borderRadius: "20px 0 0 20px" }}
              />
              <Button type="primary" style={{ borderRadius: "0 20px 20px 0" }}>
                Tìm kiếm
              </Button>
              <Menu
                height="30px"
                mode="horizontal"
                style={{ marginTop: -10 }}
                selectedKeys={[currentKey]}
                items={items}
                onClick={(e) => setCurrent(e.key)}
              />
            </Space.Compact>
          </div>
        )}

        {/* RIGHT (ẩn trên mobile) */}
        {!isMobile && (
          <div className="header-right">
            <Profile
              username={Cookies.get("user_name")}
              token={Cookies.get("jwt_token")}
              setUser={setUser}
              userImage={avatarUrl}
            />

            <Button className="logout-btn" onClick={onClickLogout}>
              Logout
            </Button>
          </div>
        )}

        {/* MOBILE ICON */}
        {isMobile && (
          <FiMenu className="mobile-menu-icon" onClick={() => setOpen(true)} />
        )}
      </Header>

      {/* MOBILE DRAWER */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        closeIcon={<RiCloseCircleFill size={24} />}
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentKey]}
          items={items}
          onClick={(e) => setCurrent(e.key)}
        />

        <Button danger style={{ marginTop: 20 }} onClick={onClickLogout}>
          Logout
        </Button>
      </Drawer>
    </>
  );
};

export default AppHeader;

import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Layout, Menu, Input, Drawer, Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FiMenu } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";
import jwtDecode from "jwt-decode";
import { useState } from "react";

import Profile from "../Profile/Profile";
import NotificationPanel from "../Notification/NotificationPanel";
import useIsMobile from "../customize/useIsMobile";
import {
  HomeOutlined,
  StarOutlined,
  BookOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

import "./Header.css";

const { Header } = Layout;

const AppHeader = () => {
  const token = Cookies.get("jwt_token");
  const currentUser = token ? jwtDecode(token) : null;
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [, setUser] = useState("");

  const avatarUrl = `${localStorage.getItem("data_avatar")}`;
  const currentUserId = Cookies.get("user_id");
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/" />,
      title: "Trang chủ",
    },
    {
      key: "/ratings",
      icon: <StarOutlined />,
      label: <Link to="/ratings" />,
      title: "Đánh giá",
    },
    {
      key: "/shelf",
      icon: <BookOutlined />,
      label: <Link to="/shelf" />,
      title: "Tủ sách của tôi",
    },
    {
      key: `/profile/${currentUserId}`,
      icon: <UserOutlined />,
      label: <Link to={`/profile/${currentUserId}`} />,
      title: "Trang cá nhân",
    },
  ];

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <>
      <Header className="fb-header">
        <Row align="middle" style={{ width: "100%" }}>
          {/* LEFT */}
          <Col xs={12} md={6}>
            <div className="fb-left">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                  className="fb-logo"
                />
              </Link>

              {!isMobile && (
                <Input
                  className="fb-search"
                  placeholder="Tìm kiếm trên BookHub"
                  prefix={<SearchOutlined />}
                  allowClear
                />
              )}
            </div>
          </Col>

          {/* CENTER – Desktop only */}
          <Col xs={0} md={12} className="fb-center">
            {!isMobile && (
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                className="fb-menu fb-menu-center"
              />
            )}
          </Col>

          {/* RIGHT */}
          <Col xs={12} md={6}>
            <div className="fb-right">
              {isMobile && (
                <SearchOutlined
                  className="fb-icon"
                  onClick={() => setShowMobileSearch(true)}
                />
              )}

              <NotificationPanel currentUser={currentUser} />
              <Profile
                username={Cookies.get("user_name")}
                token={Cookies.get("jwt_token")}
                setUser={setUser}
                userImage={avatarUrl}
              />
              {isMobile && (
                <FiMenu
                  className="fb-icon"
                  onClick={() => setDrawerOpen(true)}
                />
              )}

              {!isMobile && (
                <Button className="fb-logout" onClick={onLogout}>
                  Logout
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Header>

      {/* MOBILE SEARCH OVERLAY */}
      <Drawer
        placement="top"
        height={70}
        open={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
        closeIcon={false}
      >
        <Input
          autoFocus
          placeholder="Tìm kiếm trên BookHub"
          prefix={<SearchOutlined />}
        />
      </Drawer>

      {/* MOBILE MENU */}
      <Drawer
        title="Menu"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<RiCloseCircleFill size={22} />}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
        <Button danger block style={{ marginTop: 20 }} onClick={onLogout}>
          Logout
        </Button>
      </Drawer>
    </>
  );
};

export default AppHeader;

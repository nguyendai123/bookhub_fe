// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";
// import { RiCloseCircleFill } from "react-icons/ri";
// import { Layout, Menu, Input, Button, Drawer, Space } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// const { Header } = Layout;
// import "./Header.css";
// import { useState } from "react";
// import Profile from "../Profile/Profile";
// import useIsMobile from "../customize/useIsMobile ";
// import NotificationPanel from "../Notification/NotificationPanel";
// import jwtDecode from "jwt-decode";
// import NotificationListener from "../Notification/NotificationListener";

// // eslint-disable-next-line react/prop-types
// const AppHeader = () => {
//   const userId = Cookies.get("user_id"); // hoặc lấy từ Redux
//   const token = Cookies.get("jwt_token");
//   const currentUser = token ? jwtDecode(token) : null;

//   const items = [
//     {
//       label: (
//         <Link className="link" to="/">
//           Home
//         </Link>
//       ),
//       key: "/",
//     },
//     {
//       label: (
//         <Link className="link" to="/ratings">
//           Ratings
//         </Link>
//       ),
//       key: "/ratings",
//     },
//     {
//       label: (
//         <Link className="link" to="/shelf">
//           My Bookshelf
//         </Link>
//       ),
//       key: "/shelf",
//     },
//     {
//       label: (
//         <Link className="link" to="/follow">
//           Follow
//         </Link>
//       ),
//       key: "/follow",
//     },
//   ];
//   const [, setCurrent] = useState("home");
//   const [, setUser] = useState("");
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const currentKey = location.pathname;
//   const avatarUrl = `http://localhost:8080${localStorage.getItem(
//     "data_avatar"
//   )}`;
//   console.log("onClick ", currentKey);
//   let navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const onClickLogout = () => {
//     console.log("logout");
//     Cookies.remove("jwt_token");
//     return navigate("/login");
//   };

//   // eslint-disable-next-line react/prop-types

//   return (
//     <>
//       {/* DESKTOP HEADER */}
//       <Header className="main-header">
//         {/* LEFT LOGO */}
//         <div className="header-left">
//           <Link to="/">
//             <img
//               src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
//               alt="logo"
//               className="header-logo"
//             />
//           </Link>
//           <Input
//             className="fb-search"
//             placeholder="Tìm kiếm trên BookHub"
//             allowClear
//             prefix={<SearchOutlined className="fb-search-icon" />}
//           />
//         </div>

//         {/* CENTER (ẩn trên mobile) */}
//         {!isMobile && (
//           <div
//             className="header-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               marginLeft: 20,
//             }}
//           >
//             <Space.Compact
//               // style={{ width: 400 }}
//               size="large"
//             >
//               <Menu
//                 height="30px"
//                 mode="horizontal"
//                 style={{ marginTop: -10 }}
//                 selectedKeys={[currentKey]}
//                 items={items}
//                 onClick={(e) => setCurrent(e.key)}
//               />
//             </Space.Compact>
//           </div>
//         )}

//         {/* RIGHT (ẩn trên mobile) */}
//         {!isMobile && (
//           <div className="header-right">
//             {/* 🔔 Notification */}
//             <NotificationPanel currentUser={currentUser} />
//             <Profile
//               username={Cookies.get("user_name")}
//               token={Cookies.get("jwt_token")}
//               setUser={setUser}
//               userImage={avatarUrl}
//             />

//             <Button className="logout-btn" onClick={onClickLogout}>
//               Logout
//             </Button>
//           </div>
//         )}

//         {/* MOBILE ICON */}
//         {isMobile && (
//           <div>
//             {/* 🔔 Notification */}
//             <NotificationPanel />
//             <FiMenu
//               className="mobile-menu-icon"
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         )}
//       </Header>

//       {/* MOBILE DRAWER */}
//       <Drawer
//         title="Menu"
//         placement="left"
//         onClose={() => setOpen(false)}
//         open={open}
//         closeIcon={<RiCloseCircleFill size={24} />}
//       >
//         <Menu
//           mode="vertical"
//           selectedKeys={[currentKey]}
//           items={items}
//           onClick={(e) => setCurrent(e.key)}
//         />

//         <Button danger style={{ marginTop: 20 }} onClick={onClickLogout}>
//           Logout
//         </Button>
//       </Drawer>
//     </>
//   );
// };

// export default AppHeader;

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

  const avatarUrl = `http://localhost:8080${localStorage.getItem(
    "data_avatar"
  )}`;

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
      key: "/follow",
      icon: <UserAddOutlined />,
      label: <Link to="/follow" />,
      title: "Theo dõi",
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

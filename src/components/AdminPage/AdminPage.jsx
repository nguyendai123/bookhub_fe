import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Image,
  Space,
  Avatar,
  Dropdown,
  Input,
  Divider,
  FloatButton,
  Badge,
} from "antd";
import {
  CopyrightOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";

import "./AdminPage.css";
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";

import Report from "./Report/Report";
import Settings from "./Settings/Settings";
import Users from "./Users/Users";
import ErrorPage from "../ErrorPage/ErrorPage";
import ForgotPasswordPage from "../ForgotPasswordPage/ForgotPasswordPage";
import RegisterForm from "../Registers/Registers";
import Books from "./Books/Books";

const { Header, Content, Footer, Sider } = Layout;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [token, setToken] = useState(null);
  // const pathname = window.location.pathname;
  // if ((!token || !token.length) && pathname !== "/login") {
  //   window.location.href = "/login";
  // }

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const menuItems = [
    getItem(
      <Link to="/admin">Dashboard</Link>,
      "sub0",
      <Icon icon="carbon:dashboard" />
    ),
    getItem("Management", "sub2", <AppstoreOutlined />, [
      getItem(<Link to="/admin/books">Books</Link>, "1"),
      getItem(<Link to="/admin/users">Users</Link>, "4"),
      getItem(<Link to="/admin/settings">Setting</Link>, "5"),
    ]),
  ];
  const items = [
    {
      label: <a href="">Profile</a>,
      key: "0",
    },
    {
      label: <a href="">Settings</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <a href="">Logout</a>,
      key: "3",
    },
  ];

  // const handleSubmit = async (username, password) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/auth/login",
  //       {
  //         username,
  //         password,
  //       }
  //     );
  //     const { token } = response.data;
  //     setToken(token);
  //   } catch (error) {
  //     console.error("Error occurred during login:", error);
  //   }
  // };

  return (
    <>
      {/* {token ? ( */}
      <Layout className="app-layout">
        <Sider
          className="sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={70}
          breakpoint="lg"
          onBreakpoint={(broken) => setCollapsed(broken)}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <Header className="sider-header">
            <Space>
              {collapsed ? (
                <Image
                  src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                  preview={false}
                />
              ) : (
                <Image
                  width={100}
                  src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                  preview={false}
                />
              )}
            </Space>
          </Header>
          {collapsed ? (
            <></>
          ) : (
            <div className="avatar-sider-container">
              <Avatar
                size={50}
                className="avatar-sider"
                icon={<UserOutlined />}
              ></Avatar>
              <h3>Admin</h3>
            </div>
          )}
          <Menu
            items={menuItems}
            theme="light"
            defaultOpenKeys={["sub1", "sub2"]}
            mode="inline"
          ></Menu>
        </Sider>
        <Layout>
          <Header className="content-header">
            <Space>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="collapse-button"
              />
              <Divider type="vertical"></Divider>
            </Space>
            <Input
              size="default"
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="search-input"
            />
            <Space>
              <Badge count={10} overflowCount={9}>
                <Button
                  shape="circle"
                  icon={<Icon icon="mi:notification" width={20} height={20} />}
                ></Button>
              </Badge>
              <Divider type="vertical"></Divider>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar className="avatar-header" icon={<UserOutlined />} />
                </a>
              </Dropdown>
            </Space>
          </Header>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="reports" element={<Report />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="errorpage" element={<ErrorPage />} />
              <Route path="forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="registerform" element={<RegisterForm />} />
            </Routes>
          </Content>
          <Footer className="footer">
            BookHub <CopyrightOutlined /> 2023 By F1
          </Footer>
          <FloatButton.BackTop visibilityHeight={0} />
        </Layout>
      </Layout>
      {/* ) : (
      <Routes>
        <Route
          path="/login"
          element={<LoginForm onSubmit={handleSubmit} />}
        ></Route>
      </Routes>
      )} */}
    </>
  );
};

export default AdminPage;

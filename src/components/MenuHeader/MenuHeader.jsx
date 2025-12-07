import React, { useState } from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    label: (
      <Link className="link" to="/">
        Home
      </Link>
    ),
    key: "home-tab",
  },
  {
    label: (
      <Link className="link" to="/shelf">
        BookShelves
      </Link>
    ),
    key: "shelf-tab",
  },
  {
    label: (
      <Link className="link" to="/favorites">
        MyFavorites
      </Link>
    ),
    key: "favorites-tab",
  },
];
const MenuHeader = () => {
  const [current, setCurrent] = useState("home-tab");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      style={{ width: "800px" }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default MenuHeader;

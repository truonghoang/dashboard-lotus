import React, { useState } from "react";

import {
  DesktopOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Button, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "@/styles/SideBar.scss";
import linkimg from "@/assets/lotus.png";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const items = [
    {
      key: "/",
      icon: <DesktopOutlined />,
      label: "Dashboard ",
    },
    {
      key: `${location.pathname.includes("/report/user")? location.pathname :"/report/user"}`,
      icon: <ContainerOutlined />,
      label: "Báo Cáo",
      disabled:location.pathname.includes("/report/user")? location.pathname :"/report/user"
    },
    {
      key: "sub1",
      label: "Người Dùng",
      icon: <UserOutlined />,
      children: [
        {
          key: "/user/banned",
          label: "Danh Sách Ban",
        },

      ],
    },
  ];
  const [current, setCurrent] = React.useState("/");
  React.useEffect(() => {
    if (location.pathname) {
      setCurrent(location.pathname);
    }
  }, [location.pathname]);
  return (
    <div className="wrap-sidebar">
      <div className="top-sidebar">
        <img src={linkimg} alt="img" style={{ width: 100 }} />
      </div>
      <Button className="btn-menu" type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["/"]}
        selectedKeys={[current]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={(item) => {
          navigate(item.key);
        }}
      />
    </div>
  );
};
export default SideBar;

import React, { useState } from "react";

import {
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
  
} from "@ant-design/icons";

import { Button, Menu } from "antd";
import {useNavigate,useLocation} from "react-router-dom"
import "@/styles/SideBar.scss";
import linkimg from "@/assets/lotus.png"
const items = [
  {
    key: "/",
    icon: <DesktopOutlined />,
    label: "Dashboard Report",
  },
  {
    key: "/report/form",
    icon: <MailOutlined />,
    label: "Report Form",
  },
  {
    key: "sub1",
    label: "User",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user/collection",
        label: "Collection",
      },
      {
        key: "/user/search",
        label: "Search",
      }
    
    ],
  },
  
];
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [current,setCurrent] = React.useState("/")
 React.useEffect(()=>{
  if(location.pathname){
   setCurrent(location.pathname)
  }
 },[location.pathname])
  return (
    <div
     className="wrap-sidebar"
     
    >
    <div className="top-sidebar">
        <img src={linkimg} alt="img" style={{width:100}}/>
    </div>
      <Button
      className="btn-menu"
        type="primary"
        onClick={toggleCollapsed}
      >
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
        onClick={(item)=>{
          navigate(item.key)
        }}
      />
    </div>
  );
};
export default SideBar;

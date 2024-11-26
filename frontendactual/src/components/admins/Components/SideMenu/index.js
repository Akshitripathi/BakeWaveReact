import {
  AppstoreOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
    },
    {
      key: "/inventory",
      icon: <AppstoreOutlined />,
      label: "Inventory",
    },
    {
      key: "/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    }
  ];

  return (
    <Menu
      mode="inline"
      style={{
        height: "100%",
        borderRight: 0,
      }}
      defaultSelectedKeys={["/"]}
      onClick={({ key }) => navigate(key)} // Navigate to the clicked menu item
      items={menuItems}
    />
  );
};

export default SideMenu;

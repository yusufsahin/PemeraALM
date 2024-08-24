import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UserOutlined,
  SettingFilled,
  QuestionCircleOutlined
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";

interface TopMenuProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const { Header } = Layout;
const { SubMenu } = Menu;
const TopMenu: React.FC<TopMenuProps> = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
    <Header
      style={{
        padding: 0,
        background: "#001529",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "#fff",
        }}
      />
      <Menu
        mode="horizontal"
        style={{ lineHeight: "64px", background: "#001529" }}
      >
        <SubMenu
          style={{ color: "white" }}
          key="sub1"
          icon={<SettingFilled />}
        >
          <Menu.Item key="sub1-1">Manage</Menu.Item>
          <Menu.Item key="sub1-2">Documents</Menu.Item>
        </SubMenu>
        <SubMenu
          style={{ color: "white" }}
          key="sub2"
          icon={<MessageOutlined />}
        >
          <Menu.Item key="sub2-1">View</Menu.Item>
          <Menu.Item key="sub2-2">Send</Menu.Item>
        </SubMenu>
        <SubMenu
          style={{ color: "white" }}
          key="sub3"
          icon={<UserOutlined />}
        >
          <Menu.Item key="sub3-1">Profile</Menu.Item>
          <Menu.Item key="sub3-2">Logout</Menu.Item>
        </SubMenu>
        <SubMenu
          style={{ color: "white" }}
          key="sub4"
          icon={<QuestionCircleOutlined />}
        >
          <Menu.Item key="sub4-1">
            <Link to="/help">Help</Link>
          </Menu.Item>
       
        </SubMenu>
      </Menu>
    </Header>
    </>
  );
};

export default TopMenu;

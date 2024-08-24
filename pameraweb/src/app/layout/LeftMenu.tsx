import React from "react";
import {
  HomeOutlined,
  FileTextOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";

interface LeftMenuProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const { Sider } = Layout;
const LeftMenu: React.FC<LeftMenuProps> = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Pamera</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            style={{ height: "20px", margin: "0px", padding: "0px" }}
          ></Menu.Item>
          <SubMenu key="sub1" icon={<FileTextOutlined />} title="Projects">
            <Menu.Item key="2" icon={<FileTextOutlined />}>
              <Link to="/projects">Projects List</Link>
            </Menu.Item>
           
       
            <Menu.Item key="8" icon={<FileTextOutlined />}>
              <Link to="/projects-details-view">Projects Menu</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/requirements">Requirements</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/notes">Notes</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<FileOutlined />}>
            <Link to="/testcasefolders">Testcase Folder</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FileOutlined />}>
            <Link to="/testplanfolders">Testplan Folder</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            <Link to="/defects">Defect</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default LeftMenu;

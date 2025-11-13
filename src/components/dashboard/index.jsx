import { useState, useEffect } from "react";
import {
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
  TagsOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Wallet as WalletIcon } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./index.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(["group1", "group2", "group3"]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const role = localStorage.getItem("role") || "";

  // Menu Items - Chỉ 2 mục quản lý chính
  const items = [
    {
      key: "group1",
      icon: <DashboardOutlined />,
      label: "Quản lý hệ thống",
      children: [
        {
          key: "accounts",
          icon: <UserOutlined />,
          label: <Link to="/admin/accounts">Quản lý tài khoản</Link>,
        },
        {
          key: "revenue",
          icon: <WalletIcon style={{ fontSize: 18 }} />,
          label: <Link to="/admin/revenue">Thống kê doanh thu</Link>,
        },
        {
          key: "reading-passages",
          icon: <FileTextOutlined />,
          label: <Link to="/admin/reading-passages">Quản lý đoạn đọc</Link>,
        },
        {
          key: "user-surveys",
          icon: <FileTextOutlined />,
          label: <Link to="/admin/user-surveys">Quản lý khảo sát</Link>,
        },
        {
          key: "categories",
          icon: <TagsOutlined />,
          label: <Link to="/admin/categories">Quản lý danh mục</Link>,
        },
        {
          key: "packages",
          icon: <GiftOutlined />,
          label: <Link to="/admin/packages">Quản lý gói dịch vụ</Link>,
        },
      ],
    },
  ];

  // Responsive: tự động collapse sidebar trên màn hình nhỏ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992 && !collapsed) setCollapsed(true);
      if (window.innerWidth >= 992 && collapsed) setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed]);

  const onOpenChange = (keys) => setOpenKeys(keys);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout className="dashboard-layout">
      {/* SIDEBAR */}
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        className="dashboard-sider"
      >
        <div className="sider-logo">
          <div className="sider-logo-inner">
            <div className="sider-logo-icon">S</div>
            {!collapsed && (
              <span className="sider-logo-text">
                <DashboardOutlined />
                DASHBOARD
              </span>
            )}
          </div>
        </div>
        <div className="sider-menu-wrapper">
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            openKeys={collapsed ? [] : openKeys}
            onOpenChange={onOpenChange}
          />
        </div>
        <div className="sider-trigger-wrapper">
          <Button
            className="custom-trigger"
            onClick={() => setCollapsed(!collapsed)}
            type="primary"
            size="small"
          >
            {collapsed ? ">" : "<"}
          </Button>
        </div>
      </Sider>

      {/* MAIN */}
      <Layout className={`dashboard-main ${collapsed ? "collapsed" : ""}`}>
        <Header className="dashboard-header">
          <h1>Quản trị hệ thống</h1>
          <Button onClick={handleLogout} className="header-logout">
            <LogoutIcon />
          </Button>
        </Header>
        <Content className="dashboard-content">
          <Breadcrumb className="dashboard-breadcrumb">
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="dashboard-content-inner"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Table hoặc quản lý CRUD hiển thị ở đây qua Outlet */}
            <div className="dashboard-table-wrapper">
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer className="dashboard-footer">
          Voice Test Admin ©{new Date().getFullYear()} Created by Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

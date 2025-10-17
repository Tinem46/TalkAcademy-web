import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import { toast } from "react-toastify";
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
    toast.success("Đăng xuất thành công!");
    closeMobileMenu();
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => {
        navigate("/profile");
        closeMobileMenu();
      }
    },
    {
      key: 'dashboard',
      icon: <UserOutlined />,
      label: 'Dashboard',
      onClick: () => {
        navigate("/dashboard");
        closeMobileMenu();
      }
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    }
  ];

  return (
    <header className="talkademy-header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <img src={mascot1} alt="Talkademy Logo" className="logo-image" />
          </div>
          <span className="logo-text">Talkademy</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li onClick={() => { navigate("/"); closeMobileMenu(); }}>Home</li>
            <li onClick={() => { navigate("/about"); closeMobileMenu(); }}>About Us</li>
            <li onClick={() => { navigate("/services"); closeMobileMenu(); }}>Services</li>
            {/* <li onClick={() => { navigate("/team"); closeMobileMenu(); }}>Our Team</li> */}
            {/* <li onClick={() => { navigate("/blog"); closeMobileMenu(); }}>Blog</li> */}
            <li onClick={() => { navigate("/contact"); closeMobileMenu(); }}>Contact Us</li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className={`header-auth ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {isAuthenticated ? (
            <div className="user-menu">
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button type="text" className="user-dropdown-btn">
                  <UserOutlined />
                  <span className="user-name">
                    {user?.username || user?.email || 'User'}
                  </span>
                </Button>
              </Dropdown>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="sign-in-btn"
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
              >
                Sign In
              </button>
              <button
                className="sign-up-btn"
                onClick={() => {
                  navigate("/register");
                  closeMobileMenu();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

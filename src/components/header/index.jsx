import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.isLoggedIn;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
            <li onClick={() => { navigate("/team"); closeMobileMenu(); }}>Our Team</li>
            <li onClick={() => { navigate("/blog"); closeMobileMenu(); }}>Blog</li>
            <li onClick={() => { navigate("/contact"); closeMobileMenu(); }}>Contact Us</li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className={`header-auth ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-name">Xin chào!</span>
              <button
                className="sign-out-btn"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="sign-in-btn"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button
                className="sign-up-btn"
                onClick={() => navigate("/register")}
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

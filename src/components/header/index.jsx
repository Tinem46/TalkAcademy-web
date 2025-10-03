import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.isLoggedIn;

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

        {/* Navigation */}
        <nav className="header-nav">
          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About Us</li>
            <li onClick={() => navigate("/services")}>Services</li>
            <li onClick={() => navigate("/team")}>Our Team</li>
            <li onClick={() => navigate("/blog")}>Blog</li>
            <li onClick={() => navigate("/contact")}>Contact Us</li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="header-auth">
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

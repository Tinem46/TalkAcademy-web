import React from "react";
import "./index.scss";
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="talkademy-footer">
      <div className="footer-background"></div>

      <div className="footer-container">
        <div className="footer-content">
          {/* Logo và mô tả */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <img src={mascot1} alt="Talkademy Logo" className="logo-image1" />
              </div>
              <span className="logo-text">Talkademy</span>
            </div>
            <p className="footer-description">
              Cùng Talkademy khám phá sức mạnh ngôn ngữ Việt - và thắp sáng tiếng nói của riêng bạn!
            </p>
          </div>

          {/* Các cột thông tin */}
          <div className="footer-columns">
            {/* Khám Phá */}
            <div className="footer-column">
              <h3 className="column-title">Khám Phá</h3>
              <ul className="column-list">
                <li className="column-item" onClick={() => navigate("/about")}>Về Chúng Tôi</li>
                <li className="column-item">Đặc Trưng</li>
                <li className="column-item" onClick={() => navigate("/services")}>Gói Lời</li>
                <li className="column-item" onClick={() => navigate("/privacy")}>Privacy Policy</li>
              </ul>
            </div>

            {/* Liên Hệ Chúng Tôi */}
            <div className="footer-column">
              <h3 className="column-title">Liên Hệ Chúng Tôi</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">Lô E2a-7, Đường D1, Khu Công nghệ cao, Phường Tăng Nhơn Phú, TPHCM.</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">+84 946 51805</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">talkademyfpt@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <span className="copyright-text">
              Talkademy © All right reserved
            </span>
            <div className="footer-links">
              <a href="/terms" className="footer-link">Terms & Condition</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

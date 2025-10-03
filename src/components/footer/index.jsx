import React from "react";
import "./index.scss";

const Footer = () => {
  return (
    <footer className="talkademy-footer">
      <div className="footer-background"></div>

      <div className="footer-container">
        <div className="footer-content">
          {/* Logo và mô tả */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <div className="graduation-cap">🎓</div>
                <div className="speech-bubble">💬</div>
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
                <li className="column-item">Về Chúng Tôi</li>
                <li className="column-item">Đặc Trưng</li>
                <li className="column-item">Gói Lời</li>
                <li className="column-item">Privacy Policy</li>
              </ul>
            </div>

            {/* Liên Hệ Chúng Tôi */}
            <div className="footer-column">
              <h3 className="column-title">Liên Hệ Chúng Tôi</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">7 Đ. Đt. Long Thành Mỹ, Thủ Đức, Hồ Chí Minh 700000</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">028 7300 5588</span>
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

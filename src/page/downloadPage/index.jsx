import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import {
  AndroidOutlined,
  DownloadOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  BookOutlined,
  TeamOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { Title, Paragraph } = Typography;

const DownloadPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const whyFeatures = [
    {
      icon: <ThunderboltOutlined />,
      title: 'Học mọi lúc, mọi nơi',
      description:
        'Luyện tập ngay cả khi đang di chuyển, giờ nghỉ trưa, hoặc bất cứ khi nào bạn rảnh rỗi.'
    },
    {
      icon: <RobotOutlined />,
      title: 'Phản hồi AI tức thì',
      description:
        'Ghi âm giọng nói của bạn và nhận phân tích, chấm điểm chi tiết ngay-trên-điện-thoại.'
    },
    {
      icon: <CalendarOutlined />,
      title: 'Nhắc nhở lộ trình',
      description:
        'Bật thông báo để giữ vững thói quen luyện tập, không bao giờ bỏ lỡ buổi học.'
    }
  ];

  return (
    <div className="talkademy-download">
      {/* ===== HERO ===== */}
      <div className="about-hero">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-icon icon-1"><BookOutlined /></div>
            <div className="floating-icon icon-2"><TeamOutlined /></div>
            <div className="floating-icon icon-3"><TrophyOutlined /></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className={`hero-ai-icon ${isVisible ? 'animate-in' : ''}`}>
              <DownloadOutlined />
            </div>
            <Title level={1} className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
              Tải xuống Talkademy
            </Title>
            <Paragraph className={`hero-subtitle ${isVisible ? 'animate-in delay-1' : ''}`}>
              Mang theo trợ lý AI luyện giọng của bạn đi khắp mọi nơi.
              Sẵn có trên cả hai nền tảng iOS và Android.
            </Paragraph>
            <div className="hero-cta-group">
              <Button
                type="primary"
                size="large"
                className={`cta-button ${isVisible ? 'animate-in delay-2' : ''}`}
                href="#download-actions"
              >
                Tải ngay
              </Button>
              <Button
                size="large"
                className={`cta-button-outline ${isVisible ? 'animate-in delay-3' : ''}`}
                href="#apk-guide"
              >
                Xem hướng dẫn
              </Button>
            </div>
          </div>

          <div className="hero-mascot">
            <div className="mascot-character">
              <img src={mascot1} alt="Talkademy Download Mascot" className="mascot-image" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 1: TẢI VỀ ===== */}
      <section id="download-actions" className="download-links-section">
        <div className="download-container">
          <Title level={2} className="section-title">Chọn nền tảng của bạn</Title>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} md={12} lg={10}>
              <Card className="download-card" hoverable>
                <div className="download-card-icon android"><AndroidOutlined /></div>
                <Title level={3}>Tải về cho Android</Title>
                <Paragraph>Yêu cầu Android 8.0 trở lên.</Paragraph>
                <Button
                  type="primary"
                  size="large"
                  icon={<DownloadOutlined />}
                  href="https://drive.google.com/file/d/1p701CGw_c0YdmNuA-IX6t6iRCdu0kHG9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-button"
                >
                  Tải APK trên Drive
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* ===== PHẦN 2: HƯỚNG DẪN CÀI APK ===== */}
      <section id="apk-guide" className="apk-guide-section">
        <div className="download-container">
          <div className="apk-instructions">
            <div className="apk-instructions__header">
              <span className="apk-instructions__badge">Hướng dẫn</span>
              <h3 className="apk-instructions__title">Cách cài file APK từ Google Drive</h3>
            </div>

            <p className="apk-instructions__desc">
              Làm theo các bước dưới đây để tải và cài đặt ứng dụng từ file APK trên Android.
            </p>

            <div className="apk-steps">
              <div className="apk-step">
                <h4 className="apk-step__title">Mở link Google Drive</h4>
                <p className="apk-step__text">
                  Nhấn nút <b>Tải APK trên Drive</b> &rarr; mở bằng Chrome (khuyến nghị).
                </p>
              </div>

              <div className="apk-step">
                <h4 className="apk-step__title">Tải file APK</h4>
                <p className="apk-step__text">
                  Nhấn biểu tượng <b>Tải xuống</b> trên Drive &rarr; chờ tải hoàn tất.
                </p>
                <span className="apk-step__chip">Drive &rarr; Tải xuống</span>
              </div>

              <div className="apk-step">
                <h4 className="apk-step__title">Cho phép cài từ nguồn không xác định</h4>
                <p className="apk-step__text">
                  Khi được hỏi, chọn <b>Cài đặt</b> &rarr; <b>Cho phép từ nguồn này</b> đối với
                  trình duyệt bạn dùng (Chrome/Edge).
                </p>
                <span className="apk-step__chip">Cài đặt &rarr; Bảo mật</span>
              </div>

              <div className="apk-step">
                <h4 className="apk-step__title">Cài đặt APK</h4>
                <p className="apk-step__text">
                  Mở file APK trong thông báo tải xuống hoặc trong <b>Tệp/Files</b> &rarr; nhấn{' '}
                  <b>Cài đặt</b>.
                </p>
              </div>
            </div>

            <div className="apk-callout apk-callout--note" role="note" aria-label="Mẹo cài đặt">
              <span className="apk-callout__title">Mẹo:</span>
              Nếu bị chặn bởi Play Protect, chọn <b>Vẫn cài đặt</b> (Install anyway). Bạn luôn có thể
              gỡ ứng dụng trong Cài đặt.
            </div>

            <ul className="apk-troubleshoot">
              <li><b>Không thấy nút tải:</b> Đăng nhập Google hoặc mở link trong trình duyệt khác.</li>
              <li><b>File không mở được:</b> Kiểm tra lại file đã tải xong, hoặc mở bằng ứng dụng <i>Tệp/Files</i>.</li>
              <li><b>Thiếu quyền cài đặt:</b> Vào <i>Cài đặt → Ứng dụng → Trình duyệt</i> → <i>Cài ứng dụng không xác định</i> và bật cho phép.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <div className="values-section">
        <div className="values-background" />
        <div className="values-container">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={16}>
              <Title level={2} className="section-title" style={{ textAlign: 'left', marginBottom: 40 }}>
                Tại sao nên học trên di động?
              </Title>
              <Row gutter={[24, 24]}>
                {whyFeatures.map((feature, index) => (
                  <Col xs={24} md={8} key={index}>
                    <Card className="value-card">
                      <div className="value-icon">{feature.icon}</div>
                      <Title level={3}>{feature.title}</Title>
                      <Paragraph>{feature.description}</Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24} lg={8}>
              <div className="values-mascot">
                <img
                  src={mascot3}
                  alt="Talkademy Values Mascot"
                  className="values-mascot-image"
                  style={{ width: '300px' }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;

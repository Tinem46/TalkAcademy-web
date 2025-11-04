import React, { useEffect } from 'react';
import { Row, Col, Typography, Timeline, Button } from 'antd';
import {
  BookOutlined, TeamOutlined, TrophyOutlined, GlobalOutlined, HistoryOutlined, CrownOutlined,
  SoundOutlined, MessageOutlined, RobotOutlined, ExperimentOutlined, AimOutlined,
  DashboardOutlined, NodeIndexOutlined, AudioOutlined, RiseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ thêm
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot2 from '../../assets/Mascot/Asset 1longlanh.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { Title, Paragraph } = Typography;

const About = () => {
  const navigate = useNavigate(); // ✅ thêm

  // Scroll-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in-card').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler for CTA
  const scrollToLearnMore = (e) => {
    e.preventDefault();
    const el = document.getElementById('learn-more');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Data
  const corePhilosophy = [
    { icon: <AudioOutlined />, title: 'Hơi thở & Độ bền' },
    { icon: <MessageOutlined />, title: 'Khẩu hình & Nguyên âm' },
    { icon: <SoundOutlined />, title: 'Phụ âm cuối & Rõ chữ' },
    { icon: <DashboardOutlined />, title: 'Tốc độ & Nhịp điệu' },
    { icon: <NodeIndexOutlined />, title: 'Ngắt nghỉ & Ngữ điệu' },
    { icon: <GlobalOutlined />, title: 'Nối âm & Độ mượt' },
  ];

  const howItWorksSteps = [
    { icon: <RobotOutlined />, title: 'Bài Test AI Đầu Vào', description: 'Thực hiện bài kiểm tra 3–5 phút để AI phân tích giọng nói và chấm điểm trên 6 kỹ năng.' },
    { icon: <AimOutlined />, title: 'Lộ Trình Cá Nhân Hóa', description: 'Đề xuất lộ trình >15 bài tập theo level, ưu tiên điểm yếu của bạn.' },
    { icon: <ExperimentOutlined />, title: 'Luyện Tập & Phản Hồi', description: 'Thực hành hằng ngày, nhận phản hồi tức thì để điều chỉnh nhanh.' },
    { icon: <RiseOutlined />, title: 'Theo Dõi Tiến Độ', description: 'Xem điểm, biểu đồ kỹ năng và huy hiệu sau mỗi buổi tập.' },
  ];

  const developmentRoadmap = [
    { phase: 'Phase 1: Build MVP', title: 'Xây dựng Sản phẩm Tối thiểu', description: 'Tập trung tính năng cốt lõi: ghi âm, chấm điểm AI, lộ trình cơ bản và thanh toán sandbox.' },
    { phase: 'Phase 2: Alpha Test', title: 'Thử nghiệm nội bộ', description: 'Mời nhóm 20–100 người dùng để xác minh độ chính xác của AI và kiểm tra trải nghiệm.' },
    { phase: 'Phase 3: Beta Launch', title: 'Ra mắt Thử nghiệm', description: 'Phát hành trên App Store/Google Play, khởi động marketing nhỏ và thu thập phản hồi thực tế.' },
    { phase: 'Phase 4: Growth & Monetization', title: 'Tăng trưởng & Thương mại hoá', description: 'Kích hoạt paywall, mở rộng marketing và tối ưu giữ chân qua email/thông báo.' },
    { phase: 'Phase 5: Scale-up', title: 'Mở rộng Quy mô', description: 'Bổ sung module nâng cao, đầu tư hạ tầng và phân tích dữ liệu chuyên sâu.' },
  ];

  return (
    <div className="about-page">
      <div className="page-background-gradient" />

      {/* HERO */}
      <div className="about-hero">
        <div className="hero-background">
          <div className="floating-elements">
            <div className="floating-icon icon-1"><BookOutlined /></div>
            <div className="floating-icon icon-2"><TeamOutlined /></div>
            <div className="floating-icon icon-3"><TrophyOutlined /></div>
            <div className="floating-icon icon-4"><GlobalOutlined /></div>
            <div className="floating-icon icon-5"><HistoryOutlined /></div>
            <div className="floating-icon icon-6"><CrownOutlined /></div>
          </div>
          <div className="hero-particles">
            {[...Array(15)].map((_, i) => <div key={i} className={`particle particle-${i % 3}`} />)}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-ai-icon is-visible"><RobotOutlined /></div>
            <Title level={1} className="hero-title is-visible">Về chúng tôi - Talkademy</Title>
            <Paragraph className="hero-subtitle is-visible delay-1">
              Khám phá câu chuyện đằng sau ứng dụng học tiếng Việt thông minh, nơi công nghệ AI gặp gỡ tình yêu ngôn ngữ để tạo nên trải nghiệm học tập tuyệt vời.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="cta-button is-visible delay-2"
              onClick={scrollToLearnMore}
            >
              Tìm hiểu thêm
            </Button>
          </div>
          <div className="hero-mascot">
            <div className="mascot-character">
              <img src={mascot1} alt="Talkademy About Mascot" className="mascot-image" />
            </div>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY */}
      <section className="about-page__section-container">
        <div className="container">
          <h2 className="about-page__section-title fade-in-card">Triết lý Đào tạo</h2>
          <p className="about-page__section-subtitle fade-in-card">
            Một giọng nói hay được xây từ 6 kỹ năng nền tảng. AI Talkademy sẽ phân tích và giúp bạn hoàn thiện từng yếu tố.
          </p>
          <Row gutter={[24, 24]}>
            {corePhilosophy.map((s, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className="section-card about-page__philosophy-card fade-in-card">
                  <div className="card-icon-wrapper">{s.icon}</div>
                  <h4 className="card-title">{s.title}</h4>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="about-page__section-container about-page__how-it-works-section">
        <div className="container">
          <h2 className="about-page__section-title fade-in-card">Quy trình Hoạt động</h2>
          <p className="about-page__section-subtitle fade-in-card">
            Bắt đầu hành trình của bạn với 4 bước đơn giản để làm chủ giọng nói.
          </p>
          <Row gutter={[32, 32]}>
            {howItWorksSteps.map((step, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div className="section-card about-page__how-it-works-card fade-in-card">
                  <div className="card-step-number">0{index + 1}</div>
                  <div className="card-icon-wrapper">{step.icon}</div>
                  <h4 className="card-title">{step.title}</h4>
                  <p className="card-description">{step.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="about-page__section-container about-page__mission-vision-section">
        <div className="container">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={10} className="about-page__mission-vision-mascot-col">
              <img src={mascot3} alt="Talkademy Mission Mascot" className="about-page__mission-vision-mascot-image fade-in-card" />
            </Col>
            <Col xs={24} lg={14} className="about-page__mission-vision-text-col">
              <div className="section-card about-page__mission-card fade-in-card">
                <h3 className="card-title large-title">Sứ mệnh & Tầm nhìn</h3>
                <p className="card-description large-description">
                  Trở thành ứng dụng học tiếng Việt hàng đầu, giúp mọi người tự tin giao tiếp thông qua công nghệ AI tiên tiến.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* TIMELINE (CLEAN) */}
      <section id="learn-more" className="about-page__section-container">
        <div className="container-timeline">
          <h2 className="tl-title">Lộ trình Phát triển</h2>
          <p className="tl-subtitle">
            Từ ý tưởng đến hiện thực, đây là các cột mốc quan trọng trong hành trình xây dựng và phát triển Talkademy.
          </p>

          <Timeline mode="alternate" className="tl tl--center">
            {developmentRoadmap.map((item, indexa) => (
              <Timeline.Item
                key={indexa}
                label={<span className="tl-phase">{item.phase}</span>}
                dot={<span className="tl-dot" data-step={String(indexa + 1).padStart(2, '0')} />}
                className="tl-item"
              >
                <article className="tl-card">
                  <h4 className="tl-card__title">{item.title}</h4>
                  <p className="tl-card__desc">{item.description}</p>
                </article>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-page__section-container contact-page__cta-section">
        <div className="container">
          <div className="section-card contact-page__cta-card fade-in-card">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} lg={6} className="contact-page__cta-mascot-col">
                <img src={mascot2} alt="Talkademy CTA Mascot" className="contact-page__cta-mascot-image" />
              </Col>
              <Col xs={24} lg={18} className="contact-page__cta-content-col">
                <div className="contact-page__cta-content">
                  <h2 className="contact-page__cta-title">Sẵn sàng để Bắt đầu?</h2>
                  <p className="contact-page__cta-subtitle">
                    Tải ứng dụng ngay hôm nay và bắt đầu hành trình chinh phục giọng nói của bạn với sự đồng hành của AI.
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="contact-page__cta-button"
                    onClick={() => navigate('/download')} // ✅ dùng navigate thay href
                  >
                    Tải ứng dụng miễn phí
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

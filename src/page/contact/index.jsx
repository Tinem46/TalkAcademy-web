import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Row, Col, Button, Form, Input, message } from 'antd';
import {
  PhoneOutlined, MailOutlined, EnvironmentOutlined, SendOutlined,
  CustomerServiceOutlined, TeamOutlined, BuildOutlined, InfoCircleOutlined,
  CheckCircleTwoTone
} from '@ant-design/icons';
import './index.scss';

// Mascots
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { TextArea } = Input;

/** ================== EMAILJS CONFIG (v4) ================== */
const SERVICE_ID  = 'service_cug6fxl';
const TEMPLATE_ID = 'template_ik4wh7p';
const PUBLIC_KEY  = 'gXVe0pgxuTL6aX4nd';
const RECEIVER_EMAIL = 'talkacademylegion@gmail.com';

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const navigate = useNavigate();

  // Scroll-in animations (đổi selector -> .contact-fade-in)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.contact-fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    { icon: <PhoneOutlined />, title: 'Điện thoại', content: '+84 946541805', description: 'Thứ 2 - Thứ 6: 8:00 - 18:00' },
    { icon: <MailOutlined />,  title: 'Email',      content: 'Talkademyfpt@gmail.com', description: 'Phản hồi trong vòng 24 giờ' },
    { icon: <EnvironmentOutlined />, title: 'Địa chỉ chính', content: 'Lô E2a-7, Đường D1, Khu Công nghệ cao...', description: 'TP. Thủ Đức, TPHCM' },
  ];

  const departments = [
    { icon: <BuildOutlined />,      name: 'Hỗ trợ kỹ thuật',    email: 'Talkademyfpt@gmail.com', description: 'Hỗ trợ kỹ thuật & sử dụng ứng dụng' },
    { icon: <InfoCircleOutlined />, name: 'Tư vấn khóa học',    email: 'Talkademyfpt@gmail.com', description: 'Tư vấn khóa học & chương trình' },
    { icon: <TeamOutlined />,       name: 'Hợp tác kinh doanh', email: 'Talkademyfpt@gmail.com', description: 'Cơ hội hợp tác & phát triển' },
  ];

  /** Submit form -> send via EmailJS (v4) */
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (!PUBLIC_KEY) throw new Error('Missing EmailJS Public Key');

      // KHỚP biến với Template: {{to_email}}, {{name}}, {{email}}, {{subject}}, {{message}}, {{submitted_at}}
      const templateParams = {
        to_email: RECEIVER_EMAIL,
        name: values.name,
        email: values.email, // dùng cho Reply-To trong template
        subject: values.subject,
        message: values.message,
        submitted_at: new Date().toLocaleString('vi-VN'),
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        { publicKey: PUBLIC_KEY }
      );

      message.success('Đã gửi! Chúng tôi sẽ phản hồi sớm nhất.');
      form.resetFields();
      setSentSuccess(true); // đổi form -> chữ "Gửi thành công"
    } catch (err) {
      console.error('[EmailJS] send failed:', err);
      message.error('Gửi không thành công. Vui lòng kiểm tra cấu hình và thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-page__hero">
        <div className="contact-page__hero-bubbles">
          <div className="bubble x1"></div>
          <div className="bubble x2"></div>
          <div className="bubble x3"></div>
          <div className="bubble x4"></div>
          <div className="bubble x5"></div>
        </div>
        <div className="contact-page__hero-container container">
          <div className="contact-page__hero-text">
            <div className="contact-page__hero-icon"><CustomerServiceOutlined /></div>
            <h1 className="contact-page__hero-title">Liên hệ với chúng tôi</h1>
            <p className="contact-page__hero-subtitle">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại tin nhắn hoặc liên hệ trực tiếp.
            </p>
            <div className="contact-page__hero-actions">
              <Button
                type="primary"
                size="large"
                className="hero-button-primary"
                onClick={() => document.querySelector('.contact-page__main-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Gửi tin nhắn
              </Button>
              <Button size="large" className="hero-button-secondary" href="tel:+84946541805">
                Gọi cho chúng tôi
              </Button>
            </div>
          </div>
          <div className="contact-page__hero-mascot">
            <img
              src={mascot1}
              alt="Talkademy Contact Mascot"
              className="contact-page__hero-mascot-image"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (FORM + INFO) */}
      <section className="contact-page__main-section">
        <div className="container">
          <div className="contact-page__content-wrapper contact-fade-in">
            <Row gutter={[48, 32]}>
              {/* Form (hoặc chữ Thành công) */}
              <Col xs={24} lg={14}>
                {!sentSuccess ? (
                  <div className="contact-page__form-container">
                    <h2 className="contact-page__form-title">Gửi tin nhắn cho chúng tôi</h2>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      className="contact-page__form"
                    >
                      <Row gutter={24}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="name"
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                          >
                            <Input placeholder="Nguyễn Văn A" className="form-input" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
                          >
                            <Input placeholder="example@email.com" className="form-input" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="subject"
                        label="Chủ đề"
                        rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                      >
                        <Input placeholder="Về vấn đề..." className="form-input" />
                      </Form.Item>

                      <Form.Item
                        name="message"
                        label="Tin nhắn"
                        rules={[{ required: true, message: 'Vui lòng nhập tin nhắn!' }]}
                      >
                        <TextArea rows={5} placeholder="Nội dung tin nhắn của bạn..." className="form-textarea" />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          icon={<SendOutlined />}
                          size="large"
                          className="contact-page__submit-button"
                        >
                          Gửi tin nhắn
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                ) : (
                  <div className="section-card contact-success-card" style={{ textAlign: 'center' }}>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
                    <h3 className="card-title" style={{ marginTop: 12 }}>Gửi thành công</h3>
                    <p className="card-description">Cảm ơn bạn! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
                    <div style={{ marginTop: 12 }}>
                      <Button type="primary" onClick={() => setSentSuccess(false)}>
                        Gửi thêm phản hồi
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={() => navigate('/download')}>
                        Tải ứng dụng Talkademy
                      </Button>
                    </div>
                  </div>
                )}
              </Col>

              {/* Info sidebar */}
              <Col xs={24} lg={10}>
                <div className="contact-page__info-sidebar">
                  <h3 className="contact-page__info-title">Thông tin liên hệ</h3>
                  <div className="contact-page__info-card-list">
                    {contactInfo.map((info, idx) => (
                      <div className="contact-page__info-card contact-fade-in" key={idx}>
                        <div className="contact-page__info-card-icon">{info.icon}</div>
                        <div className="contact-page__info-card-content">
                          <span className="info-card-title">{info.title}</span>
                          <span className="info-card-text">{info.content}</span>
                          <span className="info-card-subtext">{info.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="contact-page__section-container contact-page__offices-section">
        <div className="container">
          <h2 className="contact-page__section-title">Văn phòng của chúng tôi</h2>
          <p className="contact-page__section-subtitle">
            Talkademy có mặt tại các thành phố công nghệ lớn trên cả nước.
          </p>
          <Row gutter={[32, 32]}>
            {[
              { city: 'Hồ Chí Minh', address: 'Lô E2a-7, Đường D1, Khu CNC, P. Tăng Nhơn Phú, TPHCM.', phone: '+84 946541805', email: 'Talkademyfpt@gmail.com' },
              { city: 'Hà Nội', address: 'Khu GD & Đào tạo – KCN cao Hòa Lạc – Km29 Đại lộ Thăng Long.', phone: '+84 946541805', email: 'Talkademyfpt@gmail.com' },
              { city: 'Đà Nẵng', address: 'KĐT công nghệ FPT Đà Nẵng, P. Ngũ Hành Sơn, TP. Đà Nẵng.', phone: '+84 946541805', email: 'Talkademyfpt@gmail.com' },
            ].map((o, i) => (
              <Col xs={24} md={8} key={i}>
                <div className="section-card contact-page__office-card contact-fade-in">
                  <div className="card-icon-wrapper"><EnvironmentOutlined /></div>
                  <h4 className="card-title">{o.city}</h4>
                  <p className="card-text"><EnvironmentOutlined /> {o.address}</p>
                  <p className="card-text"><PhoneOutlined /> {o.phone}</p>
                  <p className="card-text"><MailOutlined /> {o.email}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="contact-page__section-container contact-page__departments-section">
        <div className="container">
          <h2 className="contact-page__section-title">Liên hệ theo phòng ban</h2>
          <p className="contact-page__section-subtitle">Để được hỗ trợ nhanh nhất, vui lòng liên hệ đúng phòng ban.</p>
          <Row gutter={[32, 32]}>
            {departments.map((d, i) => (
              <Col xs={24} md={8} key={i}>
                <div className="section-card contact-page__department-card contact-fade-in">
                  <div className="card-icon-wrapper">{d.icon}</div>
                  <h4 className="card-title">{d.name}</h4>
                  <p className="card-description">{d.description}</p>
                  <Button type="link" href={`mailto:${d.email}`} className="card-link-button">{d.email}</Button>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-page__section-container contact-page__faq-section">
        <div className="container">
          <h2 className="contact-page__section-title">Câu hỏi thường gặp</h2>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} lg={10}>
              <div className="section-card contact-page__faq-card contact-fade-in">
                <h4 className="card-title">Làm thế nào để đăng ký khóa học?</h4>
                <p className="card-description">
                  Đăng ký trực tiếp trên website hoặc liên hệ hotline để được tư vấn phù hợp.
                </p>
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <div className="section-card contact-page__faq-card contact-fade-in">
                <h4 className="card-title">Thời gian phản hồi là bao lâu?</h4>
                <p className="card-description">
                  Chúng tôi phản hồi trong 24 giờ làm việc. Trường hợp khẩn, vui lòng gọi hotline.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-page__section-container contact-page__cta-section">
        <div className="container">
          <div className="section-card contact-page__cta-card contact-fade-in">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} lg={6} className="contact-page__cta-mascot-col">
                <img
                  src={mascot3}
                  alt="Talkademy CTA Mascot"
                  className="contact-page__cta-mascot-image"
                />
              </Col>
              <Col xs={24} lg={18} className="contact-page__cta-content-col">
                <div className="contact-page__cta-content">
                  <h2 className="contact-page__cta-title">Sẵn sàng bắt đầu?</h2>
                  <p className="contact-page__cta-subtitle">
                    Tham gia cùng hơn 50,000 học viên đã tin tưởng Talkademy để học tiếng Việt.
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="contact-page__cta-button"
                    onClick={() => navigate('/download')}
                  >
                    Bắt đầu học thử
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

export default Contact;

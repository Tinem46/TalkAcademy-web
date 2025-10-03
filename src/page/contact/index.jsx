import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Form, Input, Select, message, Divider } from 'antd';
import {
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    SendOutlined,
    MessageOutlined,
    UserOutlined,
    GlobalOutlined,
    CheckCircleOutlined,
    TeamOutlined,
    CustomerServiceOutlined,
    HeartOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        // Animate cards on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        if (index && !visibleCards.includes(parseInt(index))) {
                            setVisibleCards(prev => [...prev, parseInt(index)]);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        const cards = document.querySelectorAll('.animated-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, [visibleCards]);

    const contactInfo = [
        {
            icon: <PhoneOutlined />,
            title: "Điện thoại",
            content: "+84 123 456 789",
            description: "Thứ 2 - Thứ 6: 8:00 - 18:00",
            additional: "Hotline: +84 987 654 321",
            responseTime: "Phản hồi trong 2 phút"
        },
        {
            icon: <MailOutlined />,
            title: "Email",
            content: "hello@talkademy.com",
            description: "Phản hồi trong vòng 24 giờ",
            additional: "support@talkademy.com",
            responseTime: "Phản hồi trong 4 giờ"
        },
        {
            icon: <EnvironmentOutlined />,
            title: "Địa chỉ",
            content: "123 Nguyễn Huệ, Q1, TP.HCM",
            description: "Việt Nam",
            additional: "Tầng 15, Tòa nhà ABC",
            responseTime: "Gần ga tàu điện ngầm"
        },
        {
            icon: <ClockCircleOutlined />,
            title: "Giờ làm việc",
            content: "Thứ 2 - Thứ 6",
            description: "8:00 - 18:00 (GMT+7)",
            additional: "Thứ 7: 9:00 - 12:00",
            responseTime: "Hỗ trợ 24/7 online"
        }
    ];

    const offices = [
        {
            city: "Hồ Chí Minh",
            address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            phone: "+84 28 1234 5678",
            email: "hcm@talkademy.com"
        },
        {
            city: "Hà Nội",
            address: "456 Lê Lợi, Quận Hoàn Kiếm, Hà Nội",
            phone: "+84 24 8765 4321",
            email: "hanoi@talkademy.com"
        },
        {
            city: "Đà Nẵng",
            address: "789 Lê Duẩn, Quận Hải Châu, Đà Nẵng",
            phone: "+84 236 9876 5432",
            email: "danang@talkademy.com"
        }
    ];

    const departments = [
        {
            name: "Hỗ trợ kỹ thuật",
            email: "support@talkademy.com",
            description: "Hỗ trợ về vấn đề kỹ thuật và sử dụng ứng dụng"
        },
        {
            name: "Tư vấn khóa học",
            email: "admissions@talkademy.com",
            description: "Tư vấn về các khóa học và chương trình học"
        },
        {
            name: "Hợp tác kinh doanh",
            email: "partnership@talkademy.com",
            description: "Cơ hội hợp tác và phát triển kinh doanh"
        },
        {
            name: "Truyền thông",
            email: "media@talkademy.com",
            description: "Thông tin báo chí và truyền thông"
        }
    ];

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Simulate API call with form values
            console.log('Form submitted with values:', values);
            await new Promise(resolve => setTimeout(resolve, 2000));
            message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            form.resetFields();
        } catch (err) {
            console.error('Submit error:', err);
            message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="hero-background">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-icon">
                            <CustomerServiceOutlined />
                        </div>
                        <Title level={1} className="hero-title">
                            Liên hệ với chúng tôi
                        </Title>
                        <Paragraph className="hero-subtitle">
                            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại tin nhắn hoặc liên hệ trực tiếp với chúng tôi.
                        </Paragraph>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <CheckCircleOutlined />
                                <span>Phản hồi 24/7</span>
                            </div>
                            <div className="stat-item">
                                <TeamOutlined />
                                <span>50k+ Học viên</span>
                            </div>
                            <div className="stat-item">
                                <HeartOutlined />
                                <span>Hỗ trợ tận tình</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy Contact Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="contact-info-section">
                <div className="container">
                    <Row gutter={[32, 32]}>
                        {contactInfo.map((info, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card
                                    className={`info-card animated-card ${visibleCards.includes(index) ? 'card-animate-in' : ''
                                        }`}
                                    hoverable
                                    data-index={index}
                                >
                                    <div className="info-icon pulse-animation">{info.icon}</div>
                                    <Title level={4} className="info-title">{info.title}</Title>
                                    <Text className="info-content">{info.content}</Text>
                                    <Text className="info-description">{info.description}</Text>
                                    {info.additional && (
                                        <Text className="info-additional">{info.additional}</Text>
                                    )}
                                    <Text className="info-response">{info.responseTime}</Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="container">
                    <Row gutter={[48, 48]}>
                        {/* Contact Form */}
                        <Col xs={24} lg={14}>
                        <Card className="details-card">
                                    <Title level={3}>Thông tin liên hệ</Title>
                                    <Paragraph>
                                        Chúng tôi có mặt tại nhiều thành phố lớn để phục vụ bạn tốt nhất.
                                    </Paragraph>

                                    <div className="offices-list">
                                        {offices.map((office, index) => (
                                            <div key={index} className="office-item hover-effect">
                                                <Title level={5}>{office.city}</Title>
                                                <div className="office-details">
                                                    <Text className="office-address hover-item">
                                                        <EnvironmentOutlined className="icon-bounce" /> {office.address}
                                                    </Text>
                                                    <Text className="office-phone hover-item">
                                                        <PhoneOutlined className="icon-bounce" /> {office.phone}
                                                    </Text>
                                                    <Text className="office-email hover-item">
                                                        <MailOutlined className="icon-bounce" /> {office.email}
                                                    </Text>
                                                </div>
                                                {index < offices.length - 1 && <Divider />}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                        </Col>

                        {/* Contact Details */}
                        <Col xs={24} lg={10}>
                            <div className="contact-details slide-in-right">
                               

                                <Card className="departments-card">
                                    <Title level={3}>Liên hệ theo phòng ban</Title>
                                    <div className="departments-list">
                                        {departments.map((dept, index) => (
                                            <div key={index} className="department-item hover-effect">
                                                <Title level={5}>{dept.name}</Title>
                                                <Text className="department-email hover-item">{dept.email}</Text>
                                                <Text className="department-description">{dept.description}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Câu hỏi thường gặp
                    </Title>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={12}>
                            <Card className="faq-card">
                                <Title level={4}>Làm thế nào để đăng ký khóa học?</Title>
                                <Paragraph>
                                    Bạn có thể đăng ký khóa học trực tiếp trên website hoặc liên hệ với chúng tôi qua hotline.
                                    Chúng tôi sẽ tư vấn khóa học phù hợp nhất với nhu cầu của bạn.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card className="faq-card">
                                <Title level={4}>Thời gian phản hồi là bao lâu?</Title>
                                <Paragraph>
                                    Chúng tôi cam kết phản hồi mọi yêu cầu trong vòng 24 giờ làm việc.
                                    Đối với các vấn đề khẩn cấp, vui lòng gọi hotline để được hỗ trợ ngay lập tức.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card className="faq-card">
                                <Title level={4}>Có hỗ trợ học thử không?</Title>
                                <Paragraph>
                                    Có, chúng tôi cung cấp chương trình học thử miễn phí trong 7 ngày đầu.
                                    Bạn có thể trải nghiệm đầy đủ các tính năng trước khi quyết định đăng ký.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card className="faq-card">
                                <Title level={4}>Làm sao để hủy khóa học?</Title>
                                <Paragraph>
                                    Bạn có thể hủy khóa học bất kỳ lúc nào thông qua tài khoản cá nhân hoặc liên hệ trực tiếp.
                                    Chúng tôi sẽ hoàn tiền theo chính sách đã cam kết.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <div className="container">
                    <Card className="cta-card">
                        <Row gutter={[48, 48]} align="middle">
                            <Col xs={24} lg={8}>
                                <div className="cta-mascot">
                                    <img
                                        src={mascot3}
                                        alt="Talkademy CTA Mascot"
                                        className="cta-mascot-image"
                                    />
                                </div>
                            </Col>
                            <Col xs={24} lg={16}>
                                <div className="cta-content">
                                    <Title level={2}>Sẵn sàng bắt đầu?</Title>
                                    <Paragraph>
                                        Tham gia cùng hơn 50,000 học viên đã tin tưởng Talkademy để học tiếng Việt
                                    </Paragraph>
                                    <div className="cta-buttons">
                                        <Button
                                            type="primary"
                                            size="large"
                                            icon={<MessageOutlined />}
                                            className="cta-btn-primary"
                                        >
                                            Liên hệ ngay
                                        </Button>
                                        <Button
                                            size="large"
                                            icon={<GlobalOutlined />}
                                            className="cta-btn-secondary"
                                        >
                                            Xem website
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;

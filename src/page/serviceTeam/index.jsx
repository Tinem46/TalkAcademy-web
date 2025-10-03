import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Divider, Timeline, Avatar, Statistic, Tag } from 'antd';
import {
    BookOutlined,
    UserOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    StarOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined,
    PlayCircleOutlined,
    SoundOutlined,
    MessageOutlined,
    ThunderboltOutlined,
    RobotOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot2 from '../../assets/Mascot/Asset 2omg.png';

const { Title, Paragraph, Text } = Typography;

const Services = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedCards, setAnimatedCards] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        // Stagger card animations
        const timer = setTimeout(() => {
            setAnimatedCards([0, 1, 2, 3]);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            id: 1,
            title: "AI Pronunciation Coach",
            description: "Ứng dụng học phát âm tiếng Việt thông minh với công nghệ AI nhận diện giọng nói, giúp bạn cải thiện phát âm một cách chính xác và hiệu quả.",
            icon: <SoundOutlined />,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            features: ["AI phân tích phát âm", "Phản hồi tức thì", "Luyện tập cá nhân hóa", "Theo dõi tiến độ chi tiết", "Chế độ offline"],
            price: "Miễn phí",
            originalPrice: "199,000 VNĐ/tháng",
            duration: "Vô thời hạn",
            level: "Mọi cấp độ",
            students: 15000,
            rating: 4.9,
            lessons: "Unlimited",
            certificate: false,
            liveSessions: 0,
            support: "In-app"
        },
        {
            id: 2,
            title: "AI Voice Training",
            description: "Luyện tập phát âm với các tình huống giao tiếp thực tế, AI sẽ đánh giá và đưa ra gợi ý cải thiện giọng nói của bạn.",
            icon: <MessageOutlined />,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            features: ["Tình huống giao tiếp thực tế", "AI đánh giá giọng nói", "Luyện tập hội thoại", "Phân tích ngữ điệu", "Chế độ luyện tập nhóm"],
            price: "Miễn phí",
            originalPrice: "299,000 VNĐ/tháng",
            duration: "Vô thời hạn",
            level: "Mọi cấp độ",
            students: 12000,
            rating: 4.8,
            lessons: "Unlimited",
            certificate: false,
            liveSessions: 0,
            support: "In-app"
        },
        {
            id: 3,
            title: "AI Accent Analyzer",
            description: "Phân tích và cải thiện giọng điệu tiếng Việt của bạn với công nghệ AI tiên tiến, giúp bạn nói như người bản xứ.",
            icon: <ThunderboltOutlined />,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            features: ["Phân tích giọng điệu", "So sánh với người bản xứ", "Luyện tập chuyên sâu", "Báo cáo chi tiết", "Chế độ thử thách"],
            price: "Miễn phí",
            originalPrice: "399,000 VNĐ/tháng",
            duration: "Vô thời hạn",
            level: "Mọi cấp độ",
            students: 8500,
            rating: 4.7,
            lessons: "Unlimited",
            certificate: false,
            liveSessions: 0,
            support: "In-app"
        },
        {
            id: 4,
            title: "AI Speech Therapist",
            description: "Trợ lý AI cá nhân hóa giúp bạn cải thiện giọng nói tiếng Việt với các bài tập được thiết kế riêng cho từng cá nhân.",
            icon: <RobotOutlined />,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            features: ["AI cá nhân hóa", "Bài tập riêng biệt", "Theo dõi tiến độ", "Lịch luyện tập thông minh", "Hỗ trợ 24/7"],
            price: "Miễn phí",
            originalPrice: "599,000 VNĐ/tháng",
            duration: "Vô thời hạn",
            level: "Mọi cấp độ",
            students: 20000,
            rating: 4.9,
            lessons: "Unlimited",
            certificate: false,
            liveSessions: 0,
            support: "AI Assistant"
        }
    ];

    const processSteps = [
        {
            title: "Tải ứng dụng",
            description: "Tải xuống ứng dụng Talkademy AI miễn phí từ App Store hoặc Google Play",
            icon: <UserOutlined />
        },
        {
            title: "Kiểm tra giọng nói",
            description: "Làm bài kiểm tra phát âm để AI đánh giá trình độ và xác định điểm cần cải thiện",
            icon: <BookOutlined />
        },
        {
            title: "Chọn chế độ luyện tập",
            description: "Lựa chọn chế độ luyện tập phù hợp: Phát âm cơ bản, Giao tiếp, Phân tích giọng điệu",
            icon: <PlayCircleOutlined />
        },
        {
            title: "Luyện tập với AI",
            description: "Bắt đầu luyện tập với AI, nhận phản hồi tức thì và cải thiện giọng nói của bạn",
            icon: <TrophyOutlined />
        }
    ];

    const stats = [
        { title: "Người dùng đã tải", value: "50+", icon: <UserOutlined /> },
        { title: "Tính năng AI", value: "15+", icon: <BookOutlined /> },
        { title: "Tỷ lệ cải thiện", value: "98%", icon: <TrophyOutlined /> },
        { title: "Đánh giá trung bình", value: "4.9/5", icon: <ClockCircleOutlined /> }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <div className="services-hero">
                <div className="hero-background">
                    <div className="floating-elements">
                        <div className="floating-icon icon-1"><SoundOutlined /></div>
                        <div className="floating-icon icon-2"><MessageOutlined /></div>
                        <div className="floating-icon icon-3"><RobotOutlined /></div>
                        <div className="floating-icon icon-4"><ThunderboltOutlined /></div>
                        <div className="floating-icon icon-5"><BookOutlined /></div>
                        <div className="floating-icon icon-6"><TrophyOutlined /></div>
                    </div>
                    <div className="hero-particles">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className={`particle particle-${i % 3}`}></div>
                        ))}
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className={`hero-ai-icon ${isVisible ? 'animate-in' : ''}`}>
                            <RobotOutlined />
                        </div>
                        <Title level={1} className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
                            App học cải thiện giọng nói với AI
                        </Title>
                        <Paragraph className={`hero-subtitle ${isVisible ? 'animate-in delay-1' : ''}`}>
                            Ứng dụng thông minh sử dụng công nghệ AI để giúp bạn cải thiện phát âm tiếng Việt một cách chính xác và hiệu quả
                        </Paragraph>
                        <Button type="primary" size="large" className={`cta-button ${isVisible ? 'animate-in delay-2' : ''}`}>
                            Bắt đầu học ngay
                        </Button>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy Services Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="container">
                    <Row gutter={[32, 32]}>
                        {stats.map((stat, index) => (
                            <Col xs={12} sm={6} key={index}>
                                <Card className="stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <Statistic
                                        title={stat.title}
                                        value={stat.value}
                                        valueStyle={{ color: '#4A90E2', fontSize: '2rem' }}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Các khóa học của chúng tôi
                    </Title>
                    <Paragraph className="section-subtitle">
                        Chọn khóa học phù hợp với trình độ và mục tiêu của bạn
                    </Paragraph>

                    <Row gutter={[32, 32]}>
                        {services.map((service, index) => (
                            <Col xs={24} lg={12} key={service.id}>
                                <Card
                                    className={`service-card ${animatedCards.includes(index) ? 'animate-card' : ''}`}
                                    hoverable
                                    style={{
                                        animationDelay: `${index * 0.2}s`,
                                        background: service.gradient
                                    }}
                                >
                                    <div className="service-header">
                                        <div className="service-icon pulse-animation">{service.icon}</div>
                                        <div className="service-info">
                                            <Title level={3}>{service.title}</Title>
                                            <div className="price-section">
                                                <Text className="service-price">{service.price}</Text>
                                                <Text className="original-price">{service.originalPrice}</Text>
                                            </div>
                                            <div className="service-badges">
                                                <Tag color="green">{service.level}</Tag>
                                                <Tag color="blue">{service.duration}</Tag>
                                            </div>
                                        </div>
                                    </div>

                                    <Paragraph className="service-description">
                                        {service.description}
                                    </Paragraph>

                                    <div className="service-features">
                                        <Title level={5}>Tính năng:</Title>
                                        <ul>
                                            {service.features.map((feature, index) => (
                                                <li key={index}>
                                                    <CheckCircleOutlined className="feature-icon" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="service-stats">
                                        <div className="stat-item">
                                            <Text strong>{service.students.toLocaleString()}</Text>
                                            <Text>học viên</Text>
                                        </div>
                                        <div className="stat-item">
                                            <Text strong>{service.rating}</Text>
                                            <Text>⭐ đánh giá</Text>
                                        </div>
                                        <div className="stat-item">
                                            <Text strong>{service.lessons}</Text>
                                            <Text>bài học</Text>
                                        </div>
                                    </div>

                                    <div className="service-details">
                                        <div className="detail-row">
                                            <Text>📱 Ứng dụng: {service.certificate ? 'Có chứng chỉ' : 'Miễn phí'}</Text>
                                        </div>
                                        <div className="detail-row">
                                            <Text>🤖 AI: {service.liveSessions === 0 ? 'Hỗ trợ 24/7' : service.liveSessions + ' buổi'}</Text>
                                        </div>
                                        <div className="detail-row">
                                            <Text>🆘 Hỗ trợ: {service.support}</Text>
                                        </div>
                                    </div>

                                    <Button type="primary" block className="service-button">
                                        Tải ứng dụng
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Process Section */}
            <div className="process-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Quy trình học tập
                    </Title>
                    <Paragraph className="section-subtitle">
                        Bắt đầu hành trình học tiếng Việt của bạn chỉ với 4 bước đơn giản
                    </Paragraph>

                    <Timeline
                        items={processSteps.map((step) => ({
                            dot: <div className="process-icon">{step.icon}</div>,
                            children: (
                                <div className="process-content">
                                    <Title level={4}>{step.title}</Title>
                                    <Paragraph>{step.description}</Paragraph>
                                </div>
                            )
                        }))}
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <div className="container">
                    <Card className="cta-card">
                        <Row gutter={[48, 48]} align="middle">
                            <Col xs={24} lg={16}>
                                <div className="cta-content">
                                    <Title level={2}>Sẵn sàng cải thiện giọng nói?</Title>
                                    <Paragraph>
                                        Tải xuống ứng dụng Talkademy AI và tham gia cùng hơn 100,000 người dùng đã cải thiện giọng nói tiếng Việt
                                    </Paragraph>
                                    <div className="cta-buttons">
                                        <Button type="primary" size="large">
                                            Tải ứng dụng miễn phí
                                        </Button>
                                        <Button size="large">
                                            Xem demo
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} lg={8}>
                                <div className="cta-mascot">
                                    <img
                                        src={mascot2}
                                        alt="Talkademy CTA Mascot"
                                        className="cta-mascot-image"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Services;

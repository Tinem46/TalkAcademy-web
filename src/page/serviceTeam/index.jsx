import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button, Divider, Timeline, Avatar, Statistic, Tag } from 'antd';
import {
    BookOutlined,
    UserOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    // CheckCircleOutlined, // <-- Đã xóa
    // StarOutlined,         // <-- Đã xóa
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
    // const [animatedCards, setAnimatedCards] = useState([]); // <-- Đã xóa

    useEffect(() => {
        setIsVisible(true);
        // Phần timer cho animatedCards đã được xóa
    }, []);

    // Mảng 'services' đã được xóa

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

            {/* ===== PHẦN SERVICES SECTION ĐÃ BỊ XÓA ===== */}
            
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
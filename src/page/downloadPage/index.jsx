import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import {
    AppleOutlined,
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
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png'; // Đảm bảo đường dẫn này đúng
import mascot3 from '../../assets/Mascot/Asset 3talking.png'; // Đảm bảo đường dẫn này đúng

const { Title, Paragraph } = Typography;

const DownloadPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const whyFeatures = [
        {
            icon: <ThunderboltOutlined />,
            title: "Học mọi lúc, mọi nơi",
            description: "Luyện tập ngay cả khi đang di chuyển, giờ nghỉ trưa, hoặc bất cứ khi nào bạn rảnh rỗi."
        },
        {
            icon: <RobotOutlined />,
            title: "Phản hồi AI tức thì",
            description: "Ghi âm giọng nói của bạn và nhận phân tích, chấm điểm chi tiết ngay-trên-điện-thoại."
        },
        {
            icon: <CalendarOutlined />,
            title: "Nhắc nhở lộ trình",
            description: "Bật thông báo để giữ vững thói quen luyện tập, không bao giờ bỏ lỡ buổi học."
        }
    ];

    return (
        // Đổi tên class gốc thành "talkademy-download"
        <div className="talkademy-download">
            {/* Hero Section (Sử dụng lại class và style của about-hero) */}
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
                        <Button type="primary" size="large" className={`cta-button ${isVisible ? 'animate-in delay-2' : ''}`} href="#download-links">
                            Tải ngay
                        </Button>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy Download Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Links Section (Style mới) */}
            <div id="download-links" className="download-links-section">
                <div className="download-container">
                    <Title level={2} className="section-title">Chọn nền tảng của bạn</Title>
                    <Row gutter={[24, 24]} justify="center">
                      
                      
                        {/* Android Card */}
                        <Col xs={24} md={10}>
                            <Card className="download-card" hoverable>
                                <div className="download-card-icon android">
                                    <AndroidOutlined />
                                </div>
                                <Title level={3}>Tải về cho Android</Title>
                                <Paragraph>Yêu cầu Android 8.0 trở lên. Sẵn có trên Google Play.</Paragraph>
                                <Button type="primary" size="large" icon={<DownloadOutlined />} href="https://play.google.com" target="_blank" className="download-button">
                                    Google Play
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Values Section (Sử dụng lại class và style của values-section) */}
            <div className="values-section">
                <div className="values-background"></div>
                <div className="values-container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={16}>
                            <Title level={2} className="section-title" style={{ textAlign: 'left', marginBottom: '40px' }}>Tại sao nên học trên di động?</Title>
                            <Row gutter={[24, 24]}>
                                {whyFeatures.map((feature, index) => (
                                    <Col xs={24} md={8} key={index}>
                                        <Card className="value-card">
                                            <div className="value-icon">
                                                {feature.icon}
                                            </div>
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
                                    style={{ width: '300px' }} // Tùy chỉnh kích thước nếu cần
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
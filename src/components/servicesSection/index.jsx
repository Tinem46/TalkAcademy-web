import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import {
    ThunderboltOutlined,
    RiseOutlined,
    SoundOutlined,
    MessageOutlined
} from '@ant-design/icons';
import './index.scss';

const { Title, Paragraph } = Typography;

const ServicesSection = () => {
    const services = [
        {
            title: "Tốc Độ",
            icon: <ThunderboltOutlined />,
            color: "#43B7FA"
        },
        {
            title: "Ngữ Điệu",
            icon: <RiseOutlined />,
            color: "#43B7FA"
        },
        {
            title: "Năng Lượng",
            icon: <ThunderboltOutlined />,
            color: "#43B7FA"
        },
        {
            title: "Phát Âm",
            icon: <MessageOutlined />,
            color: "#43B7FA"
        }
    ];

    return (
        <div className="services-section">
            <div className="services-background">
            </div>
            <div className="services-container">
                <Title level={2} className="section-title" data-aos="fade-up" data-aos-delay="100">Dịch Vụ</Title>
                <Paragraph className="section-subtitle" data-aos="fade-up" data-aos-delay="200">Chúng tôi cung cấp những bài tập giúp bạn cải thiện các yếu tố về giọng nói</Paragraph>
                <Row gutter={[24, 24]} className="services-grid">
                    {services.map((service, index) => (
                        <Col xs={12} sm={6} key={index}>
                            <Card className="service-card" data-aos="zoom-in" data-aos-delay={300 + index * 100}>
                                <div className="service-icon" style={{ color: service.color }}>
                                    {service.icon}
                                </div>
                                <Title level={4} className="service-title">{service.title}</Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ServicesSection;

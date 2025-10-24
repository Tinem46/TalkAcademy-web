import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import {
    ThunderboltOutlined,
    RiseOutlined,
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
            <div className="services-section__background">
                {/* ===== THÊM HIỆU ỨNG BONG BÓNG BAY VÀO NỀN ===== */}
                <ul className="services-water-drops">
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                    <li className="services-water-drops__item"></li>
                </ul>
            </div>
            
            <div className="services-section__container">
                <Title level={1} className="services-section__title" data-aos="fade-up" data-aos-delay="100">
                    Dịch Vụ
                </Title>
                <Paragraph className="services-section__subtitle" data-aos="fade-up" data-aos-delay="200">
                    Chúng tôi cung cấp những bài tập giúp bạn cải thiện các yếu tố về giọng nói
                </Paragraph>
                
                <Row gutter={[24, 24]} className="services-section__grid">
                    {services.map((service, index) => (
                        <Col xs={12} sm={6} key={index} className="services-section__grid-item">
                            
                            {/* ===== THÊM CLASS 'is-droplet' VÀO CARD ===== */}
                            <Card 
                                className="service-card is-droplet" 
                                data-aos="zoom-in" 
                                data-aos-delay={300 + index * 100}
                            >
                                <div className="service-card__icon" style={{ color: service.color }}>
                                    {service.icon}
                                </div>
                                <Title level={4} className="service-card__title">
                                    {service.title}
                                </Title>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ServicesSection;
import React from 'react';
import { Row, Col, Typography } from 'antd';
import {
    TeamOutlined,
    SyncOutlined,
    StarOutlined
} from '@ant-design/icons';
import './index.scss';

const { Title, Text } = Typography;

const WhySection = () => {
    const whyTalkademy = [
        {
            title: "Thân thiện",
            description: "Các bài học gần gũi với người dùng mới",
            icon: <TeamOutlined />,
            color: "#1890ff"
        },
        {
            title: "Đơn giản",
            description: "Giao diện đơn giản dễ nhìn",
            icon: <SyncOutlined />,
            color: "#1890ff"
        },
        {
            title: "Hiện đại",
            description: "Tích hợp nhiều công nghệ tương lai",
            icon: <StarOutlined />,
            color: "#1890ff"
        }
    ];

    return (
        <div className="why-section">
            <div className="why-container">
                <Title level={2} className="section-title" data-aos="fade-up" data-aos-delay="100">Về Talkademy</Title>
                <Row gutter={[48, 48]} className="why-grid">
                    {whyTalkademy.map((item, index) => (
                        <Col xs={24} sm={8} key={index}>
                            <div className="why-item" data-aos="flip-up" data-aos-delay={200 + index * 150}>
                                <div className="why-icon-circle">
                                    <div className="why-icon" style={{ color: item.color }}>
                                        {item.icon}
                                    </div>
                                </div>
                                <Title level={3} className="why-title">{item.title}</Title>
                                <Text className="why-description">{item.description}</Text>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default WhySection;

import React, { useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import {
    TeamOutlined,
    SyncOutlined,
    StarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Component to dynamically inject CSS styles into the document head
const WhySectionStyles = () => {
    useEffect(() => {
        const styleId = 'why-section-styles';
        // Avoid adding duplicate styles
        if (document.getElementById(styleId)) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .why-section {
                position: relative;
                padding: 40px 0;
                background: linear-gradient(90deg, #B8E6FF 0%, #B8E6FF 8.33%, #A8D8F0 8.33%, #A8D8F0 16.66%, #B8E6FF 16.66%, #B8E6FF 25%, #A8D8F0 25%, #A8D8F0 33.33%, #B8E6FF 33.33%, #B8E6FF 41.66%, #A8D8F0 41.66%, #A8D8F0 50%, #B8E6FF 50%, #B8E6FF 58.33%, #A8D8F0 58.33%, #A8D8F0 66.66%, #B8E6FF 66.66%, #B8E6FF 75%, #A8D8F0 75%, #A8D8F0 83.33%, #B8E6FF 83.33%, #B8E6FF 91.66%, #A8D8F0 91.66%, #A8D8F0 100%);
            }

            .why-section .why-container {
                position: relative;
                z-index: 2;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }

            .why-section .section-title {
                text-align: center;
                font-size: 32px;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 60px;
            }

            .why-section .why-grid .why-item {
                text-align: center;
                padding: 30px;
                transition: all 0.3s ease;
                height: 100%;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .why-section .why-grid .why-item .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.7s linear;
                background-color: rgba(255, 255, 255, 0.6);
            }

            .why-section .why-grid .why-item .why-icon-circle {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: #5DADE2;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px auto;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(93, 173, 226, 0.3);
            }

            .why-section .why-grid .why-item .why-icon-circle .why-icon {
                font-size: 3rem;
                color: #ffffff !important;
                display: block;
                transition: all 0.3s ease;
            }

            .why-section .why-grid .why-item .why-title {
                font-size: 1.8rem;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 15px !important;
                margin-top: 0 !important;
            }

            .why-section .why-grid .why-item .why-description {
                font-size: 1rem;
                color: #34495e;
                line-height: 1.6;
                display: block;
                font-weight: 400;
            }

            .why-section .why-grid .why-item:hover .why-icon-circle {
                transform: translateY(-5px);
                box-shadow: 0 12px 30px rgba(93, 173, 226, 0.4);
            }

            .why-section .why-grid .why-item:hover .why-icon {
                transform: scale(1.1);
            }

            @media (max-width: 768px) {
                .why-section .why-container { padding: 0 16px; }
                .why-section .section-title { font-size: 2rem; margin-bottom: 40px; }
                .why-section .why-grid .why-item .why-icon-circle { width: 100px; height: 100px; margin-bottom: 20px; }
                .why-section .why-grid .why-item .why-icon-circle .why-icon { font-size: 2.5rem; }
                .why-section .why-grid .why-item .why-title { font-size: 1.5rem; }
                .why-section .why-grid .why-item .why-description { font-size: 0.9rem; }
            }

            @media (max-width: 480px) {
                .why-section .why-container { padding: 0 12px; }
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove styles when component unmounts
        return () => {
            const styleElement = document.getElementById(styleId);
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    return null; // This component does not render anything itself
};


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

    /**
     * Handles the creation of a ripple effect on click.
     * @param {React.MouseEvent<HTMLDivElement>} event The click event.
     */
    const createRipple = (event) => {
        const item = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(item.clientWidth, item.clientHeight);
        const radius = diameter / 2;
        const rect = item.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const oldRipple = item.querySelector(".ripple");
        if (oldRipple) {
            oldRipple.remove();
        }

        item.appendChild(circle);

        setTimeout(() => {
            if (circle.parentElement) {
                circle.remove();
            }
        }, 700);
    };

    return (
        <>
            <WhySectionStyles />
            <div className="why-section">
                <div className="why-container">
                    <Title level={2} className="section-title" data-aos="fade-up" data-aos-delay="100">Về Talkademy</Title>
                    <Row gutter={[48, 48]} className="why-grid">
                        {whyTalkademy.map((item, index) => (
                            <Col xs={24} sm={8} key={index}>
                                <div
                                    className="why-item"
                                    data-aos="flip-up"
                                    data-aos-delay={200 + index * 150}
                                    onClick={createRipple}
                                >
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
        </>
    );
};

export default WhySection;


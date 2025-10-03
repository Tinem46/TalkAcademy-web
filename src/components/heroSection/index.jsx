import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="hero-section">
            <div className="hero-background">
                <div className="hero-dots">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                    <div className="dot dot-4"></div>
                    <div className="dot dot-5"></div>
                    <div className="dot dot-6"></div>
                    <div className="dot dot-7"></div>
                    <div className="dot dot-8"></div>
                    <div className="dot dot-9"></div>
                    <div className="dot dot-10"></div>
                    <div className="dot dot-11"></div>
                    <div className="dot dot-12"></div>
                    <div className="dot dot-13"></div>
                    <div className="dot dot-14"></div>
                    <div className="dot dot-15"></div>
                </div>
            </div>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text" data-aos="fade-right" data-aos-delay="200">
                        <div className="hero-dot" data-aos="zoom-in" data-aos-delay="100"></div>
                        <Title level={1} className="hero-title gradient-text" data-aos="fade-up" data-aos-delay="300">
                            Cùng <span className="highlight">Talkademy</span> khám phá sức mạnh ngôn ngữ <span className="highlight">Việt</span> – thắp sáng <span className="highlight">tiếng nói</span> của riêng bạn!
                        </Title>
                        <Paragraph className="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
                            Cùng Talkademy khám phá sức mạnh ngôn ngữ Việt – thắp sáng tiếng nói của riêng bạn!
                        </Paragraph>
                        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="500">
                            <Button
                                type="primary"
                                size="large"
                                className="start-btn"
                                onClick={() => navigate('/register')}
                            >
                                Bắt đầu ngay
                            </Button>
                            <Button
                                size="large"
                                className="learn-more-btn"
                                icon={<PlayCircleOutlined />}
                                onClick={() => navigate('/about')}
                            >
                                Tìm hiểu thêm
                            </Button>
                        </div>
                    </div>
                    <div className="hero-mascot" data-aos="fade-left" data-aos-delay="600">
                        <div className="mascot-character mascot-float">
                            <img
                                src={mascot1}
                                alt="Talkademy Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

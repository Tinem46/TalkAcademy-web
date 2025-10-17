import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Timeline, Avatar, Statistic, Divider, Button } from 'antd';
import {
    BookOutlined,
    TeamOutlined,
    TrophyOutlined,
    GlobalOutlined,
    UserOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    HistoryOutlined,
    BulbOutlined,
    RiseOutlined,
    CrownOutlined,
    SoundOutlined,
    MessageOutlined,
    RobotOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot2 from '../../assets/Mascot/Asset 1longlanh.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const talkademyHistory = [
        {
            period: "Tháng 1/2024",
            title: "Ý tưởng ra đời",
            description: "Talkademy được sinh ra từ ý tưởng giúp mọi người tự tin giao tiếp bằng tiếng Việt một cách hiệu quả.",
            icon: <BulbOutlined />,
            image: "https://as1.ftcdn.net/v2/jpg/01/19/05/22/1000_F_119052217_gAwyDd7P5TeVOhZpald12AxYBP7Ya1V6.jpg"
        },
        {
            period: "Tháng 3/2024",
            title: "Phát triển công nghệ AI",
            description: "Tích hợp công nghệ AI tiên tiến để phân tích và đánh giá giọng nói, phát âm của người học.",
            icon: <RobotOutlined />,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
        },
        {
            period: "Tháng 6/2024",
            title: "Ra mắt ứng dụng",
            description: "Chính thức ra mắt ứng dụng Talkademy với hơn 1,000 người dùng đăng ký trong tháng đầu tiên.",
            icon: <SoundOutlined />,
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
        },
        {
            period: "Tháng 9/2024",
            title: "Mở rộng tính năng",
            description: "Bổ sung các tính năng học tập cá nhân hóa và hệ thống phản hồi AI chuyên sâu.",
            icon: <MessageOutlined />,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        },
        {
            period: "Hiện tại",
            title: "Hành trình tiếp tục",
            description: "Tiếp tục phát triển và cải thiện để mang đến trải nghiệm học tiếng Việt tốt nhất cho mọi người.",
            icon: <TrophyOutlined />,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        }
    ];

    const talkademyFeatures = [
        {
            title: "Phát âm chuẩn",
            description: "Hệ thống AI phân tích và đánh giá phát âm của bạn, đưa ra gợi ý cải thiện cụ thể và chi tiết.",
            features: ["Phân tích âm thanh", "So sánh với chuẩn", "Gợi ý cải thiện"],
            image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
            icon: <SoundOutlined />
        },
        {
            title: "Ngữ điệu tự nhiên",
            description: "Luyện tập ngữ điệu và cách nhấn nhá trong câu để giao tiếp tự nhiên và thu hút hơn.",
            features: ["Luyện ngữ điệu", "Nhấn nhá đúng chỗ", "Giao tiếp tự nhiên"],
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            icon: <MessageOutlined />
        },
        {
            title: "Phản hồi AI thông minh",
            description: "Công nghệ AI tiên tiến đưa ra phản hồi tức thì và chính xác về cách diễn đạt của bạn.",
            features: ["Phản hồi tức thì", "Đánh giá chính xác", "Gợi ý cá nhân hóa"],
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
            icon: <RobotOutlined />
        },
        {
            title: "Lộ trình học tập cá nhân",
            description: "Mỗi người có lộ trình học tập riêng, phù hợp với trình độ và mục tiêu cá nhân.",
            features: ["Đánh giá trình độ", "Lộ trình riêng", "Theo dõi tiến độ"],
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
            icon: <BookOutlined />
        }
    ];

    const achievements = [
        {
            year: "Tháng 1/2024",
            title: "Thành lập Talkademy",
            description: "Talkademy được thành lập với sứ mệnh giúp mọi người tự tin giao tiếp bằng tiếng Việt"
        },
        {
            year: "Tháng 3/2024",
            title: "Phát triển MVP",
            description: "Hoàn thành phiên bản đầu tiên của ứng dụng với các tính năng cơ bản"
        },
        {
            year: "Tháng 6/2024",
            title: "Ra mắt ứng dụng",
            description: "Chính thức ra mắt ứng dụng học tiếng Việt với công nghệ AI tiên tiến"
        },
        {
            year: "Tháng 9/2024",
            title: "Mở rộng tính năng",
            description: "Bổ sung các tính năng học tập cá nhân hóa và hệ thống phản hồi AI"
        },
        {
            year: "Hiện tại",
            title: "Phát triển liên tục",
            description: "Tiếp tục cải thiện và nâng cấp để mang đến trải nghiệm tốt nhất"
        }
    ];



    return (
        <div className="talkademy-about">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="hero-background">
                    <div className="floating-elements">
                        <div className="floating-icon icon-1"><BookOutlined /></div>
                        <div className="floating-icon icon-2"><TeamOutlined /></div>
                        <div className="floating-icon icon-3"><TrophyOutlined /></div>
                        <div className="floating-icon icon-4"><GlobalOutlined /></div>
                        <div className="floating-icon icon-5"><HistoryOutlined /></div>
                        <div className="floating-icon icon-6"><CrownOutlined /></div>
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
                            Về chúng tôi - Talkademy
                        </Title>
                        <Paragraph className={`hero-subtitle ${isVisible ? 'animate-in delay-1' : ''}`}>
                            Khám phá câu chuyện đằng sau ứng dụng học tiếng Việt thông minh,
                            nơi công nghệ AI gặp gỡ tình yêu ngôn ngữ để tạo nên trải nghiệm học tập tuyệt vời
                        </Paragraph>
                        <Button type="primary" size="large" className={`cta-button ${isVisible ? 'animate-in delay-2' : ''}`}>
                            Tìm hiểu thêm
                        </Button>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy About Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="history-section">
                <div className="history-background"></div>
                <div className="history-container">
                    <Title level={2} className="section-title">Hành trình phát triển Talkademy</Title>
                    <Paragraph className="section-intro">
                        Từ ý tưởng ban đầu đến ứng dụng học tiếng Việt hàng đầu, Talkademy đã trải qua
                        một hành trình phát triển đầy thú vị và ý nghĩa, luôn đặt người học làm trung tâm.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        {talkademyHistory.map((period, index) => (
                            <Col xs={24} md={12} lg={8} key={index}>
                                <Card className="history-card" hoverable>
                                    <div className="period-image">
                                        <img src={period.image} alt={period.title} />
                                        <div className="period-icon-overlay">
                                            {period.icon}
                                        </div>
                                    </div>
                                    <div className="period-info">
                                        <Text className="period-time">{period.period}</Text>
                                        <Title level={4}>{period.title}</Title>
                                        <Paragraph>{period.description}</Paragraph>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <div className="features-background"></div>
                <div className="features-container">
                    <Title level={2} className="section-title">Tính năng nổi bật của Talkademy</Title>
                    <Paragraph className="section-intro">
                        Talkademy tích hợp công nghệ AI tiên tiến và phương pháp học tập hiện đại để mang đến
                        trải nghiệm học tiếng Việt tốt nhất. Mỗi tính năng được thiết kế để giúp bạn cải thiện
                        kỹ năng giao tiếp một cách hiệu quả và thú vị.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        {talkademyFeatures.map((feature, index) => (
                            <Col xs={24} md={12} key={index}>
                                <Card className="feature-card" hoverable>
                                    <div className="feature-image">
                                        <img src={feature.image} alt={feature.title} />
                                        <div className="feature-icon-overlay">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div className="feature-content">
                                        <Title level={3}>{feature.title}</Title>
                                        <Paragraph>{feature.description}</Paragraph>
                                        <Divider />
                                        <div className="features-list">
                                            <Title level={5}>Các tính năng chính:</Title>
                                            <ul>
                                                {feature.features.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Text>{item}</Text>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Values Section */}
            <div className="values-section">
                <div className="values-background"></div>
                <div className="values-container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={16}>
                            <Title level={2} className="section-title">Giá trị cốt lõi của Talkademy</Title>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={8}>
                                    <Card className="value-card">
                                        <div className="value-icon">
                                            <ThunderboltOutlined />
                                        </div>
                                        <Title level={3}>Tự tin giao tiếp</Title>
                                        <Paragraph>
                                            Chúng tôi tin rằng mọi người đều có thể tự tin giao tiếp bằng tiếng Việt.
                                            Talkademy giúp bạn xây dựng sự tự tin thông qua luyện tập và phản hồi tích cực.
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Card className="value-card">
                                        <div className="value-icon">
                                            <RobotOutlined />
                                        </div>
                                        <Title level={3}>Công nghệ AI tiên tiến</Title>
                                        <Paragraph>
                                            Sử dụng công nghệ AI mới nhất để phân tích và đánh giá giọng nói,
                                            mang đến trải nghiệm học tập cá nhân hóa và hiệu quả nhất.
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Card className="value-card">
                                        <div className="value-icon">
                                            <TeamOutlined />
                                        </div>
                                        <Title level={3}>Cộng đồng học tập</Title>
                                        <Paragraph>
                                            Xây dựng một cộng đồng học tập tích cực, nơi mọi người có thể
                                            chia sẻ kinh nghiệm và hỗ trợ lẫn nhau trong hành trình học tiếng Việt.
                                        </Paragraph>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} lg={8}>
                            <div className="values-mascot">
                                <img
                                    src={mascot2}
                                    alt="Talkademy Values Mascot"
                                    className="values-mascot-image"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Mission Section */}
            <div className="mission-section">
                <div className="mission-background"></div>
                <div className="mission-container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={14}>
                            <div className="mission-mascot">
                                <img
                                    src={mascot3}
                                    alt="Talkademy Mission Mascot"
                                    className="mission-mascot-image"
                                />
                            </div>
                        </Col>
                        <Col xs={24} lg={10}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <Card className="mission-card">
                                        <Title level={2}>Sứ mệnh</Title>
                                        <Paragraph>
                                            Talkademy cam kết giúp mọi người tự tin giao tiếp bằng tiếng Việt thông qua
                                            công nghệ AI tiên tiến và phương pháp học tập hiện đại. Chúng tôi tin rằng
                                            ngôn ngữ là cầu nối quan trọng giữa con người và văn hóa.
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card className="vision-card">
                                        <Title level={2}>Tầm nhìn</Title>
                                        <Paragraph>
                                            Trở thành ứng dụng học tiếng Việt hàng đầu thế giới, được tin dùng bởi
                                            hàng triệu người học. Talkademy sẽ tiếp tục đổi mới và phát triển để mang đến
                                            trải nghiệm học tập tốt nhất cho mọi người.
                                        </Paragraph>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Statistics Section */}


            {/* Timeline Section */}
            <div className="timeline-section">
                <div className="timeline-background"></div>
                <div className="timeline-container">
                    <Title level={2} className="section-title">Hành trình phát triển Talkademy</Title>
                    <Timeline
                        items={achievements.map(achievement => ({
                            children: (
                                <Card className="timeline-card">
                                    <div className="timeline-year">{achievement.year}</div>
                                    <Title level={4}>{achievement.title}</Title>
                                    <Paragraph>{achievement.description}</Paragraph>
                                </Card>
                            )
                        }))}
                    />
                </div>
            </div>

            {/* Team Section */}


            {/* Contact Info */}
            <div className="contact-section">
                <div className="contact-background"></div>
                <div className="contact-container">
                    <Card className="contact-card">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Title level={3}>Thông tin liên hệ</Title>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <EnvironmentOutlined />
                                        <Text>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</Text>
                                    </div>
                                    <div className="contact-item">
                                        <GlobalOutlined />
                                        <Text>www.talkademy.com</Text>
                                    </div>
                                    <div className="contact-item">
                                        <UserOutlined />
                                        <Text>support@talkademy.com</Text>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <Title level={3}>Giờ làm việc</Title>
                                <div className="working-hours">
                                    <div className="hours-item">
                                        <Text strong>Thứ 2 - Thứ 6:</Text>
                                        <Text>8:00 - 17:00</Text>
                                    </div>
                                    <div className="hours-item">
                                        <Text strong>Thứ 7:</Text>
                                        <Text>8:00 - 12:00</Text>
                                    </div>
                                    <div className="hours-item">
                                        <Text strong>Chủ nhật:</Text>
                                        <Text>Nghỉ</Text>
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

export default About;

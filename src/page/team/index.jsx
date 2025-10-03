import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Button, Divider, Timeline, Tag } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    LinkedinOutlined,
    GithubOutlined,
    TrophyOutlined,
    BookOutlined,
    StarOutlined,
    HeartOutlined,
    TeamOutlined,
    RocketOutlined,
    BulbOutlined,
    ThunderboltOutlined,
    RobotOutlined
} from '@ant-design/icons';
import './index.scss';
import mascot1 from '../../assets/Mascot/mascot Talkademy01.png';
import mascot2 from '../../assets/Mascot/Asset 1longlanh.png';

const { Title, Paragraph, Text } = Typography;

const Team = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedCards, setAnimatedCards] = useState([]);

    useEffect(() => {
        setIsVisible(true);
        // Stagger card animations
        const timer = setTimeout(() => {
            setAnimatedCards([0, 1, 2, 3, 4, 5]);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const teamMembers = [
        {
            id: 1,
            name: "Nguyễn Thị Minh",
            position: "Giám đốc điều hành",
            department: "Leadership",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Với hơn 10 năm kinh nghiệm trong lĩnh vực giáo dục ngôn ngữ, Minh đã dẫn dắt Talkademy trở thành nền tảng học tiếng Việt hàng đầu.",
            skills: ["Quản lý dự án", "Giáo dục", "Lãnh đạo", "Strategic Planning", "Team Building"],
            experience: "10+ năm",
            education: "Thạc sĩ Ngôn ngữ học - Đại học Quốc gia Hà Nội",
            achievements: ["Top 30 Under 30", "Education Innovation Award 2023"],
            languages: ["Tiếng Việt", "English", "日本語"],
            linkedin: "https://linkedin.com/in/minh-nguyen",
            github: "https://github.com/minh-nguyen",
            email: "minh@talkademy.com"
        },
        {
            id: 2,
            name: "David Johnson",
            position: "Trưởng phòng Công nghệ",
            department: "Technology",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Chuyên gia AI và Machine Learning với kinh nghiệm phát triển các ứng dụng học ngôn ngữ thông minh.",
            skills: ["AI/ML", "React", "Node.js", "Python", "TensorFlow"],
            experience: "8+ năm",
            education: "Tiến sĩ Khoa học Máy tính - MIT",
            achievements: ["Google AI Research Award", "Best Tech Innovation 2022"],
            languages: ["English", "Tiếng Việt", "Python", "JavaScript"],
            linkedin: "https://linkedin.com/in/david-johnson",
            github: "https://github.com/david-johnson",
            email: "david@talkademy.com"
        },
        {
            id: 3,
            name: "Trần Văn Hùng",
            position: "Giáo viên chính",
            department: "Education",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Giáo viên tiếng Việt chuyên nghiệp với phương pháp giảng dạy sáng tạo và hiệu quả.",
            skills: ["Giảng dạy", "Phát âm", "Ngữ pháp", "Curriculum Development", "Student Assessment"],
            experience: "12+ năm",
            education: "Cử nhân Sư phạm Tiếng Việt - Đại học Sư phạm Hà Nội",
            achievements: ["Best Teacher Award 2023", "Student Satisfaction 98%"],
            languages: ["Tiếng Việt", "English", "中文"],
            linkedin: "https://linkedin.com/in/hung-tran",
            github: "",
            email: "hung@talkademy.com"
        },
        {
            id: 4,
            name: "Sarah Chen",
            position: "Nhà thiết kế UX/UI",
            department: "Design",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Chuyên gia thiết kế trải nghiệm người dùng, tạo ra những giao diện thân thiện và dễ sử dụng.",
            skills: ["UI/UX", "Figma", "Prototyping", "User Research", "Design Systems"],
            experience: "6+ năm",
            education: "Cử nhân Thiết kế - Parsons School of Design",
            achievements: ["Design Excellence Award", "UX Innovation Prize"],
            languages: ["English", "中文", "Tiếng Việt"],
            linkedin: "https://linkedin.com/in/sarah-chen",
            github: "https://github.com/sarah-chen",
            email: "sarah@talkademy.com"
        },
        {
            id: 5,
            name: "Lê Thị Mai",
            position: "Chuyên gia nội dung",
            department: "Content",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Chuyên gia phát triển nội dung học tập, tạo ra các khóa học hấp dẫn và hiệu quả.",
            skills: ["Viết nội dung", "Curriculum Design", "E-learning", "Content Strategy", "Educational Technology"],
            experience: "7+ năm",
            education: "Thạc sĩ Giáo dục - Đại học Harvard",
            achievements: ["Content Innovation Award", "Educational Excellence"],
            languages: ["Tiếng Việt", "English", "Français"],
            linkedin: "https://linkedin.com/in/mai-le",
            github: "",
            email: "mai@talkademy.com"
        },
        {
            id: 6,
            name: "Michael Brown",
            position: "Chuyên gia Marketing",
            department: "Marketing",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            bio: "Chuyên gia marketing số với kinh nghiệm xây dựng thương hiệu và phát triển cộng đồng.",
            skills: ["Digital Marketing", "Branding", "Social Media", "Growth Hacking", "Analytics"],
            experience: "9+ năm",
            education: "MBA Marketing - Stanford University",
            achievements: ["Marketing Campaign of the Year", "Brand Growth 300%"],
            languages: ["English", "Español", "Tiếng Việt"],
            linkedin: "https://linkedin.com/in/michael-brown",
            github: "",
            email: "michael@talkademy.com"
        }
    ];

    const departments = [
        {
            name: "Leadership",
            description: "Định hướng chiến lược và phát triển tổ chức",
            color: "#4A90E2",
            count: 1
        },
        {
            name: "Technology",
            description: "Phát triển công nghệ và sản phẩm",
            color: "#52c41a",
            count: 1
        },
        {
            name: "Education",
            description: "Thiết kế và giảng dạy các khóa học",
            color: "#fa8c16",
            count: 1
        },
        {
            name: "Design",
            description: "Tạo ra trải nghiệm người dùng tuyệt vời",
            color: "#eb2f96",
            count: 1
        },
        {
            name: "Content",
            description: "Phát triển nội dung học tập chất lượng",
            color: "#722ed1",
            count: 1
        },
        {
            name: "Marketing",
            description: "Xây dựng thương hiệu và phát triển cộng đồng",
            color: "#13c2c2",
            count: 1
        }
    ];



    return (
        <div className="team-page">
            {/* Hero Section */}
            <div className="team-hero">
                <div className="hero-background">
                    <div className="floating-elements">
                        <div className="floating-icon icon-1"><TeamOutlined /></div>
                        <div className="floating-icon icon-2"><RocketOutlined /></div>
                        <div className="floating-icon icon-3"><BulbOutlined /></div>
                        <div className="floating-icon icon-4"><ThunderboltOutlined /></div>
                        <div className="floating-icon icon-5"><StarOutlined /></div>
                        <div className="floating-icon icon-6"><HeartOutlined /></div>
                    </div>
                    <div className="hero-particles">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`particle particle-${i % 4}`}></div>
                        ))}
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <div className={`hero-team-icon ${isVisible ? 'animate-in' : ''}`}>
                            <TeamOutlined />
                        </div>
                        <Title level={1} className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
                            Đội ngũ của chúng tôi
                        </Title>
                        <Paragraph className={`hero-subtitle ${isVisible ? 'animate-in delay-1' : ''}`}>
                            Gặp gỡ những con người tài năng đang tạo nên sự khác biệt trong việc học tiếng Việt
                        </Paragraph>
                    </div>
                    <div className="hero-mascot">
                        <div className="mascot-character">
                            <img
                                src={mascot1}
                                alt="Talkademy Team Mascot"
                                className="mascot-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}


            {/* Departments Section */}
            <div className="departments-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Các phòng ban
                    </Title>
                    <Paragraph className="section-subtitle">
                        Tổ chức chuyên nghiệp với các chuyên gia trong từng lĩnh vực
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        {departments.map((dept, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <Card
                                    className={`department-card ${isVisible ? 'animate-card' : ''}`}
                                    hoverable
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="department-header">
                                        <div
                                            className="department-color"
                                            style={{ backgroundColor: dept.color }}
                                        ></div>
                                        <div className="department-info">
                                            <Title level={4}>{dept.name}</Title>
                                            <Text className="department-count">{dept.count} thành viên</Text>
                                        </div>
                                    </div>
                                    <Paragraph className="department-description">
                                        {dept.description}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Team Members Section */}
            <div className="team-members-section">
                <div className="container">
                    <Title level={2} className="section-title">
                        Thành viên nổi bật
                    </Title>
                    <Paragraph className="section-subtitle">
                        Những gương mặt tiêu biểu đang dẫn dắt Talkademy
                    </Paragraph>

                    <Row gutter={[32, 32]}>
                        {teamMembers.map((member, index) => (
                            <Col xs={24} sm={12} lg={8} key={member.id}>
                                <Card
                                    className={`member-card ${animatedCards.includes(index) ? 'animate-member' : ''}`}
                                    hoverable
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    <div className="member-avatar">
                                        <div className="avatar-wrapper">
                                            <Avatar size={120} src={member.avatar} icon={<UserOutlined />} />
                                            <div className="avatar-overlay">
                                                <div className="department-badge" style={{ backgroundColor: departments.find(d => d.name === member.department)?.color }}>
                                                    {member.department}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="member-info">
                                        <Title level={3} className="member-name">{member.name}</Title>
                                        <Text className="member-position">{member.position}</Text>
                                        <Text className="member-department">{member.department}</Text>
                                    </div>

                                    <Paragraph className="member-bio">
                                        {member.bio}
                                    </Paragraph>

                                    <div className="member-details">
                                        <div className="detail-item">
                                            <Text strong>Kinh nghiệm:</Text>
                                            <Text>{member.experience}</Text>
                                        </div>
                                        <div className="detail-item">
                                            <Text strong>Học vấn:</Text>
                                            <Text>{member.education}</Text>
                                        </div>
                                        <div className="detail-item">
                                            <Text strong>Ngôn ngữ:</Text>
                                            <Text>{member.languages.join(", ")}</Text>
                                        </div>
                                    </div>

                                    <div className="member-achievements">
                                        <Title level={5}>Thành tích:</Title>
                                        <div className="achievement-list">
                                            {member.achievements.map((achievement, index) => (
                                                <Tag key={index} color="gold">{achievement}</Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="member-skills">
                                        <Title level={5}>Kỹ năng:</Title>
                                        <div className="skills-list">
                                            {member.skills.map((skill, index) => (
                                                <Tag key={index} color="blue">{skill}</Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="member-social">
                                        <Button type="text" icon={<MailOutlined />} href={`mailto:${member.email}`} />
                                        {member.linkedin && (
                                            <Button type="text" icon={<LinkedinOutlined />} href={member.linkedin} target="_blank" />
                                        )}
                                        {member.github && (
                                            <Button type="text" icon={<GithubOutlined />} href={member.github} target="_blank" />
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Culture Section */}
            <div className="culture-section">
                <div className="container">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={8}>
                            <div className="culture-mascot">
                                <img
                                    src={mascot2}
                                    alt="Talkademy Culture Mascot"
                                    className="culture-mascot-image"
                                />
                            </div>
                        </Col>
                        <Col xs={24} lg={8}>
                            <Title level={2}>Văn hóa công ty</Title>
                            <Paragraph>
                                Chúng tôi tin rằng môi trường làm việc tích cực và hỗ trợ lẫn nhau
                                là chìa khóa để tạo ra những sản phẩm tuyệt vời. Tại Talkademy,
                                mỗi thành viên đều được khuyến khích phát triển và đóng góp ý tưởng.
                            </Paragraph>

                            <div className="culture-values">
                                <div className="value-item">
                                    <HeartOutlined className="value-icon" />
                                    <div>
                                        <Title level={4}>Đam mê</Title>
                                        <Text>Yêu thích công việc và luôn cố gắng hết mình</Text>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <StarOutlined className="value-icon" />
                                    <div>
                                        <Title level={4}>Chất lượng</Title>
                                        <Text>Luôn hướng đến sự hoàn hảo trong mọi sản phẩm</Text>
                                    </div>
                                </div>
                                <div className="value-item">
                                    <TrophyOutlined className="value-icon" />
                                    <div>
                                        <Title level={4}>Thành công</Title>
                                        <Text>Đo lường thành công bằng sự hài lòng của khách hàng</Text>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={8}>
                            <div className="culture-image">
                                <div className="team-collage">
                                    <div className="collage-item item-1">
                                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team meeting" />
                                    </div>
                                    <div className="collage-item item-2">
                                        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team collaboration" />
                                    </div>
                                    <div className="collage-item item-3">
                                        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team celebration" />
                                    </div>
                                    <div className="collage-item item-4">
                                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team workspace" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* CTA Section */}

        </div>
    );
};

export default Team;

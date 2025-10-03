import React, { useState } from 'react';
import { Card, Row, Col, Typography, Progress, Statistic, Timeline, List, Avatar, Button, Tabs, Tag } from 'antd';
import {
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    StarOutlined,
    CalendarOutlined,
    UserOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import './index.scss';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const userStats = {
        totalStudyTime: 45,
        completedLessons: 12,
        totalLessons: 20,
        averageScore: 8.5,
        streak: 7,
        rank: 15
    };

    const recentActivities = [
        {
            id: 1,
            type: 'lesson',
            title: 'Hoàn thành bài học: Phát âm tiếng Việt',
            time: '2 giờ trước',
            icon: <CheckCircleOutlined />,
            color: 'green'
        },
        {
            id: 2,
            type: 'quiz',
            title: 'Làm bài kiểm tra: Ngữ pháp cơ bản',
            score: 9,
            time: '1 ngày trước',
            icon: <TrophyOutlined />,
            color: 'blue'
        },
        {
            id: 3,
            type: 'material',
            title: 'Tải xuống: Tài liệu học tiếng Việt',
            time: '2 ngày trước',
            icon: <FileTextOutlined />,
            color: 'orange'
        },
        {
            id: 4,
            type: 'lesson',
            title: 'Bắt đầu bài học: Giao tiếp hàng ngày',
            time: '3 ngày trước',
            icon: <BookOutlined />,
            color: 'purple'
        }
    ];

    const achievements = [
        {
            id: 1,
            title: 'Học sinh chăm chỉ',
            description: 'Học liên tiếp 7 ngày',
            icon: <StarOutlined />,
            earned: true
        },
        {
            id: 2,
            title: 'Thiên tài ngôn ngữ',
            description: 'Đạt điểm trung bình trên 9.0',
            icon: <TrophyOutlined />,
            earned: true
        },
        {
            id: 3,
            title: 'Người đọc sách',
            description: 'Đọc hơn 10 tài liệu',
            icon: <BookOutlined />,
            earned: false
        },
        {
            id: 4,
            title: 'Kiên trì',
            description: 'Học liên tiếp 30 ngày',
            icon: <ClockCircleOutlined />,
            earned: false
        }
    ];

    const upcomingLessons = [
        {
            id: 1,
            title: 'Ngữ pháp tiếng Việt nâng cao',
            date: 'Hôm nay',
            time: '14:00',
            duration: '45 phút'
        },
        {
            id: 2,
            title: 'Văn hóa Việt Nam',
            date: 'Ngày mai',
            time: '10:00',
            duration: '50 phút'
        },
        {
            id: 3,
            title: 'Bài kiểm tra tổng hợp',
            date: 'Thứ 6',
            time: '16:00',
            duration: '60 phút'
        }
    ];

    const studyProgress = [
        { subject: 'Phát âm tiếng Việt', progress: 80, color: '#1976d2' },
        { subject: 'Ngữ pháp cơ bản', progress: 60, color: '#42a5f5' },
        { subject: 'Từ vựng', progress: 30, color: '#4caf50' },
        { subject: 'Giao tiếp hàng ngày', progress: 10, color: '#ff9800' }
    ];

    return (
        <div className="user-dashboard">
            <div className="dashboard-header">
                <Title level={1} className="welcome-title">
                    Chào mừng trở lại, Nguyễn Văn A!
                </Title>
                <Paragraph className="welcome-subtitle">
                    Hãy tiếp tục hành trình học tiếng Việt của bạn
                </Paragraph>
            </div>

            <Tabs activeKey={activeTab} onChange={setActiveTab} className="dashboard-tabs">
                <TabPane tab="Tổng quan" key="overview">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Thời gian học"
                                    value={userStats.totalStudyTime}
                                    suffix="giờ"
                                    prefix={<ClockCircleOutlined />}
                                    valueStyle={{ color: '#1976d2' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Bài học hoàn thành"
                                    value={userStats.completedLessons}
                                    suffix={`/${userStats.totalLessons}`}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{ color: '#4caf50' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Điểm trung bình"
                                    value={userStats.averageScore}
                                    suffix="/10"
                                    prefix={<StarOutlined />}
                                    valueStyle={{ color: '#ff9800' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Chuỗi ngày học"
                                    value={userStats.streak}
                                    suffix="ngày"
                                    prefix={<TrophyOutlined />}
                                    valueStyle={{ color: '#e91e63' }}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                        <Col xs={24} lg={12}>
                            <Card title="Tiến độ học tập" className="progress-card">
                                {studyProgress.map((item, index) => (
                                    <div key={index} className="progress-item">
                                        <div className="progress-header">
                                            <Text strong>{item.subject}</Text>
                                            <Text>{item.progress}%</Text>
                                        </div>
                                        <Progress
                                            percent={item.progress}
                                            strokeColor={item.color}
                                            showInfo={false}
                                        />
                                    </div>
                                ))}
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card title="Hoạt động gần đây" className="activity-card">
                                <Timeline>
                                    {recentActivities.map((activity) => (
                                        <Timeline.Item
                                            key={activity.id}
                                            dot={activity.icon}
                                            color={activity.color}
                                        >
                                            <div className="activity-item">
                                                <Text strong>{activity.title}</Text>
                                                {activity.score && (
                                                    <Tag color="green">Điểm: {activity.score}/10</Tag>
                                                )}
                                                <Text type="secondary">{activity.time}</Text>
                                            </div>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            </Card>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab="Thành tích" key="achievements">
                    <Row gutter={[24, 24]}>
                        {achievements.map((achievement) => (
                            <Col xs={24} sm={12} lg={8} key={achievement.id}>
                                <Card
                                    className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                                    hoverable={achievement.earned}
                                >
                                    <div className="achievement-content">
                                        <div className="achievement-icon">
                                            {achievement.icon}
                                        </div>
                                        <Title level={4}>{achievement.title}</Title>
                                        <Paragraph>{achievement.description}</Paragraph>
                                        {achievement.earned ? (
                                            <Tag color="green">Đã đạt được</Tag>
                                        ) : (
                                            <Tag color="default">Chưa đạt được</Tag>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </TabPane>

                <TabPane tab="Lịch học" key="schedule">
                    <Card title="Bài học sắp tới" className="schedule-card">
                        <List
                            dataSource={upcomingLessons}
                            renderItem={(lesson) => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" size="small">
                                            Tham gia
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<CalendarOutlined />} />}
                                        title={lesson.title}
                                        description={
                                            <div>
                                                <Text>{lesson.date} lúc {lesson.time}</Text>
                                                <br />
                                                <Text type="secondary">Thời lượng: {lesson.duration}</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default UserDashboard;

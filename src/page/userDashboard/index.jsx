import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Progress,
  Statistic,
  Timeline,
  List,
  Avatar,
  Button,
  Tabs,
  Tag,
  Spin,
  Alert,
} from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../../redux/slices/authSlice";
import * as jwt_decode from "jwt-decode";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState({
    totalPassages: 0,
    completedPassages: 0,
    completedPercentage: 0,
    voiceStatsByPassage: [],
    latestVoiceLevel: null,
  });

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = (await import("../../config/api")).default;
        const res = await api.get("/overview/user");
        const payload = res?.data?.data ?? res?.data ?? res;
        setOverview({
          totalPassages: payload.totalPassages ?? 0,
          completedPassages: payload.completedPassages ?? 0,
          completedPercentage: payload.completedPercentage ?? 0,
          voiceStatsByPassage: Array.isArray(payload.voiceStatsByPassage)
            ? payload.voiceStatsByPassage
            : [],
          latestVoiceLevel: payload.latestVoiceLevel ?? null,
        });
      } catch (err) {
        console.error("Fetch overview error", err);
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Không thể tải thống kê"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  // keep these UI mock sections for activity/achievements/schedule
  const recentActivities = [
    {
      id: 1,
      type: "lesson",
      title: "Hoàn thành bài học: Phát âm tiếng Việt",
      time: "2 giờ trước",
      icon: <CheckCircleOutlined />,
      color: "green",
    },
    {
      id: 2,
      type: "quiz",
      title: "Làm bài kiểm tra: Ngữ pháp cơ bản",
      score: 9,
      time: "1 ngày trước",
      icon: <TrophyOutlined />,
      color: "blue",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Học sinh chăm chỉ",
      description: "Học liên tiếp 7 ngày",
      icon: <StarOutlined />,
      earned: true,
    },
    {
      id: 2,
      title: "Người đọc sách",
      description: "Đọc hơn 10 tài liệu",
      icon: <BookOutlined />,
      earned: false,
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      title: "Ngữ pháp tiếng Việt nâng cao",
      date: "Hôm nay",
      time: "14:00",
      duration: "45 phút",
    },
  ];

  const authUser = useSelector(selectUser);
  const token = useSelector(selectToken);

  // Prefer logged-in user object from Redux, otherwise try to decode JWT token as fallback
  let displayName = authUser?.username || authUser?.email || null;
  // robustly handle different jwt-decode export shapes (default vs named)
  const decodeJwt = (t) => {
    try {
      if (!t) return null;
      if (typeof jwt_decode === "function") return jwt_decode(t);
      if (jwt_decode && typeof jwt_decode.default === "function")
        return jwt_decode.default(t);
      if (jwt_decode && typeof jwt_decode.jwt_decode === "function")
        return jwt_decode.jwt_decode(t);
      return null;
    } catch {
      return null;
    }
  };

  if (!displayName && token) {
    const payload = decodeJwt(token);
    displayName = payload?.username || payload?.email || payload?.sub || null;
  }
  if (!displayName) displayName = "Người dùng";

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <Title level={1} className="welcome-title">
          Chào mừng trở lại, {displayName}!
        </Title>
        <Paragraph className="welcome-subtitle">
          Hãy tiếp tục hành trình học tiếng Việt của bạn
        </Paragraph>
        {loading && (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin size="large" />
          </div>
        )}
        {error && (
          <Alert type="error" message={error} style={{ marginTop: 12 }} />
        )}
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="dashboard-tabs"
      >
        <TabPane tab="Tổng quan" key="overview">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title="Tổng đoạn đọc"
                  value={overview.totalPassages}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: "#1976d2" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title="Đã hoàn thành"
                  value={overview.completedPassages}
                  suffix={`(${overview.completedPercentage ?? 0}%)`}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#4caf50" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title="Cấp độ giọng gần nhất"
                  value={overview.latestVoiceLevel || "N/A"}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#ff9800" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title="Xếp hạng"
                  value={/* placeholder until ranking available */ 0}
                  suffix=""
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: "#e91e63" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
            <Col xs={24} lg={12}>
              <Card title="Tiến độ học tập" className="progress-card">
                {(overview.voiceStatsByPassage &&
                overview.voiceStatsByPassage.length
                  ? overview.voiceStatsByPassage
                  : [
                      {
                        passageTitle: "Chưa có dữ liệu",
                        completedPercentageCategory: 0,
                      },
                    ]
                ).map((item, index) => {
                  const percent = Math.round(
                    item.completedPercentageCategory ??
                      item.completedPercentage ??
                      0
                  );
                  const avgScore = item.avgScore ?? item.avgscore ?? null;
                  const avgCer = item.avgCer ?? item.avgcer ?? null;
                  const avgSpm =
                    item.avgSpm ?? item.avgspm ?? item.avgSpm ?? null;
                  const avgPause = item.avgPause ?? item.avgpause ?? null;

                  const scoreColor =
                    avgScore >= 90
                      ? "success"
                      : avgScore >= 75
                      ? "processing"
                      : "warning";

                  return (
                    <div key={index} className="progress-item card-row">
                      <div className="progress-header">
                        <div className="title-block">
                          <Text strong className="passage-title">
                            {item.passageTitle || item.passagetitle || "..."}
                          </Text>
                          <div className="small-sub">
                            Passage ID: {item.passageId ?? "-"}
                          </div>
                        </div>
                        <div className="percent-block">
                          <Text strong className="percent-text">
                            {percent}%
                          </Text>
                        </div>
                      </div>

                      <Progress
                        percent={percent}
                        strokeColor={index % 2 === 0 ? "#1976d2" : "#42a5f5"}
                        strokeWidth={12}
                        showInfo={false}
                        trailColor="#f1f5f9"
                      />

                      <div className="progress-tags">
                        <Tag color={scoreColor} style={{ fontWeight: 700 }}>
                          Điểm TB: {avgScore ?? "-"}
                        </Tag>
                        <Tag color="default">
                          CER:{" "}
                          {avgCer != null
                            ? `${(Number(avgCer) * 100).toFixed(1)}%`
                            : "-"}
                        </Tag>
                        <Tag color="default">
                          SPM:{" "}
                          {avgSpm != null ? Number(avgSpm).toFixed(0) : "-"}
                        </Tag>
                        <Tag color="default">
                          Pause:{" "}
                          {avgPause != null
                            ? Number(avgPause).toFixed(3) + "s"
                            : "-"}
                        </Tag>
                        <Tag color="processing">
                          Category%: {item.completedPercentageCategory ?? "-"}
                        </Tag>
                      </div>
                    </div>
                  );
                })}
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
                  className={`achievement-card ${
                    achievement.earned ? "earned" : "locked"
                  }`}
                  hoverable={achievement.earned}
                >
                  <div className="achievement-content">
                    <div className="achievement-icon">{achievement.icon}</div>
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
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} />}
                    title={lesson.title}
                    description={
                      <div>
                        <Text>
                          {lesson.date} lúc {lesson.time}
                        </Text>
                        <br />
                        <Text type="secondary">
                          Thời lượng: {lesson.duration}
                        </Text>
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

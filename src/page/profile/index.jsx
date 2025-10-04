import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Button, Spin, message, Divider, Tag, Space } from "antd";
import { UserOutlined, MailOutlined, CalendarOutlined, CrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { getUserFromToken } from "../../utils/jwtUtils";
import "./index.scss";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userId } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!userId) {
      message.error("Vui lòng đăng nhập để xem profile");
      navigate("/login");
      return;
    }

    fetchProfileData();
  }, [userId, navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      console.log("Fetching profile for userId:", userId);
      
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Không tìm thấy token, vui lòng đăng nhập lại");
        navigate("/login");
        return;
      }

      // Decode JWT để lấy thông tin user
      const userInfo = getUserFromToken(token);
      console.log("User info from JWT:", userInfo);

      if (userInfo) {
        // Sử dụng thông tin từ JWT token
        setProfileData({
          user: {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role
          },
          type: "TRIAL",
          trialExpiresAt: null
        });
        
        // Thử gọi API để lấy thêm thông tin (optional)
        try {
          const response = await api.get(`/accounts/${userId}`);
          console.log("API response:", response.data);
          setProfileData(response.data);
        } catch (apiError) {
          console.log("API call failed, using JWT data:", apiError.response?.status);
          // Giữ nguyên data từ JWT
        }
      } else {
        throw new Error("Không thể decode JWT token");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Không thể tải thông tin profile");
      
      // Fallback: sử dụng thông tin từ Redux state
      if (user) {
        console.log("Using fallback data from Redux state");
        setProfileData({
          user: user,
          type: "TRIAL",
          trialExpiresAt: null
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case "TRIAL":
        return "blue";
      case "PREMIUM":
        return "gold";
      case "VIP":
        return "purple";
      default:
        return "default";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "red";
      case "MANAGER":
        return "orange";
      case "STAFF":
        return "green";
      case "CUSTOMER":
        return "blue";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
        <p>Đang tải thông tin profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-error">
        <h2>Không thể tải thông tin profile</h2>
        <Button type="primary" onClick={fetchProfileData}>
          Thử lại
        </Button>
      </div>
    );
  }

  const { user: userData, type, trialExpiresAt } = profileData;

  return (
    <div className="profile-container">
    

      <div className="profile-content">
        {/* User Info Card */}
        <Card className="profile-card" title="Thông tin tài khoản">
          <div className="user-info">
            <div className="avatar-section">
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src={userData?.avatar}
                className="profile-avatar"
              />
              <div className="user-basic-info">
                <h2>{userData?.username || "N/A"}</h2>
                <Space>
                  <Tag color={getRoleColor(userData?.role)} icon={<CrownOutlined />}>
                    {userData?.role || "N/A"}
                  </Tag>
                  <Tag color={getAccountTypeColor(type)}>
                    {type || "N/A"}
                  </Tag>
                </Space>
              </div>
            </div>

            <Divider />

            <div className="user-details">
              <div className="detail-item">
                <MailOutlined className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{userData?.email || "N/A"}</span>
                </div>
              </div>

              <div className="detail-item">
                <UserOutlined className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Tên đăng nhập:</span>
                  <span className="detail-value">{userData?.username || "N/A"}</span>
                </div>
              </div>

              <div className="detail-item">
                <CalendarOutlined className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Loại tài khoản:</span>
                  <span className="detail-value">{type || "N/A"}</span>
                </div>
              </div>

              {trialExpiresAt && (
                <div className="detail-item">
                  <CalendarOutlined className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Hết hạn dùng thử:</span>
                    <span className="detail-value">{formatDate(trialExpiresAt)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="profile-card" title="Hành động">
          <div className="profile-actions">
            <Button type="primary" size="large">
              Chỉnh sửa thông tin
            </Button>
            <Button size="large">
              Đổi mật khẩu
            </Button>
            <Button size="large">
              Cài đặt thông báo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

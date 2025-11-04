import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Avatar,
  Button,
  Spin,
  message,
  Divider,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Upload
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  CrownOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { getUserFromToken } from "../../utils/jwtUtils";
import "./index.scss";

const CLOUD_NAME = 'dbdcznsat';          // ví dụ: demo
const UPLOAD_PRESET = 'talkademy';  // ví dụ: talkademy
const CLOUDINARY_UPLOAD_URL = CLOUD_NAME
  ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  : "";

const Profile = () => {
  const navigate = useNavigate();
  const { user, userId } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!userId) {
      message.error("Vui lòng đăng nhập để xem profile");
      navigate("/login");
      return;
    }
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Không tìm thấy token, vui lòng đăng nhập lại");
        navigate("/login");
        return;
      }

      const userInfo = getUserFromToken(token);
      if (userInfo) {
        setProfileData({
          user: {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role,
            avatar: userInfo.avatar
          },
          type: "TRIAL",
          trialExpiresAt: null
        });

        // Thử lấy thêm từ API (không bắt buộc)
        try {
          const response = await api.get(`/accounts/${userId}`);
          setProfileData(response.data);
        } catch (apiError) {
          // giữ data từ JWT nếu API fail
        }
      } else {
        throw new Error("Không thể decode JWT token");
      }
    } catch (error) {
      message.error("Không thể tải thông tin profile");
      if (user) {
        setProfileData({
          user,
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

  const openEdit = () => {
    if (!profileData?.user) return;
    form.setFieldsValue({
      username: profileData.user.username,
      email: profileData.user.email, // hiển thị nhưng khóa
      avatar: profileData.user.avatar
    });
    setIsEditOpen(true);
  };

  const closeEdit = () => setIsEditOpen(false);

  // Upload ảnh lên Cloudinary (unsigned)
  const uploadToCloudinary = async (options) => {
    const { file, onError, onProgress, onSuccess } = options;

    try {
      if (!CLOUDINARY_UPLOAD_URL || !UPLOAD_PRESET) {
        throw new Error(
          "Thiếu cấu hình Cloudinary. Hãy set VITE_CLOUDINARY_CLOUD_NAME và VITE_CLOUDINARY_UNSIGNED_PRESET."
        );
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      // data.append("folder", "user/avatar"); // nếu preset không cố định folder

      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_UPLOAD_URL);
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && onProgress) {
          onProgress({ percent: (evt.loaded / evt.total) * 100 });
        }
      };
      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          const url = res.secure_url;
          form.setFieldsValue({ avatar: url });
          if (onSuccess) onSuccess(res);
          message.success("Upload ảnh thành công");
        } catch (e) {
          if (onError) onError(new Error("Upload thất bại"));
        }
      };
      xhr.onerror = () => {
        if (onError) onError(new Error("Không thể upload ảnh"));
      };
      xhr.send(data);
    } catch (e) {
      if (onError) onError(e);
    }
  };

  const beforeUpload = (file) => {
    const isImg =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/jpg";
    if (!isImg) message.error("Chỉ hỗ trợ JPG/PNG/WebP");
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) message.error("Ảnh phải nhỏ hơn 5MB");
    return isImg && isLt5M;
  };

  // Lưu về backend (KHÔNG cho chỉnh email)
const onSave = async () => {
  try {
    const values = await form.validateFields();
    console.log("✅ Form values:", values);

    setSaving(true);

    const payload = {
      username: values.username,
      avatar: values.avatar
    };

    console.log("📦 Payload gửi lên API:", payload);
    console.log("🌐 Gọi PATCH:", `/accounts/${userId}`);

    const response = await api.patch(`/accounts/${userId}`, payload);
    console.log("🟢 Phản hồi API PATCH:", response?.data);

    // Cập nhật lại giao diện sau khi lưu
    setProfileData((prev) => ({
      ...prev,
      user: { ...prev.user, ...payload }
    }));

    message.success("Cập nhật thông tin thành công");
    closeEdit();
  } catch (err) {
    console.error("❌ Lỗi khi lưu thông tin:", err);
    if (!err?.errorFields) {
      message.error("Không thể lưu thay đổi");
    }
  } finally {
    console.log("🔁 Hoàn tất onSave, saving=false");
    setSaving(false);
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
                  <Tag color={getAccountTypeColor(type)}>{type || "N/A"}</Tag>
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

        <Card className="profile-card" title="Hành động">
          <div className="profile-actions">
            <Button type="primary" size="large" onClick={openEdit}>
              Chỉnh sửa thông tin
            </Button>
            <Button size="large">Đổi mật khẩu</Button>
            <Button size="large">Cài đặt thông báo</Button>
          </div>
        </Card>
      </div>

      <Modal
        title="Chỉnh sửa thông tin"
        open={isEditOpen}
        onCancel={closeEdit}
        onOk={onSave}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={saving}
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item label="Email (không thể thay đổi)" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item label="Ảnh đại diện">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Form.Item name="avatar" noStyle>
                <Input placeholder="URL ảnh (sẽ tự điền sau khi upload)" />
              </Form.Item>
              <Upload
                name="file"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={uploadToCloudinary}
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên Cloudinary</Button>
              </Upload>

              {form.getFieldValue("avatar") && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={form.getFieldValue("avatar")}
                    alt="avatar preview"
                    style={{ maxWidth: "100%", borderRadius: 8 }}
                  />
                </div>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;

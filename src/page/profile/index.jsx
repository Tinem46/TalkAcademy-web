import React, { useState, useEffect } from "react";
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
  Upload, // Ant Design Upload
  Image,  // Ant Design Image (để preview)
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  CrownOutlined,
  UploadOutlined,
  PlusOutlined, // Icon cho nút upload mới
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { getUserFromToken } from "../../utils/jwtUtils";
import "./index.scss";

// Đảm bảo các hằng số này đúng với tài khoản Cloudinary của bạn
const CLOUD_NAME = "dbdcznsat";
const UPLOAD_PRESET = "talkademy";
const CLOUDINARY_UPLOAD_URL = CLOUD_NAME
  ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  : "";

// Hàm helper để convert file sang base64 (cho việc preview)
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  // State cho UI Upload mới
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

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
        const jwtData = {
          user: { id: userInfo.id, ...userInfo },
          type: "TRIAL",
          trialExpiresAt: null,
        };
        setProfileData(jwtData);

        try {
          const response = await api.get(`/users/profile`);
          const apiData = response.data;
          if (apiData && apiData.username) {
            const structuredData = {
              user: apiData,
              type: apiData.account?.type || "TRIAL",
              trialExpiresAt: apiData.account?.trialExpiresAt || null,
            };
            setProfileData(structuredData);
          }
        } catch (apiError) {
          console.error(
            "Lỗi gọi API /users/profile, dùng tạm data từ JWT:",
            apiError.response || apiError.message
          );
        }
      } else {
        throw new Error("Không thể decode JWT token");
      }
    } catch (error) {
      console.error("Lỗi nghiêm trọng khi tải profile:", error.message);
      message.error("Không thể tải thông tin profile");
    } finally {
      setLoading(false);
    }
  };

  // --- Các hàm tiện ích (Format, Color) ---
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getAccountTypeColor = (type) => { /* (giữ nguyên) */ 
    switch (type) {
      case "TRIAL": return "blue";
      case "PREMIUM": return "gold";
      case "VIP": return "purple";
      default: return "default";
    }
  };
  const getRoleColor = (role) => { /* (giữ nguyên) */ 
    switch (role) {
      case "ADMIN": return "red";
      case "MANAGER": return "orange";
      case "STAFF": return "green";
      case "CUSTOMER": return "blue";
      default: return "default";
    }
  };

  // --- Xử lý Modal Chỉnh sửa (Mở/Đóng) ---
  const openEdit = () => {
    if (!profileData?.user) return;
    const currentAvatar = profileData.user.avatar;

    // Set giá trị cho Form (bao gồm cả avatar URL)
    form.setFieldsValue({
      username: profileData.user.username,
      email: profileData.user.email,
      avatar: currentAvatar,
    });

    // Cập nhật fileList cho component Upload
    if (currentAvatar) {
      setFileList([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: currentAvatar,
        },
      ]);
    } else {
      setFileList([]);
    }

    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    // Xóa state của modal cũ
    setFileList([]);
    setPreviewImage("");
    setPreviewOpen(false);
  };

  // --- Xử lý Upload Ảnh (UI Mới) ---

  // Request lên Cloudinary (đã đổi tên từ uploadToCloudinary)
  const customUploadRequest = async (options) => {
    const { file, onError, onProgress, onSuccess } = options;
    try {
      if (!CLOUDINARY_UPLOAD_URL || !UPLOAD_PRESET) {
        throw new Error("Thiếu cấu hình Cloudinary");
      }
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_UPLOAD_URL);
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && onProgress) {
          onProgress({ percent: (evt.loaded / evt.total) * 100 }, file);
        }
      };
      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          // Cập nhật giá trị 'avatar' trong Form
          form.setFieldsValue({ avatar: res.secure_url });
          // Báo cho AntD Upload biết là đã xong, và đính kèm response
          if (onSuccess) onSuccess(res, file);
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
    const isImg = ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type);
    if (!isImg) message.error("Chỉ hỗ trợ JPG/PNG/WebP");
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) message.error("Ảnh phải nhỏ hơn 5MB");
    return isImg && isLt5M;
  };

  // Xử lý khi click preview (mắt)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Xử lý khi file thay đổi (upload, xóa)
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Nếu file cuối cùng được upload xong (status === 'done')
    // Cập nhật form value (mặc dù customRequest đã làm, nhưng đây là 1 B-plan)
    const doneFile = newFileList.find(f => f.status === 'done');
    if (doneFile && doneFile.response) {
      form.setFieldsValue({ avatar: doneFile.response.secure_url });
    }
  };

  // Xử lý khi xóa ảnh
  const handleRemove = (file) => {
    // Xóa URL avatar khỏi form
    form.setFieldsValue({ avatar: null });
    setFileList([]); // Xóa file khỏi list
    return true; // Cho phép xóa
  };

  // Nút upload
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // --- Xử lý Lưu thay đổi (PATCH) ---
  const onSave = async () => {
    console.log("--- BẮT ĐẦU TEST onSave (PATCH) ---");
    try {
      const values = await form.validateFields();
      console.log("[PATCH Test 1] Dữ liệu từ Form:", values);
      setSaving(true);

      // <--- THAY ĐỔI: Chỉ gửi 'avatar'
      const payload = {
        avatar: values.avatar,
      };
      console.log("[PATCH Test 2] Payload gửi đi:", payload);

      const apiUrl = `/users/${userId}/profile`;
      console.log(`[PATCH Test 3] Gọi API: PATCH ${apiUrl}`);
      
      const response = await api.patch(apiUrl, payload);
      
      console.log("[PATCH Test 4] Thành công - Phản hồi API:", response?.data);

      // Cập nhật lại giao diện ngay lập tức
      setProfileData((prev) => ({
        ...prev,
        // Cập nhật 'user.avatar' bên trong 'profileData'
        user: { ...prev.user, avatar: payload.avatar },
      }));

      message.success("Cập nhật thông tin thành công");
      closeEdit();
    } catch (err) {
      console.error("[PATCH Test 5] Thất bại - Lỗi:", err.response || err.message || err);
      message.error("Không thể lưu thay đổi");
    } finally {
      setSaving(false);
      console.log("--- KẾT THÚC TEST onSave ---");
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="profile-loading">
        <Spin size="large" />
        <p>Đang tải thông tin profile...</p>
      </div>
    );
  }

  if (!profileData || !profileData.user) {
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
                  <Tag
                    color={getRoleColor(userData?.role)}
                    icon={<CrownOutlined />}
                  >
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
                  <span className="detail-value">
                    {userData?.email || "N/A"}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <UserOutlined className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Tên đăng nhập:</span>
                  <span className="detail-value">
                    {userData?.username || "N/A"}
                  </span>
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
                    <span className="detail-value">
                      {formatDate(trialExpiresAt)}
                    </span>
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

      {/* // -----------------------------------------------------------------
      // <--- MODAL ĐÃ ĐƯỢC CẬP NHẬT
      // -----------------------------------------------------------------
      */}
      <Modal
        title="Cập nhật ảnh đại diện"
        open={isEditOpen}
        onCancel={closeEdit}
        onOk={onSave}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={saving}
        destroyOnHidden
        className="profile-modal"
      >
        <Form form={form} layout="vertical" preserve={false}>
          {/* Ẩn trường avatar đi, nó vẫn giữ URL nhưng người dùng không thấy */}
          <Form.Item name="avatar" hidden>
            <Input />
          </Form.Item>

          

          <Form.Item label="Ảnh đại diện hiện tại">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove} // Thêm hàm xử lý xóa
              beforeUpload={beforeUpload}
              customRequest={customUploadRequest} // Dùng hàm upload Cloudinary
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Component <Image> để xử lý preview */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default Profile;
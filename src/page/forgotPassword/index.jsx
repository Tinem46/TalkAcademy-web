import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "./index.scss";
import AuthLayout from "../../components/auth-layout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authAPI } from "../../config/api";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.forgotPassword(values.email);
            console.log("Forgot password response:", response);

            if (response?.statusCode === 201) {
                setEmailSent(true);
                await Swal.fire({
                    title: "📧 Email đã được gửi!",
                    text: "Vui lòng kiểm tra hộp thư của bạn để lấy mã OTP đặt lại mật khẩu.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                toast.error(response?.message || "Có lỗi xảy ra khi gửi email!");
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            if (err.response?.data) {
                console.log("Backend response:", err.response.data);
                toast.error(err.response.data?.message || "Có lỗi xảy ra khi gửi email!");
            } else {
                toast.error("Lỗi kết nối. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    if (emailSent) {
        return (
            <AuthLayout>
                <div className="success-container">
                    <div className="success-content">
                        <div className="success-icon">
                            <MailOutlined />
                        </div>
                        <h2 className="success-title">Email đã được gửi!</h2>
                        <p className="success-description">
                            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
                            Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleBackToLogin}
                            className="back-to-login-btn"
                        >
                            <ArrowLeftOutlined />
                            Quay lại đăng nhập
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <Form
                layout="vertical"
                onFinish={handleForgotPassword}
                className="forgot-form"
                data-aos="fade-up"
            >
                <div className="form-header">
                 
                    <h2 className="form-title">Quên mật khẩu?</h2>
                    <p className="form-description">
                        Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                    </p>
                </div>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Nhập email của bạn"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        disabled={loading}
                        className="forgot-btn"
                        size="large"
                    >
                        {loading ? <Spin size="small" /> : "Gửi email đặt lại mật khẩu"}
                    </Button>
                </Form.Item>

                <div className="form-footer">
                    <p>
                        Nhớ mật khẩu? <Link to="/login">Đăng nhập ngay</Link>
                    </p>
                </div>
            </Form>
        </AuthLayout>
    );
};

export default ForgotPassword;

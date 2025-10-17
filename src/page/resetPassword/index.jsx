import React, { useState, useEffect } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { LockOutlined, ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./index.scss";
import AuthLayout from "../../components/auth-layout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { authAPI } from "../../config/api";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const email = searchParams.get('email');
    const otp = searchParams.get('otp');

    useEffect(() => {
        if (!email || !otp) {
            message.error('Thiếu thông tin cần thiết để đặt lại mật khẩu');
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

    const handleResetPassword = async (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setLoading(true);
        try {
            const response = await authAPI.resetPassword(email, otp, values.newPassword);
            console.log("Reset password response:", response);

            if (response?.statusCode === 201) {
                setResetSuccess(true);
                await Swal.fire({
                    title: "🎉 Đặt lại mật khẩu thành công!",
                    text: "Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập với mật khẩu mới.",
                    icon: "success",
                    confirmButtonText: "Đăng nhập ngay",
                });
                navigate('/login');
            } else {
                toast.error(response?.message || "Có lỗi xảy ra khi đặt lại mật khẩu!");
            }
        } catch (err) {
            console.error("Reset password error:", err);
            if (err.response?.data) {
                console.log("Backend response:", err.response.data);
                toast.error(err.response.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu!");
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

    if (resetSuccess) {
        return (
            <AuthLayout>
                <div className="success-container">
                    <div className="success-content">
                        <div className="success-icon">
                            <CheckCircleOutlined />
                        </div>
                        <h2 className="success-title">Đặt lại mật khẩu thành công!</h2>
                        <p className="success-description">
                            Mật khẩu của bạn đã được cập nhật thành công.
                            Bạn có thể đăng nhập với mật khẩu mới.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleBackToLogin}
                            className="back-to-login-btn"
                        >
                            <ArrowLeftOutlined />
                            Đăng nhập ngay
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
                onFinish={handleResetPassword}
                className="reset-form"
                data-aos="fade-up"
            >
                <div className="form-header">
                  
                    <h2 className="form-title">Đặt lại mật khẩu</h2>
                    <p className="form-description">
                        Nhập mật khẩu mới cho tài khoản <strong>{email}</strong>
                    </p>
                </div>

                <Form.Item
                    name="newPassword"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới" },
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu mới"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Xác nhận mật khẩu mới"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        disabled={loading}
                        className="reset-btn"
                        size="large"
                    >
                        {loading ? <Spin size="small" /> : "Đặt lại mật khẩu"}
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

export default ResetPassword;

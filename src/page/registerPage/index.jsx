import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth-layout";
import "./index.scss";

import api from "../../config/api";

/* Ảnh (đổi path nếu dự án bạn khác) */
import mascot1 from "../../assets/Mascot/Asset 1logoFB.png";
import BackgroudSignupLogin from "../../assets/Pictrure/BackgroudSignupLogin.png";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    if (loading) return; // tránh double submit
    setLoading(true);
    try {
      // chỉ gửi đúng 3 field kèm trim
      const apiData = {
        username: values.username?.trim(),
        email: values.email?.trim(),
        password: values.password,
      };

      const apiResponse = await api.post("auth/register", apiData);

      toast.success("Đăng ký thành công. Vui lòng xác nhận email.");
      navigate("/login", {
        state: {
          email: values.email,
          userId: apiResponse?.data?.userId, // nếu backend trả về
        },
        replace: true,
      });
    } catch (err) {
      console.error("Error details:", err);
      toast.error(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout bgImage={BackgroudSignupLogin} overlayOpacity={0.45}>
      <section className="auth__grid auth__grid--2cols" data-auth="grid">
        {/* BRAND (luôn hiển thị) */}
        <aside className="auth-card auth-card--brand" data-auth="brand">
          <div className="brand brand--stack" data-brand="container">
            <img className="brand__logo" src={mascot1} alt="Logo" />
            <h1 className="brand__title">TALKADEMY</h1>
            <h2 className="brand__subtitle">LUYỆN GIỌNG NÓI NÀO</h2>
            <p className="brand__desc">
              Ứng dụng luyện giọng nói được thiết kế dành riêng cho người Việt với công nghệ AI tiên tiến.
            </p>
          </div>
        </aside>

        {/* FORM */}
        <main className="auth-card auth-card--form" data-auth="form">
          <header className="auth-form__header" data-form="header">
            <h1 className="auth-form__title">Đăng ký</h1>
            <p className="auth-form__hint">Hoàn tất chỉ trong 1 phút</p>
          </header>

          <Form
            form={form}
            layout="vertical"
            className="auth-form auth-form--register"
            data-form="register"
            requiredMark={false}
            onFinish={handleRegister}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              label={<span className="auth-form__label">Tên đăng nhập</span>}
              className="auth-form__item auth-form__item--username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập" },
                { min: 3, message: "Tên đăng nhập tối thiểu 3 ký tự" },
              ]}
            >
              <Input
                className="auth-form__input auth-form__input--text is-droplet"
                placeholder="Ví dụ: nguyenvana"
                aria-label="Tên đăng nhập"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="auth-form__label">Email</span>}
              className="auth-form__item auth-form__item--email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email, message: \"Email không hợp lệ\"" }, // giữ đúng UI, rule email vẫn cần
              ]}
            >
              <Input
                className="auth-form__input auth-form__input--text is-droplet"
                placeholder="you@example.com"
                aria-label="Email"
                inputMode="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="auth-form__label">Mật khẩu</span>}
              className="auth-form__item auth-form__item--password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
              hasFeedback
            >
              <Input.Password
                className="auth-form__input auth-form__input--password is-droplet"
                placeholder="Tối thiểu 6 ký tự"
                aria-label="Mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className="auth-form__label">Nhập lại mật khẩu</span>}
              className="auth-form__item auth-form__item--confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password
                className="auth-form__input auth-form__input--password is-droplet"
                placeholder="Nhập lại mật khẩu"
                aria-label="Xác nhận mật khẩu"
              />
            </Form.Item>

            <div className="auth-form__actions" data-form="actions">
              <Button
                type="primary"
                htmlType="submit"
                className="auth-button auth-button--primary auth-button--block is-droplet"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Tạo tài khoản"}
              </Button>
            </div>

            <div className="auth-form__links" data-form="links">
              <p className="auth-text auth-text--muted">
                Đã có tài khoản?{" "}
                <Link className="auth-link" to="/login">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </Form>
        </main>
      </section>
    </AuthLayout>
  );
};

export default Register;

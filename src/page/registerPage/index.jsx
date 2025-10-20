import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
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
    setLoading(true);
    try {
      if (values.password !== values.confirmPassword) {
        form.setFields([{ name: "confirmPassword", errors: ["Mật khẩu xác nhận không khớp"] }]);
        return;
      }
      const res = await api.post("auth/register", values);
      const ok = res?.data?.statusCode === 201;
      if (ok) navigate("/login");
    } catch (e) {
      // xử lý lỗi nếu cần
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
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
            >
              <Input
                className="auth-form__input auth-form__input--text is-droplet"
                placeholder="Ví dụ: nguyenvana"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="auth-form__label">Email</span>}
              className="auth-form__item auth-form__item--email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                className="auth-form__input auth-form__input--text is-droplet"
                placeholder="you@example.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="auth-form__label">Mật khẩu</span>}
              className="auth-form__item auth-form__item--password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                className="auth-form__input auth-form__input--password is-droplet"
                placeholder="Tối thiểu 8 ký tự"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className="auth-form__label">Nhập lại mật khẩu</span>}
              className="auth-form__item auth-form__item--confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) return Promise.resolve();
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password
                className="auth-form__input auth-form__input--password is-droplet"
                placeholder="Nhập lại mật khẩu"
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

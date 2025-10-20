import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthLayout from "../../components/auth-layout";
import "./index.scss";

import api from "../../config/api";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { getUserFromToken } from "../../utils/jwtUtils";

/* ảnh nền (giữ đúng theo dự án của bạn) */
import BackgroudSignupLogin from "../../assets/Pictrure/BackgroudSignupLogin.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("auth/login", values);
      const data = res?.data;
      const ok = data?.statusCode === 201;
      const token = data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;
      const userInfo = getUserFromToken(token) || {};

      if (ok && token) {
        const role = userInfo?.role || "CUSTOMER";
        const userId = userInfo?.id;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);

        dispatch(loginSuccess({ token, refreshToken, role, userId, user: userInfo }));

        if (["ADMIN", "MANAGER", "STAFF"].includes(role)) navigate("/admin");
        else navigate("/");
      } else {
        dispatch(loginFailure(data?.message || "Đăng nhập thất bại"));
      }
    } catch (e) {
      dispatch(loginFailure(e?.response?.data?.message || "Lỗi kết nối"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout bgImage={BackgroudSignupLogin} overlayOpacity={0.45}>
      {/* 1 card → single grid để căn giữa */}
      <section className="auth__grid auth__grid--single" data-auth="grid">
        <main className="auth-card auth-card--form" data-auth="form">
          <header className="auth-form__header" data-form="header">
            <h1 className="auth-form__title">ĐĂNG NHẬP</h1>
            <p className="auth-form__hint">Chào mừng trở lại</p>
          </header>

          <Form
            layout="vertical"
            className="auth-form auth-form--login"
            data-form="login"
            requiredMark={false}
            onFinish={handleLogin}
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
                placeholder="Nhập tên đăng nhập"
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
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <div className="auth-form__actions" data-form="actions">
              <Button
                type="primary"
                htmlType="submit"
                className="auth-button auth-button--primary auth-button--block is-droplet"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Đăng nhập"}
              </Button>
            </div>

           

            <div className="auth-form__links" data-form="links">
              <p className="auth-text auth-text--muted">
                Chưa có tài khoản?{" "}
                <Link className="auth-link auth-link--accent" to="/register">
                  Đăng ký ngay
                </Link>
              </p>
              <p className="auth-text auth-text--muted">
                Quên mật khẩu?{" "}
                <Link className="auth-link" to="/forgot-password">
                  Đặt lại mật khẩu
                </Link>
              </p>
            </div>
          </Form>
        </main>
      </section>
    </AuthLayout>
  );
};

export default Login;

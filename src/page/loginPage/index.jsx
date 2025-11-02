import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthLayout from "../../components/auth-layout";
import EmailOtpModal from "../../components/EmailOtpModal";
import "./index.scss";

import api from "../../config/api";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import { getUserFromToken } from "../../utils/jwtUtils";

/* Ảnh nền */
import BackgroudSignupLogin from "../../assets/Pictrure/BackgroudSignupLogin.png";



const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Popup OTP khi account chưa verify
  const [otpOpen, setOtpOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");
  const [lastCredentials, setLastCredentials] = useState(null); // lưu credentials để auto-login sau verify

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const finishLoginSuccess = (data) => {
    const token = data?.data?.accessToken;
    const refreshToken = data?.data?.refreshToken;
    const userInfo = getUserFromToken(token || "") || {};
    const role = userInfo?.role || "CUSTOMER";
    const userId = userInfo?.id;

    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (role) localStorage.setItem("role", role);
    if (userId) localStorage.setItem("userId", String(userId));

    dispatch(loginSuccess({ token, refreshToken, role, userId, user: userInfo }));

    if (["ADMIN", "MANAGER", "STAFF"].includes(role)) navigate("/admin");
    else navigate("/");

    setLastCredentials(null);
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      setLastCredentials(values);

      // cờ _skip401Handler để interceptor KHÔNG reload/redirect
      const res = await api.post("/auth/login", values, { _skip401Handler: true });
      const data = res?.data;

      if (data?.statusCode === 201 && data?.data?.accessToken) {
        finishLoginSuccess(data);
      } else {
        // chuẩn hoá hiển thị lỗi
        const backendMsg = (data?.message || "").toString();
        const looksLikeInvalid =
          /(invalid|incorrect|unauthorized|sai|không đúng)/i.test(backendMsg);
        const show = looksLikeInvalid ? "Sai tên đăng nhập hoặc mật khẩu" : "Đăng nhập thất bại";
        form.setFields([{ name: "password", errors: [show] }]);
        dispatch(loginFailure(show));
      }
    } catch (e) {
      const msg = e?.response?.data?.message || "";
      const status = e?.response?.status || e?.response?.data?.statusCode;

      // Nếu chưa xác minh → mở popup, không reload
      const isUnverified =
        Number(status) === 401 &&
        /(account not verified|verify your email|chưa.*xác minh)/i.test(msg || "");

      if (isUnverified) {
        const maybeEmail = (form.getFieldValue("username") || "").toString();
        const emailToUse = maybeEmail.includes("@") ? maybeEmail : "";
        setPrefillEmail(emailToUse);
        setOtpOpen(true);
      } else {
        // Các lỗi còn lại: 400/401 coi như sai thông tin; 5xx/mạng -> lỗi kết nối
        const isInvalidCreds =
          Number(status) === 400 ||
          Number(status) === 401 ||
          /(invalid|incorrect|unauthorized|sai|không đúng)/i.test(msg || "");
        const show = isInvalidCreds ? "Sai tên đăng nhập hoặc mật khẩu" : (msg || "Lỗi kết nối");
        form.setFields([{ name: "password", errors: [show] }]);
        dispatch(loginFailure(show));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerified = async ({ email }) => {
    try {
      setOtpOpen(false);
      if (email) form.setFieldsValue({ username: email });

      // Auto-login lại bằng credentials cũ
      if (lastCredentials) {
        setLoading(true);
        const res = await api.post("/auth/login", lastCredentials, { _skip401Handler: true });
        const data = res?.data;
        if (data?.statusCode === 201 && data?.data?.accessToken) {
          finishLoginSuccess(data);
          return;
        }
        const backendMsg = (data?.message || "").toString();
        const looksLikeInvalid =
          /(invalid|incorrect|unauthorized|sai|không đúng)/i.test(backendMsg);
        const show = looksLikeInvalid ? "Sai tên đăng nhập hoặc mật khẩu" : "Đăng nhập thất bại";
        form.setFields([{ name: "password", errors: [show] }]);
        dispatch(loginFailure(show));
      }
    } catch (e) {
      const msg = e?.response?.data?.message || "Lỗi kết nối";
      form.setFields([{ name: "password", errors: [msg] }]);
      dispatch(loginFailure(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout bgImage={BackgroudSignupLogin} overlayOpacity={0.45}>
      <section className="auth__grid auth__grid--single" data-auth="grid">
        <main className="auth-card auth-card--form" data-auth="form">
          <header className="auth-form__header" data-form="header">
            <h1 className="auth-form__title">ĐĂNG NHẬP</h1>
            <p className="auth-form__hint">Chào mừng trở lại</p>
          </header>

          <Form
            form={form}
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
                placeholder="Nhập tên đăng nhập hoặc email"
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
                onKeyDown={(e) => {
                  if (loading && e.key === "Enter") e.preventDefault(); // chặn Enter khi đang loading
                }}
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

              {/* Nút mở popup xác minh email */}
              <Button
                type="default"
                htmlType="button"
                className="auth-button auth-button--block is-droplet"
                style={{ marginTop: 10 }}
                onClick={() => {
                  const maybeEmail = (form.getFieldValue("username") || "").toString();
                  const emailToUse = maybeEmail.includes("@") ? maybeEmail : "";
                  setPrefillEmail(emailToUse);
                  setOtpOpen(true);
                }}
              >
                Xác minh email (nhập OTP)
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

      {/* Popup xác minh khi account chưa verify */}
      <EmailOtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        initialEmail={prefillEmail}
        onVerified={handleOtpVerified}
      />
    </AuthLayout>
  );
};

export default Login;

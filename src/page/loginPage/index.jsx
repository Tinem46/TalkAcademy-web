import { Button, Form, Input, Spin } from "antd";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.scss";
import { useState, useRef } from "react";
import AuthLayout from "../../components/auth-layout";

const GOOGLE_CLIENT_ID =
  "573872884539-lov9g4rc77itiaucc7lovecrjel9bbnd.apps.googleusercontent.com";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  // ========== Render Google Sign-In ==========
  // useEffect(() => {
  //   let initialized = false;
  //   const tryInitialize = () => {
  //     if (window.google && googleBtnRef.current && !initialized) {
  //       initialized = true;
  //       window.google.accounts.id.initialize({
  //         client_id: GOOGLE_CLIENT_ID,
  //         callback: handleGoogleCallback,
  //       });
  //       window.google.accounts.id.renderButton(googleBtnRef.current, {
  //         theme: "filled_black",
  //         size: "large",
  //         width: "340",
  //         shape: "pill",
  //         text: "continue_with",
  //         logo_alignment: "left",
  //       });
  //     } else {
  //       setTimeout(tryInitialize, 300); // thử lại sau 300ms nếu chưa có google api
  //     }
  //   };

  //   tryInitialize();

  //   return () => {}; // không cần clearInterval vì không dùng interval
  // }, []);

  // Xử lý callback Google trả về credential (ID Token)
  // const googleAuthInProgress = useRef(false);

  // const handleGoogleCallback = async (response) => {
  //   if (googleAuthInProgress.current) return;
  //   googleAuthInProgress.current = true;
  //   setLoading(true);
  //   const tokenId = response.credential;

  //   try {
  //     const res = await api.post("Auth/google-login-token", { tokenId });
  //     const { role } = res.data;
  //     const token = res.data?.data?.accessToken;
  //     const userId = res.data?.data?.id;

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);
  //     localStorage.setItem("userId", userId);
  //     dispatch(login(res.data));
  //     navigate("/");
  //     toast.success("Login successful with Google!");
  //   } catch (error) {
  //     console.error("Server login error:", error);
  //     if (error.response?.data) {
  //       console.error("Backend response data:", error.response.data);
  //     }
  //     toast.error("Failed to login with Google. Please try again.");
  //   } finally {
  //     googleAuthInProgress.current = false;
  //     setLoading(false);
  //   }
  // };

  // ========== Login thường ==========
  // const handleLogin = async (values) => {
  //   setLoading(true);
  //   try {
  //     const response = await api.post("Auth/login", values);
  //     console.log("Login response:", response);

  //     // Sửa đoạn này!
  //     const apiData = response.data;
  //     const isSuccess = apiData?.isSuccess;
  //     const token = apiData?.data?.accessToken;
  //     const role = apiData?.data?.roles?.[0] || "USER";
  //     const userId = apiData?.data?.id;
  //     const refreshToken = apiData?.data?.refreshToken;

  //     if (isSuccess && token) {
  //       // ✅ Lưu vào localStorage
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("role", role);
  //       localStorage.setItem("userId", userId);
  //       localStorage.setItem("refreshToken", refreshToken);

  //       // ✅ Dispatch lên Redux
  //       dispatch(login({ token, role }));

  //       // ✅ Điều hướng theo vai trò
  //       if (role === "Admin" || role === "MANAGER") {
  //         navigate("/dashboard");
  //         toast.success("Welcome Admin/Manager!");
  //       } else if (role === "STAFF") {
  //         navigate("/staff-dashboard");
  //         toast.success("Welcome Staff!");
  //       } else {
  //         navigate("/");
  //         await Swal.fire({
  //           title: "🎉 Chào mừng bạn đến với Shop!",
  //           text: "Chúc bạn mua sắm vui vẻ ❤️",
  //           icon: "success",
  //           timer: 3000,
  //           showConfirmButton: true,
  //           confirmButtonText: "OK",
  //         });
  //       }
  //     } else {
  //       toast.error(apiData?.message || "Login failed!");
  //       throw new Error("Invalid response from server");
  //     }
  //   } catch (err) {
  //     if (err.response?.data) {
  //       console.log("Backend response:", err.response.data);
  //       toast.error(err.response.data?.message || "Login failed!");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthLayout>
      <Form
        layout="vertical"
        onFinish={() => { }}
        className="login-form"
        data-aos="fade-up"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email của bạn" }]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={loading}
            className="login-btn"
          >
            {loading ? <Spin size="small" /> : "ĐĂNG NHẬP"}
          </Button>
        </Form.Item>

        <div className="or-divider">hoặc</div>

        <Form.Item>
          <Button
            className="google-login-btn"
            block
            onClick={() => {
              // Xử lý đăng nhập Google
              console.log("Login with Google clicked");
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Đăng nhập với Google
          </Button>
        </Form.Item>

        <Form.Item className="signup-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </Form.Item>

        <Form.Item className="forgot-link">
          Quên mật khẩu?{" "}
          <Link to="/forgot-password">Đặt lại mật khẩu</Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Login;

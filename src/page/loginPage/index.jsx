import { Button, Form, Input, Spin } from "antd";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.scss";
import { useState, useRef } from "react";
import AuthLayout from "../../components/auth-layout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import api from "../../config/api";
import { getUserFromToken } from "../../utils/jwtUtils";

const GOOGLE_CLIENT_ID =
  "573872884539-lov9g4rc77itiaucc7lovecrjel9bbnd.apps.googleusercontent.com";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
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
  //     const apiData = res.data;
  //     const token = apiData?.data?.accessToken;
  //     const refreshToken = apiData?.data?.refreshToken;
  //     
  //     // Decode JWT để lấy thông tin user và role
  //     const userInfo = getUserFromToken(token);
  //     const role = userInfo?.role || "CUSTOMER";
  //     const userId = userInfo?.id;
  //     const userEmail = userInfo?.email;
  //     const username = userInfo?.username || "User";

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("role", role);
  //     localStorage.setItem("userId", userId);
  //     localStorage.setItem("refreshToken", refreshToken);
  //     
  //     dispatch(loginSuccess({ 
  //       token, 
  //       refreshToken, 
  //       role, 
  //       userId, 
  //       user: { 
  //         id: userId, 
  //         email: userEmail,
  //         username: username
  //       } 
  //     }));
  //     
  //     // Điều hướng theo vai trò cho Google login
  //     if (role === "ADMIN" || role === "MANAGER" || role === "STAFF") {
  //       navigate("/admin");
  //       toast.success("Chào mừng Admin/Manager đến với hệ thống quản trị!");
  //     } else {
  //       navigate("/");
  //       toast.success("Login successful with Google!");
  //     }
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
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("auth/login", values);
      console.log("Login response:", response);

      // Lấy dữ liệu từ response
      const apiData = response.data;
      const isSuccess = apiData?.statusCode === 201;
      const token = apiData?.data?.accessToken;
      const refreshToken = apiData?.data?.refreshToken;

      console.log("API Data:", apiData); // Debug log

      // Decode JWT để lấy thông tin user và role
      const userInfo = getUserFromToken(token);
      const role = userInfo?.role || "CUSTOMER";
      const userId = userInfo?.id;
      const userEmail = userInfo?.email;
      const username = userInfo?.username || "User";

      console.log("User info from JWT:", userInfo); // Debug log
      console.log("Role from JWT:", role); // Debug log

      if (isSuccess && token) {
        // ✅ Lưu vào localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("refreshToken", refreshToken);

        // ✅ Dispatch lên Redux
        dispatch(loginSuccess({
          token,
          refreshToken,
          role,
          userId,
          user: {
            id: userId,
            email: userEmail,
            username: username
          }
        }));

        // ✅ Điều hướng theo vai trò
        console.log("User role:", role); // Debug log
        if (role === "ADMIN" || role === "MANAGER") {
          navigate("/admin");
          toast.success("Chào mừng Admin/Manager đến với hệ thống quản trị!");
        } else if (role === "STAFF") {
          navigate("/admin");
          toast.success("Chào mừng Staff đến với hệ thống quản trị!");
        } else {
          navigate("/");
          await Swal.fire({
            title: "🎉 Chào mừng bạn đến với Talkademy!",
            text: "Chúc bạn học tập vui vẻ ❤️",
            icon: "success",
            timer: 3000,
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
        }
      } else {
        toast.error(apiData?.message || "Đăng nhập thất bại!");
        dispatch(loginFailure(apiData?.message || "Đăng nhập thất bại!"));
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data) {
        console.log("Backend response:", err.response.data);
        toast.error(err.response.data?.message || "Đăng nhập thất bại!");
        dispatch(loginFailure(err.response.data?.message || "Đăng nhập thất bại!"));
      } else {
        toast.error("Lỗi kết nối. Vui lòng thử lại.");
        dispatch(loginFailure("Lỗi kết nối. Vui lòng thử lại."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="login-form"
        data-aos="fade-up"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
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

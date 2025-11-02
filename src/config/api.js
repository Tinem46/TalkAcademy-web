import axios from "axios";

const BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  "https://voice-tranning-be.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // bật nếu BE dùng cookie
});

// Client riêng để gọi refresh-token, tránh bị interceptor của api can thiệp
const refreshClient = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

const refreshTokenRequest = async () => {
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!userId || !refreshToken) throw new Error("Missing refresh token info");

  // Gọi qua refreshClient để không bị interceptor của api ảnh hưởng
  const res = await refreshClient.post("/auth/refresh-token", {
    id: userId,
    refreshToken,
  });

  const newToken = res?.data?.data?.accessToken;
  const newRefreshToken = res?.data?.data?.refreshToken;

  if (!newToken) throw new Error("Refresh token failed");

  localStorage.setItem("token", newToken);
  if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

  return newToken;
};

/** REQUEST: gắn Authorization trừ các endpoint mở */
api.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    const isPublic =
      url.includes("auth/login") ||
      url.includes("auth/register") ||
      url.includes("auth/google-login-token") ||
      url.includes("auth/verify-otp") ||
      url.includes("auth/forgot-password") ||
      url.includes("auth/reset-password");

    if (!isPublic) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else if (config.headers && config.headers.Authorization) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/** RESPONSE: xử lý 401 + refresh queue; hỗ trợ cờ _skip401Handler để BỎ QUA handler 401 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    // Bỏ qua handler 401 nếu caller muốn tự xử lý (VD: login/verify-otp -> mở popup)
    if (status === 401 && originalRequest._skip401Handler) {
      return Promise.reject(error);
    }

    // Xử lý refresh token cho 401 không skip
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // xếp request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axios(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenRequest();
        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Dọn storage, nhưng KHÔNG reload ở trang login để tránh vòng lặp
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        const onLoginPage =
          typeof window !== "undefined" &&
          window.location.pathname.startsWith("/login");

        // Nếu muốn, có thể điều hướng về /login khi không ở trang login
        if (!onLoginPage) {
          // window.location.assign("/login"); // tuỳ bạn, mặc định không redirect để tránh khó debug
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/** Các API tiện ích */
export const authAPI = {
  forgotPassword: async (email) => {
    const response = await api.post(
      "/auth/forgot-password",
      { email },
      { _skip401Handler: true }
    );
    return response.data;
  },

  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post(
      "/auth/reset-password",
      { email, otp, newPassword },
      { _skip401Handler: true }
    );
    return response.data;
  },
};

export default api;

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { getUserFromToken } from '../../utils/jwtUtils';
import './index.scss';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Lấy token và refreshToken từ các tham số trên URL
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');

        if (token && refreshToken) {
            // Nếu có token, thực hiện logic đăng nhập
            try {
                const userInfo = getUserFromToken(token) || {};
                const role = userInfo?.role || "CUSTOMER";
                const userId = userInfo?.id;

                // 1. Lưu vào Local Storage
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("role", role);
                localStorage.setItem("userId", userId);

                // 2. Dispatch vào Redux để cập nhật trạng thái
                dispatch(loginSuccess({ token, refreshToken, role, userId, user: userInfo }));

                // 3. Chuyển hướng người dùng về trang phù hợp
                if (["ADMIN", "MANAGER", "STAFF"].includes(role)) {
                    navigate("/admin/accounts"); // Chuyển đến trang quản lý của admin
                } else {
                    navigate("/"); // Chuyển về trang chủ
                }
            } catch (error) {
                // Xử lý nếu token bị lỗi
                console.error("Lỗi xử lý token:", error);
                dispatch(loginFailure("Token không hợp lệ. Vui lòng thử lại."));
                navigate("/login");
            }
        } else {
            // Nếu không có token trên URL, báo lỗi và trả về trang login
            console.error("Đăng nhập Google thất bại, không nhận được token.");
            dispatch(loginFailure("Đăng nhập Google thất bại. Vui lòng thử lại."));
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Chỉ chạy một lần khi component được mount

    // Hiển thị loading trong khi xử lý
    return (
        <div className="auth-callback-container">
            <Spin size="large" />
            <p className="auth-callback-container__text">Đang xử lý đăng nhập, vui lòng chờ...</p>
        </div>
    );
};

export default AuthCallback;
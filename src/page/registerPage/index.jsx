import { Button, Form, Input, Spin, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { useState } from "react";
import AuthLayout from "../../components/auth-layout";
import "./index.scss";
import { toast } from "react-toastify";
import api from "../../config/api";

const { Option } = Select;

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const handleRegister = async (values) => {
  //   setLoading(true);
  //   try {
  //     const apiData = {
  //       email: values.email,
  //       password: values.password,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       gender: Number(values.gender),
  //     };

  //     const apiResponse = await api.post("Auth/register", apiData);

  //     toast.success("Đăng ký thành công. Vui lòng xác nhận email.");
  //     navigate("/confirm-email", {
  //       state: {
  //         email: values.email,
  //         userId: apiResponse.data.userId, // <-- giả sử backend trả về userId
  //       },
  //     });
  //   } catch (err) {
  //     console.error("Error details:", err);
  //     toast.error(err.response?.data?.message || "Đăng ký thất bại");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthLayout>
      <Form
        layout="vertical"
        name="register-form"
        onFinish={() => { }}
        className="register-form"
        data-aos="fade-down"
      >
        <Row gutter={[64, 16]}>
          <Col xs={24} md={12}>
            

            <Form.Item
              name="lastName"
              label="Tên"
              rules={[
                { required: true, message: "Vui lòng nhập tên của bạn!" },
              ]}
            >
              <Input placeholder="Nhập tên của bạn" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Định dạng email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>

         
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={loading}
            className="register-btn"
          >
            {loading ? <Spin size="small" /> : "ĐĂNG KÝ"}
          </Button>
        </Form.Item>

        <Form.Item
          className="signin-link"
          style={{
            
            marginTop: "10px",
            fontSize: "16px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          

          }}
        >
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

export default Register;

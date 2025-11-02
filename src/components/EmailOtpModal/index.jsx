import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Spin } from "antd";
import api from "../../config/api";
import "./index.scss";

const EmailOtpModal = ({ open, onClose, initialEmail = "", onVerified }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Khi mở modal → thêm class để tắt overlay của layout, giúp blur nhìn rõ ảnh nền
  useEffect(() => {
    if (open) document.body.classList.add("otp-open");
    else document.body.classList.remove("otp-open");
    return () => document.body.classList.remove("otp-open");
  }, [open]);

  // Prefill + reset khi open
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ email: initialEmail || "", otp: "" });
    } else {
      form.resetFields();
    }
  }, [open, initialEmail, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const email = (values.email || "").trim();
      const otp = (values.otp || "").trim();

      setSubmitting(true);
      await api.post("auth/verify-otp", { email, otp });

      if (typeof onVerified === "function") onVerified({ email, otp });
      onClose && onClose();
    } catch (err) {
      if (err?.errorFields?.length) return; // lỗi validate
      console.error("Verify OTP failed:", err?.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      title="Xác minh email"
      className="auth-otp-modal"
      rootClassName="auth-otp-modal"  // để blur mask
    >
      <p className="auth-text auth-text--muted">
        Nhập <b>email</b> và <b>mã OTP</b> bạn đã nhận để hoàn tất xác minh.
      </p>

      <Form form={form} layout="vertical" className="auth-form auth-form--verify" autoComplete="off">
        <Form.Item
          name="email"
          label={<span className="auth-form__label">Email</span>}
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
          initialValue={initialEmail}
        >
          <Input
            className="auth-form__input auth-form__input--text is-droplet"
            placeholder="you@example.com"
            inputMode="email"
          />
        </Form.Item>

       <Form.Item
  name="otp"
  label={<span className="auth-form__label">Mã OTP</span>}
  // Chỉ giữ lại số và giới hạn 6 ký tự, xử lý cả gõ & dán
  getValueFromEvent={({ target }) =>
    (target.value || "").replace(/\D/g, "").slice(0, 6)
  }
  rules={[
    { required: true, message: "Vui lòng nhập mã OTP" },
    { len: 6, message: "Mã OTP gồm 6 ký tự" },
  ]}
>
  <Input
    className="auth-form__input auth-form__input--text is-droplet"
    placeholder="Nhập mã OTP 6 số"
    inputMode="numeric"          // gợi ý bàn phím số trên mobile
    pattern="[0-9]*"             // hint cho trình duyệt
    autoComplete="one-time-code" // tối ưu auto-fill OTP
    maxLength={6}
  />
</Form.Item>

        <div className="auth-form__actions" data-form="actions">
          <Button
            type="primary"
            htmlType="button"
            className="auth-button auth-button--primary auth-button--block is-droplet"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <Spin size="small" /> : "Xác minh email"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EmailOtpModal;

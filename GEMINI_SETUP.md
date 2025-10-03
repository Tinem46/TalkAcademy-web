# 🤖 Hướng dẫn cấu hình Gemini AI

## 📋 Chuẩn bị

1. **Tạo API Key cho Google Gemini:**
   - Truy cập: https://makersuite.google.com/app/apikey
   - Đăng nhập với tài khoản Google
   - Click "Create API Key"
   - Copy API key được tạo

## ⚙️ Cấu hình

2. **Tạo file .env trong thư mục gốc:**
   ```bash
   # Tạo file .env
   touch .env
   ```

3. **Thêm API key vào file .env:**
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

## 🚀 Khởi động

4. **Khởi động ứng dụng:**
   ```bash
   npm run dev
   ```

5. **Kiểm tra Console:**
   - Nếu thành công: `✅ Gemini API response received`
   - Nếu thiếu API key: `⚠️ Gemini API Key chưa được cấu hình`

## 🔧 Tính năng

### AI Chat Widget sử dụng Gemini API:
- **Vị trí**: Góc phải màn hình, trên mọi trang
- **Tính năng**: Chat thông minh với ngữ cảnh Talkademy
- **Fallback**: Tự động chuyển sang phản hồi cố định nếu API lỗi
- **Lịch sử**: Nhớ 5 tin nhắn gần nhất làm context

### Prompts được tối ưu cho:
- ✅ Thông tin về Talkademy
- ✅ Các gói học (Cơ bản, Nâng cao, Premium)
- ✅ Tính năng phát âm AI
- ✅ Quy trình học tập
- ✅ Ứng dụng mobile
- ✅ Ưu đãi hiện tại

## 🛡️ Bảo mật

- API key được lưu trong file `.env` (không commit lên Git)
- Có safety settings để lọc nội dung không phù hợp
- Fallback system đảm bảo chat luôn hoạt động

## 📝 Ghi chú

- **Miễn phí**: Gemini API có quota miễn phí hàng tháng
- **Rate limit**: Tự động xử lý giới hạn tốc độ
- **Performance**: Response time ~1-3 giây
- **Backup**: Hệ thống fallback đảm bảo luôn có phản hồi

## 🔍 Troubleshooting

### Lỗi thường gặp:

1. **API Key không hoạt động:**
   - Kiểm tra API key có đúng không
   - Đảm bảo có internet
   - Thử tạo API key mới

2. **Không thấy phản hồi AI:**
   - Mở Console để xem log
   - Kiểm tra file .env
   - Restart server (Ctrl+C và `npm run dev`)

3. **Phản hồi chậm:**
   - Bình thường, Gemini API cần 1-3 giây
   - Có loading indicator khi AI đang "suy nghĩ"

### Support:
Nếu gặp vấn đề, kiểm tra Console logs để debug.

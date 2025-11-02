// src/config/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * LƯU Ý CẤU HÌNH:
 * - Tạo file .env (hoặc .env.local) và đặt: VITE_GEMINI_API_KEY=YOUR_KEY
 * - Với Vite, biến môi trường được truy cập qua import.meta.env.*
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('Thiếu biến môi trường VITE_GEMINI_API_KEY. Hãy cấu hình trong .env');
}

// Khởi tạo Gemini + Model (singleton)
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

// System prompt cho Talkademy
const SYSTEM_PROMPT = `
Bạn là AI Assistant của Talkademy - nền tảng học tiếng Việt trực tuyến hàng đầu.

THÔNG TIN VỀ TALKADEMY:
- Talkademy là nền tảng học tiếng Việt cho người nước ngoài
- Sử dụng công nghệ AI để phân tích phát âm theo thời gian thực
- Cung cấp 3 miền giọng: Bắc, Trung, Nam
- Có app mobile hỗ trợ học offline
- Hệ thống flashcards, bài tập tương tác, theo dõi tiến độ

GÓI HỌC:
1. Gói Cơ bản (199k/tháng): Bài học cơ bản
2. Gói Nâng cao (399k/tháng): Có thêm AI tutor
3. Gói Premium (699k/tháng): Full tính năng + 1-1 coaching

ƯU ĐÃI HIỆN TẠI:
- Giảm 50% cho học viên mới
- Học thử miễn phí 7 ngày
- Hoàn tiền 100% nếu không hài lòng trong 30 ngày

QUY TRÌNH HỌC:
1. Đánh giá trình độ
2. Lộ trình cá nhân hóa
3. Học theo module (15-30 phút/bài)
4. Luyện tập thực hành
5. Kiểm tra và cấp chứng chỉ

HƯỚNG DẪN TRẢ LỜI:
- Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Tập trung vào học tiếng Việt, phát âm, quy trình học, app và gói đăng ký
- Khuyến khích người dùng dùng thử các tính năng
- Không trả lời các câu hỏi ngoài phạm vi Talkademy
- Giữ câu trả lời ngắn gọn (dưới 150 từ)
`;

/**
 * Gọi Gemini để tạo câu trả lời.
 * @param {string} userMessage - Tin nhắn người dùng
 * @param {Array<{type:'user'|'assistant', content:string}>} conversationHistory - lịch sử hội thoại (tùy chọn)
 * @returns {Promise<string>}
 */
export const getGeminiResponse = async (userMessage, conversationHistory = []) => {
  try {
    const context = conversationHistory
      .slice(-5)
      .map((msg) => `${msg.type === 'user' ? 'Người dùng' : 'AI'}: ${msg.content}`)
      .join('\n');

    const fullPrompt = `${SYSTEM_PROMPT}

LỊCH SỬ HỘI THOẠI:
${context}

NGƯỜI DÙNG VỪA HỎI: ${userMessage}

HÃY TRẢ LỜI:`;

    // Timeout thủ công 30s
    const result = await Promise.race([
      // Bạn có thể truyền string trực tiếp cho generateContent
      model.generateContent(fullPrompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 30_000)
      ),
    ]);

    const response = await result.response;
    const text = response.text();
    return (text || '').trim();
  } catch (error) {
    const msg = (error && error.message) || '';

    if (msg.includes('API_KEY')) {
      throw new Error('API Key không hợp lệ hoặc đã hết hạn');
    }
    if (msg.toLowerCase().includes('quota')) {
      throw new Error('Đã vượt quá giới hạn sử dụng API');
    }
    if (msg.toLowerCase().includes('timeout')) {
      throw new Error('Kết nối quá chậm, vui lòng thử lại');
    }
    throw new Error('Có lỗi xảy ra với dịch vụ AI');
  }
};

export default { getGeminiResponse };

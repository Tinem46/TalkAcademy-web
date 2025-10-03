import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key - sử dụng trực tiếp để tránh vấn đề environment variables
const API_KEY = 'AIzaSyDAou0lcUSAPHTUCI6YH4RQ2QUa-BLFs-o';

console.log('🔑 Using hardcoded API Key:', API_KEY.substring(0, 10) + '...');
console.log('✅ Gemini API Key đã được cấu hình trực tiếp');

// Khởi tạo Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Cấu hình model đơn giản
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp"
});

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

// Hàm gọi Gemini API
export const getGeminiResponse = async (userMessage, conversationHistory = []) => {
    console.log('🤖 Starting Gemini API call...');
    console.log('📝 User message:', userMessage);
    console.log('📚 Conversation history length:', conversationHistory.length);

    console.log('🔑 Using API Key:', API_KEY.substring(0, 10) + '...');

    try {
        // Tạo context từ lịch sử hội thoại
        const context = conversationHistory
            .slice(-5) // Chỉ lấy 5 tin nhắn gần nhất
            .map(msg => `${msg.type === 'user' ? 'Người dùng' : 'AI'}: ${msg.content}`)
            .join('\n');

        console.log('🔗 Context created, length:', context.length);

        // Tạo prompt đầy đủ
        const fullPrompt = `${SYSTEM_PROMPT}

LỊCH SỬ HỘI THOẠI:
${context}

NGƯỜI DÙNG VỪA HỎI: ${userMessage}

HÃY TRẢ LỜI:`;

        console.log('📤 Sending request to Gemini...');

        // Sử dụng model đã khởi tạo sẵn
        // Hoặc tạo instance mới nếu cần
        const tempAI = new GoogleGenerativeAI(API_KEY);
        const tempModel = tempAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp"
        });

        // Gọi API với timeout
        const result = await Promise.race([
            tempModel.generateContent(fullPrompt),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), 30000)
            )
        ]);

        console.log('📥 Received response from Gemini');
        const response = await result.response;
        const text = response.text();

        console.log('✅ Gemini API response:', text.substring(0, 100) + '...');
        return text.trim();
    } catch (error) {
        console.error('❌ Gemini API Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack?.substring(0, 200)
        });

        // Throw với thông tin chi tiết hơn
        if (error.message.includes('API_KEY')) {
            throw new Error('API Key không hợp lệ hoặc đã hết hạn');
        } else if (error.message.includes('quota')) {
            throw new Error('Đã vượt quá giới hạn sử dụng API');
        } else if (error.message.includes('timeout')) {
            throw new Error('Kết nối quá chậm, vui lòng thử lại');
        } else {
            throw new Error('Có lỗi xảy ra với dịch vụ AI');
        }
    }
};

// Chỉ export function chính
export default { getGeminiResponse };

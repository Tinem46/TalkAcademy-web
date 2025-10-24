import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Avatar, Typography, Tag, Divider } from 'antd';
import {
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    SoundOutlined,
    BookOutlined,
    MobileOutlined,
    CrownOutlined,
    InfoCircleOutlined,
    MessageOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// --- DYNAMIC STYLES COMPONENT ---
const ChatAIStyles = () => {
    useEffect(() => {
        const styleId = 'chat-ai-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .chat-ai-container {
                max-width: 700px;
                margin: 40px auto;
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0, 77, 153, 0.1);
                display: flex;
                flex-direction: column;
                height: 85vh;
                background: #f7f9fc;
                overflow: hidden;
            }

            .chat-header {
                padding: 16px 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e8e8e8;
            }
            .chat-header .chat-title {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .chat-header .chat-icon {
                font-size: 28px;
                color: #1890ff;
            }
            .chat-header .chat-status {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .chat-header .status-indicator.online {
                width: 10px;
                height: 10px;
                background-color: #52c41a;
                border-radius: 50%;
                box-shadow: 0 0 8px rgba(82, 196, 26, 0.6);
            }

            .chat-messages {
                flex-grow: 1;
                overflow-y: auto;
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                scrollbar-width: thin;
                scrollbar-color: #1890ff #f0f0f0;
            }
            .chat-messages::-webkit-scrollbar {
                width: 6px;
            }
            .chat-messages::-webkit-scrollbar-thumb {
                background-color: #1890ff;
                border-radius: 3px;
            }

            .message {
                display: flex;
                align-items: flex-end;
                gap: 12px;
                max-width: 80%;
            }
            .message.user {
                align-self: flex-end;
                flex-direction: row-reverse;
            }
            .message.ai {
                align-self: flex-start;
            }
            
            .message-avatar {
                flex-shrink: 0;
            }
            .message-avatar.ai { background-color: #1890ff; }
            .message-avatar.user { background-color: #8c8c8c; }

            .message-content {
                display: flex;
                flex-direction: column;
            }
            .message.user .message-content { align-items: flex-end; }
            .message.ai .message-content { align-items: flex-start; }

            .message-bubble {
                padding: 12px 16px;
                border-radius: 18px;
            }
            .message-bubble.ai {
                background-color: #ffffff;
                border: 1px solid #e8e8e8;
                border-top-left-radius: 4px;
            }
            .message-bubble.user {
                background-color: #1890ff;
                color: white;
                border-top-right-radius: 4px;
            }
             .message-bubble.user .ant-typography {
                color: white;
            }

            .message-time {
                font-size: 12px;
                margin-top: 4px;
                padding: 0 8px;
            }

            .typing-indicator { display: flex; align-items: center; padding: 10px 0; }
            .typing-indicator span {
                height: 8px;
                width: 8px;
                margin: 0 2px;
                background-color: #999;
                border-radius: 50%;
                display: inline-block;
                animation: typing-animation 1.4s infinite ease-in-out both;
            }
            .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
            .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typing-animation {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1.0); }
            }

            .suggested-questions {
                padding: 16px 24px 12px;
                border-top: 1px solid #e8e8e8;
            }
            .suggested-questions .questions-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 8px;
            }
            .suggested-question {
                cursor: pointer;
                border-radius: 16px;
                padding: 6px 12px;
                transition: all 0.3s;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
             .suggested-question:hover {
                background-color: #e6f7ff;
                border-color: #91d5ff;
            }

            .chat-input {
                padding: 16px 24px;
                border-top: 1px solid #e8e8e8;
                background: #fff;
            }
            .chat-input .ant-input-lg {
                border-radius: 20px;
            }
            .chat-input .send-button {
                border-radius: 50%;
                width: 38px;
                height: 38px;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const styleElement = document.getElementById(styleId);
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    return null;
};


// --- CƠ SỞ KIẾN THỨC NÂNG CAO CỦA AI (ĐÃ CẬP NHẬT) ---
const aiKnowledgeBase = {
    // Thông tin chung & Marketing
    'about_talkademy': {
        keywords: ['talkademy', 'là gì', 'về trang web', 'về talkademy', 'giới thiệu'],
        response: 'Talkademy là một ứng dụng luyện giọng nói thông minh, sử dụng AI để phân tích và đưa ra lộ trình luyện tập cá nhân hóa. Triết lý của chúng tôi là xây dựng kỹ năng giọng nói dựa trên 6 trục chính để giúp bạn giao tiếp rõ ràng, truyền cảm và tự tin hơn.',
        suggestions: ['6 trục kỹ năng là gì?', 'App có bài test đầu vào không?', 'Kế hoạch ra mắt thế nào?']
    },
     'prelaunch_activities': {
        keywords: ['ra mắt', 'pre-launch', 'marketing', 'fanpage', 'kế hoạch'],
        response: 'Hiện tại, Talkademy đang trong giai đoạn tiền ra mắt với các hoạt động chính: xây dựng fanpage, tổ chức khảo sát online để hiểu nhu cầu người dùng, và chuẩn bị landing page để người dùng có thể đăng ký nhận thông tin sớm. Bạn có thể theo dõi tại https://talk-academy.vercel.app/',
    },
    'target_customer': {
        keywords: ['khách hàng', 'đối tượng', 'dành cho ai'],
        response: 'Khách hàng tiềm năng của Talkademy rất đa dạng, bao gồm: sinh viên các khối ngành ngôn ngữ, truyền thông, MC, giáo viên tương lai, và bất kỳ ai quan tâm đến việc cải thiện kỹ năng giao tiếp, thuyết trình và làm chủ giọng nói của mình.',
    },
    'reach_customers': {
        keywords: ['tiếp cận', 'thuyết phục', 'dùng thử', 'referral'],
        response: 'Chúng tôi sẽ tiếp cận khách hàng qua email, các nhóm cộng đồng và mạng xã hội. Để thuyết phục người dùng, Talkademy sẽ cung cấp gói dùng thử miễn phí có tính năng AI feedback để họ thấy rõ sự cải thiện. Ngoài ra, chương trình giới thiệu bạn bè (referral) cũng sẽ được áp dụng.',
    },
    
    // Giá & Doanh thu
    'pricing_overview': {
        keywords: ['giá', 'chi phí', 'gói cước', 'đăng ký'],
        response: 'Talkademy có 2 gói đăng ký chính: Gói tháng và Gói năm. Mỗi gói đều được thiết kế để mang lại giá trị tốt nhất cho người dùng. Bạn muốn tìm hiểu chi tiết về gói nào?',
        suggestions: ['Giá Gói tháng?', 'Giá Gói năm?']
    },
    'pricing_monthly': {
        keywords: ['gói tháng', '139000', '139k'],
        response: 'Gói tháng của Talkademy có giá 139,000 VND, phù hợp cho những ai muốn trải nghiệm và cải thiện kỹ năng trong thời gian ngắn.',
    },
    'pricing_yearly': {
        keywords: ['gói năm', '1499000', '1.499k'],
        response: 'Gói năm có giá 1,499,000 VND, là lựa chọn tiết kiệm hơn cho những người dùng cam kết luyện tập dài hạn để đạt được sự tiến bộ vượt bậc.',
    },
    'revenue_target': {
        keywords: ['doanh thu', 'mục tiêu', 'kinh doanh'],
        response: 'Mục tiêu doanh thu dự kiến của Talkademy vào tháng 10/2025 là khoảng 2,889,000 VND và tháng 11/2025 là 3,584,000 VND, dựa trên kế hoạch tăng trưởng người dùng tự nhiên.',
    },

    // Triết lý & Phương pháp
    'skill_map_overview': {
        keywords: ['bản đồ kỹ năng', '6 trục', 'kỹ năng chính', 'triết lý'],
        response: 'Talkademy xây dựng lộ trình học dựa trên bản đồ 6 trục kỹ năng chính: 1. Hơi thở & Độ bền hơi, 2. Khẩu hình & Nguyên âm, 3. Phụ âm cuối & Độ rõ chữ, 4. Tốc độ & Nhịp câu, 5. Ngắt hơi & Ngữ điệu, 6. Nối âm & Độ mượt.',
        suggestions: ['Bài test đầu vào hoạt động thế nào?', 'Có cá nhân hóa theo vùng giọng không?']
    },
    'accent_personalization': {
        keywords: ['vùng giọng', 'giọng bắc', 'giọng trung', 'giọng nam', 'cá nhân hoá'],
        response: 'Chắc chắn rồi! Một trong những điểm đặc biệt của Talkademy là khả năng cá nhân hoá bài tập theo vùng giọng bạn chọn (Bắc, Trung, hoặc Nam) để sửa các lỗi phát âm đặc trưng như "ch–tr, s–x, r–d–gi" hay dấu hỏi–ngã.',
    },
    'onboarding_test': {
        keywords: ['test đầu vào', 'kiểm tra', 'đánh giá'],
        response: 'Ngay khi bắt đầu, bạn sẽ thực hiện một bài test đầu vào từ 3–5 phút. AI sẽ phân tích các yếu tố như thời gian phát âm tối đa (MPT), độ rõ chữ (CER/WER), tốc độ, ngữ điệu... để chấm điểm tổng (0-100) và tự động xếp bạn vào một trong 5 cấp độ (L0-L4).',
    },
    'learning_path_customization': {
        keywords: ['lộ trình cá nhân', 'định tuyến', 'bài học ưu tiên'],
        response: 'Dựa vào kết quả test đầu vào, AI sẽ tự động định tuyến và ưu tiên các bài tập phù hợp nhất với điểm yếu của bạn. Ví dụ, nếu độ rõ chữ thấp, hệ thống sẽ đề xuất các bài tập về phụ âm cuối và tongue twister.',
    },
    'warmup_routine': {
        keywords: ['khởi động', 'làm ấm giọng', 'trước mỗi buổi'],
        response: 'Để đảm bảo an toàn và hiệu quả, mỗi buổi luyện tập trên Talkademy đều bắt đầu bằng một bài khởi động bắt buộc từ 3–5 phút, bao gồm các động tác thả lỏng cơ, làm ấm dây thanh, và luyện hơi thở bụng.',
    },
    
    // Chi tiết bài tập
    'exercise_overview': {
        keywords: ['bài tập', 'lộ trình học', '15 bài'],
        response: 'Lộ trình học chính của Talkademy bao gồm 15 bài tập được thiết kế khoa học từ dễ đến khó, chia thành các module: Nền tảng, Khẩu hình & Rõ chữ, Tốc độ – Ngắt – Ngữ điệu, và Trình diễn. Mỗi bài đều có thông số tuỳ chỉnh theo cấp độ của bạn.',
        suggestions: ['Kể tên một vài bài tập thú vị?', 'Kế hoạch luyện tập hàng ngày ra sao?']
    },
    'exercise_examples': {
        keywords: ['tongue twister', 'nối âm', 'ngắt hơi', 'bài tập mẫu'],
        response: 'Talkademy có rất nhiều bài tập đa dạng! Ví dụ như bài "Tongue twister" với các câu như "Sáu sáo sà xuống sông sâu", bài "Nối âm tự nhiên" (chúng_em, anh_ấy), hay bài "Ngắt hơi đúng chỗ" để bạn học cách điều khiển nhịp điệu cho một đoạn văn.',
    },
    'daily_plan': {
        keywords: ['kế hoạch hàng ngày', 'luyện tập mỗi ngày', '14 ngày'],
        response: 'Ứng dụng sẽ tự động tạo một kế hoạch luyện tập hàng ngày từ 15–20 phút cho bạn, bao gồm: 5 phút khởi động, 10 phút luyện kỹ năng trọng tâm (AI gợi ý), và 5 phút thực chiến (đọc, shadowing). Ngoài ra còn có các vòng lặp 14 ngày để bạn thấy rõ sự tiến bộ.',
    },
    'feedback_system': {
        keywords: ['phản hồi', 'feedback', 'sửa lỗi', 'AI chấm điểm'],
        response: 'Trong mỗi buổi tập, AI sẽ đưa ra phản hồi tức thời và cực kỳ chi tiết. Ví dụ: hiển thị phần trăm rõ chữ (CER/WER), highlight từ sai, vẽ biểu đồ ngữ điệu, và đưa ra các mẹo ngắn gọn như: "Âm /t/ cuối đang bị nuốt ở 3/8 từ. Hãy chặn hơi 70ms trước khi nhả."',
    },
     'greeting': {
        keywords: ['xin chào', 'chào', 'hello'],
        response: 'Xin chào! Tôi là trợ lý AI của Talkademy. Tôi có thể giúp gì cho bạn hôm nay?',
    },
    'thank_you': {
        keywords: ['cảm ơn', 'thanks', 'tuyệt vời'],
        response: 'Rất vui vì đã giúp được bạn! Bạn còn câu hỏi nào khác không?',
    },
};

const ChatAI = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Xin chào! Tôi là AI assistant của Talkademy. Tôi có thể giúp bạn hiểu mọi thứ về phương pháp luyện giọng của chúng tôi. Bạn muốn hỏi gì?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [dynamicSuggestions, setDynamicSuggestions] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const initialSuggestedQuestions = [
        { icon: <InfoCircleOutlined />, text: 'Triết lý của Talkademy là gì?' },
        { icon: <SoundOutlined />, text: 'AI chấm điểm giọng nói thế nào?' },
        { icon: <BookOutlined />, text: 'Kể tên một vài bài tập.' },
        { icon: <CrownOutlined />, text: 'Các gói giá thế nào?' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const findBestResponse = (userInput) => {
        const input = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
        const inputKeywords = input.split(/\s+/);
        let bestMatch = { id: null, score: 0 };

        for (const [id, data] of Object.entries(aiKnowledgeBase)) {
            let currentScore = 0;
            data.keywords.forEach(keyword => {
                const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
                if (input.includes(normalizedKeyword)) {
                    currentScore += normalizedKeyword.split(/\s+/).length * 2; // Ưu tiên cụm từ dài
                }
            });
            inputKeywords.forEach(inputWord => {
                if (data.keywords.includes(inputWord)) {
                    currentScore += 1;
                }
            });
            if (currentScore > bestMatch.score) {
                bestMatch = { id, score: currentScore };
            }
        }

        if (bestMatch.score > 1) { // Tăng ngưỡng để chắc chắn hơn
            return aiKnowledgeBase[bestMatch.id];
        }

        return {
            response: 'Cảm ơn bạn đã hỏi! Tôi chưa hiểu rõ câu hỏi của bạn. Tôi có thể giúp bạn tìm hiểu về các chủ đề: triết lý sản phẩm, phương pháp luyện tập, cấu trúc bài học, mô hình kinh doanh... Bạn có thể hỏi cụ thể hơn hoặc chọn một trong những gợi ý nhé!',
            suggestions: []
        };
    };

    const processMessage = (messageContent) => {
        const userMessage = { id: Date.now(), type: 'user', content: messageContent, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setTimeout(() => scrollToBottom(), 50);

        setTimeout(() => {
            const aiResponseObject = findBestResponse(messageContent);
            const aiMessage = { id: Date.now() + 1, type: 'ai', content: aiResponseObject.response, timestamp: new Date() };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            setDynamicSuggestions(aiResponseObject.suggestions || []);
            setTimeout(() => scrollToBottom(), 50);
        }, 1000 + Math.random() * 1000);
    }

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        processMessage(inputValue);
    };

    const handleSuggestedQuestion = (question) => {
        processMessage(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };
    
    useEffect(() => {
      scrollToBottom();
    }, [messages, isTyping]);

    return (
        <>
            <ChatAIStyles />
            <Card className="chat-ai-container">
                <div className="chat-header">
                    <div className="chat-title">
                        <RobotOutlined className="chat-icon" />
                        <div>
                            <Title level={3} style={{ margin: 0 }}>AI Assistant Talkademy</Title>
                            <Text type="secondary">Hỏi đáp thông minh về luyện giọng</Text>
                        </div>
                    </div>
                    <div className="chat-status">
                        <div className="status-indicator online"></div>
                        <Text>Đang online</Text>
                    </div>
                </div>

                <div className="chat-messages" ref={messagesContainerRef}>
                    {messages.map((message) => (
                        <div key={message.id} className={`message ${message.type}`}>
                            <Avatar
                                icon={message.type === 'ai' ? <RobotOutlined /> : <UserOutlined />}
                                className={`message-avatar ${message.type}`}
                            />
                            <div className="message-content">
                                <div className={`message-bubble ${message.type}`}>
                                    <Text>{message.content}</Text>
                                </div>
                                <Text className="message-time" type="secondary">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message ai">
                            <Avatar icon={<RobotOutlined />} className="message-avatar ai" />
                            <div className="message-content">
                                <div className="message-bubble ai typing">
                                    <div className="typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="suggested-questions">
                    <Title level={5} style={{marginBottom: '8px'}}>Câu hỏi gợi ý:</Title>
                    <div className="questions-grid">
                        {(dynamicSuggestions.length > 0 ? dynamicSuggestions.map(q => ({text: q, icon: <MessageOutlined/> })) : initialSuggestedQuestions).map((question, index) => (
                            <Tag
                                key={index}
                                className="suggested-question"
                                onClick={() => handleSuggestedQuestion(question.text)}
                            >
                                {question.icon}
                                <span>{question.text}</span>
                            </Tag>
                        ))}
                    </div>
                </div>

                <div className="chat-input">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập câu hỏi của bạn..."
                        suffix={
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                className="send-button"
                            />
                        }
                        size="large"
                    />
                </div>
            </Card>
        </>
    );
};

export default ChatAI;


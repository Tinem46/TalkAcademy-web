import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Avatar, Typography, Space, Tag, Divider } from 'antd';
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
import './index.scss';

const { Title, Text, Paragraph } = Typography;

const ChatAI = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Xin chào! Tôi là AI assistant của Talkademy. Tôi có thể giúp bạn tìm hiểu về trang web, giọng nói phát âm tiếng Việt, quy trình học, ứng dụng và các gói đăng ký. Bạn muốn hỏi gì?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const suggestedQuestions = [
        {
            icon: <InfoCircleOutlined />,
            text: 'Talkademy là gì?',
            category: 'website'
        },
        {
            icon: <SoundOutlined />,
            text: 'Làm sao để cải thiện phát âm tiếng Việt?',
            category: 'pronunciation'
        },
        {
            icon: <BookOutlined />,
            text: 'Quy trình học như thế nào?',
            category: 'learning'
        },
        {
            icon: <MobileOutlined />,
            text: 'App có những tính năng gì?',
            category: 'app'
        },
        {
            icon: <CrownOutlined />,
            text: 'Có những gói học nào?',
            category: 'packages'
        }
    ];

    const aiResponses = {
        website: {
            'talkademy là gì': 'Talkademy là nền tảng học tiếng Việt trực tuyến hàng đầu, giúp người nước ngoài học tiếng Việt một cách hiệu quả và thú vị. Chúng tôi cung cấp các khóa học từ cơ bản đến nâng cao với phương pháp giảng dạy hiện đại.',
            'về trang web': 'Website Talkademy được thiết kế thân thiện với người dùng, tích hợp nhiều tính năng học tập thông minh như flashcards, bài tập tương tác, theo dõi tiến độ và cộng đồng học viên sôi động.',
            'đặc điểm': 'Talkademy nổi bật với giao diện đẹp mắt, AI hỗ trợ học tập, hệ thống bài giảng có cấu trúc và đội ngũ giáo viên giàu kinh nghiệm.'
        },
        pronunciation: {
            'phát âm': 'Chúng tôi sử dụng công nghệ AI để phân tích và đánh giá phát âm của bạn theo thời gian thực. Hệ thống sẽ chỉ ra những âm cần cải thiện và đưa ra bài tập luyện tập phù hợp.',
            'giọng điệu': 'Talkademy cung cấp bài học về 3 miền giọng chính: Bắc, Trung, Nam. Bạn có thể chọn học theo giọng địa phương mà mình quan tâm nhất.',
            'luyện nói': 'Hệ thống có tính năng ghi âm và so sánh với giọng chuẩn, giúp bạn tự đánh giá và cải thiện kỹ năng nói từng ngày.'
        },
        learning: {
            'quy trình': 'Quy trình học tại Talkademy gồm 5 bước: (1) Đánh giá trình độ, (2) Lộ trình cá nhân hóa, (3) Học theo module, (4) Luyện tập thực hành, (5) Kiểm tra và cấp chứng chỉ.',
            'phương pháp': 'Chúng tôi áp dụng phương pháp học tích hợp: nghe - nói - đọc - viết, kết hợp với gamification để tạo động lực học tập.',
            'thời gian': 'Mỗi bài học kéo dài 15-30 phút, phù hợp với lịch trình bận rộn. Bạn có thể học bất cứ khi nào và ở đâu.'
        },
        app: {
            'ứng dụng': 'App Talkademy có đầy đủ tính năng như web, hỗ trợ học offline, thông báo nhắc nhở học tập và sync dữ liệu giữa các thiết bị.',
            'tính năng': 'App có: học từ vựng với flashcards, luyện nghe với video, trò chơi học tập, cộng đồng học viên và AI chatbot hỗ trợ 24/7.',
            'offline': 'Bạn có thể tải bài học về máy để học offline khi không có internet. Tiến độ sẽ được đồng bộ khi kết nối lại.'
        },
        packages: {
            'gói học': 'Talkademy có 3 gói chính: (1) Gói Cơ bản (199k/tháng), (2) Gói Nâng cao (399k/tháng), (3) Gói Premium (699k/tháng). Mỗi gói có quyền lợi và thời gian học khác nhau.',
            'giá cả': 'Gói Cơ bản 199k/tháng bao gồm các bài học cơ bản. Gói Nâng cao 399k/tháng có thêm AI tutor. Gói Premium 699k/tháng full tính năng + 1-1 coaching.',
            'ưu đãi': 'Hiện tại có ưu đãi giảm 50% cho học viên mới, học thử miễn phí 7 ngày và hoàn tiền 100% nếu không hài lòng trong 30 ngày đầu.',
            'so sánh': 'Gói Cơ bản phù hợp người mới bắt đầu. Gói Nâng cao cho người muốn học chuyên sâu. Gói Premium dành cho những ai cần hỗ trợ cá nhân hóa tối đa.'
        }
    };

    // Loại bỏ auto scroll mỗi khi messages thay đổi
    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const findBestResponse = (userInput) => {
        const input = userInput.toLowerCase();

        // Tìm trong các category
        for (const [category, responses] of Object.entries(aiResponses)) {
            for (const [key, response] of Object.entries(responses)) {
                if (input.includes(key) || key.includes(input)) {
                    return response;
                }
            }
        }

        // Phản hồi mặc định
        if (input.includes('xin chào') || input.includes('hello') || input.includes('chào')) {
            return 'Xin chào! Rất vui được hỗ trợ bạn. Bạn muốn tìm hiểu về điều gì ở Talkademy?';
        }

        return 'Cảm ơn bạn đã hỏi! Tôi có thể giúp bạn tìm hiểu về các chủ đề: thông tin trang web, phát âm tiếng Việt, quy trình học, ứng dụng mobile và các gói đăng ký. Bạn có thể hỏi cụ thể hơn hoặc chọn một trong những gợi ý bên dưới nhé!';
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        const currentInput = inputValue;
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Cuộn xuống ngay sau khi thêm tin nhắn user
        setTimeout(() => {
            scrollToBottom();
        }, 50);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = findBestResponse(currentInput);
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);

            // Không tự động cuộn sau khi AI phản hồi
            // setTimeout(() => {
            //     scrollToBottom();
            // }, 50);
        }, 1000 + Math.random() * 2000);
    };

    const handleSuggestedQuestion = (question) => {
        setInputValue(question);
        // Tự động gửi tin nhắn sau khi chọn câu hỏi gợi ý
        setTimeout(() => {
            const userMessage = {
                id: Date.now(),
                type: 'user',
                content: question,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            setInputValue('');
            setIsTyping(true);

            // Cuộn xuống ngay sau khi thêm tin nhắn user
            setTimeout(() => {
                scrollToBottom();
            }, 50);

            // Simulate AI thinking time
            setTimeout(() => {
                const aiResponse = findBestResponse(question);
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: aiResponse,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);

                // Không tự động cuộn sau khi AI phản hồi
                // setTimeout(() => {
                //     scrollToBottom();
                // }, 50);
            }, 1000 + Math.random() * 2000);
        }, 200);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Card className="chat-ai-container">
            <div className="chat-header">
                <div className="chat-title">
                    <RobotOutlined className="chat-icon" />
                    <div>
                        <Title level={3} style={{ margin: 0 }}>AI Assistant Talkademy</Title>
                        <Text type="secondary">Hỏi đáp thông minh về học tiếng Việt</Text>
                    </div>
                </div>
                <div className="chat-status">
                    <div className="status-indicator online"></div>
                    <Text>Đang online</Text>
                </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

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
                                {message.timestamp.toLocaleTimeString()}
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
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="suggested-questions">
                <Title level={5}>Câu hỏi gợi ý:</Title>
                <div className="questions-grid">
                    {suggestedQuestions.map((question, index) => (
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
    );
};

export default ChatAI;

import React, { useState, useRef } from 'react';
import { Card, Input, Button, Avatar, Typography, Space, Tag, Badge } from 'antd';
import {
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    SoundOutlined,
    BookOutlined,
    MobileOutlined,
    CrownOutlined,
    InfoCircleOutlined,
    MessageOutlined,
    CloseOutlined,
    CommentOutlined
} from '@ant-design/icons';
import './index.scss';
import mascotAI from '../../assets/Mascot/Asset 3talking.png';
import { getGeminiResponse } from '../../config/gemini';

const { Title, Text } = Typography;

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
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
    const [hasNewMessage, setHasNewMessage] = useState(false);
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

    // Đã xóa aiResponses - chỉ sử dụng Gemini API

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getAIResponse = async (userInput) => {
        console.log('🤖 ChatWidget: Bắt đầu gọi AI với input:', userInput);

        try {
            // Chỉ sử dụng Gemini API, không có fallback
            const response = await getGeminiResponse(userInput, messages);
            console.log('✅ ChatWidget: Nhận được response:', response.substring(0, 50) + '...');
            return response;
        } catch (error) {
            console.error('❌ ChatWidget: Lỗi AI API:', error.message);

            // Trả về thông báo lỗi cụ thể
            return `Xin lỗi! ${error.message} Vui lòng thử lại sau. 🔄`;
        }
    };

    // Đã xóa findBestResponse - chỉ sử dụng Gemini API

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

        // Gọi AI để tạo phản hồi
        setTimeout(async () => {
            try {
                const aiResponse = await getAIResponse(currentInput);
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: aiResponse,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);

                // Nếu chat đang đóng, hiển thị thông báo có tin nhắn mới
                if (!isOpen) {
                    setHasNewMessage(true);
                }
            } catch (error) {
                console.error('Error in handleSendMessage:', error);
                // Fallback response khi có lỗi
                const fallbackResponse = 'Xin lỗi! Tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau. 🔄';
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: fallbackResponse,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
                setIsTyping(false);

                if (!isOpen) {
                    setHasNewMessage(true);
                }
            }
        }, 1000 + Math.random() * 1000); // Giảm thời gian chờ
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

            // Gọi AI để tạo phản hồi
            setTimeout(async () => {
                try {
                    const aiResponse = await getAIResponse(question);
                    const aiMessage = {
                        id: Date.now() + 1,
                        type: 'ai',
                        content: aiResponse,
                        timestamp: new Date()
                    };

                    setMessages(prev => [...prev, aiMessage]);
                    setIsTyping(false);

                    // Nếu chat đang đóng, hiển thị thông báo có tin nhắn mới
                    if (!isOpen) {
                        setHasNewMessage(true);
                    }
                } catch (error) {
                    console.error('Error in handleSuggestedQuestion:', error);
                    // Fallback response khi có lỗi
                    const fallbackResponse = 'Xin lỗi! Tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau. 🔄';
                    const aiMessage = {
                        id: Date.now() + 1,
                        type: 'ai',
                        content: fallbackResponse,
                        timestamp: new Date()
                    };

                    setMessages(prev => [...prev, aiMessage]);
                    setIsTyping(false);

                    if (!isOpen) {
                        setHasNewMessage(true);
                    }
                }
            }, 1000 + Math.random() * 1000); // Giảm thời gian chờ
        }, 200);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setHasNewMessage(false);
        }
    };

    return (
        <div className="chat-widget">
            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <Card className="chat-container">
                        <div className="chat-header">
                            <div className="chat-title">
                                <img src={mascotAI} alt="AI Mascot" className="chat-mascot-icon" />
                                <div>
                                    <Title level={5} style={{ margin: 0 }}>AI Assistant</Title>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>Talkademy</Text>
                                </div>
                            </div>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={toggleChat}
                                className="close-button"
                            />
                        </div>

                        <div className="chat-messages" ref={messagesContainerRef}>
                            {messages.map((message) => (
                                <div key={message.id} className={`message ${message.type}`}>
                                    {message.type === 'ai' ? (
                                        <div className="ai-avatar">
                                            <img src={mascotAI} alt="AI Mascot" />
                                        </div>
                                    ) : (
                                        <Avatar
                                            icon={<UserOutlined />}
                                            className="message-avatar user"
                                            size="small"
                                        />
                                    )}
                                    <div className="message-content">
                                        <div className={`message-bubble ${message.type}`}>
                                            <Text style={{ fontSize: '13px' }}>{message.content}</Text>
                                        </div>
                                        <Text className="message-time" type="secondary">
                                            {message.timestamp.toLocaleTimeString()}
                                        </Text>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="message ai">
                                    <div className="ai-avatar typing">
                                        <img src={mascotAI} alt="AI Mascot" />
                                    </div>
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
                            <div className="questions-grid">
                                {suggestedQuestions.slice(0, 3).map((question, index) => (
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
                                placeholder="Nhập câu hỏi..."
                                suffix={
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className="send-button"
                                        size="small"
                                    />
                                }
                                size="small"
                            />
                        </div>
                    </Card>
                </div>
            )}

            {/* Chat Toggle Button */}
            <Badge
                dot={hasNewMessage}
                offset={[-5, 5]}
                className={hasNewMessage ? 'notification-badge' : ''}
            >
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    onClick={toggleChat}
                    className="chat-toggle-button"
                >
                    {isOpen ? (
                        <CloseOutlined />
                    ) : (
                        <img src={mascotAI} alt="Chat with AI" className="toggle-mascot" />
                    )}
                </Button>
            </Badge>
        </div>
    );
};

export default ChatWidget;

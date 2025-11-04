import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const { Title, Paragraph } = Typography;

const QuoteSection = () => {
    const navigate = useNavigate();

    return (
        <div className="quote-section">
            <div className="quote-container">
                <div className="quote-content">
                    <div className="quote-text" data-aos="fade-up" data-aos-delay="100">
                        <Title level={2} className="quote" data-aos="fade-up" data-aos-delay="200">
                            "Sự tự tin tạo nên tất cả"
                        </Title>
                        <Paragraph className="quote-author" data-aos="fade-up" data-aos-delay="300">
                            EXE201 LEGION
                        </Paragraph>
                    </div>
                    <div className="quote-actions" data-aos="zoom-in" data-aos-delay="400">
                        <Button
                            className="quote-btn"
                            onClick={() => navigate('/download')}
                        >
                            Bắt đầu ngay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteSection;

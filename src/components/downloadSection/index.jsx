import React from 'react';
import './index.scss';
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';

const DownloadSection = () => {
    return (
        <>
            <div className="title-section">
                <h2 className="download-title" data-aos="fade-up" data-aos-delay="100">Trải Nghiệm Ngay</h2>
            </div>

            <div className="download-section">

                <div className="download-container">

                    <div className="mascot-wrapper" data-aos="zoom-in" data-aos-delay="200">
                        <div className="mascot-icon">
                          <img src={mascot1} alt="Talkademy Logo" className="mascot-image" />
                        </div>
                    </div>

                    <h3 className="app-name" data-aos="fade-up" data-aos-delay="300">Talkademy App</h3>

                    <p className="download-subtitle" data-aos="fade-up" data-aos-delay="400">
                        Ứng dụng giúp bạn cải thiện giọng nói của mình
                    </p>

                    <p className="download-description" data-aos="fade-up" data-aos-delay="500">
                        "Hãy bắt đầu hành trình trở thành người giao tiếp tự tin và cuốn hút hơn từ hôm nay."
                    </p>

                    <div className="download-buttons" data-aos="fade-up" data-aos-delay="600">
                        <button className="store-btn google-play-btn">
                            <div className="store-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                            </div>
                            <span className="store-name">Google Play</span>
                        </button>

                      
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownloadSection;

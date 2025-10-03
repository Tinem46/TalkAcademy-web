import React from 'react';
import './index.scss';
import mascot from '../../assets/Mascot/Asset 2omg.png';

const LoadingAnimation = ({ isLoading = true, children }) => {
    if (!isLoading) {
        return children;
    }

    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="loading-mascot">
                    <img src={mascot} alt="Talkademy Mascot" className="mascot-loading" />
                    <div className="speech-bubble">
                        <div className="speech-text">Hãy đợi 1 tí...</div>
                        <div className="speech-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="loading-text">
                    <span>T</span>
                    <span>a</span>
                    <span>l</span>
                    <span>k</span>
                    <span>a</span>
                    <span>d</span>
                    <span>e</span>
                    <span>m</span>
                    <span>y</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;

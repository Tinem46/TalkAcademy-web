import React from 'react';
import { CheckCircle } from 'lucide-react';
import './index.scss';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Freemium",
      price: "FREE",
      priceUnit: "Vĩnh viễn",
      features: [
        "Test đầu vào (3-5 phút)",
        "Giới hạn 2 bài tập cơ bản",
        "Khởi động bắt buộc (3-5 phút)",
        "Không có AI chấm điểm chi tiết",
        "Không lưu lịch sử luyện tập"
      ],
      buttonText: "Thử ngay",
      isPro: false,
      isRecommended: false
    },
    {
      title: "Gói tháng",
      price: "139.000",
      priceUnit: "VND/tháng",
      features: [
        "Test đầu vào & chấm điểm AI",
        "Toàn bộ 15+ bài tập level hoá",
        "Lộ trình luyện tập cá nhân hoá",
        "AI chấm điểm chi tiết (Rõ chữ, Ngữ điệu...)",
        "Lưu lịch sử & theo dõi tiến độ"
      ],
      extraFeatures: [
        "Phân tích chuyên sâu 6 trục kỹ năng",
        "Truy cập nội dung nâng cao (thuyết trình)"
      ],
      buttonText: "Đăng kí",
      isPro: true,
      isRecommended: true // Đánh dấu đây là gói được gợi ý
    },
    {
        title: "Gói năm",
        price: "1.499.000",
        priceUnit: "VND/năm",
        features: [
          "Test đầu vào & chấm điểm AI",
          "Toàn bộ 15+ bài tập level hoá",
          "Lộ trình luyện tập cá nhân hoá",
          "AI chấm điểm chi tiết (Rõ chữ, Ngữ điệu...)",
          "Lưu lịch sử & theo dõi tiến độ"
        ],
        extraFeatures: [
          "Phân tích chuyên sâu 6 trục kỹ năng",
          "Truy cập nội dung nâng cao (thuyết trình)",
          "Tiết kiệm hơn 15% (so với gói tháng)"
        ],
        buttonText: "Đăng kí",
        isPro: true,
        isRecommended: false
      }
  ];

  return (
    <div className="pricingSection">
      <div className="pricingSection__stripes">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="pricingSection__stripe"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className="pricingSection__container">
        <div className="pricingSection__header">
          <h2 className="pricingSection__headerTitle">Các gói nâng cao</h2>
          <p className="pricingSection__headerSubtitle">The Best Solution for Our Clients</p>
        </div>

        <div className="pricingSection__grid">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricingSection__card ${plan.isPro ? 'pricingSection__card--pro' : ''} ${plan.isRecommended ? 'pricingSection__card--recommended' : ''}`}
            >
              <div className="pricingSection__cardHeader">
                <h3 className="pricingSection__planTitle">{plan.title}</h3>
                <div className="pricingSection__priceContainer">
                  <span className="pricingSection__price">{plan.price}</span>
                  {plan.priceUnit && (
                    <span className="pricingSection__priceUnit">{plan.priceUnit}</span>
                  )}
                </div>
              </div>

              <div className="pricingSection__featuresList">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="pricingSection__featureItem">
                    <div className="pricingSection__featureIconWrapper">
                      <CheckCircle className="pricingSection__featureIcon" />
                    </div>
                    <span className="pricingSection__featureText">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.isPro && plan.extraFeatures && (
                <div className="pricingSection__upgradeSection">
                  <p className="pricingSection__upgradeDivider">—— Upgrade to access ——</p>
                  <div className="pricingSection__extraFeaturesList">
                    {plan.extraFeatures.map((feature, idx) => (
                      <div key={idx} className="pricingSection__featureItem">
                        <div className="pricingSection__featureIconWrapper">
                          <CheckCircle className="pricingSection__featureIcon" />
                        </div>
                        <span className="pricingSection__featureText">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                className={`pricingSection__button ${plan.isPro ? 'pricingSection__button--pro' : ''} ${plan.isRecommended ? 'pricingSection__button--recommended' : ''}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
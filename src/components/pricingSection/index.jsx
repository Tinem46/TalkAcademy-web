import React from 'react';
import { CheckCircle } from 'lucide-react';
import './index.scss';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Freemium",
      price: "FREE",
      features: [
        "Offering one of the plan",
        "Offering two of the plan",
        "Offering three of the plan",
        "Offering Four of the plan",
        "Offering Five of the plan"
      ],
      buttonText: "Thử ngay",
      isPro: false
    },
    {
      title: "Gói nâng cao",
      price: "139.000",
      priceUnit: "VND/tháng",
      features: [
        "Offering one of the plan",
        "Offering two of the plan",
        "Offering three of the plan",
        "Offering Four of the plan",
        "Offering Five of the plan"
      ],
      extraFeatures: [
        "Offering One of the plan",
        "Offering Two of the plan"
      ],
      buttonText: "Đăng kí",
      isPro: true
    }
  ];

  return (
    <div className="pricingSection">
      <div className="stripedBackground">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="stripe"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className="container">
        <div className="header">
          <h2 className="title">Các gói nâng cao</h2>
          <p className="subtitle">The Best Solution for Our Clients</p>
        </div>

        <div className="cardsGrid">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="card">
              <div className="cardHeader">
                <h3 className="planTitle">{plan.title}</h3>
                <div className="priceContainer">
                  <span className="price">{plan.price}</span>
                  {plan.priceUnit && (
                    <span className="priceUnit">{plan.priceUnit}</span>
                  )}
                </div>
              </div>

              <div className="features">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="featureItem">
                    <div className="iconWrapper">
                      <CheckCircle />
                    </div>
                    <span className="featureText">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.isPro && plan.extraFeatures && (
                <div className="upgradeSection">
                  <p className="upgradeDivider">—— Upgrade to access ——</p>
                  <div className="extraFeatures">
                    {plan.extraFeatures.map((feature, idx) => (
                      <div key={idx} className="featureItem">
                        <div className="iconWrapper">
                          <CheckCircle />
                        </div>
                        <span className="featureText">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="button">
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

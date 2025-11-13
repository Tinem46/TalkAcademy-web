import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Spin, Alert } from "antd";
import api from "../../config/api";
import "./index.scss";

const PricingSection = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/packages");
        const payload = res?.data ?? res;
        // Expect payload to be an array of packages
        setPricingPlans(Array.isArray(payload) ? payload : payload.data || []);
      } catch (err) {
        console.error("Failed to load packages", err);
        setError(
          err?.response?.data?.message || err.message || "Không tải được gói"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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
          <p className="pricingSection__headerSubtitle">
            The Best Solution for Our Clients
          </p>
        </div>

        <div className="pricingSection__grid">
          {loading && (
            <div className="pricingSection__loading">
              <Spin />
            </div>
          )}

          {error && (
            <div className="pricingSection__error">
              <Alert type="error" message={error} />
            </div>
          )}

          {!loading &&
            !error &&
            pricingPlans.map((plan, index) => {
              const isPro =
                plan.level === "PRO" ||
                plan.isUnlimited === false ||
                plan.price > 0;
              const isRecommended = plan.isRecommended || false;
              const priceDisplay = plan.price
                ? String(plan.price)
                : plan.price === 0
                ? "FREE"
                : "Liên hệ";

              return (
                <div
                  key={plan.id ?? index}
                  className={`pricingSection__card ${
                    isPro ? "pricingSection__card--pro" : ""
                  } ${
                    isRecommended ? "pricingSection__card--recommended" : ""
                  }`}
                >
                  <div className="pricingSection__cardHeader">
                    <h3 className="pricingSection__planTitle">
                      {plan.title || plan.name || "Gói"}
                    </h3>
                    <div className="pricingSection__priceContainer">
                      <span className="pricingSection__price">
                        {priceDisplay}
                      </span>
                      {plan.durationDays && (
                        <span className="pricingSection__priceUnit">
                          {plan.durationDays} ngày
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pricingSection__featuresList">
                    {(plan.features || plan.feature || []).map(
                      (feature, idx) => (
                        <div key={idx} className="pricingSection__featureItem">
                          <div className="pricingSection__featureIconWrapper">
                            <CheckCircle className="pricingSection__featureIcon" />
                          </div>
                          <span className="pricingSection__featureText">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {isPro &&
                    (plan.extraFeatures || plan.extra || plan.description) && (
                      <div className="pricingSection__upgradeSection">
                        <p className="pricingSection__upgradeDivider">
                          —— Upgrade to access ——
                        </p>
                        <div className="pricingSection__extraFeaturesList">
                          {(plan.extraFeatures || plan.extra || []).map(
                            (feature, idx) => (
                              <div
                                key={idx}
                                className="pricingSection__featureItem"
                              >
                                <div className="pricingSection__featureIconWrapper">
                                  <CheckCircle className="pricingSection__featureIcon" />
                                </div>
                                <span className="pricingSection__featureText">
                                  {feature}
                                </span>
                              </div>
                            )
                          )}
                          {plan.description && (
                            <div className="pricingSection__featureItem">
                              <div className="pricingSection__featureIconWrapper">
                                <CheckCircle className="pricingSection__featureIcon" />
                              </div>
                              <span className="pricingSection__featureText">
                                {plan.description}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  <button
                    className={`pricingSection__button ${
                      isPro ? "pricingSection__button--pro" : ""
                    } ${
                      isRecommended ? "pricingSection__button--recommended" : ""
                    }`}
                  >
                    {isPro ? "Đăng kí" : "Thử ngay"}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

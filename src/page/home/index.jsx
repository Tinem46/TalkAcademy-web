import React from 'react';
import HeroSection from '../../components/heroSection';
import ServicesSection from '../../components/servicesSection';
import FeaturesSection from '../../components/featuresSection';
import WhySection from '../../components/whySection';
import DownloadSection from '../../components/downloadSection';
import PricingSection from '../../components/pricingSection';
import QuoteSection from '../../components/quoteSection';
import './index.scss';

const Home = () => {

  return (
    <div className="talkademy-home">
      <HeroSection />
      <div data-aos="fade-up" data-aos-delay="100">
        <ServicesSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <FeaturesSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <WhySection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <DownloadSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <PricingSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <QuoteSection />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './index.scss';
import mascot1 from '../../assets/Mascot/Asset 1longlanh.png';
import mascot2 from '../../assets/Mascot/Asset 2omg.png';
import mascot3 from '../../assets/Mascot/Asset 3talking.png';

const { Title, Paragraph } = Typography;

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.text-content, .mascot');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="features-section" ref={sectionRef}>
      {/* Background */}
      <div className="features-bg">
        <div className="bg-stripes" />
      </div>

      <div className="features-inner">
        {/* First Section: Birds left, Text right */}
        <Row className="main-row" align="middle" gutter={[100, 80]}>
          {/* Left: Pair of birds */}
          <Col xs={24} lg={10} className="birds-col">
            <div className="birds-container">
              <div className="mascot-pair">
                <img src={mascot2} alt="Mascot 2" className="mascot mascot-right" />
              </div>
            </div>
          </Col>

          {/* Right: Text content */}
          <Col xs={24} lg={14} className="text-col">
            <div className="text-content">
              <Title level={2} className="title">
                Các bài tập cải thiện giọng nói hiệu quả
              </Title>
              <Paragraph className="desc">
                Các bài tập của Talkademy được thiết kế trực quan, dễ tiếp cận, giúp người học luyện tập cải thiện một cách hiệu quả.
              </Paragraph>
            </div>
          </Col>
        </Row>

        {/* Second Section: Text left, Single bird right */}
        <Row className="main-row" align="middle" gutter={[0, 0]}>
          {/* Left: Text content */}
          <Col xs={24} lg={14} className="text-col">
            <div className="text-content">
              <Title level={2} className="title">
                Tích hợp AI phản hồi – đánh giá tức thì
              </Title>
              <Paragraph className="desc">
                Trí tuệ nhân tạo phân tích giọng nói, tốc độ, cách dùng từ và phong thái, đưa ra gợi ý cải thiện ngay lập tức.
              </Paragraph>
            </div>
          </Col>

          {/* Right: Single bird */}
          <Col xs={24} lg={6} className="birds-col">
            <div className="birds-container">
              <div className="mascot-single">
                <img src={mascot3} alt="Mascot 3" className="mascot mascot-single" />
              </div>
            </div>
          </Col>
        </Row>

        {/* Third Section: Large bird left, Text right */}
        <Row className="main-row third-row" align="middle" gutter={[60, 0]}>
          {/* Left: Large single bird */}
          <Col xs={24} lg={12} className="birds-col">
            <div className="birds-container">
              <div className="mascot-large">
                <img src={mascot1} alt="Mascot Large" className="mascot mascot-large" />
              </div>
            </div>
          </Col>

          {/* Right: Text content */}
          <Col xs={24} lg={12} className="text-col">
            <div className="text-content">
              <Title level={2} className="title">
                Cá nhân hóa hành trình học tập
              </Title>
              <Paragraph className="desc">
                Lộ trình luyện tập được điều chỉnh phù hợp với mục tiêu (giao tiếp hằng ngày, công việc, thuyết trình học thuật, hội thảo...).
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Col, Row, Divider } from "antd";
import backgroundVideo from '../../assets/video/invideo-ai-1080 Bạn sẽ nói hay hơn chỉ sau 1 tuần_ 2025-10-02.mp4';
import mascot1 from '../../assets/Mascot/Asset 1logoFB.png';

function AuthLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div
      className="auth-layout"
      style={{
        backgroundColor: "",
        height: "120vh",
        width: "100%",
      }}
    >
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => {
          e.target.currentTime = 0;
        }}
        onTimeUpdate={(e) => {
          if (e.target.currentTime >= 19) {
            e.target.currentTime = 0;
          }
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
      <div
        className="content-overlay"
        style={{ height: "100%" }}
      >
        <Row
          justify="center"
          align="middle"
          gutter={[48, 0]}
          style={{ height: "100%" }}
        >
          <Col
            xs={24}
            sm={24}
            md={10}
            lg={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="logo-section" onClick={() => navigate("/")}>
              <div><img src={mascot1} alt="Talkademy Logo" className="logo-image" />
                <h1 className="logo-title" >TALKADEMY</h1></div>
              <h2 className="logo-subtitle">HỌC TIẾNG VIỆT</h2>
              <p className="logo-description">
                Ứng dụng học tiếng Việt hàng đầu với công nghệ AI tiên tiến
              </p>
            </div>
          </Col>
          <Divider
            type="vertical"
            style={{
              height: "400px",
              borderColor: "white",
              borderWidth: "1px",
            }}
          />
          <Col xs={24} sm={24} md={10} lg={8}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AuthLayout;

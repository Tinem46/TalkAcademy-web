import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss"; // Bạn có thể thêm CSS cụ thể trong đây nếu muốn
import { useNavigate } from "react-router-dom";

const Carousel = ({
  numberOfSlides = 1,
  autoplay = false,
  numberOfItems = 1,
  imgs = [],
  //   name="name 1"
  showHeroContent = true,
}) => {
  const navigate = useNavigate();

  return (
    <Swiper
      slidesPerView={numberOfSlides}
      autoplay={
        autoplay
          ? {
            delay: 3000,
            disableOnInteraction: false,
          }
          : false
      }
      pagination={{ clickable: true }}
      loop={false} // Ngăn Swiper tự clone slides
      watchOverflow={true} // Ngăn tạo pagination nếu slides không đủ
      modules={autoplay ? [Pagination, Autoplay] : [Pagination]}
      className={`carousel ${numberOfSlides > 2 ? "multi-item" : ""}`}
    >
      {imgs.slice(0, numberOfItems).map((img, idx) => (
        <SwiperSlide key={idx}>
          <img src={img} alt={`slide-${idx}`} />
          {showHeroContent && idx === 0 && (
            <div className="hero-content">
              <div className="hero-tagline">TALKADEMY</div>
              <h1 className="hero-title">HỌC TIẾNG VIỆT HIỆU QUẢ</h1>
              <div className="hero-actions">
                <button
                  className="btn-outline"
                  onClick={() => navigate("/about")}
                >
                  TÌM HIỂU THÊM
                </button>
                <button
                  className="btn-red"
                  onClick={() => navigate("/register")}
                >
                  BẮT ĐẦU HỌC
                </button>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Carousel.propTypes = {
  numberOfSlides: PropTypes.number,
  autoplay: PropTypes.bool,
};
export default Carousel;

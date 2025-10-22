import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import banner1 from '../../assets/ban1.jpg'
import banner2 from '../../assets/ban2.jpg'
import banner3 from '../../assets/ban3.jpg'
import banner4 from '../../assets/ban4.jpg'
const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container">
        <Swiper
          spaceBetween={-570}
          breakpoints={{
            320: {
              spaceBetween: -100,
            },
            640: {
              spaceBetween: -300,
            },
            1024: {
              spaceBetween: -570,
            },
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="sliderHome"
        >
          <SwiperSlide key="slide-1">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner1}
                alt="Banner Slide"
                className="w-[50%] "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-2">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner2}
                alt="Banner Slide"
                className="w-[50%] "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-3">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner3}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
           <SwiperSlide key="slide-4">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner4}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-5">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner1}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-6">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner2}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key="slide-7">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner3}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
           <SwiperSlide key="slide-8">
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src={banner4}
                alt="Banner Slide"
                className="w-[50%]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;

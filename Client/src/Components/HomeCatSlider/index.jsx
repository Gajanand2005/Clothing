import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

// 🖼️ Import images
import suit from "../../assets/suit.png";
import bottom from "../../assets/bottom.png";
import dethnic from "../../assets/co-ord ethnic.jpg";
import dress from "../../assets/dress.png";
import kurti from "../../assets/kurti.jpg";
import skirt from "../../assets/skirt.png";
import top from "../../assets/top.png";
import west from "../../assets/west co-ords.jpg";
import wint from "../../assets/wint.png";

const HomeCatSlider = () => {
  const categories = [
    { img: suit, title: "Suit" },
    { img: bottom, title: "Bottom" },
    { img: dethnic, title: "Co-ord Ethnic" },
    { img: dress, title: "Dress" },
    { img: kurti, title: "Kurti" },
    { img: skirt, title: "Skirt" },
    { img: top, title: "Top" },
    { img: west, title: "West Co-ords" },
    { img: wint, title: "Winter" },
  ];

  return (
    <div className="HomeCatSlider py-8 bg-[#faf7f7]">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={-200} // 🧹 No space between slides
          breakpoints={{
            360: { slidesPerView: 2, spaceBetween: -150 },
            480: { slidesPerView: 3, spaceBetween: 0 },
            640: { slidesPerView: 4, spaceBetween: 0 },
            768: { slidesPerView: 5, spaceBetween: 0 },
            1024: { slidesPerView: 6, spaceBetween: 0 },
            1280: { slidesPerView: 7, spaceBetween: 0 },
            1536: { slidesPerView: 8, spaceBetween: 0 },
          }}
          className="mySwiper"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to="/" className="block">
                <div className="item py-3 px-0 text-center flex flex-col items-center justify-center">
                  <div className="relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-[70px] h-[70px] xs:w-[75px] xs:h-[75px] sm:w-[85px] sm:h-[85px] md:w-[95px] md:h-[95px] lg:w-[100px] lg:h-[100px] rounded-full object-cover border-[2px] border-gray-200 shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-[12px] sm:text-[13px] md:text-[15px] font-medium mt-2 sm:mt-3 text-gray-700 whitespace-nowrap">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;

import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

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
  return (
    <div className='HomeCatSlider py-8 pt-4 bg-[#faf7f7]'>
      <div className='container'>
        <Swiper
          slidesPerView={6}
          spaceBetween={-320}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: -50,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: -100,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: -200,
            },
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="mySwiper"
        >
          {[
            { img: suit, title: "Suit" },
            { img: bottom, title: "Bottom" },
            { img: dethnic, title: "Co-ord ethnic" },
            { img: dress, title: "Dress" },
            { img: kurti, title: "Kurti" },
            { img: skirt, title: "Skirt" },
            { img: top, title: "Top" },
            { img: west, title: "West co-ords" },
            { img: wint, title: "Winter" },
          ].map((item, index) => (
            <SwiperSlide key={index}>
              <Link to='/'>
                <div className='item py-2 px-2 text-center flex flex-col items-center justify-center'>
                  <img
                    src={item.img}
                    alt={item.title}
                    className='w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[95px] md:h-[95px] rounded-full object-cover border-[2px] border-gray-200 shadow-sm hover:scale-105 transition-transform duration-300'
                  />
                  <h3 className='text-[12px] sm:text-[14px] md:text-[15px] font-[500] mt-2 sm:mt-3 text-gray-700'>{item.title}</h3>
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

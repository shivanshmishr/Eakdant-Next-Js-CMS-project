import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "aos/dist/aos.css";
import AOS from "aos";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HeroBanner = () => {
  // AOS
  useEffect(() => {
    AOS.init({});
    AOS.refresh();
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const images = [
    { id: 3, source: "/slider/mainbgframe.webp" },
    { id: 1, source: "/slider/ganesh2wallpaper.jpg" },
    { id: 2, source: "/slider/ganeshwallpaper.jpg" },
  ];

  return (
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="800"
        className="flex flex-row md:h-[90vh] object-cover select-none overflow-hidden"
      >
        <Swiper 
          navigation={true} 
          className="mySwiper"
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {images.map((image) => (
            <SwiperSlide>
              <img
                key={image.id}
                src={image.source}
                alt={`Banner ${image.id}`}
                className="w-[100%] md:h-[90vh] h-[60vh] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[85vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl md:bg-gradient-to-r md:from-[#eddcc8f3] md:to-[#fffffff6] bg-gradient-to-r from-[#eddcc8a3] to-[#ffffffab] md:w-[35vw] flex flex-col space-y-4 p-[5vh]">
        <h3 className="text-[#333333] text-[2.5vh]">New Arrival</h3>
        <h1 className="text-[#846a28] text-[3.5vh] md:text-[6.5vh] font-bold font-mono leading-tight">
          Discover Our New Collection
        </h1>
        <p className="text-[#333333]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link href="/shop">
          <button className="bg-[#B88E2F] text-white font-bold w-fit md:p-[3vh] p-[1.5vh]">
            PRE BOOK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;

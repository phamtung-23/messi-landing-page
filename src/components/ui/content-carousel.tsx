"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

interface ContentCarouselProps {
  items: { id: string; content: React.ReactNode }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
  items,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .content-swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .content-swiper .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 350px;
    height: auto;
  }
  
  .content-swiper .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .content-swiper .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;

  return (
    <section className="w-full space-y-4">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-6xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                className="content-swiper"
                spaceBetween={30}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {items &&
                  items.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="w-full h-full rounded-3xl p-4">
                        {item.content}
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
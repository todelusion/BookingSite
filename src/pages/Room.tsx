import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function Room() {
  const params = useParams();
  console.log(params);
  return (
    <div className="flex h-screen">
      <section className="pointer-events-none flex h-full w-1/3 select-none items-center justify-center overflow-clip border-2 border-black">
        <div className="z-10 mt-10">
          <p className="mb-4 text-center font-sans text-4xl text-primary">
            $1,380 <span className="px-4 text-xl">/</span>
            <span className="text-xl">1晚</span>
          </p>
          <button className="bg-primary py-2 px-14 text-white">
            Booking now
          </button>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="swiper-rooms pointer-events-auto absolute select-none"
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
              className="brightness-50"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
              className="brightness-50"
            />
          </SwiperSlide>
        </Swiper>
      </section>
      <section></section>
    </div>
  );
}

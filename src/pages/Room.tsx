import { useParams } from "react-router-dom"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function Room() {
const params = useParams()
console.log(params)
  return (
    <div className="flex h-screen w-screen">
      <section className="border-2 border-white flex items-center justify-center h-full select-none pointer-events-none w-1/3">
        <div className="mt-10 z-10">
          <p className="mb-4 text-primary text-center text-4xl font-sans">$1,380 <span className="text-xl px-4">/</span><span className="text-xl">1晚</span></p>
          <button className="py-2 px-14 bg-primary text-white">Booking now</button>
        </div>
        <Swiper
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="swiper-rooms pointer-events-auto absolute select-none border-2 max-w-sm"
        >
          <SwiperSlide><img src="https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80" className="brightness-50"/></SwiperSlide>
          <SwiperSlide><img src="https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80" className="brightness-50"/></SwiperSlide>
        </Swiper>
      </section>
      <section></section>
    </div>
  )
}

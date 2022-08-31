import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi"
import useFetch from "../hooks/useFetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
type Data = {
  success?: boolean;
  room?:    Room[];
  booking?: any[];
}

type Room  = {
    id: string,
    imageUrl: string,
    normalDayPrice: number,
    holidayPrice: number,
    name: string,
    description: string
  }

export default function Room() {
  const { id } = useParams();
  const { baseUrl } = useApi()
  const { data }: Data|any = useFetch(`${baseUrl}/room/${id}`)

  // const { success, room, booking }: Data|any = useFetch(`${baseUrl}/room/${id}`)
  if (Object.keys(data).length === 0) return <p>Loading...</p>;
  console.log(data);

  return (
    <div className="flex h-screen">
      <section className="pointer-events-none flex h-full w-full max-w-xl select-none items-center justify-center">
        <div className="z-10 mt-10">
          <p className="mb-4 text-center font-sans text-4xl text-primary">
            $1,380 <span className="px-4 text-xl">/</span>
            <span className="text-xl">1晚</span>
          </p>
          <button className="pointer-events-auto bg-primary py-2 px-14 text-white">
            Booking now
          </button>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="swiper-rooms pointer-events-auto absolute max-w-xl select-none"
        >
          {data.room.map((item: Room) => {
          return(
          <SwiperSlide key={item.id} className="swiper-pseudo">
            <img src="https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80" />
          </SwiperSlide>
          )
          })
          }
        </Swiper>
      </section>
      <section></section>
    </div>
  );
}

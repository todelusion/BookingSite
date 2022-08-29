import { useApi } from "../hooks/useApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useFetch from "../hooks/useFetch";

type item = {
  holidayPrice: number,
  id: string,
  imageUrl: string,
  name: string,
  normalDayPrice: number
}

export default function Home() {
  const baseUrl = useApi().baseUrl;
  const { data }: any = useFetch(`${baseUrl}/rooms`)
  if(Object.keys(data).length === 0)return
  console.log(data)

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-white pointer-events-none select-none z-10 hidden">
        Hello
      </div>
      <Swiper pagination={{ clickable: true }} modules={[Autoplay, Pagination]} autoplay={{delay: 4000, disableOnInteraction: false}} className='absolute pointer-events-auto'>
        {data.items.map((item: item) => {
          return(
            <SwiperSlide key={item.id} className='brightness-50 '><img src={`${item.imageUrl}`} alt="banner" width='1366'/></SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}

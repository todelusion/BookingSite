import { useState, useEffect } from "react";
import axios from "axios";

import { useApi } from "../hooks/useApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const baseUrl = useApi().baseUrl;
  const { data }: any = useFetch(`${baseUrl}/rooms`)
  if(Object.keys(data).length === 0)return
  console.log(data)

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Hellow</h1>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {data.items.map((item: { imageUrl: string; }) => {
          return(
            <SwiperSlide><img src={`${item.imageUrl}`} alt="" /></SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}

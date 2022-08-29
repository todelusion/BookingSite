import React, {Component} from "react";
import { useApi } from "../hooks/useApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useFetch from "../hooks/useFetch";
import houseIcon from '../assets/houseIcon.svg'

type item = {
  holidayPrice: number,
  id: string,
  imageUrl: string,
  name: string,
  normalDayPrice: number
}

export default function Home(): any{
  const baseUrl = useApi().baseUrl;
  const { data }: any = useFetch(`${baseUrl}/rooms`)
  if(Object.keys(data).length === 0)return
  console.log(data)

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="pointer-events-none select-none z-10 py-28 px-32 h-full flex justify-between items-center">
        <div className="flex flex-col justify-between h-full">
          <img src={houseIcon} alt="LOGO" className="w-36"/>
          <div className="text-white text-xs font-sans font-thin">
            <h1 className="mb-4 font-normal">好室旅店。HOUSE HOTEL</h1>
            <p className="mb-[6px]">花蓮縣花蓮市國聯一路1號</p>
            <p className="mb-[6px]">03-8321155</p>
            <p>HOUSE@HOTEL.COM</p>
          </div>
        </div>
        <ul className="grid grid-cols-3 grid-rows-2 ml-32 gap-y-0 h-max pointer-events-auto">
          {data.items.map((item: item) => {
            return(
              <li key={item.id} className='relative max-h-[275px] hover:before:content-["123"] before:text-white before:font-thin before:flex before:justify-center before:items-center before:absolute before:left-0 before:right-0  before:bottom-0 before:bg-primary/60'>
                <img src={item.imageUrl}  className='max-w-[275px] max-h-[275px] w-full h-full object-cover '/></li>
            )
          })}
        </ul>
      </div>
      <Swiper pagination={{ clickable: true }} modules={[Autoplay, Pagination]} autoplay={{delay: 4000, disableOnInteraction: false}} className='absolute pointer-events-auto'>
        {data.items.map((item: item) => {
          return(
            <SwiperSlide key={item.id}><img src={item.imageUrl} alt="banner" width='1366' className='brightness-50'/></SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}

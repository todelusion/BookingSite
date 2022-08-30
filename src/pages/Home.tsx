import React, { Component } from "react";
import { useApi } from "../hooks/useApi";
import useFetch from "../hooks/useFetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import houseIcon from "../assets/houseIcon.svg";
import styled from '@emotion/styled';


type item = {
  holidayPrice: number;
  id: string;
  imageUrl: string;
  name: string;
  normalDayPrice: number;
};

export default function Home(): any {
  const baseUrl = useApi().baseUrl;
  const { data }: any = useFetch(`${baseUrl}/rooms`);
  if (Object.keys(data).length === 0) return;
  console.log(data);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="pointer-events-none z-10 flex h-full select-none items-center justify-between py-28 px-32">
        <div className="flex h-full flex-col justify-between">
          <img src={houseIcon} alt="LOGO" className="w-36" />
          <div className="font-sans text-xs font-thin text-white">
            <h1 className="mb-4 font-normal">好室旅店。HOUSE HOTEL</h1>
            <p className="mb-[6px]">花蓮縣花蓮市國聯一路1號</p>
            <p className="mb-[6px]">03-8321155</p>
            <p>HOUSE@HOTEL.COM</p>
          </div>
        </div>
        <ul className="pointer-events-auto ml-32 grid h-max grid-cols-3 grid-rows-2 gap-y-0">
          {data.items.map((item: item) => {
              const Before_content = styled.div`
              li {
                position: relative;
                max-height: 275px;
                height: 100%
              }
              li::before {
                content: '${item.name.replace(/ /g, "")}';
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 0;
                top: 50%;
                right: 0;
                bottom: 0;
                background-color: rgb(56 71 11 / 0.6);
                font-weight: 100;
                color: #fff;
                font-weight: 100;
                transition-duration: 300ms;
                opacity: 0;
              }
              li:hover::before {
                top: 0px;
                opacity: 1
              }
              img {
                height: 100%;
                width: 100%;
                max-height: 275px;
                max-width: 275px;
                object-fit: cover;
              }
              `
            return (
              <Before_content>
              <li
                key={item.id}
              >
                {/* {item.name.replace(/ /g, "")} */}
                <img
                  src={item.imageUrl}
                />
              </li>
              </Before_content>
            );
          })}
        </ul>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="pointer-events-auto absolute select-none"
      >
        {data.items.map((item: item) => {
          return (
            <SwiperSlide key={item.id}>
              <img
                src={item.imageUrl}
                alt="banner"
                width="1366"
                className="brightness-50"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

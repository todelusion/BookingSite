import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi"
import useFetch from "../hooks/useFetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useState } from "react";

import { Breakfast, AirConditioner, MiniBar, RoomService, WiFi, ChildFriendly, Television, Refrigerator, Sofa, Smoke, PetFriendly, GreatView, Cancel, Ok } from '../assets/icon/Icon'


type Data = {
  success?: boolean;
  room?:    Room[];
  booking?: any[];
}

type Room  = {
    id: string,
    imageUrl: string[],
    normalDayPrice: number,
    holidayPrice: number,
    name: string,
    description: string,
    checkInAndOut: CheckInAndOut;
}
interface CheckInAndOut {
  checkInEarly: string;
  checkInLate:  string;
  checkOut:     string;
}

export default function Room() {
  const { id } = useParams();
  const { baseUrl } = useApi()
  const { data }: Data|any = useFetch(`${baseUrl}/room/${id}`)
  const [swiperModal, setSwiperModal] = useState<{toggleModal: boolean, swiperIndex?: number}>({toggleModal: false, swiperIndex:1})

  if (Object.keys(data).length === 0) return <p>Loading...</p>;
  console.log(data);
  return (
    <div className="flex h-screen justify-between">
      <section className="relative pointer-events-none flex h-full w-full max-w-xl select-none items-center justify-center">
        <div className="z-10 mt-32">
          <p className="mb-4 text-center text-4xl text-primary">
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
          {data.room.map((item: Room) => (
              item.imageUrl.map((image, index) => (
                <SwiperSlide onClick={() => setSwiperModal({toggleModal: true, swiperIndex: index})}  className="swiper-pseudo">
                  <img src={image}/>
                </SwiperSlide>
                ))
            ))
          }
        </Swiper>
      </section>
      {swiperModal.toggleModal && 
      <>
        <Swiper
          navigation={true}
          modules={[ Navigation ]}
          className="swiper-rooms pointer-events-auto absolute left-0 right-0 select-none z-10" 
        >
          {
          data.room.map((item: Room) => {
            item.name
            return(
              item.imageUrl.map((image) => (
                <SwiperSlide virtualIndex={swiperModal.swiperIndex} onClick={() => setSwiperModal({toggleModal: false})} className='swiper-pseudo-black'>
                  <img src={image} className='max-w-lg py-20 z-10' />
                </SwiperSlide>
                ))
            )})
          }
        </Swiper>
        
      </>
      }
      <section className="pt-24 pb-8 pl-7 pr-32">
        {data.room.map((item: Room) => {
          return(
            <React.Fragment key={item.id}>
              <h2 className="text-4xl font-medium text-primary mb-10">{item.name}</h2>
              <ul className="text-sm tracking-wider text-primary/80 leading-7 mb-9">
                <li>平日（一～四）價格：{item.normalDayPrice}<span className="px-3">/</span>假日（五～日）價格：{item.holidayPrice}</li>
                <li>入住時間：{item.checkInAndOut.checkInEarly}（最早）<span className="px-3">/</span>{item.checkInAndOut.checkInLate}（最晚）</li>
                <li>退房時間：{item.checkInAndOut.checkOut}</li> 
              </ul>
              <p className="text-sm tracking-wider text-primary/80 leading-5 mb-11">{item.description}</p>
              <ul className="grid grid-cols-7 max-w-[635px] gap-y-6 items-center justify-items-center">
                <li className="relative"><img src={Breakfast} alt="Breakfast" /><img src={Ok} alt="Ok" className={`absolute -right-5 top-0`} /><img src={Cancel} alt="Cancel" className={`absolute -right-5 top-0`} /></li>
                <li><img src={MiniBar} alt="MiniBar" /></li>
                <li><img src={RoomService} alt="RoomService" /></li>
                <li><img src={WiFi} alt="WiFi" /></li>
                <li><img src={ChildFriendly} alt="ChildFriendly" /></li>
                <li><img src={Television} alt="Television" /></li>
                <li><img src={GreatView} alt="GreatView" /></li>
                <li><img src={Refrigerator} alt="Television" /></li>
                <li><img src={Sofa} alt="Television" /></li>
                <li><img src={PetFriendly} alt="ChildFriendly" /></li>
                <li><img src={Smoke} alt="Smoke" /></li>
                <li><img src={AirConditioner} alt="AirConditioner" /></li>
              </ul>
            </React.Fragment>
          )
        })}
      </section>
    </div>
  );
}

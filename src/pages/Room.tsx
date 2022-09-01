import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi"
import useFetch from "../hooks/useFetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import DatepickerHasRrange from "../components/datepickerHasRange/DatepickerHasRrange"

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
    checkInAndOut: CheckInAndOut,
    amenities: { [key: string]: boolean },
    descriptionShort: DescriptionShort
}
interface CheckInAndOut {
  checkInEarly: string;
  checkInLate:  string;
  checkOut:     string;
}
interface DescriptionShort {
  GuestMin:       number;
  GuestMax:       number;
  Bed:            string[];
  "Private-Bath": number;
  Footage:        number;
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
      <section className="flex flex-col pt-32 pb-14 pl-7 pr-32">
        {data.room.map((item: Room) => {
          return(
            <div key={item.id} className='mb-7'>
              <p className="text-right mb-12 text-sm text-primary font-medium">{item.descriptionShort.GuestMax} guest．{item.name}．{item.amenities.Breakfast ? 'breakfast' : ''}．{item.descriptionShort["Private-Bath"] > 0 ? `private-Bath * ${item.descriptionShort["Private-Bath"]}` : ''}．{item.descriptionShort.Footage}(㎡)</p>
              <ul className="text-sm tracking-wider text-primary/80 leading-7 mb-9">
                <li>平日（一～四）價格：{item.normalDayPrice}<span className="px-3">/</span>假日（五～日）價格：{item.holidayPrice}</li>
                <li>入住時間：{item.checkInAndOut.checkInEarly}（最早）<span className="px-3">/</span>{item.checkInAndOut.checkInLate}（最晚）</li>
                <li>退房時間：{item.checkInAndOut.checkOut}</li> 
              </ul>
              <p className="text-sm tracking-wider text-primary/80 leading-5 mb-11">{item.description}</p>
              <ul className="grid grid-cols-7 gap-x-9 max-w-[635px] gap-y-6  justify-items-center">
                <li className={`${item.amenities.Breakfast ? 'opacity-100' : 'opacity-70'} relative`}>
                  <img src={Breakfast} alt="Breakfast" />
                  <img src={Ok} alt="Ok" className={`${item.amenities.Breakfast ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities.Breakfast ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Mini-Bar'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={MiniBar} alt="MiniBar" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Mini-Bar'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Mini-Bar'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Room-Service'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={RoomService} alt="RoomService" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Room-Service'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Room-Service'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Wi-Fi'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={WiFi} alt="WiFi" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Wi-Fi'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Wi-Fi'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Child-Friendly'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={ChildFriendly} alt="ChildFriendly" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Child-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Child-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Television'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={Television} alt="Television" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Television'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Television'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Great-View'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={GreatView} alt="GreatView" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Great-View'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Great-View'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Refrigerator'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={Refrigerator} alt="Refrigerator" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Refrigerator'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Refrigerator'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Sofa'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={Sofa} alt="Sofa" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Sofa'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Sofa'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Pet-Friendly'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={PetFriendly} alt="PetFriendly" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Pet-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Pet-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Smoke-Free'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={Smoke} alt="Smoke" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Smoke-Free'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Smoke-Free'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
                <li className={`${item.amenities['Air-Conditioner'] ? 'opacity-100' : 'opacity-20'} relative`}>
                  <img src={AirConditioner} alt="AirConditioner" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Air-Conditioner'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Air-Conditioner'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                </li>
              </ul>
            </div>
          )
        })}
        <DatepickerHasRrange />
      </section>
      
    </div>
  );
}

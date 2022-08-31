import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi"
import useFetch from "../hooks/useFetch";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
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
    description: string
  }

export default function Room() {
  const { id } = useParams();
  const { baseUrl } = useApi()
  const { data }: Data|any = useFetch(`${baseUrl}/room/${id}`)
  const [swiperModal, setSwiperModal] = useState({toggleModal: false, swiperIndex:1})

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
          {data.room.map((item: Room) => (
              item.imageUrl.map((image, index) => (
                <SwiperSlide onClick={() => setSwiperModal({toggleModal: true, swiperIndex: index})}  className="swiper-pseudo">
                  <img src={image}/>
                </SwiperSlide>
                ))
            ))
          }
        </Swiper>
        {swiperModal.toggleModal && 
        <>
          <Swiper
            navigation={true}
            modules={[ Navigation ]}
            className="swiper-rooms pointer-events-auto absolute left-0 right-0 z-10 select-none" 
          >
            {data.room.map((item: Room) => (
                item.imageUrl.map((image) => (
                  <SwiperSlide onClick={(e) => setSwiperModal({toggleModal: false})} className='swiper-pseudo-black'>
                    <img src={image} className='max-w-lg py-20 z-10' />
                  </SwiperSlide>
                  ))
              ))
            }
          </Swiper>
          
        </>
        }
      </section>
      <section>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
  );
}

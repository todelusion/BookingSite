import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi"
import useFetch from "../hooks/useFetch";
import useInputValue from "../hooks/useInputValue";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Breakfast, AirConditioner, MiniBar, RoomService, WiFi, ChildFriendly, Television, Refrigerator, Sofa, Smoke, PetFriendly, GreatView, Cancel, Ok,ResultIcon, Success, Error } from '../assets/icon/Icon'
import { arrow } from "../assets/flow/Flow";

import DatepickerHasRrange from "../components/datepickerHasRange/DatepickerHasRrange"
import Checkout from "../components/Checkout"

import useLoading from "../hooks/useLoading"
import Loading from '../components/Loading'
import Result from '../components/Result'



type Data = {
  success?: boolean;
  room?:    Room[];
  booking?: Booking[];
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
type CheckoutModal = {
  toggleCheckout?: boolean,
  name?: string,
  tel?: string,
  startDate: Date | string,
  endDate: Date | string,
  date?:[],
  dateType?: {
    holiday: number,
    normalday: number
  }
}
type isLoading = {
  isPending: boolean,
  isError: boolean,
  isSuccess: boolean,
}
interface Booking {
  name: string;
  tel:  string;
  date: Date;
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
  const [swiperModal, setSwiperModal] = useState<{toggleModal: boolean, swiperIndex?: number}>({toggleModal: false, swiperIndex:1})

  const [checkoutModal, setCheckoutModal] = useState<CheckoutModal>({
    toggleCheckout: false,
    name: "",
    tel: "",
    startDate: new Date(),
    endDate: new Date(),
    date:[],
    dateType: {
      holiday: 0,
      normalday: 0
    }
  })

  const [isLoading, setIsLoading] = useLoading({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  // console.log(isLoading)

  const { id } = useParams();
  const { baseUrl } = useApi()
  
  const [data, setData]: Data|any = useFetch(`${baseUrl}/room/${id}`)
  // console.log(data)

  const onBookingNow = () => {
    if(new Date(checkoutModal.startDate).getTime() === new Date(checkoutModal.endDate).getTime()){
      alert('請選擇退房日')
    }else{
      setCheckoutModal((preState) => {return {...preState, toggleCheckout: true}})
    }
  }

  if (Object.keys(data).length === 0) return (
  <div className="w-full h-screen bg-second flex justify-center items-center">
    <Loading />
  </div>
  );
  return (
    <>
    <div className="flex h-screen justify-evenly bg">
      <section className="relative pointer-events-none flex h-full w-full select-none items-center justify-center">
        <div className="z-10 mt-32">
          <Link to='/' className="pointer-events-auto">
          <button className="absolute top-24 left-10 text-primary font-light flex items-center"><img src={arrow} className='rotate-180 mr-2'/> 查看其他房型</button>
          </Link>
          <p className="mb-4 text-center text-4xl text-primary">
            ${
            checkoutModal.dateType === undefined ? '尚未選取' : 
            ((data.room[0] as Room).normalDayPrice * checkoutModal.dateType.normalday) + ((data.room[0] as Room).holidayPrice * checkoutModal.dateType.holiday)
            }<span className="px-4 text-xl">/</span>
            <span className="text-xl">{checkoutModal.date?.length}晚</span>
          </p>
          <button onClick={() => onBookingNow()} className="pointer-events-auto bg-primary py-2 px-14 text-white">
            Booking now
          </button>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="swiper-rooms pointer-events-auto absolute select-none"
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
      <section className="flex flex-col pt-10 ml-20 pr-32 max-w-4xl">
        {data.room.map((item: Room) => {
          return(
            <div key={item.id}>
              <p className="text-right mb-5 text-sm text-primary font-medium">{item.descriptionShort.GuestMax} guest．{item.name}．{item.amenities.Breakfast ? 'breakfast' : ''}．{item.descriptionShort["Private-Bath"] > 0 ? `private-Bath * ${item.descriptionShort["Private-Bath"]}` : ''}．{item.descriptionShort.Footage}(㎡)</p>
              <ul className="text-sm tracking-wider text-primary/80 leading-7 mb-9">
                <li>平日（一～四）價格：{item.normalDayPrice}<span className="px-3">/</span>假日（五～日）價格：{item.holidayPrice}</li>
                <li>入住時間：{item.checkInAndOut.checkInEarly}（最早）<span className="px-3">/</span>{item.checkInAndOut.checkInLate}（最晚）</li>
                <li>退房時間：{item.checkInAndOut.checkOut}</li> 
              </ul>
              <p className="text-sm tracking-wider text-primary/80 leading-5 mb-11">{item.description}</p>
              <ul className="grid grid-cols-7 gap-x-9 max-w-[635px] gap-y-10  justify-items-center">
                <li className={`${item.amenities.Breakfast ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={Breakfast} alt="Breakfast" />
                  <img src={Ok} alt="Ok" className={`${item.amenities.Breakfast ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities.Breakfast ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>早餐</p>
                </li>
                <li className={`${item.amenities['Mini-Bar'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={MiniBar} alt="MiniBar" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Mini-Bar'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Mini-Bar'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>Mini Bar</p>
                </li>
                <li className={`${item.amenities['Room-Service'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={RoomService} alt="RoomService" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Room-Service'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Room-Service'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>Room Service</p>
                </li>
                <li className={`${item.amenities['Wi-Fi'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={WiFi} alt="WiFi" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Wi-Fi'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Wi-Fi'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>Wifi</p>
                </li>
                <li className={`${item.amenities['Child-Friendly'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={ChildFriendly} alt="ChildFriendly" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Child-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Child-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>適合兒童</p>
                </li>
                <li className={`${item.amenities['Television'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={Television} alt="Television" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Television'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Television'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>電話</p>
                </li>
                <li className={`${item.amenities['Great-View'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={GreatView} alt="GreatView" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Great-View'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Great-View'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>漂亮的視野</p>
                </li>
                <li className={`${item.amenities['Refrigerator'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={Refrigerator} alt="Refrigerator" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Refrigerator'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Refrigerator'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>冰箱</p>
                </li>
                <li className={`${item.amenities['Sofa'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={Sofa} alt="Sofa" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Sofa'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Sofa'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>沙發</p>
                </li>
                <li className={`${item.amenities['Pet-Friendly'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={PetFriendly} alt="PetFriendly" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Pet-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Pet-Friendly'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>寵物友善</p>
                </li>
                <li className={`${item.amenities['Smoke-Free'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={Smoke} alt="Smoke" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Smoke-Free'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Smoke-Free'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>全面禁菸</p>
                </li>
                <li className={`${item.amenities['Air-Conditioner'] ? 'opacity-100' : 'opacity-20'} relative flex flex-col items-center`}>
                  <img src={AirConditioner} alt="AirConditioner" />
                  <img src={Ok} alt="Ok" className={`${item.amenities['Air-Conditioner'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <img src={Cancel} alt="Cancel" className={`${!item.amenities['Air-Conditioner'] ? 'block' : 'hidden'} absolute -right-5 top-0`} />
                  <p className='text-xs text-second text-center whitespace-nowrap absolute -bottom-5'>空調</p>
                </li>
              </ul>
            </div>
          )
        })}
        <div className="pt-10 pb-14">
        <p className="text-xs text-primary mb-2">空房狀態查詢
        {new Date(checkoutModal.startDate).getTime() === new Date(checkoutModal.endDate).getTime() && <span className="text-red-600 font-bold ml-5">請選擇退房日</span>}
        </p>
        <DatepickerHasRrange data={data} checkoutModal={checkoutModal} setCheckoutModal={setCheckoutModal} />
        </div>
      </section>
    </div>
    {checkoutModal.toggleCheckout && <Checkout data={data} checkoutModal={checkoutModal} setCheckoutModal={setCheckoutModal} isLoading={isLoading} setIsLoading={setIsLoading} setData={setData}/>
    }
      {isLoading.isSuccess && <Result setIsLoading={setIsLoading}>
        <div className="w-[124px] h-[157px] relative flex justify-center items-center mb-10">
          <img src={ResultIcon} alt="result" width='124' className="absolute " />
          <img src={Success} alt="Success" width='52' className="absolute"/>
        </div>
        <h3 className="text-white text-5xl font-medium mb-10">預約成功</h3>
        <p className="font-thin text-lg text-center text-white">請留意簡訊發送訂房通知，入住當日務必出示此訂房通知<br />若未收到簡訊請來電確認，謝謝您</p>
      </Result>}
      {isLoading.isError && <Result setIsLoading={setIsLoading}>
        <div className="w-[124px] h-[157px] relative flex justify-center items-center mb-10">
          <img src={ResultIcon} alt="result" width='124' className="absolute " />
          <img src={Error} alt="Error" width='37' className="absolute"/>
        </div>
        <h3 className="text-white text-5xl font-medium mb-10">預約失敗</h3>
        <p className="font-thin text-lg text-center text-white">哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧</p>
      </Result>}
        <img src={Error} alt="Error" width='50'/>
    </>
  );
}

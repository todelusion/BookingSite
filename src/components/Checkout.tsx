import React from 'react'
import { Breakfast, AirConditioner, MiniBar, RoomService, WiFi, ChildFriendly, Television, Refrigerator, Sofa, Smoke, PetFriendly, GreatView } from '../assets/icon/Icon'
import { flow1, flow2, flow3, arrow } from '../assets/flow/Flow'

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


export default function Checkout({ data }: Data|any) {
    console.log(data)
  return (
    <div className='absolute w-full min-h-screen top-0 z-10 flex justify-center items-center backdrop-contrast-50 bg-white/60  py-20 px-32 '>
        <div className='border-2 border-primary flex'>
            <section className='flex flex-col px-16 pt-12 pb-7 bg-primary max-w-md w-full'>
                <form className='text-white font-light max-w-xs w-full'>
                    <label>
                        姓名
                        <input name='name' type="text" className='text-black block outline-none mt-2 mb-4 w-full'/>
                    </label>
                    <label>
                        手機號碼
                        <input name='phone' type="text" className='text-black block outline-none mt-2 mb-4 w-full'/>
                    </label>
                    <label>
                        入住日期
                        <input name='startDate' type="text" className='text-black block outline-none mt-2 mb-4 w-full'/>
                    </label>
                    <label>
                        退房日期
                        <input name='endDate' type="text" className='text-black block outline-none mt-2 mb-4 w-full'/>
                    </label>
                </form>
                <p className='text-second mb-3'>2天，1晚平日</p>
                <hr className='border-second mb-2'/>
                <ul className='text-right text-white font-light mb-5'>
                    <li>總計</li>
                    <li className='text-2xl font-normal'>$1,380</li>
                </ul>
                <button className='text-white py-2 px-28 border-[1px] border-second mb-4'>確定送出</button>
                <p className='text-white text-center text-xs'>此預約系統僅預約功能，並不會對您進行收費</p>
            </section>
            <section className='flex flex-col px-8 pt-12 pb-7 bg-white w-full'>
            <div className='max-w-xl'>
                {data.room.map((item: Room) => {
                    return(
                    <div key={item.id}>
                        <h2 className='text-2xl font-bold text-primary mb-2'>{item.name}</h2>
                        <ul className="text-sm tracking-wider text-primary/80 leading-7 mb-9">
                            <li>平日（一～四）價格：{item.normalDayPrice}<span className="px-3">/</span>假日（五～日）價格：{item.holidayPrice}</li>
                            <li>入住時間：{item.checkInAndOut.checkInEarly}（最早）<span className="px-3">/</span>{item.checkInAndOut.checkInLate}（最晚）</li>
                            <li>退房時間：{item.checkInAndOut.checkOut}</li> 
                        </ul>
                        <p className="text-sm tracking-wider text-primary/80 leading-5 mb-11">{item.description}</p>
                        <ul className="mb-6 grid grid-cols-7 gap-x-9 max-w-[635px] gap-y-6 items-end justify-items-center">
                            <li className={`${item.amenities.Breakfast ? 'opacity-100' : 'hidden'} relative content-between`}>
                            <img src={Breakfast} alt="Breakfast" />
                            <p className='text-xs text-second text-center pt-2'>早餐</p>
                            </li>
                            <li className={`${item.amenities['Mini-Bar'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={MiniBar} alt="MiniBar" className='mx-auto'/>
                            <p className='text-xs text-second text-center pt-2'>Mini Bar</p>
                            </li>
                            <li className={`${item.amenities['Room-Service'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={RoomService} alt="RoomService" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2 whitespace-nowrap'>Room Service</p>
                            </li>
                            <li className={`${item.amenities['Wi-Fi'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={WiFi} alt="WiFi" className='mx-auto' />
                            <p className='text-xs text-second text-center self-end pt-2'>Wifi</p>
                            </li>
                            <li className={`${item.amenities['Child-Friendly'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={ChildFriendly} alt="ChildFriendly" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>適合兒童</p>
                            </li>
                            <li className={`${item.amenities['Television'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={Television} alt="Television" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>電話</p>
                            </li>
                            <li className={`${item.amenities['Great-View'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={GreatView} alt="GreatView" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>漂亮的視野</p>
                            </li>
                            <li className={`${item.amenities['Refrigerator'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={Refrigerator} alt="Refrigerator" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>冰箱</p>
                            </li>
                            <li className={`${item.amenities['Sofa'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={Sofa} alt="Sofa" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>沙發</p>
                            </li>
                            <li className={`${item.amenities['Pet-Friendly'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={PetFriendly} alt="PetFriendly" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>寵物友善</p>
                            </li>
                            <li className={`${item.amenities['Smoke-Free'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={Smoke} alt="Smoke" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>全面禁菸</p>
                            </li>
                            <li className={`${item.amenities['Air-Conditioner'] ? 'opacity-100' : 'hidden'} relative`}>
                            <img src={AirConditioner} alt="AirConditioner" className='mx-auto' />
                            <p className='text-xs text-second text-center pt-2'>空調</p>
                            </li>
                        </ul>
                        <h3 className='text-primary font-bold mb-3'>訂房資訊</h3>
                        <ul className='mb-3 font-medium text-xs text-primary list-disc ml-4 leading-7'>
                            <li>入住時間：最早{item.checkInAndOut.checkInEarly}，最晚{item.checkInAndOut.checkInLate}；退房時間{item.checkInAndOut.checkOut}，請自行確認行程安排</li>
                            <li>平日定義週一至週四，假日定義週五至週日及國定假日</li>
                            <li>好室旅店全面禁止吸菸</li>
                            <li>若您有任何問題，歡迎撥打03-8321155（服務時間 週一至週六 10:00 - 18:00）。
                            </li>
                        </ul>
                        <h3 className='text-primary font-bold mb-3'>預約流程</h3>
                        
                    </div>
                )
                })}
                <ul className='flex justify-between'>
                        <li className='flex flex-col items-center max-w-[160px] w-full border-2 h-auto rounded-bl-xl rounded-br-xl'>
                            <div className='bg-second w-full'>
                                <img src={flow1} width='30' className='mx-auto h-[50px]'/>
                            </div>
                            <p className='text-xs text-second pt-3 pb-5 px-2'>送出線上預約單</p>
                        </li>
                    <li><img src={arrow} width='7'  className='h-[50px]'/></li>
                    <li className='flex flex-col items-center max-w-[160px] w-full border-2 h-auto rounded-bl-xl rounded-br-xl'>
                        <div className='bg-second w-full'>
                            <img src={flow2} width='30' className='mx-auto h-[50px]'/>
                        </div>
                        <p className='text-xs text-second pt-3 pb-4 px-2'>系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)</p>
                    </li>
                    <li><img src={arrow} width='7'  className='h-[50px]'/></li>
                    <li className='flex flex-col items-center max-w-[160px] w-full border-2 h-auto rounded-bl-xl rounded-br-xl'>
                        <div className='bg-second w-full'>
                            <img src={flow3} width='30' className='mx-auto h-[50px]'/>
                        </div>
                        <p className='text-xs text-second pt-3 pb-4 px-2'>入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)</p>
                    </li>
                </ul>
            </div>
            </section>
        </div>
    </div>
  )
}

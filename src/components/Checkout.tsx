import React from 'react'
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


export default function Checkout({ data }: Data|any) {
    console.log(data)
  return (
    <div className='fixed top-0 z-10 backdrop-contrast-50 bg-white/60 w-full h-full py-20 px-32 '>
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
            <section className='flex flex-col px-16 pt-12 pb-7 bg-white w-full'>
                
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

            </section>
        </div>
    </div>
  )
}

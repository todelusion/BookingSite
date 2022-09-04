import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-date-range";
import { useForm } from "react-hook-form";
import axios from "axios";
import { format } from "date-fns";

import { useApi } from "../hooks/useApi";

import {
  Breakfast,
  AirConditioner,
  MiniBar,
  RoomService,
  WiFi,
  ChildFriendly,
  Television,
  Refrigerator,
  Sofa,
  Smoke,
  PetFriendly,
  GreatView,
} from "../assets/icon/Icon";
import { flow1, flow2, flow3, arrow } from "../assets/flow/Flow";
import Loading from "./Loading";

type Data = {
  success?: boolean;
  room?: Room[];
  booking?: any[];
};
type Room = {
  id: string;
  imageUrl: string[];
  normalDayPrice: number;
  holidayPrice: number;
  name: string;
  description: string;
  checkInAndOut: CheckInAndOut;
  amenities: { [key: string]: boolean };
  descriptionShort: DescriptionShort;
};
type CheckoutModal = {
  toggleCheckout?: boolean;
  name?: string;
  tel?: string;
  startDate: string;
  endDate: string;
  date: [];
  dateType?: {
    holiday: number;
    normalday: number;
  };
};
interface CheckInAndOut {
  checkInEarly: string;
  checkInLate: string;
  checkOut: string;
}
interface DescriptionShort {
  GuestMin: number;
  GuestMax: number;
  Bed: string[];
  "Private-Bath": number;
  Footage: number;
}
interface Booking {
  name: string;
  tel: string;
  date: Date;
}

export default function Checkout({
  data,
  checkoutModal,
  setCheckoutModal,
  isLoading,
  setIsLoading,
  setData,
}: Data | any) {
  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    toggleStartCalendar: false,
    toggleEndCalendar: false,
  });
  const { register, watch, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      tel: "",
    },
  });

  const { baseUrl, token } = useApi();
  const startDateRef = useRef<HTMLInputElement>(null!);
  const endDateRef = useRef<HTMLInputElement>(null!);
  const { startDate, endDate, date, dateType }: CheckoutModal = checkoutModal;
  // console.log([startDate, endDate])
  // console.log(checkoutModal)

  const handleDate = (startDate: Date, endDate: Date) => {
    const getDaysArray = function (
      start: string | number | Date,
      end: string | number | Date
    ) {
      for (
        var arr = [], dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    };
    const _dateList = getDaysArray(startDate, endDate);

    _dateList.pop();

    const dateList = _dateList.map((date) => format(date, "Y-MM-dd"));
    const dateType = _dateList.reduce(
      (init: { holiday: number; normalday: number }, date) => {
        if ([5, 6, 0].includes(date.getDay())) {
          // console.log(date.getDay())
          init.holiday++;
        } else {
          init.normalday++;
        }
        return init;
      },
      { holiday: 0, normalday: 0 }
    );
    // console.log(dateType)

    return { dateList, dateType };
  };

  // const setDateInterval = () => {
  //     console.log(checkoutModal)
  //     const { dateList : _dateList, dateType : _dateType } = handleDate(checkoutModal)
  //     setCheckoutModal((prevState: object) => {
  //         return{
  //           ...prevState,
  //           date: _dateList,
  //           dateType: _dateType
  //         }
  //       })

  // }

  const onCalender = (item: Date) => {
    const _startDate = new Date(startDate);
    _startDate.setHours(0);
    const _endDate = new Date(endDate);
    _endDate.setHours(0);

    if (state.toggleStartCalendar) {
      const _startDateTimestamp = item.getTime();
      const { dateList, dateType } = handleDate(item, _endDate);
      if (_startDateTimestamp >= _endDate.getTime()) {
        alert("不可晚於退房日");
        return;
      }
      setCheckoutModal((prevState: any) => {
        return {
          ...prevState,
          startDate: format(item, "Y-MM-dd"),
          date: dateList,
          dateType: dateType,
        };
      });
      startDateRef.current.value = format(item, "Y-MM-dd");

      setState((prevState) => {
        return {
          ...prevState,
          startDate: item,
          toggleStartCalendar: false,
        };
      });
    }

    if (state.toggleEndCalendar) {
      const _endDateTimestamp = item.getTime();
      if (_endDateTimestamp <= Date.parse(startDate)) {
        alert("不可早於入住日");
        return;
      }
      setCheckoutModal((prevState: any) => {
        return {
          ...prevState,
          endDate: format(item, "Y-MM-dd"),
          date: dateList,
          dateType: dateType,
        };
      });
      endDateRef.current.value = format(item, "Y-MM-dd");

      const { dateList, dateType } = handleDate(_startDate, item);
      setState((prevState) => {
        return {
          ...prevState,
          endDate: item,
          toggleEndCalendar: false,
        };
      });
    }
  };

  const setDateToInput = () => {
    // console.log([startDateRef, endDateRef])
    startDateRef.current.value = startDate;
    endDateRef.current.value = endDate;
  };

  const onContainer = () => {
    if (state.toggleStartCalendar) {
      setState((prevState) => {
        return { ...prevState, toggleStartCalendar: false };
      });
    }

    if (state.toggleEndCalendar) {
      setState((prevState) => {
        return { ...prevState, toggleEndCalendar: false };
      });
    }
  };
  const onSubmit = async (inputData: { name: string; tel: string }) => {
    const date = (checkoutModal as CheckoutModal).date;
    // console.log((checkoutModal as CheckoutModal).date)
    // console.log(inputData)
    if (!inputData.name || !inputData.tel) {
      alert("資料不得為空");
      return;
    }
    if (isNaN(Number(inputData.tel))) {
      alert("電話格式錯誤");
      return;
    }
    const config = {
      headers: { Authorization: token as string },
    };
    // console.log(config)
    const obj = {
      name: inputData.name,
      tel: inputData.tel,
      date: date,
    };

    setIsLoading("isPending", true);
    try {
      await axios.post(`${baseUrl}/room/${data.room[0].id}`, obj, config);
      setIsLoading("isPending", false);
      setIsLoading("isSuccess", true);
      const res = await axios.get(`${baseUrl}/room/${data.room[0].id}`, config);
      setData(res.data);
      setCheckoutModal((prevState: any) => {
        return { ...prevState, toggleCheckout: false };
      });
    } catch (err) {
      console.log(err);
      setIsLoading("isPending", false);
      setIsLoading("isError", true);
    }
  };

  useEffect(() => {
    setDateToInput();
  }, []);
  // console.log(watch("name").length)
  // console.log(isNaN(Number(watch("tel"))))

  return (
    <div
      onClick={() => onContainer()}
      className="absolute top-0 z-10 flex min-h-screen w-full items-center justify-center bg-white/60  py-10"
    >
      <div className="flex border-2 border-primary">
        <section className="flex w-full max-w-md flex-col bg-primary px-16 pt-12 pb-7">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="w-full max-w-xs font-light text-white"
          >
            <label>
              姓名
              {watch("name").length < 1 && (
                <span className="ml-2 text-xs font-medium text-red-300">
                  姓名必填
                </span>
              )}
              <input
                {...register("name")}
                type="text"
                className="mt-2 mb-4 block w-full  px-2 py-2 tracking-widest text-primary outline-none"
              />
            </label>
            <label>
              手機號碼
              {watch("tel").length < 1 && (
                <span className="ml-2 text-xs font-medium text-red-300">
                  電話必填
                </span>
              )}
              {isNaN(Number(watch("tel"))) && (
                <span className="ml-2 text-xs font-medium text-red-300">
                  電話格式錯誤
                </span>
              )}
              <input
                {...register("tel")}
                type="text"
                className="mt-2 mb-4 block w-full  px-2 py-2 tracking-widest text-primary outline-none"
              />
            </label>
            <label className="relative">
              入住日期
              <input
                onClick={() =>
                  setState((prevState) => {
                    return { ...prevState, toggleStartCalendar: true };
                  })
                }
                ref={startDateRef}
                name="startDate"
                type="date"
                className="mt-2 mb-4 block w-full  px-2 py-2 tracking-widest text-primary outline-none"
              />
              {state.toggleStartCalendar && (
                <div className="absolute top-12 left-0 z-10 border-black">
                  <Calendar
                    onChange={(item: any) => onCalender(item)}
                    date={new Date(startDate)}
                    className="max-w-xs pb-5"
                    color="#38470B"
                    disabledDates={data.booking.map(
                      (item: Booking) => new Date(item.date)
                    )}
                    minDate={new Date()}
                  />
                </div>
              )}
            </label>
            <label className="relative">
              退房日期
              <input
                onClick={() =>
                  setState((prevState) => {
                    return { ...prevState, toggleEndCalendar: true };
                  })
                }
                ref={endDateRef}
                name="endDate"
                type="date"
                className="mt-2 mb-4 block w-full  px-2 py-2 tracking-widest text-primary outline-none"
              />
              {state.toggleEndCalendar && (
                <div className="absolute top-12 left-0 border-black">
                  <Calendar
                    onChange={(item: any) => onCalender(item)}
                    date={new Date(endDate)}
                    className="max-w-xs pb-5"
                    color="#38470B"
                    disabledDates={data.booking.map(
                      (item: Booking) => new Date(item.date)
                    )}
                    minDate={new Date()}
                  />
                </div>
              )}
            </label>
            <p className="mb-3 text-second">
              {date?.length}晚（包括{dateType?.normalday}晚平日，
              {dateType?.holiday}晚假日）
            </p>
            <hr className="mb-2 border-second" />
            <ul className="mb-5 text-right font-light text-white">
              <li>總計</li>
              <li className="text-2xl font-normal tracking-widest">
                $
                {checkoutModal.dateType === undefined
                  ? "尚未選取"
                  : (data.room[0] as Room).normalDayPrice *
                      checkoutModal.dateType.normalday +
                    (data.room[0] as Room).holidayPrice *
                      checkoutModal.dateType.holiday}
              </li>
            </ul>
            <input
              type="submit"
              value="確定送出"
              className="mb-4 w-full border-[1px] border-second py-2 px-28 text-white hover:bg-white hover:text-primary"
            />
          </form>
          <p className="text-center text-xs text-white">
            此預約系統僅預約功能，並不會對您進行收費
          </p>
        </section>
        <section className="relative flex w-full flex-col bg-white px-8 pt-12 pb-7">
          <div className="max-w-xl">
            {data.room.map((item: Room) => {
              return (
                <div key={item.id}>
                  <h2 className="mb-2 text-2xl font-bold text-primary">
                    {item.name}
                  </h2>
                  <ul className="mb-9 text-sm leading-7 tracking-wider text-primary/80">
                    <li>
                      平日（一～四）價格：{item.normalDayPrice}
                      <span className="px-3">/</span>假日（五～日）價格：
                      {item.holidayPrice}
                    </li>
                    <li>
                      入住時間：{item.checkInAndOut.checkInEarly}（最早）
                      <span className="px-3">/</span>
                      {item.checkInAndOut.checkInLate}（最晚）
                    </li>
                    <li>退房時間：{item.checkInAndOut.checkOut}</li>
                  </ul>
                  <p className="mb-11 text-sm leading-5 tracking-wider text-primary/80">
                    {item.description}
                  </p>
                  <ul className="mb-6 grid max-w-[635px] grid-cols-7 items-end justify-items-center gap-x-9 gap-y-6 whitespace-nowrap">
                    <li
                      className={`${
                        item.amenities.Breakfast ? "opacity-100" : "hidden"
                      } relative content-between`}
                    >
                      <img src={Breakfast} alt="Breakfast" />
                      <p className="pt-2 text-center text-xs text-second">
                        早餐
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Mini-Bar"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img src={MiniBar} alt="MiniBar" className="mx-auto" />
                      <p className="pt-2 text-center text-xs text-second">
                        Mini Bar
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Room-Service"]
                          ? "opacity-100"
                          : "hidden"
                      } relative`}
                    >
                      <img
                        src={RoomService}
                        alt="RoomService"
                        className="mx-auto"
                      />
                      <p className="whitespace-nowrap pt-2 text-center text-xs text-second">
                        Room Service
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Wi-Fi"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img src={WiFi} alt="WiFi" className="mx-auto" />
                      <p className="self-end pt-2 text-center text-xs text-second">
                        Wifi
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Child-Friendly"]
                          ? "opacity-100"
                          : "hidden"
                      } relative`}
                    >
                      <img
                        src={ChildFriendly}
                        alt="ChildFriendly"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        適合兒童
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Television"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img
                        src={Television}
                        alt="Television"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        電話
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Great-View"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img
                        src={GreatView}
                        alt="GreatView"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        漂亮的視野
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Refrigerator"]
                          ? "opacity-100"
                          : "hidden"
                      } relative`}
                    >
                      <img
                        src={Refrigerator}
                        alt="Refrigerator"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        冰箱
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Sofa"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img src={Sofa} alt="Sofa" className="mx-auto" />
                      <p className="pt-2 text-center text-xs text-second">
                        沙發
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Pet-Friendly"]
                          ? "opacity-100"
                          : "hidden"
                      } relative`}
                    >
                      <img
                        src={PetFriendly}
                        alt="PetFriendly"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        寵物友善
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Smoke-Free"] ? "opacity-100" : "hidden"
                      } relative`}
                    >
                      <img src={Smoke} alt="Smoke" className="mx-auto" />
                      <p className="pt-2 text-center text-xs text-second">
                        全面禁菸
                      </p>
                    </li>
                    <li
                      className={`${
                        item.amenities["Air-Conditioner"]
                          ? "opacity-100"
                          : "hidden"
                      } relative`}
                    >
                      <img
                        src={AirConditioner}
                        alt="AirConditioner"
                        className="mx-auto"
                      />
                      <p className="pt-2 text-center text-xs text-second">
                        空調
                      </p>
                    </li>
                  </ul>
                  <h3 className="mb-3 font-bold text-primary">訂房資訊</h3>
                  <ul className="mb-3 ml-4 list-disc text-xs font-medium leading-7 text-primary">
                    <li>
                      入住時間：最早{item.checkInAndOut.checkInEarly}，最晚
                      {item.checkInAndOut.checkInLate}；退房時間
                      {item.checkInAndOut.checkOut}，請自行確認行程安排
                    </li>
                    <li>平日定義週一至週四，假日定義週五至週日及國定假日</li>
                    <li>好室旅店全面禁止吸菸</li>
                    <li>
                      若您有任何問題，歡迎撥打03-8321155（服務時間 週一至週六
                      10:00 - 18:00）。
                    </li>
                  </ul>
                  <h3 className="mb-3 font-bold text-primary">預約流程</h3>
                </div>
              );
            })}
            <ul className="flex justify-between">
              <li className="flex h-auto w-full max-w-[160px] flex-col items-center rounded-bl-xl rounded-br-xl border-2">
                <div className="w-full bg-second">
                  <img src={flow1} width="30" className="mx-auto h-[50px]" />
                </div>
                <p className="px-2 pt-3 pb-5 text-xs text-second">
                  送出線上預約單
                </p>
              </li>
              <li>
                <img src={arrow} width="7" className="h-[50px]" />
              </li>
              <li className="flex h-auto w-full max-w-[160px] flex-col items-center rounded-bl-xl rounded-br-xl border-2">
                <div className="w-full bg-second">
                  <img src={flow2} width="30" className="mx-auto h-[50px]" />
                </div>
                <p className="px-2 pt-3 pb-4 text-xs text-second">
                  系統立即回覆是否預訂成功 並以簡訊發送訂房通知
                  (若未收到簡訊請來電確認)
                </p>
              </li>
              <li>
                <img src={arrow} width="7" className="h-[50px]" />
              </li>
              <li className="flex h-auto w-full max-w-[160px] flex-col items-center rounded-bl-xl rounded-br-xl border-2">
                <div className="w-full bg-second">
                  <img src={flow3} width="30" className="mx-auto h-[50px]" />
                </div>
                <p className="px-2 pt-3 pb-4 text-xs text-second">
                  入住當日憑訂房通知 以現金或刷卡付款即可
                  (僅接受VISA.JCB.銀聯卡)
                </p>
              </li>
            </ul>
          </div>
          <button
            onClick={() =>
              setCheckoutModal((preState: object) => {
                return { ...preState, toggleCheckout: false };
              })
            }
            className="absolute right-10 top-7 text-3xl font-light"
          >
            X
          </button>
        </section>
      </div>
      <div
        className={`${
          isLoading["isPending"] === true ? "show" : "close"
        } absolute`}
      >
        <Loading />
      </div>
    </div>
  );
}

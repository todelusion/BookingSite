import * as PropTypes from "prop-types";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
  faL,
} from "@fortawesome/free-solid-svg-icons";

type DatePickerProps = {
  onChange: (time: { timestamp: number; dateString: string }) => {};
};

//setDateToInput()將datepicker選到的日期帶入input標籤內
//在HTML標籤使用ref={inputRef}綁定標籤

const DatePicker = ({ onChange }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthMap = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const oneDay = 60 * 60 * 24 * 1000;

  //當日時間戳
  const todayTimestamp =
    Date.now() -
    (Date.now() % oneDay) +
    new Date().getTimezoneOffset() * 1000 * 60;

  const getNumberOfDays = (year: number, month: number) => {
    // To get the number of days in a month.
    // 取得指定月份的天數
    return 40 - new Date(year, month, 40).getDate();
  };

  const getDayDetails = (args: {
    index: number;
    numberOfDays: number;
    firstDay: { firstDay_day: number; firstDay_timestamp: number };
    year: number;
    month: number;
  }) => {
    //firstDay:上個月的天數、對應的時間戳記
    //index: 面板上的所有天數

    const date = args.index - args.firstDay.firstDay_day;

    // console.log(`樣板天數${args.index} - 上個月的天數${args.firstDay.firstDay_day}，== 多餘的樣板天數${date}`)

    // console.log(`樣板上的所有天數${args.index}`)

    // console.log(`當月總天數${args.numberOfDays}`)

    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;

    //date < 0（當月起始日） ? -1 : 下一組判斷式
    //date >= args.numberOfDays（當月總天數） ? 1 : 0;

    const month: 0 | 1 | -1 = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;

    // const month: 0 | 1 | -1 = newDate < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;

    const timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const getMonthDetails = (year: number, month: number) => {
    // To get the start of the month.
    // console.log(new Date(year, month))
    const firstDay = {
      firstDay_day: new Date(year, month).getDay(),
      firstDay_timestamp: new Date(year, month).getTime(),
    };
    const numberOfDays = getNumberOfDays(year, month);
    const monthArray = [];
    const rows = 6;
    let index = 0;
    const cols = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const currentDay = getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  //今天的時間戳記（已移動位置）
  // const todayTimestamp =
  //   Date.now() -
  //   (Date.now() % oneDay) +
  //   new Date().getTimezoneOffset() * 1000 * 60;
  //今天的時間戳記

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const [details, setDetails] = useState({
    showDatePicker: false,
    year,
    month,
    selectedDay: todayTimestamp,
    hoverDay: 0,
    monthDetails: getMonthDetails(year, month),
  });

  //開關datepicker
  const showDatePicker = () => {
    setDetails({ ...details, showDatePicker: !details.showDatePicker });
  };

  const isCurrentDay = (day: {
    date?: number;
    day?: number;
    month?: number;
    timestamp?: number;
    dayString?: string;
  }) => {
    return day.timestamp === todayTimestamp;
  };

  const isSelectedDay = (day: {
    date?: number;
    day?: number;
    month?: number;
    timestamp: number;
    dayString?: string;
  }) => {
    if (details.selectedDay < todayTimestamp) return;
    // console.log(`${day.timestamp}面板值, ${details.selectedDay}選擇日`)
    const selectedDays = (details.selectedDay - todayTimestamp) / oneDay;
    // console.log(`選擇日扣掉今日的天數${selectedDays}`)

    const selectedArr = [];
    for (let i = 1; i <= selectedDays; i++) {
      // console.log(todayTimestamp, oneDay, todayTimestamp + (oneDay*i))
      selectedArr.push(todayTimestamp + oneDay * i);
    }

    // return day.timestamp === details.selectedDay;
    return selectedArr.includes(day.timestamp);
  };

  const isHoverDay = (day: {
    date?: number;
    day?: number;
    month?: number;
    timestamp: number;
    dayString?: string;
  }) => {
    if (details.hoverDay < todayTimestamp) return;
    const hoverDays = (details.hoverDay - todayTimestamp) / oneDay;

    const hoverDayArr = [];
    for (let i = 1; i <= hoverDays; i++) {
      console.log(todayTimestamp, oneDay, todayTimestamp + oneDay * i);
      hoverDayArr.push(todayTimestamp + oneDay * i);
    }
    // return day.timestamp === details.selectedDay;
    return hoverDayArr.includes(day.timestamp);
  };

  //month_number to month_string
  const getMonthStr = (month: number) =>
    monthMap[Math.max(Math.min(11, month), 0)] || "Month";

  const getDateStringFromTimestamp = (timestamp: string | number | Date) => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return `${dateObject.getFullYear()}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
  };

  const setDateToInput = (timestamp: number) => {
    const dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
    onChange({ timestamp, dateString });
  };

  const onDateClick = (
    day: {
      date?: number;
      day?: number;
      month?: number;
      timestamp: number;
      dayString?: string;
    },
    e: any
  ) => {
    //若選擇的日期小於今天則不動作
    if (day.timestamp < todayTimestamp) return;
    //丟入選擇的日期
    setDetails({
      ...details,
      selectedDay: day.timestamp,

      //選完date後關閉日期視窗
      showDatePicker: false,
    });
    setDateToInput(day.timestamp);
  };

  const setYear = (offset: number) => {
    const year = details.year + offset;
    const month = details.month;
    setDetails({
      ...details,
      year,
      monthDetails: getMonthDetails(year, month),
    });
  };

  const setMonth = (offset: number) => {
    let year = details.year;
    let month = details.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    setDetails({
      ...details,
      year,
      month,
      monthDetails: getMonthDetails(year, month),
    });
  };

  return (
    <div className="relative select-none">
      <input
        onClick={() => showDatePicker()}
        type="date"
        ref={inputRef}
        className="overflow-hidden border-2 outline-none"
      />
      {
        /*details.showDatePicker*/ true && (
          <div className="w-full max-w-sm rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between">
              {false && (
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faAnglesLeft}
                  onClick={() => setYear(-1)}
                />
              )}
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faAngleLeft}
                onClick={() => setMonth(-1)}
              />
              <div className="w-max font-bold">
                <div>
                  {details.year}
                  <span className="px-2">/</span>
                  {getMonthStr(details.month)}
                </div>
                {/* <div>{getMonthStr(details.month)}</div> */}
              </div>
              <FontAwesomeIcon
                className="cursor-pointer"
                onClick={() => setMonth(1)}
                icon={faAngleRight}
              />
              {false && (
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faAnglesRight}
                  onClick={() => setYear(1)}
                />
              )}
            </div>
            <div className="mt-5 w-full">
              <div className="grid grid-cols-7 justify-items-center">
                {["日", "一", "二", "三", "四", "五", "六"].map(
                  (day, index) => (
                    <div key={index} className="text-gray-500">
                      {day}
                    </div>
                  )
                )}
                {details.monthDetails?.map((day, index) => (
                  <div
                    onClick={(e) => onDateClick(day, e)}
                    /*onMouseEnter={(e) => onDateClick(day, e)}*/
                    className={
                      "p-3" +
                      (day.month !== 0 ? " disabled" : "") +
                      (isCurrentDay(day) ? " highlight" : "") +
                      (isSelectedDay(day) ? " highlight-active" : "") /*+
                      (isHoverDay(day) ? "highlight-active" : "")*/
                    }
                    key={index}
                  >
                    <div className="cell-day">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  arrowYear: PropTypes.oneOf(["none", "block"]),
};

DatePicker.defaultProps = {
  arrowYear: "none",
};

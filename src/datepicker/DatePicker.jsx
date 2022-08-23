import * as PropTypes from "prop-types";
import { useState, createRef } from "react";
import "./Styled.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";


const DatePicker = ({ onChange, arrowYear }) => {
  const inputRef = createRef();
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

  const getNumberOfDays = (year, month) => {
    // To get the number of days in a month.
    return 40 - new Date(year, month, 40).getDate();
  };

  const getDayDetails = (args) => {
    const date = args.index - args.firstDay;
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
    const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    const timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const getMonthDetails = (year, month) => {
    // To get the start of the month.
    const firstDay = new Date(year, month).getDay();
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

  const oneDay = 60 * 60 * 24 * 1000;
  const todayTimestamp =
    Date.now() -
    (Date.now() % oneDay) +
    new Date().getTimezoneOffset() * 1000 * 60;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const [details, setDetails] = useState({
    showDatePicker: false,
    year,
    month,
    selectedDay: todayTimestamp,
    monthDetails: getMonthDetails(year, month),
  });
  const showDatePicker = () => {
    setDetails({ ...details, showDatePicker: !details.showDatePicker });
  };

  const isCurrentDay = (day) => {
    return day.timestamp === todayTimestamp;
  };

  const isSelectedDay = (day) => {
    return day.timestamp === details.selectedDay;
  };

  //month_number to month_string
  const getMonthStr = (month) =>
    monthMap[Math.max(Math.min(11, month), 0)] || "Month";

  const getDateStringFromTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return `${dateObject.getFullYear()}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
  };

  const setDateToInput = (timestamp) => {
    const dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
    onChange({ timestamp, dateString });
  };

  const onDateClick = (day) => {
    setDetails({
      ...details,
      selectedDay: day.timestamp,
      showDatePicker: false,
    });
    setDateToInput(day.timestamp);
  };

  const setYear = (offset) => {
    const year = details.year + offset;
    const month = details.month;
    setDetails({
      ...details,
      year,
      monthDetails: getMonthDetails(year, month),
    });
  };

  const setMonth = (offset) => {
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
    <div className="relative">
      <input onClick={() => showDatePicker()} type="date" ref={inputRef} className="outline-none border-2 overflow-hidden" />
      {
        /*details.showDatePicker*/ true && (
          <div className="max-w-sm w-full p-8 shadow-xl rounded-3xl">
            <div className="flex justify-between items-center">
              {false && <FontAwesomeIcon
                className='cursor-pointer'
                icon={faAnglesLeft}
                onClick={() => setYear(-1)}
              />}
              <FontAwesomeIcon
                className='cursor-pointer'
                icon={faAngleLeft}
                onClick={() => setMonth(-1)}
              />
              <div className="w-max font-bold">
                <div>{details.year}<span className="px-2">/</span>{getMonthStr(details.month)}</div>
                {/* <div>{getMonthStr(details.month)}</div> */}
              </div>
              <FontAwesomeIcon
                className='cursor-pointer'
                onClick={() => setMonth(1)}
                icon={faAngleRight}
              />
              {false && <FontAwesomeIcon
                className='cursor-pointer'
                icon={faAnglesRight}
                onClick={() => setYear(1)}
              />}
            </div>
            <div className="w-full mt-5">
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
                    onClick={() => onDateClick(day)}
                    className={
                      "p-3" +
                      (day.month !== 0 ? " disabled" : "") +
                      (isCurrentDay(day) ? " highlight" : "") +
                      (isSelectedDay(day) ? " highlight-active" : "")
                    }
                    key={index}
                  >
                    <div className="cell-day">
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div>
                </div>
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

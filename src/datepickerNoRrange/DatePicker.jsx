import * as PropTypes from "prop-types";
import { useState, createRef } from "react";
import "./Styled.css";

const DatePicker = ({ onChange, arrowYear }) => {
  const inputRef = createRef();
  const daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
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
      dayString: daysMap[day]
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
          month
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
    monthDetails: getMonthDetails(year, month)
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
      showDatePicker: false
    });
    setDateToInput(day.timestamp);
  };

  const setYear = (offset) => {
    const year = details.year + offset;
    const month = details.month;
    setDetails({
      ...details,
      year,
      monthDetails: getMonthDetails(year, month)
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
      monthDetails: getMonthDetails(year, month)
    });
  };

  return (
    <div className="MyDatePicker">
      <div className="mdp-input" onClick={() => showDatePicker()}>
        <input type="date" ref={inputRef} />
      </div>
      {details.showDatePicker && (
        <div className="mdp-container">
          <div className="mdpc-head">
            <div className="mdpch-button" style={{ display: arrowYear }}>
              <div className="mdpchb-inner" onClick={() => setYear(-1)}>
                <span className="mdpchbi-left-arrows"></span>
              </div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(-1)}>
                <span className="mdpchbi-left-arrow"></span>
              </div>
            </div>
            <div className="mdpch-container">
              <div className="mdpchc-year">{details.year}</div>
              <div className="mdpchc-month">{getMonthStr(details.month)}</div>
            </div>
            <div className="mdpch-button">
              <div className="mdpchb-inner" onClick={() => setMonth(1)}>
                <span className="mdpchbi-right-arrow"></span>
              </div>
            </div>
            <div className="mdpch-button" style={{ display: arrowYear }}>
              <div className="mdpchb-inner" onClick={() => setYear(1)}>
                <span className="mdpchbi-right-arrows"></span>
              </div>
            </div>
          </div>
          <div className="mdpc-body">
            <div className="c-container">
              <div className="cc-head">
                {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map(
                  (day, index) => (
                    <div key={index} className="cch-name">
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="cc-body">
                {details.monthDetails?.map((day, index) => (
                  <div
                    className={
                      "c-day-container " +
                      (day.month !== 0 ? " disabled" : "") +
                      (isCurrentDay(day) ? " highlight" : "") +
                      (isSelectedDay(day) ? " highlight-green" : "")
                    }
                    key={index}
                  >
                    <div className="cdc-day">
                      <span onClick={() => onDateClick(day)}>{day.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  arrowYear: PropTypes.oneOf(["none", "block"])
};

DatePicker.defaultProps = {
  arrowYear: "none"
};

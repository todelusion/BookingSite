import { useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { addDays, compareAsc, format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./react-date-range-custom.css";

function DatepickerHasRrange({ setInputValue }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const handleDate = () => {
    const getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };
    const _dateList = getDaysArray(state[0].startDate , state[0].endDate)
    const dateList = _dateList.map(date => format(date, 'Y-MM-d'))
    console.log(dateList)
  }
  handleDate()
  console.log(new Date('2022-09-23'))



  //移除sidebar白底
  useEffect(() => {
    // console.log(document.getElementsByClassName('rdrDefinedRangesWrapper')[0].__proto__)
    document.getElementsByClassName(
      "rdrDefinedRangesWrapper"
    )[0].style.display = "none";
    document.getElementsByClassName("rdrDateDisplayWrapper")[0].style.display =
      "none";
    [...document.getElementsByClassName("rdrMonthName")].forEach(div => div.style.display = "none")
  
  }, []);

  
  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={false}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers = {false}
      months={2}
      minDate={new Date()}
      rangeColors={["#38470B", "#949C7C"]}
      ranges={state}
      direction="horizontal"
      monthDisplayFormat="yyyy / M"
      
      //關閉指定的日期
      disabledDates={[new Date('2022-09-23')]}

      //移除sidebar內容
      staticRanges={[]}
    />
  );
}
export default DatepickerHasRrange;

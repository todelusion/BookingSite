import { useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./react-date-range-custom.css";

function DatepickerHasRrange() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

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
  console.log(document.getElementsByClassName("rdrMonthAndYearPickers"))

  console.log(state);
  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={false}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers = {false}
      months={2}
      minDate={new Date()}
      rangeColors={["#F589BE", "#50E18B"]}
      ranges={state}
      direction="horizontal"
      monthDisplayFormat="yyyy / M"
      
      //移除sidebar內容
      staticRanges={[]}
    />
  );
}
export default DatepickerHasRrange;

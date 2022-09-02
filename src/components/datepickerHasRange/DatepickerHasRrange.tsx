import { useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { addDays, compareAsc, format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./react-date-range-custom.css";

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

function DatepickerHasRrange({ data, setInputValue }: Data | any) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },

  ]);
  const handleDate = () => {
    const getDaysArray = function(start: string | number | Date, end: string | number | Date) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };
    const _dateList = getDaysArray(state[0].startDate , state[0].endDate)
    const dateList = _dateList.map(date => format(date, 'Y-MM-d'))
    return dateList
  }
  //僅起點與終點
  console.log(state)


  //起始與終點內經過的天數
  console.log(handleDate())

  //移除sidebar白底
  useEffect(() => {
    // console.log(document.getElementsByClassName('rdrDefinedRangesWrapper')[0].__proto__)
    (document.getElementsByClassName("rdrDefinedRangesWrapper")[0] as HTMLElement) .style.display = "none";
    (document.getElementsByClassName("rdrDateDisplayWrapper")[0] as HTMLElement).style.display =
      "none";
    [...(document.getElementsByClassName("rdrMonthName") as any)].forEach(div => div.style.display = "none")
  
  }, []);

  
  return (
    <DateRangePicker
      onChange={(item: any) => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers = {false}
      months={2}
      minDate={new Date()}
      rangeColors={["#38470B", "#949C7C"]}
      ranges={state}
      direction="horizontal"
      monthDisplayFormat="yyyy / M"
      
      //關閉指定的日期
      disabledDates={data.booking.map((item: Booking) => new Date(item.date))}

      //移除sidebar內容
      staticRanges={[]}
    />
  );
}
export default DatepickerHasRrange;

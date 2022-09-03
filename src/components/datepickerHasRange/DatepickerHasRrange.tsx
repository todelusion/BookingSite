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

function DatepickerHasRrange({ data, checkoutModal, setCheckoutModal }: Data | any) {
  // console.log(checkoutModal)
  const { startDate, endDate }: CheckoutModal = checkoutModal

  const handleDate = (item: { selection: { startDate: Date; endDate: Date; key: string; }; }) => {
    
    const { startDate, endDate } = item.selection
    startDate.setHours(0)
    // console.log({startDate, endDate})
    const getDaysArray = function(start: string | number | Date, end: string | number | Date) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
      }
      return arr;
    };
    const _dateList = getDaysArray(startDate , endDate)

    _dateList.pop()
    
    const dateList = _dateList.map(date => format(date, 'Y-MM-dd'))
    const dateType = _dateList.reduce((init:{holiday: number, normalday: number} , date) => {
      if([5, 6, 0].includes(date.getDay())){
        // console.log(date.getDay())
        init.holiday++
      }else{
        init.normalday++
      }
      return init
    }
    ,{holiday: 0, normalday: 0})
    // console.log(dateType)
    
  

    return { dateList, dateType }
  }

  // console.log('僅起點與終點，用於設定DateRangePicker的ranges props', state)
  
  const onDateChange = (item: { selection: { startDate: Date; endDate: Date; key: string; }; }) => {
    // console.log('算出起終點內部天數', handleDate(item))

    const { startDate, endDate } = item.selection
    const { dateList, dateType } = handleDate(item)
    // setState([item.selection])
    setCheckoutModal((prevState: object) => {
      return{
        ...prevState,
        date: dateList,
        startDate: format(startDate, 'Y-MM-dd'),
        endDate: format(endDate, 'Y-MM-dd'),
        dateType: dateType
      }
    })
    
  }
  
  
  //起始與終點內經過的天數
  
  //移除sidebar白底
  useEffect(() => {
    // console.log(document.getElementsByClassName('rdrDefinedRangesWrapper')[0].__proto__)
    (document.getElementsByClassName("rdrDefinedRangesWrapper")[0] as HTMLElement) .style.display = "none";
    (document.getElementsByClassName("rdrDateDisplayWrapper")[0] as HTMLElement).style.display =
    "none";
    [...(document.getElementsByClassName("rdrMonthName") as any)].forEach(div => div.style.display = "none")
    
    // if(checkoutModal){
    //   setState([{
    //     startDate: new Date(checkoutModal.startDate),
    //     endDate: new Date(checkoutModal.endDate),
    //     key: "selection",
    //   }])
    // }
    // setCheckoutModal({startDate: state[0].startDate, endDate: state[0].endDate})
    // console.log(handleDate())
    
  }, []);


  
  return (
    <DateRangePicker
      onChange={(item: any) => onDateChange(item)}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers = {false}
      months={2}
      minDate={new Date()}
      rangeColors={["#38470B", "#949C7C"]}
      ranges={[{
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: "selection",
      }]}
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

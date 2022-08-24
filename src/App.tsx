//DateNoRange
import DatePicker from "./datepicker/DatePicker";

const onChange = (time:{timestamp: number; dateString: string}) => {
  console.log(time);
  return time
};

//DateHasRange
// import DatepickerHasRrange from './Recycle Bin/datepickerHasRange/DatepickerHasRrange'

export default function App() {

  
  return (
    <div className="flex justify-center mt-20">
      <DatePicker onChange={onChange} />
      {/* <DatepickerHasRrange /> */}
    </div>
  );
}

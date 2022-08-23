import "./styles.css";
import DatePicker from "./DatePicker";

const onChange = (time) => {
  console.log(time);
};

export default function DatepickerNoRrange() {
  return (
    <div className="App">
      <DatePicker onChange={onChange} arrowYear="block" />
    </div>
  );
}

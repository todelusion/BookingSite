import DatePicker from "./datepicker/DatePicker";

const onChange = (time) => {
  console.log(time);
};

export default function App() {
  return (
    <div className="flex justify-center mt-20">
      <DatePicker onChange={onChange} arrowYear="block" />
    </div>
  );
}

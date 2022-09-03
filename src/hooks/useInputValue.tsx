import { useState } from "react";
type Checkout = {
  name?: string,
  tel?:  string,
  startDate?: string,
  endDate?: string,
  date?: string[],

}

export default function useInputValue({}) {
  const [inputValue, setInputValue] = useState<Checkout>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return [inputValue, handleChange];
}

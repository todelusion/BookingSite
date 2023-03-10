import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>({});
  const fetchData = async () => {
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer saSb3FzqHIjWaweZP9llX8Y9oixK9X7aZZq5jPyq9XFnFUdOdUwuZc5iTZwv",
      },
    });
    if (typeof res.data === undefined) return;
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return [data, setData];
};

export default useFetch;

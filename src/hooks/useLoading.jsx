import { useState } from "react";

export default function useLoading(init) {
  const [isLoading, setIsLoading] = useState(init);
  const handleLoading = (pendingType, boolean) => {
    setIsLoading((prevState) => {
      return { ...prevState, [pendingType]: boolean };
    });
  };

  return [isLoading, handleLoading];
}

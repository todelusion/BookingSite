import { useState } from "react";

export default function useLoading(init) {
  const [isLoading, setIsLoading] = useState(init);
  const handleLoading = (pendingType, boolean) => {
    setIsLoading((prevState) => ({ ...prevState, [pendingType]: boolean }));
  };

  return [isLoading, handleLoading];
}

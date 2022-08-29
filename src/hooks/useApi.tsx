import { createContext, useContext } from "react";

type api = {
  baseUrl: string;
  token?: string;
};

export const ApiContext = createContext<api>({ baseUrl: "" });

export const useApi = () => {
  return useContext(ApiContext);
};

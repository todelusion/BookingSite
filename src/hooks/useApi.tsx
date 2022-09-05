import { createContext, useContext } from "react";

interface api {
  baseUrl: string;
  token?: string;
}

export const ApiContext = createContext<api>({ baseUrl: "", token: "" });

export const useApi = () => useContext(ApiContext);

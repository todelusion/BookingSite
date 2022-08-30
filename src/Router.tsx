import { Routes, Route } from "react-router-dom";
import { ApiContext } from "./hooks/useApi";

import Home from "./pages/Home";
import Rooms from "./pages/Room";

export default function Router() {
  const api = {
    baseUrl: "https://challenge.thef2e.com/api/thef2e2019/stage6",
  };
  return (
    <>
      <ApiContext.Provider value={api}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/rooms/:id" element={<Rooms />}></Route>
        </Routes>
      </ApiContext.Provider>
    </>
  );
}

"use client";
import { createContext, useContext, useState } from "react";
// Create a context
const GlobalContext = createContext();
//create a provider
export function GlobalProvider({ children }) {
  const [unReadCount, setUnReadCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ unReadCount, setUnReadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}
// create a custom hook to access context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

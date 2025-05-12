import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [koszyk, setKoszyk] = useState([]);
  return (
    <AppContext.Provider value={{ koszyk, setKoszyk }}>
      {children}
    </AppContext.Provider>
  );
}

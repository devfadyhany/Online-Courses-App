"use client";

import { createContext, useState } from "react";

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [logged, setLogged] = useState({ value: false, user: {} });

  const changeLogin = (logged) => {
    setLogged(logged);
  };

  return (
    <LoginContext.Provider value={{ logged, changeLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider, LoginContext };

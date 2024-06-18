"use client";

import { useCookies } from "next-client-cookies";
import { createContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { toast } from "react-toastify";

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [logged, setLogged] = useState({ value: false, user: null });
  const cookies = useCookies();
  const { decodedToken, isExpired } = useJwt(cookies.get("token"));

  const changeLogin = (logged) => {
    setLogged(logged);
  };

  const LogOut = (logged) => {
    cookies.remove("token");
    setLogged(false, null);

    toast.success("Logged Out Successfully", {
      closeOnClick: true,
      autoClose: 2000,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (cookies.get("token") !== undefined) {
      changeLogin({ value: true, user: decodedToken });
    }

    if (isExpired) {
      changeLogin({ value: false, user: null });
    }
  }, [decodedToken]);

  return (
    <LoginContext.Provider value={{ logged, changeLogin, LogOut }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider, LoginContext };

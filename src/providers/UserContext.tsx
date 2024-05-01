"use client";
import { createContext } from "react";
export type User = {
  id: number;
  name: string;
  nickname: string;
};
export const UserContext = createContext<{
  getUser: () => User | undefined;
  setUser: (info: User) => void;
  logout: () => void;
  getAccessToken: () => string | undefined;
}>({
  getUser: () => undefined,
  setUser: (info: User) => {},
  logout: () => {},
  getAccessToken: () => undefined,
});
const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const getUser = () => {
    const data = localStorage.getItem("user");

    if (data) {
      return JSON.parse(data) as User;
    } else {
      return undefined;
    }
  };

  const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return token;
    } else {
      return undefined;
    }
  };
  const setUser = (info: User) => {
    localStorage.setItem("user", JSON.stringify(info));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };
  return (
    <UserContext.Provider value={{ getUser, setUser, logout, getAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

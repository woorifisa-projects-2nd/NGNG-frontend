"use client";
import { createContext, useState } from "react";
export type User = {
  id: number;
  name: string;
  nickname: string;
};
export const UserContext = createContext<{
  getUser: () => User | undefined;
  setUser: (info: User) => void;
}>({
  getUser: () => undefined,
  setUser: (info: User) => {},
});
const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  //const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = () => {
    const data = localStorage.getItem("user");
    console.log("data", data);
    if (data) {
      return JSON.parse(data) as User;
    } else {
      return undefined;
    }
  };
  const setUser = (info: User) => {
    localStorage.setItem("user", JSON.stringify(info));
  };
  return (
    <UserContext.Provider value={{ getUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

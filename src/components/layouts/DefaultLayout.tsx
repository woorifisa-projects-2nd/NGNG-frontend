"use client";
import { ReactNode, useContext } from "react";
import Header from "./header/Header";
import StompAlarmSubscibe from "@/providers/stompAlarmSubscribe";
import { UserContext } from "@/providers/UserContext";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { logout, getUser } = useContext(UserContext);
  // console.log("access token", typeof getAccessToken());
  const user = getUser();

  if (user === undefined) {
    logout();
  }
  return (
    <div
      className={`text-black dark:text-white bg-white dark:bg-bg-dark w-full h-full min-w-[375px]`}
    >
      <Header />
      {children}
      <StompAlarmSubscibe />
    </div>
  );
}

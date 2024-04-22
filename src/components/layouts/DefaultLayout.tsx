import { ReactNode } from "react";
import Header from "./header/Header";
import StompAlarmSubscibe from "@/providers/stompAlarmSubscribe";

export default function DefaultLayout({ children }: { children: ReactNode }) {
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

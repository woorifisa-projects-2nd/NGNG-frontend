"use client";
import { ReactNode } from "react";
import { useTheme } from "next-themes";
import Header from "./header/Header";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const bgColor = theme === "dark" ? "bg-bg-dark" : "bg-white";
  return (
    <div
      className={`text-black dark:text-white ${bgColor} w-full h-full min-w-[375px]`}
    >
      <Header />
      {children}
    </div>
  );
}

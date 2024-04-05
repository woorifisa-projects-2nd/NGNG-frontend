"use client";

import { useTheme } from "next-themes";
import SellIcon from "../design/SVG/sell.svg";
import MyPageIcon from "../design/SVG/my_page.svg";
import ChatIcon from "../design/SVG/chat.svg";
import MenuIcon from "../design/SVG/menu.svg";
import { useState } from "react";
import Link from "next/link";

export default function AtferLoginMenu() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const iconColor = theme === "dark" ? "white" : "#272727";
  const bgColor = theme === "dark" ? "#272727" : "white";
  const changeMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <div>
        <div
          className="flex md:hidden justify-center items-center cursor-pointer"
          onClick={changeMenuOpen}
        >
          <MenuIcon color={iconColor} />
        </div>
        <div className="h-0 w-0 md:hidden">
          {menuOpen && (
            <div
              className={`relative right-[7.25rem] ${bgColor} w-full h-full min-w-36 min-h-[7.5rem] shadow-xl border-[1px] border-solid boder-light-gray`}
            >
              <Link href="/sell">
                <div className="cursor-pointer flex justify-start items-center gap-1 p-2 hover:bg-light-gray/50">
                  <SellIcon color={iconColor} /> 판매하기
                </div>
              </Link>
              <Link href="/my_page">
                <div className="cursor-pointer flex justify-start items-center gap-1 p-2 hover:bg-light-gray/50">
                  <MyPageIcon color={iconColor} /> 내 상점
                </div>
              </Link>
              <div className="cursor-pointer flex justify-start items-center gap-1 p-2 hover:bg-light-gray/50">
                <ChatIcon color={iconColor} /> 채팅하기
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center gap-4">
        <Link href="/sell">
          <div className="cursor-pointer hidden md:flex justify-center items-center gap-1">
            <SellIcon color={iconColor} /> 판매하기
          </div>
        </Link>
        <Link href="/my_page">
          <div className="cursor-pointer hidden md:flex justify-center items-center gap-1">
            <MyPageIcon color={iconColor} /> 내 상점
          </div>
        </Link>
        <div className="cursor-pointer hidden md:flex justify-center items-center gap-1">
          <ChatIcon color={iconColor} /> 채팅하기
        </div>
      </div>
    </div>
  );
}

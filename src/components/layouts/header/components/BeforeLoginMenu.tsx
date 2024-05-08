"use client";

import { useTheme } from "next-themes";
import LoginIcon from "../design/SVG/login.svg";
import MenuIcon from "../design/SVG/menu.svg";
import { useState } from "react";
import Link from "next/link";

export default function BeforeLoginMenu() {
  const { theme } = useTheme();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const iconColor = theme === "dark" ? "white" : "#272727";
  const bgColor = theme === "dark" ? "#272727" : "white";
  const changeMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <div
        className="flex md:hidden justify-center items-center cursor-pointer"
        onClick={changeMenuOpen}
      >
        <MenuIcon color={iconColor} />
      </div>
      <div className="h-0 w-0 md:hidden">
        {menuOpen && (
          <div className="relative right-[7.25rem] bg-white w-full h-full min-w-36 min-h-[2.5rem] shadow-xl border-[1px] border-solid boder-light-gray">
            <Link href={"/login"}>
              <div className="flex md:hidden justify-center items-center gap-1 p-2 hover:bg-light-gray/50">
                <LoginIcon color={iconColor} />
                로그인 / 회원가입
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="hidden md:flex justify-between items-center gap-4">
        <Link href={"/login"}>
          <div className="hidden md:flex justify-center items-center gap-1">
            <LoginIcon color={iconColor} />
            로그인 / 회원가입
          </div>
        </Link>
      </div>
    </div>
  );
}

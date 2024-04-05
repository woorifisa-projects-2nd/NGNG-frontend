"use client";

import ColorMode from "./ColorMode";
import { useTheme } from "next-themes";
import AtferLoginMenu from "./AfterLoginMenu";
import BeforeLoginMenu from "./BeforeLoginMenu";

export default function Menu() {
  const { theme } = useTheme();
  // TODO : 로그인여부 확인
  const isLogin = true;
  const textColor = theme === "dark" ? "text-white" : "text-black";
  return (
    <div className={`flex ${textColor} justify-between items-center gap-4`}>
      {isLogin ? <AtferLoginMenu /> : <BeforeLoginMenu />}
      <ColorMode />
    </div>
  );
}

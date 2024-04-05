"use client";
import { useTheme } from "next-themes";

import DarkModeIcon from "../design/SVG/dark_mode.svg";
import LightModeIcon from "../design/SVG/light_mode.svg";
export default function ColorMode() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const changeColorMode = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };
  return (
    <div
      className="cursor-pointer transition duration-300"
      onClick={changeColorMode}
    >
      {currentTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  );
}

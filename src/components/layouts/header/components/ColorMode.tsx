"use client";
import { useTheme } from "next-themes";
import DarkModeIcon from "../design/SVG/dark_mode.svg";
import LightModeIcon from "../design/SVG/light_mode.svg";
import { useEffect, useState } from "react";
export default function ColorMode() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  const changeColorMode = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");
  return (
    <div
      className="cursor-pointer transition duration-300"
      onClick={changeColorMode}
    >
      {loaded && currentTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  );
}

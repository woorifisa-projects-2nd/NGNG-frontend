"use client";
import SearchIcon from "../design/SVG/search.svg";
import { useTheme } from "next-themes";
export default function SearchInput() {
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : "#272727";
  return (
    <div className="flex items-center w-4/5 md:w-[35%]">
      <div className="relative left-10">
        <SearchIcon color={iconColor} />
      </div>
      <input
        className="bg-light-gray dark:bg-black rounded h-10 focus:outline-none pl-12 text-black dark:text-white min-w-56 w-[80%] md:w-full"
        placeholder="무엇을 원하세요?"
      />
    </div>
  );
}

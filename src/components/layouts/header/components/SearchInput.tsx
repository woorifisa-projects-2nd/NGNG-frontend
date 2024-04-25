import { useState } from "react";
import SearchIcon from "../design/SVG/search.svg";

export default function SearchInput() {

  const [keyword, setKeyword] = useState("");

  return (
    <div className="flex items-center w-full md:w-[28%] p-5 pt-0 md:p-0">
      <div className="relative left-[15px] w-0 h-0 bottom-[9px]">
        <SearchIcon className="fill-current " />
      </div>
      <input
        className="bg-light-gray dark:bg-black rounded h-9 focus:outline-none pl-12 text-black dark:text-white min-w-44 w-full"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="무엇을 원하세요?"
      />
    </div>
  );
}

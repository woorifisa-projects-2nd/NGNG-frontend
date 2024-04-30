import { useState } from "react";
import SearchIcon from "../design/SVG/search.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface products {

}

export default function SearchInput() {

  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const searchKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter') {

      router.push(`/search/${keyword}`);
    }
  }

  return (
    <div className="flex items-center w-full md:w-[28%] p-5 pt-0 md:p-0">
      <div className="relative left-[15px] w-0 h-0 bottom-[9px]">
        <SearchIcon className="fill-current " />
      </div>
      <input
        className="bg-light-gray dark:bg-black rounded h-9 focus:outline-none pl-12 text-black dark:text-white min-w-44 w-full"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyDown={searchKeyDown}
        placeholder="무엇을 원하세요?"
      />
    </div>
  );
}

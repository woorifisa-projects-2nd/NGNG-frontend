"use client";
import Logo from "./design/SVG/logo.svg";
import SearchInput from "./components/SearchInput";
import Menu from "./components/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const categories = [
  { name: "의류", link: "/category/clothes/" },
  { name: "잡화", link: "/category/accessories/" },
  { name: "뷰티", link: "/category/beauty/" },
  { name: "디지털", link: "/category/digital/" },
  { name: "취미", link: "/category/hobby/" },
  { name: "티켓/교환권", link: "/category/ticket/" },
  { name: "생활", link: "/category/life/" },
  { name: "가구", link: "/category/furniture/" },
  { name: "가공식품", link: "/category/food/" },
  { name: "기타", link: "/category/etc/" },
];
export default function Header() {
  const pathname = usePathname();

  return (
    <div className="dark:bg-bg-header-dark sticky top-0 z-10 bg-white">
      <div className="hidden md:flex justify-center items-center w-full p-5">
        <div className="flex justify-between items-center w-[90%]">
          <Link href="/" className="w-28 h-5" aria-label="Main">
            <Logo />
          </Link>
          <SearchInput />
          <Menu />
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex justify-between items-center p-5 w-full">
          <Link href="/" className="w-24 h-5" aria-label="Main">
            <Logo />
          </Link>
          <Menu />
        </div>
        <SearchInput />
      </div>
      <div className="hidden md:flex justify-center items-center shadow-md w-full h-12">
        <div className="hidden md:flex justify-around items-center w-[90%]">
          {categories.map((category) => {
            return (
              <Link
                key={category.name}
                href={category.link}
                className={`hover:bg-light-gray/50 p-2 ${
                  pathname.split("/")[2] === category.link.split("/")[2] &&
                  "text-point-color font-bold "
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

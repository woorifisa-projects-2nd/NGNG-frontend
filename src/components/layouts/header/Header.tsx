import Logo from "./design/SVG/logo.svg";
import SearchInput from "./components/SearchInput";
import Menu from "./components/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const categories = [
    { name: "의류", link: "/product/clothes" },
    { name: "잡화", link: "/product/accessories" },
    { name: "뷰티", link: "/product/beauty" },
    { name: "디지털", link: "/product/digital" },
    { name: "취미", link: "/product/hobby" },
    { name: "티켓/교환권", link: "/product/ticket" },
    { name: "생활", link: "/product/life" },
    { name: "가구", link: "/product/furniture" },
    { name: "가공식품", link: "/product/food" },
    { name: "기타", link: "/product/etc" },
  ];

  return (
    <div className="dark:bg-bg-header-dark">
      <div className="hidden md:flex justify-center items-center w-full p-5">
        <div className="flex justify-between items-center w-[90%]">
          <Link href="/">
            <Logo />
          </Link>
          <SearchInput />
          <Menu />
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex justify-between items-center p-5 w-full">
          <Link href="/">
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
                href={category.link}
                className={`${
                  pathname === category.link && "text-point-color font-bold"
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
import Logo from "./design/SVG/logo.svg";
import SmallLogo from "./design/SVG/favicon.svg";
import SearchInput from "./components/SearchInput";
import Menu from "./components/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="dark:bg-bg-header-dark">
      <div className="flex justify-between items-center px-5 lg:px-32 py-5 w-full">
        <Link href={"/"}>
          <div className="hidden md:flex">
            <Logo />
          </div>
          <div className="flex md:hidden">
            <SmallLogo />
          </div>
        </Link>
        <SearchInput />
        <Menu />
      </div>
      <div className="flex justify-center items-center shadow-md w-full h-12">
        <div className="hidden md:flex justify-around items-center w-4/5">
          <Link
            href={"/product/clothes"}
            className={`${
              pathname === "/product/clothes"
                ? "text-point-color font-bold"
                : ""
            }`}
          >
            의류
          </Link>
          <Link
            href={"/product/accessories"}
            className={`${
              pathname === "/product/accessories"
                ? "text-point-color font-bold"
                : ""
            }`}
          >
            잡화
          </Link>
          <Link
            href={"/product/beauty"}
            className={`${
              pathname === "/product/beauty" ? "text-point-color font-bold" : ""
            }`}
          >
            뷰티
          </Link>
          <Link
            href={"/product/digital"}
            className={`${
              pathname === "/product/digital"
                ? "text-point-color font-bold"
                : ""
            }`}
          >
            디지털
          </Link>
          <Link
            href={"/product/hobby"}
            className={`${
              pathname === "/product/hobby" ? "text-point-color font-bold" : ""
            }`}
          >
            취미
          </Link>
          <Link
            href={"/product/ticket"}
            className={`${
              pathname === "/product/ticket" ? "text-point-color font-bold" : ""
            }`}
          >
            티켓/교환권
          </Link>
          <Link
            href={"/product/life"}
            className={`${
              pathname === "/product/life" ? "text-point-color font-bold" : ""
            }`}
          >
            생활
          </Link>
          <Link
            href={"/product/furniture"}
            className={`${
              pathname === "/product/furniture"
                ? "text-point-color font-bold"
                : ""
            }`}
          >
            가구
          </Link>
          <Link
            href={"/product/food"}
            className={`${
              pathname === "/product/food" ? "text-point-color font-bold" : ""
            }`}
          >
            가공식품
          </Link>
          <Link
            href={"/product/etc"}
            className={`${
              pathname === "/product/etc" ? "text-point-color font-bold" : ""
            }`}
          >
            기타
          </Link>
        </div>
      </div>
    </div>
  );
}
